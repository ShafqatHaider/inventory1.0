import { environment } from "../../../../environment/environment";

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
    companyID: number = environment.companyId;
    branchID: number = environment.branchId;
    operatorID: number =0;
}


