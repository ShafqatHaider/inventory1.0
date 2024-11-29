import { environment } from "../../../../environment/environment";

export class IMeasurement
{
     cid:number=0;
     measurementName:string='';
     measureQty:number=0;
     companyID:number=environment.companyId;
     branchID:number=environment.branchId;
}