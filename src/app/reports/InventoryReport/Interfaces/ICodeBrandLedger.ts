export class ICodeBrandLedger{
    reff:string='';
    lg_type:string='';
    lg_code:string='';
    lg_date:Date=new Date();
    brandId:number=0;
    qtyIn:number=0;
    qtyOut:number=0;
    brandName:string='';
    cost:number=0;
    salePrice:number=0;
    barcode:string='';
    narat:string='';
    companyId:number=Number(localStorage.getItem('COMPANY_ID'));
    balance:number=0;
}