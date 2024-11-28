export class IDailyCashReport{
    eDate: Date= new Date();
    crCash: number= 0;
    todayCash: number= 0;
    prevCash:number=0;
    Party = new Array<Party>();

}

export class Party{
    transType:string=''
    totalCash:number=0;
    totalDr:number=0;
    totalcr:number=0;
    Bills= new Array<Bills>();
}
export class Bills{
    accNameDr:string=''
    accAmountDr:number=0;
    accNameCr:string=''
    accAmountCr:number=0;

}