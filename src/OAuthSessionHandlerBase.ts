import { ISessionHandler } from './ISessionHandler';
import { ApiConnection } from './ApiConnection';
import { ApiMethods, IApiResult } from '.';
import { HttpRequestError, TUnionError } from './exceptions/HttpRequestError';
import { WebServiceError } from './exceptions/WebServiceError';
import { IApiLoginResponse } from './data/IApiLoginResponse';

export abstract class OAuthSessionHandlerBase implements ISessionHandler {
    public lastSuccessfulLoginResponse?: IApiLoginResponse;
    
    private accessToken: string;
    private readonly username: string;
    private readonly appVersion: string;
    protected readonly errorCallback: ((error: TUnionError) => void) | undefined;

    constructor (username: string, accessToken: string, appVersion: string, errorCallback?: (error: TUnionError) => void) {
        if (!username) {
            throw new Error("Non of the arguments 'username', 'clientId', 'clientSecret', 'refreshToken' can be empty.");
        }

        this.username = username;
        this.accessToken = accessToken;
        this.appVersion = appVersion;
        this.errorCallback = errorCallback;
    }

    readonly invalidateSessionId = (_: string, callback: () => void) => {
        // Nothing to invalidate.
        if (callback) {
            callback();
        }
    };

    readonly getSessionId = (connection: ApiConnection, callback: (sessionId: string) => void) => {
		const successCallbackHandler = (result: IApiLoginResponse) => {
            this.lastSuccessfulLoginResponse = result;
            const newSessionId = result.SessionId;
            if (!newSessionId) {
                const error = new Error('Successful login but no session came.');
                if (this.errorCallback) {
                    this.errorCallback(error);
                } else {
                    throw error;
                }
                return;
            }
            if (callback) {
                callback(newSessionId);
            }
        };

		const unsuccessCallbackHandler = (result: IApiResult) => {
            const error = new WebServiceError(result.ReturnCode, 'Unable to login. Error response follows.\n' + JSON.stringify(result));
            if (this.errorCallback) {
                this.errorCallback(error);
            } else {
                throw error;
            }
        };

		const errorCallbackHandler = (error: TUnionError) => {
            if ((error as HttpRequestError)?.statusCode === 401) {
                this.getNewAccessToken(connection, (accessToken, error) => {
                    this.accessToken = accessToken;
                    if (!error) {
                        this.getSessionId(connection, callback);
                    }
                });

                return;
            }

            if (!this.errorCallback)
                throw error;

            this.errorCallback(error);
        };

		const loginInputData = {
            userName: this.username,
            appVersion: this.appVersion,
            createSessionCookie: connection.supportsGetItemPreviewMethod
        };

		const loginHeaders = {
			'Authorization': 'Bearer ' + this.accessToken
		};

		connection.callWithoutSession(
            ApiMethods.logIn,
            loginInputData,
            successCallbackHandler,
            unsuccessCallbackHandler,
            loginHeaders,
            undefined,
            errorCallbackHandler
        );
    };

    abstract getNewAccessToken(connection: ApiConnection, callback: (accessToken: string, error?: string) => void): void;
}
