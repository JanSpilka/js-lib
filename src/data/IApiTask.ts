////////////////////////////////////////////
//                                        //
// Do not modify this file.               //
// This file is generated by a generator. //
//                                        //
////////////////////////////////////////////

import type { IApiItemBase } from './IApiItemBase';

export interface IApiTask extends IApiItemBase {
    Body: string | null;
    IsCompleted: boolean | null;
    DueDate: string | null;
    PercentCompleteDecimal: number | null;
    PrevStateEn: string | null;
    StartDate: string | null;
    StateEn: string | null;
    Subject: string | null;
    TypeEn: string | null;
    Level: number | null;
    RTFBody: string | null;
    IsTeamTask: boolean | null;
    ImportanceEn: string | null;
    Sensitivity: number | null;
    ActualWorkHours: number | null;
    EstimatedWorkHours: number | null;
    IsReminderSet: boolean | null;
    ReminderDate: string | null;
    CompletedDate: string | null;
    Picture: string | null;
    PictureWidth: number | null;
    PictureHeight: number | null;
    Leads_TaskParentGuid: string | null;
    Projects_TaskParentGuid: string | null;
    Tasks_TaskParentGuid: string | null;
    Marketing_TaskParentGuid: string | null;
    Companies_CompanyGuid: string | null;
    Contacts_ContactGuid: string | null;
    Users_TaskDelegatorGuid: string | null;
    Users_TaskSolverGuid: string | null;
    Tasks_TaskOriginGuid: string | null;
}
