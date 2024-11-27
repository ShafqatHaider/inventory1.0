
export class IDayBookSub {
    accID: number=0;
    accDesc: string;
    narat: string='';
    drAmt: number=0;
    crAmt: number=0;
    companyID: number;
    branchID: number;
    opertorID: number;
    Id:number | null;
    accName: string | null='';
    /**
     *
     */
    constructor() {
        this.Id =0;
        this.accDesc ="";
        this.branchID = Number(localStorage.getItem('BRANCH_ID'));
        this.companyID = Number(localStorage.getItem('COMPANY_ID'));
        this.opertorID = Number(localStorage.getItem('OPERATOR_ID'));
    }
}




export class IDayBook {
cid: number;
eDate: Date;
headID: number;
narat: string;
companyID: number;
branchID: number;
opertorID: number;

dayBookSub : IDayBookSub[];

/**
 *
 */
constructor() {
    this.dayBookSub = new Array();
    this.cid = 0;
    this.headID =0;
    this.narat ="";
    this.eDate = new Date();
    this.branchID = Number(localStorage.getItem('BRANCH_ID'));
    this.companyID = Number(localStorage.getItem('COMPANY_ID'));
    this.opertorID = Number(localStorage.getItem('OPERATOR_ID'));
}

}
