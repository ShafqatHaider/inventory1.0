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
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/`,
            getById:`${environment.baseApiUrl}SubAccounts/GetSubAccountById/`,
            delete:`${environment.baseApiUrl}SubAccounts/Delete/`
        },
        methods:{
            reset:()=>_trans.resetAccountObj()
        },shared:{
            branchId:Number(localStorage.getItem('BRANCH_ID')),
            companyId:Number(localStorage.getItem('COMPANY_ID'))
        },
    },
    daybook:{
        data:[],
        model:new IDayBook(),
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/`,
            getById:`${environment.baseApiUrl}SubAccounts/GetSubAccountById/`,
            delete:`${environment.baseApiUrl}SubAccounts/Delete/`
        },
        methods:{
            reset:()=>_trans.resetDaybookObj()
        },shared:{
            branchId:Number(localStorage.getItem('BRANCH_ID')),
            companyId:Number(localStorage.getItem('COMPANY_ID'))
        },
    },
    lookups:{
        cityLookups:[],
        categoryAccounts:[],
        controlAccounts:[],
        accounts:[],
        balanceType:[],
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/`,
            getById:`${environment.baseApiUrl}SubAccounts/GetSubAccountById/`,
            delete:`${environment.baseApiUrl}SubAccounts/Delete/`
        },shared:{
            branchId:Number(localStorage.getItem('BRANCH_ID')),
            companyId:Number(localStorage.getItem('COMPANY_ID'))
        },
    },
    payment:{
        data:[],
        model:new IPayment()
        ,
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/`,
            getById:`${environment.baseApiUrl}SubAccounts/GetSubAccountById/`,
            delete:`${environment.baseApiUrl}SubAccounts/Delete/`
        },
        methods:{
            reset:()=>_trans.resetPaymentObj()
        },shared:{
            branchId:Number(localStorage.getItem('BRANCH_ID')),
            companyId:Number(localStorage.getItem('COMPANY_ID'))
        },
        
    },
    receipt:{
        data:[],
        model:new IRBook(),
        endPoints:{
            create:`${environment.baseApiUrl}SubAccounts/create`,
            getAll:`${environment.baseApiUrl}SubAccounts/GetAllSubAccounts/`,
            getById:`${environment.baseApiUrl}SubAccounts/GetSubAccountById/`,
            delete:`${environment.baseApiUrl}SubAccounts/Delete/`
        },
        
        methods:{
            reset:()=>_trans.resetRbookObj()
        },shared:{
            branchId:Number(localStorage.getItem('BRANCH_ID')),
            companyId:Number(localStorage.getItem('COMPANY_ID'))
        },
    }
}