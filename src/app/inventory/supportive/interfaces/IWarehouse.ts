export class IWarehouse {
    goCid: number = 0;
    eDate: Date = new Date();
    goName: string = '';
    goNameU: string = '';
    shortName: string = '';
    sortOrder: number = 0;
    phoneNo: string = '0';
    addressU: string = '';
    address: string = '0';
    description: string = '';
    companyID: number = Number(localStorage.getItem('COMPANY_ID'));
    branchID: number = Number(localStorage.getItem('BRANCH_ID'));
    operatorID: number = Number(localStorage.getItem('OPERATOR_ID'));
}


