export const environment={
    branchId:Number(localStorage.getItem('BRANCH_ID')),
    companyId:Number(localStorage.getItem('COMPANY_ID')),
    production: false,
     // baseApiUrl: 'http://localhost:5000/api/',
        baseApiUrl: 'https://di.easwdb.com/api/', //main,
        
}