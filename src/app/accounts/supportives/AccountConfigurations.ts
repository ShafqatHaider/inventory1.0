import { environment } from "../../../environment/environment";

export const AccountConfigurations={
    accounts:{
        data:[],
        model:null,
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/`,
            getById:`${environment.baseApiUrl}SubAccounts/GetSubAccountById/`,
            delete:`${environment.baseApiUrl}SubAccounts/Delete/`
        }
    },
    daybook:{
        data:[],
        model:null
    },
    lookups:{
        cityLookups:[],
        categoryAccounts:[],
        controlAccounts:[],
        accounts:[],
        balanceType:[]
    },
    payment:{
        data:[],
        model:null
    },
    receipt:{
        data:[],
        model:null
    }
}