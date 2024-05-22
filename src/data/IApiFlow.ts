////////////////////////////////////////////
//                                        //
// Do not modify this file.               //
// This file is generated by a generator. //
//                                        //
////////////////////////////////////////////

import type { IApiItemBaseWithoutPrivate } from './IApiItemBase';
import type { IApiEvent } from './workflowActions/IApiAction';

export interface IApiFlow extends IApiItemBaseWithoutPrivate {
    ModelGuid: string | null;
    PrecedentEn: string | null;
    SuccedentEn: string | null;
    Roundtrip: boolean | null;
    AllActionEvents: IApiEvent[] | null;
}
