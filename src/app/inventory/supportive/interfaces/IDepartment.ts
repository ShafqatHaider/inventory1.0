import { environment } from "../../../../environment/environment";

export class IDepartment{
    dpttID:number=0;
    depttName:string='';
    companyID:number=environment.companyId;
    branchID:number=environment.branchId;
}

