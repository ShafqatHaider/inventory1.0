import { environment } from "../../../../environment/environment";

export class IGroup{

        gcid:number=0;
        title:string='';
        companyID:number=environment.companyId;
        branchID:number=environment.branchId;
}