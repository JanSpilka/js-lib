import Axios, { AxiosResponse } from "axios";
import { HttpMethod } from "../HttpMethod";
import { ApiConnection } from "../ApiConnection";
import { ITokenizedApiResult } from "./ITokenizedApiResult";
import { IApiResult } from "../IApiResult";

export class TokenizedServiceConnection<TObtainResponse extends IApiResult> {

    private readonly obtainTokenMethodName: string;
    private readonly obtainTokenMethodType: HttpMethod;
    private readonly needsSession: boolean;
    private readonly invalidTokenReturnCode: string;
    private readonly urlAndTokenObtainer: (response: TObtainResponse) => { url: string | null, token: string | null };
    private readonly connection: ApiConnection;
    private readonly generalErrorCallback: (() => void) | null;

    private url: string | null;
    private token: string | null;
    private isActive: boolean;

    constructor(
        obtainTokenMethodName: string,
        obtainTokenMethodType: HttpMethod,
        needsSession: boolean,
        invalidTokenReturnCode: string,
        urlAndTokenObtainer: (response: TObtainResponse) => { url: string | null, token: string | null },
        connection: ApiConnection,
        errorCallback?: () => void
    ) {
        this.obtainTokenMethodName = obtainTokenMethodName;
        this.obtainTokenMethodType = obtainTokenMethodType;
        this.needsSession = needsSession;
        this.invalidTokenReturnCode = invalidTokenReturnCode;
        this.urlAndTokenObtainer = urlAndTokenObtainer;
        this.connection = connection;
        this.generalErrorCallback = errorCallback || null;
        this.url = null;
        this.token = null;
        this.isActive = true;
    }

    readonly isEnabled = (enabledCallback: (url: string, token: string) => void, disabledCallback: () => void) => {
        const check = () => {
            if (!this.url || !this.token) {
                disabledCallback();
            } else {
                enabledCallback(this.url, this.token);
            }
        };

        if (!this.url || !this.token) {
            this.obtainToken(check);
            return;
        } else {
            enabledCallback(this.url, this.token);
        }
    };

    readonly callTokenizedApi = <TResult extends ITokenizedApiResult>(methodName: string, data: any, successCallback: (data: TResult) => void, unsuccessCallback?: ((data: TResult | null) => void) | null) => {
        this.isEnabled(
            (url: string, token: string) => {
                data.token = token;
                TokenizedServiceConnection.call(
                    url,
                    methodName,
                    data,
                    successCallback,
                    (result: TResult) => {
                        if (result.ReturnCodeString === this.invalidTokenReturnCode) {
                            this.obtainToken(() => {
                                this.callTokenizedApi(methodName, data, successCallback, unsuccessCallback);
                            });
                            return;
                        }
                        if (unsuccessCallback) {
                            unsuccessCallback(result);
                        } else {
                            console.error('Unhandled ls connection return code ' + result.ReturnCodeString + '.\nDescription: ' + result.Description);
                            if (!!this.generalErrorCallback) {
                                this.generalErrorCallback();
                            }
                        }
                    },
                    (error: any) => {
                        console.error(error);
                        if (!!this.generalErrorCallback) {
                            this.generalErrorCallback();
                        }
                    }
                )
            },
            () => {
                if (unsuccessCallback) {
                    unsuccessCallback(null);
                } else {
                    console.error('Unable to call method ' + methodName + ' at ls. Tokenized api is disabled.');
                }
            }
        );
    };

    private readonly obtainToken = (callback: () => void) => {
        if (!this.isActive) {
            this.url = null;
            this.token = null;
            callback();
            return;
        }

        const successClb = (result: TObtainResponse) => {
            const obtainedResult = this.urlAndTokenObtainer(result);
            if (!obtainedResult.url || !obtainedResult.token) {
                this.url = null;
                this.token = null;
                this.isActive = false;
                callback();
            } else {
                this.url = obtainedResult.url;
                this.token = obtainedResult.token;
                this.isActive = true;
                callback();
            }
        };
        const unsuccessClb = () => {
            this.url = null;
            this.token = null;
            this.isActive = false;
            callback();
        };

        if (this.needsSession) {
            this.connection.callMethod(this.obtainTokenMethodName, {}, successClb, unsuccessClb, this.obtainTokenMethodType);
        } else {
            this.connection.callWithoutSession(this.obtainTokenMethodName, {}, successClb, unsuccessClb, null, this.obtainTokenMethodType);
        }
    };

    private static call<TResult extends ITokenizedApiResult>(serviceUrl: string, methodName: string, data: object, successCallback: (result: TResult) => void, unsuccessCallback: (result: TResult) => void, errorCallback: (error: any) => void) {
        // We count on that we are in Admin/Subdirectory.
        const address = serviceUrl + '/' + methodName;
        Axios.post(
            address,
            data
        )
            .then((response: AxiosResponse<TResult>) => {
                if (response.status === 200) {
                    if (response.data.ReturnCodeString === 'Success') {
                        successCallback(response.data);
                    } else {
                        console.warn('Tokenized API method ' + methodName + ' returned not success return code: ' + JSON.stringify(response.data));
                        unsuccessCallback(response.data);
                    }
                } else {
                    console.error('Tokenized API' + methodName + ' response error: ' + JSON.stringify(response));
                    errorCallback(response);
                }
            })
            .catch((error) => {
                console.error('Tokenized API' + methodName + ' request failed: ' + JSON.stringify(error));
                errorCallback(error);
            });
    }
}