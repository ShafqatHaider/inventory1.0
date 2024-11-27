export class ISaleBCC{
    eDate:Date=new Date();
    totalCashRece:number=0;
    totalSale:number=0;
    totalRet:number=0;
    totalDis:number=0;
    Party = new Array<Party>();
}
export class Party{
    billType:string='';
    totalCashRece:number=0;
    totalSale:number=0;
    totalRet:number=0;
    totalDis:number=0;
    Bills= new Array<Bills>();
}
export class Bills{
    smId:number=0;
    partyName:string='';
    eDate:Date=new Date();
    billNo:number=0;
    cashRece:number=0;
    gSales:number=0;
    sReturn:number=0;
    discountUser:number=0;
    totalCashRece:number=0;
    totalSale:number=0;
    totalRet:number=0;
    totalDis:number=0;
}