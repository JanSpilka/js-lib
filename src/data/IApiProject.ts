////////////////////////////////////////////
//                                        //
// Do not modify this file.               //
// This file is generated by a generator. //
//                                        //
////////////////////////////////////////////

import type { IApiItemBase } from './IApiItemBase';

export interface IApiProject extends IApiItemBase {
    Note: string | null;
    Price: number | null;
    ProjectEnd: string | null;
    ProjectName: string | null;
    TypeEn: string | null;
    StateEn: string | null;
    PeopleExpenses: number | null;
    ProjectRealEnd: string | null;
    EstimatedPrice: number | null;
    HID: number | null;
    ProjectOriginEn: string | null;
    PaymentTypeEn: string | null;
    OtherExpenses: number | null;
    Margin: number | null;
    Profit: number | null;
    PaymentMaturity: number | null;
    InvoicePaymentDate: string | null;
    InvoiceIssueDate: string | null;
    EstimatedMargin: number | null;
    EstimatedProfit: number | null;
    EstimatedPeopleExpenses: number | null;
    EstimatedOtherExpenses: number | null;
    LicensesCount: number | null;
    LicensePrice: number | null;
    PrevStateEn: string | null;
    ShowInCaplan: boolean | null;
    ProjectStart: string | null;
    EstimatedWorkHours: number | null;
    TotalWorkHours: number | null;
    EstimatedPeopleExpensesDefaultCurrency: number | null;
    EstimatedOtherExpensesDefaultCurrency: number | null;
    EstimatedPriceDefaultCurrency: number | null;
    PeopleExpensesDefaultCurrency: number | null;
    OtherExpensesDefaultCurrency: number | null;
    PriceDefaultCurrency: number | null;
    ProfitDefaultCurrency: number | null;
    EstimatedProfitDefaultCurrency: number | null;
    CurrencyEn: string | null;
    EstimatedPeopleExpensesChanged: string | null;
    EstimatedOtherExpensesChanged: string | null;
    OtherExpensesChanged: string | null;
    EstimatedPriceChanged: string | null;
    PriceChanged: string | null;
    LicensePriceChanged: string | null;
    LicensePriceDefaultCurrency: number | null;
    LastActivity: string | null;
    NextStep: string | null;
    PeopleExpensesChanged: string | null;
    Picture: string | null;
    PictureWidth: number | null;
    PictureHeight: number | null;
    Companies_CustomerGuid: string | null;
    Contacts_ContactPersonGuid: string | null;
    Leads_Project_OriginGuid: string | null;
    Projects_SuperiorProjectGuid: string | null;
    Users_SupervisorGuid: string | null;
}
