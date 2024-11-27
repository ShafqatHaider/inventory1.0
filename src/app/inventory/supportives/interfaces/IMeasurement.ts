export class IMeasurement
{
     cid:number=0;
     measurementName:string='';
     measureQty:number=0;
     companyID:number=Number(localStorage.getItem('COMPANY_ID'));;
     branchID:number=Number(localStorage.getItem('BRANCH_ID'));;
}