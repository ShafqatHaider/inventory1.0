import { environment } from "../../../../environment/environment"

export class IUnits{
  cid: number=0
  measurementName:string ='';
  measureQty: number=1
  companyID:number =environment.companyId;
  branchID: number=environment.branchId;
}