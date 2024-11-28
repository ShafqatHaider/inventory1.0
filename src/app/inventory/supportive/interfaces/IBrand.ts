export class IBrand{
    bcid: number= 0
    brandTitle: string= ''
    companyID: number= Number(localStorage.getItem('COMPANY_ID'))
    branchID: number= Number(localStorage.getItem('BRANCH_ID'))
}