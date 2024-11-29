import { environment } from "../../../../environment/environment"

export class IBrand{
    bcid: number= 0
    brandTitle: string= ''
    companyID: number= environment.companyId
    branchID: number= environment.branchId;
}