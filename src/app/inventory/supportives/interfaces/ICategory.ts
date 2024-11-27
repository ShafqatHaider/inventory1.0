export class ICategory{

        cateID:number=0;
        eDate:Date=new Date();
        title:string='';
        titleU:string='';
        companyID:number=Number(localStorage.getItem('COMPANY_ID'));;
        branchID:number=Number(localStorage.getItem('BRANCH_ID'));;
        operatorID:number=Number(localStorage.getItem('OPERATOR_ID'));
        used:number=0;
}