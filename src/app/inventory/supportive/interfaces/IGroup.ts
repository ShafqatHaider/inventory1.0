export class IGroup{

        gcid:number=0;
        title:string='';
        companyID:number=Number(localStorage.getItem('COMPANY_ID'));
        branchID:number=Number(localStorage.getItem('BRANCH_ID'));
}