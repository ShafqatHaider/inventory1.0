export class IStMain
{
    category:string='';
    details:details[]= new Array();
}
export class details
{
    subcategory:string='';
    subdetails:subdetails[]= new Array();
}
export class subdetails
{
        barcode:string='';
        salerate:number=0;
        costrate:number=0;
        packet:number=0
        pktqty:number=0
        qty:number=0
        prebal:number=0
        brandid:number=0
        itemname:string='';
        qtyIn:number=0
        qtyOut:number=0
        balQty:number=0
}