export class ISaleInvoice{
       companyName : string='';
       companyLogo :  string='';
       companyAddress :  string='';
       companyPhone : string='';
       companyWebsite :  string ='';
       smId : number=0;
       eDate : Date=new Date();
       gSale : number=0;
       sReturn : number=0;
       details : details[]=new Array();
        
    }
    export class details{
        ssid :number=0;
        itemDescription :string='';
        measureunit :  string='';
        packet : number=0;
        pktQty : number=0;
        qty : number=0;
        rate : number=0;
        amount : number=0;
        saleType : number=0;
        barcode :  number=0;
        saleTaxAmount : number=0;
        saleTaxPercent : number=0;
     }
   