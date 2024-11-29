import { environment } from "../../../../environment/environment";

export class ISubCate{
    scid:number=0;
    eDate:Date=new Date();
    subTitle:string='';
    subTitleU:string='';
    companyID:number=environment.companyId;
    branchID:number=environment.branchId;
}