export class IAccounts{
    accID:number=0;
    eDate:Date=new Date();
    cateAccID:number=0;
    ctrlAccID:any=null;
    mainGroupID:number=0;
    groupAccID:number=0;
    compID:number=0;
    code:string='';
    accFlexCode:string='';
    title:string='';
    titleU:string='';
    accTypeID:number=0;
    accTransTypeID:number=0;
    isDeptAcc:boolean=false;
    isLocationAcc:boolean=false;
    isAutoOpenBal:boolean=true;
    isFreeze:boolean=false;
    isActive:boolean=true;
    accCodeDr:number=0;
    accCodeCr:number=0;
    cityID:number=0;
    areaID:number=0;
    accAddress:string='';
    telephone:string='';
    stNumber:string='';
    ntNumber:string='';
    isNtnActive:boolean=false;
    accOpenBal:number=0;
    opBalType:number=0;
    accCreditLimit:number=0;
    accURL:string='';
    ctrlAccIDDr:number=0;
    ctrlAccIDCr:number=0;
    branchID:number=0;
    sync:number=0;
    used:number=0;
}