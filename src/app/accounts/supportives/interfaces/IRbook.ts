export class RBookDetail {
    scid: number;
    saccId: number;
    narat: string;
    eType: number;
    amount: number;
    pcid: number;
    chqBank: string;
    chqNo: string;
    chqDate: Date;
    tc: string;
    tcBank: string;
    tcQty: number;
    tcRate: number;
    recAgainst: number;
    chqSr: number;
    chqNoS: number;
    remarks: string;
    t2: string;
    n2: number;
    regNo: string;
    companyID: number;
    branchID: number;
    Id: number =0;
    chqAmt: number =0;
    cashAmt: number =0;
    bankAmt: number =0;

    constructor() {
        this.scid=0;
        this.saccId = 0;
        this.narat="";
        this.eType = 2;
        this.amount = 0;
        this.pcid = 0;
        this.chqBank = "";
        this.chqNo = "";
        this.chqDate = new Date('01-01-2021');
        this.tc = "";
        this.tcBank = "";
        this.tcQty = 0;
        this.tcRate = 0;
        this.recAgainst = 0;
        this.chqSr = 0;
        this.chqNoS = 0;
        this.remarks = "";
        this.t2 = "";
        this.n2 = 0;
        this.regNo = "";
        this.companyID = Number(localStorage.getItem("COMPANY_ID"));
        this.branchID = Number(localStorage.getItem("BRANCH_ID"));
        
    }
}






export class IRBook {
    cid: number;
    edate: Date;
    bookSerial: string;
    bookNo: number;
    sAccId: number;
    descriptions: string;
    cheques: number;
    bank: number;
    cash: number;
    discount: number;
    t1: string;
    n2: number;
    ubRecovery:number;
    companyID: number;
    branchID: number;
    operatorID: number;
    rBookDetail: RBookDetail[];
    accName:string="";

    constructor() {
        this.rBookDetail = new Array();
        this.cid =0;
        this.edate = new Date;
        this.bookSerial = "";
        this.bookNo = 0;
        this.sAccId = 0;
        this.descriptions = "";
        this.cheques = 0;
        this.bank = 0;
        this.cash = 0;
        this.discount =0;
        this.t1 = "";
        this.n2 = 0;
        this.ubRecovery=0;

        this.companyID = Number(localStorage.getItem("COMPANY_ID"));
        this.branchID = Number(localStorage.getItem("BRANCH_ID"));
        this.operatorID = Number(localStorage.getItem("OPERATOR_ID"));
    }
}
