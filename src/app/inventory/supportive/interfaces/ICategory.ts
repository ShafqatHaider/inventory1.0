import { environment } from "../../../../environment/environment";

export class ICategory{

        cateID:number=0;
        eDate:Date=new Date();
        title:string='';
        titleU:string='';
        companyID:number=environment.companyId;
        branchID:number=environment.branchId;
        operatorID:number=Number(localStorage.getItem('OPERATOR_ID'));
        used:number=0;
}