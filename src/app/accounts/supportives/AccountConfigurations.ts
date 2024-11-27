import { environment } from "../../../environment/environment";
import { IAccounts } from "./interfaces/IAccount";
import { IDayBook } from "./interfaces/IDaybook";
import { IPayment } from "./interfaces/IPayment";
import { IRBook } from "./interfaces/IRbook";
import { TransactionService } from "./methods/transaction";

declare var _trans:TransactionService;
export const AccountConfigurations={
    
    accounts:{
        data:[],
        model:new IAccounts(),
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}SubAccounts/GetSubAccountById/${param}/${environment.companyId}/${environment.branchId}`,
            delete:(param:any)=>`${environment.baseApiUrl}SubAccounts/Delete/${param}/${environment.companyId}/${environment.branchId}`
        },
        methods:{
            reset:()=>_trans.resetAccountObj()
        }
    },
    daybook:{
        data:[],
        model:new IDayBook(),
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts//${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}SubAccounts/GetSubAccountById/${param}/${environment.companyId}/${environment.branchId}`,
            delete:(param:any)=>`${environment.baseApiUrl}SubAccounts/Delete/${param}/${environment.companyId}/${environment.branchId}`
        },
        methods:{
            reset:()=>_trans.resetDaybookObj()
        }
    },
    lookups:{
        cityLookups:[],
        categoryAccounts:[],
        controlAccounts:[],
        accounts:[],
        balanceType:[],
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts//${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}SubAccounts/GetSubAccountById/${param}/${environment.companyId}/${environment.branchId}`,
            delete:(param:any)=>`${environment.baseApiUrl}SubAccounts/Delete/${param}/${environment.companyId}/${environment.branchId}`
        }
    },
    payment:{
        data:[],
        model:new IPayment()
        ,
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts//${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}SubAccounts/GetSubAccountById/${param}/${environment.companyId}/${environment.branchId}`,
            delete:(param:any)=>`${environment.baseApiUrl}SubAccounts/Delete/${param}/${environment.companyId}/${environment.branchId}`
        },
        methods:{
            reset:()=>_trans.resetPaymentObj()
        }
        
    },
    receipt:{
        data:[],
        model:new IRBook(),
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts//${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}SubAccounts/GetSubAccountById/${param}/${environment.companyId}/${environment.branchId}`,
            delete:(param:any)=>`${environment.baseApiUrl}SubAccounts/Delete/${param}/${environment.companyId}/${environment.branchId}`
        },
        
        methods:{
            reset:()=>_trans.resetRbookObj()
        }
    }
}