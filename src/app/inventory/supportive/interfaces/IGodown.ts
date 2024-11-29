import { environment } from "../../../../environment/environment";

export class IGodown
{
  cid:number=0;
  eDate:Date= new Date();
  goName:string='';
  address:string='';
  companyId:number=environment.companyId;
  branchId:number=environment.branchId;
  operatorId:number=0;
}

