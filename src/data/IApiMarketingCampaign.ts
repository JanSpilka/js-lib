////////////////////////////////////////////
//                                        //
// Do not modify this file.               //
// This file is generated by a generator. //
//                                        //
////////////////////////////////////////////

import { IApiItemBase } from './IApiItemBase';

export interface IApiMarketingCampaign extends IApiItemBase {
    ID: number | null;
    TypeEn: string | null;
    StateEn: string | null;
    EstimatedStart: string | null;
    EstimatedEnd: string | null;
    Budget: number | null;
    EstimatedResponses: number | null;
    EstimatedRevenues: number | null;
    RealStart: string | null;
    RealEnd: string | null;
    Expenses: number | null;
    FinalResponses: number | null;
    FinalRevenues: number | null;
    Note: string | null;
    PrevStateEn: string | null;
    EmailCampaignHash: string | null;
    PeopleUnsubscribed: number | null;
    TargetGroup: number | null;
    EmailsSent: number | null;
    EmailsDelivered: number | null;
    EmailsViewed: number | null;
    EmailCampaignContactListChanged: boolean | null;
    EmailsMarkedAsSpam: number | null;
    EmailCampaignEmailSent: string | null;
    LastResponsesDownloadTime: string | null;
    ResponsesDownloadCount: number | null;
    Picture: string | null;
    PictureWidth: number | null;
    PictureHeight: number | null;
}
