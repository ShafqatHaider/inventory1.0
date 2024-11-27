export class IPayment {

    cid: number;
    edate: Date;
    sAccId: number ;
    descriptions: string ;
    partyCheques: number ;
    cash: number;
    cheques: number;
    discount: number ;
    t1: string ;
    t2: string;
    t3: string ;
    n2: number ;
    pPayDetail: pPayDetail[];
    companyID: number ;
    branchID: number ;
    operatorID: number ;
    amount:number;
    accName:string=''
    constructor() {
        this.pPayDetail= new Array();
        
        this.cid = 0; 
        this.edate= new Date();
        this.sAccId = 0; 
        this.descriptions= ''
        this.partyCheques= 0
        this.cash= 0
        this.cheques= 0
        this.discount= 0
        this.t1= ''
        this.t2= ''
        this.t3= ''
        this.n2= 0
        this.amount=0
        this.companyID= Number(localStorage.getItem('COMPANY_ID'));
        this.branchID= Number(localStorage.getItem('LOC_ID'));
        this.operatorID= Number(localStorage.getItem('BRANCH_ID'));
    }
}

export class pPayDetail {
    cid: number = 0;
    scid: number = 0;
    eType: number = 0;
    saccId: number = 0;
    description: string = '';
    amount: number = 0;
    pcCbID: number = 0;
    pcId: number = 0;
    remarks: string = '';
    bankName: string = '';
    chqNo: string = '';
    chqDate: Date = new Date();
    t1: string = '0';
    t2: string = '0';
    n2: number = Number(localStorage.getItem('BRANCH_ID'));
    paidAgainst: number = 0;
    companyID: number = Number(localStorage.getItem('COMPANY_ID'));
    branchID: number = Number(localStorage.getItem('LOC_ID'));

}