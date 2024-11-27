export class ISubCate{
    scid:number=0;
    eDate:Date=new Date();
    subTitle:string='';
    subTitleU:string='';
    companyID:number=Number(localStorage.getItem('COMPANY_ID'));
    branchID:number=Number(localStorage.getItem('BRANCH_ID'));
}