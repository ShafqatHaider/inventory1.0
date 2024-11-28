export class IDaybookRepo{
    lg_Date:Date=new Date()
    dateDrSum:number=0;
    dateCrSum:number=0;
    eType= new Array<etype>()
}

export class etype{
    ttype:string='';
    tdr:number=0;
    tcr:number=0
    details= new Array<details>();
}



export class details{
    saccName:string='';
    remarks:string='';
    lg_Date:Date=new Date()
    folio:string='';
    dr:number=0;
    cr:number=0;
    ac_Code:number=0;
}