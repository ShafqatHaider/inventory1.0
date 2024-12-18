import { environment } from "../../../../environment/environment";

export class IBarcoding{
    cid:number=0;
    eDate:Date=new Date();
    codeName:string='';
    pCateID:number=0;
    pCateName:string='';
    barcode:string='';
    code:string='';
    measureID:number=0;
    measureUnit:string='';
    pktQty:number=0;
    qty:number=0;
    costRate:number=0;
    saleRate:number=0;
    reorderLevelQty:number=0;
    itemDescription:string='';
    companyID:number=environment.companyId;
    branchID:number=environment.branchId;
    operatorID:number=environment.operatorID
    brandID:number=0;
    colours:string='';
    commPer:number=0;
    commRS:number=0;
    disPer:number=0;
    disRS:number=0;
    dpttID:number=0;
    groupID:number=0;
    packet:number=0;
    sizeRange:string='';
    subcateID:number=0;
    vendorID:number=0;
    ifBarcode:number=0;
    n1:number=0;
    n2:number=0;
    n3:number=0;
    txt1:string='';
    txt2:string='';
    txt3:string='';
}