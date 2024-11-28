export class ILedgerMain
{
    sAccId:number=0;
    partyName:string='';
    accAddress:string='';
    contactNo:string='';
    cityId:number=0;
    cityName:string='';
    closingBalance:number=0;
    openingBalance:number=0;
    
    details:details[]= new Array();
}
export class details
{
    eDate:Date=new Date();
    folio:string='';
    lg_Type:string='';
    description:string='';
    drAmt:number=0;
    crAmt:number=0;
    balance:number=0;
    pBalance:number=0
   
}