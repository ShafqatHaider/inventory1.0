export class IGodown
{
  cid:number=0;
  eDate:Date= new Date();
  goName:string='';
  address:string='';
  companyId:number=Number(localStorage.getItem('COMPANY_ID'));
  branchId:number=Number(localStorage.getItem('BRANCH_ID'));
  operatorId:number=Number(localStorage.getItem('LINKED_COMPANY_ID'));
}

