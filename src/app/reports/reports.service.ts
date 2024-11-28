import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  headers=new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  readonly rootUrl:string=environment.baseApiUrl;
  companyid=localStorage.getItem('COMPANY_ID');
  branchid=localStorage.getItem('BRANCH_ID');
  constructor(private http: HttpClient) { }
  getBccReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
    let url= this.rootUrl+"RptSales/GetBCCSaleReport/"+compID+'/'+fDate+'/'+tDate;
    return this.http.get<any>(url);
  }
  
  getBWSaleReport(fDate: any, tDate:any ): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptSales/GetBillWiseSaleReport/"+compID+'/'+fDate+'/'+tDate
    console.log(url)
    return this.http.get<any>(url);
  }


  getPISaleWithSTReport( fDate: any,tDate:any) :Observable<any>
  {
    let compID= Number(localStorage.getItem('COMPANY_ID'));
    let url= this.rootUrl+"RptSales/GetPartyItemSaleWithSTReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getIPSaleWithSTReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptSales/GetItemPartySaleWithSTReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getBWSaleWithSTReport(fDate: any, tDate:any ): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptSales/GetBillWiseSaleWithSTReport/"+compID+'/'+fDate+'/'+tDate
    
    return this.http.get<any>(url);
  }
  
  getPISaleReport( fDate: any,tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptSales/GetPartyItemSaleReport/"+compID+'/'+fDate+'/'+tDate
    
    return this.http.get<any>(url);
  }
  getIPSaleReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptSales/GetItemPartySaleReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getStockProfitReport(fDate: any, tDate:any ): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
    let branchID= Number(localStorage.getItem('BRANCH_ID'));
     // 
    let url= this.rootUrl+"RptSales/GetStockProfitReport/"+compID+'/'+branchID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getBWPurchaseReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptPurchase/GetBillWisePurchaseReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getPIPurchaseReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptPurchase/GetPartyItemPurchaseReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getIPPurchaseReport(fDate: any, tDate:any): Observable<any>{
     // 
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptPurchase/GetItemPartyPurchaseReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getBWPurchaseSTReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptPurchase/GetBillWisePurchaseWithSTReport/"+compID+'/'+fDate+'/'+tDate
    console.log(url)
    return this.http.get<any>(url);
  }
  getPIPurchaseSTReport(fDate: any, tDate:any): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
      
    let url= this.rootUrl+"RptPurchase/GetPartyItemPurchaseWithSTReport/"+compID+'/'+fDate+'/'+tDate
    console.log(url)
    return this.http.get<any>(url);
  }
  getIPPurchaseSTReport(fDate: any, tDate:any): Observable<any>{
     // 
    let compID= Number(localStorage.getItem('COMPANY_ID'));
     // 
    let url= this.rootUrl+"RptPurchase/GetItemPartyPurchaseWithSTReport/"+compID+'/'+fDate+'/'+tDate
    return this.http.get<any>(url);
  }
  getItemWiseProfit(fDate:any,tDate:any,cateId:any,opt:any):Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
    let url= this.rootUrl+"RptSales/GetPartyItemWiseProfitReport/"+compID+'/'+fDate+'/'+tDate+'/'+cateId+'/'+opt;
    return this.http.get<any>(url);
  }
  getRptSaleMan(): Observable<any>{
    let compID= Number(localStorage.getItem('COMPANY_ID'));
    let url= this.rootUrl+"RptSales/GetSaleManWiseReport/"+compID;
    return this.http.get<any>(url);
  }
// LEDGER NEW
getLedger(sAccId:any,lgTypeId:any,fdate:any,tdate:any,period:any):Observable<any>
{
  let url= this.rootUrl+"AdTrialBalanceReport/GetPartyLedger/"+this.companyid+'/'+sAccId+'/'+lgTypeId+'/'+fdate+'/'+tdate+'/'+period;
  return this.http.get(url);
}
// LOOKUPS
getPartyLookups(): Observable<any> 
{
    let url = this.rootUrl+"Purchases/GetLookUpsforParty/"+this.companyid
    return this.http.get<any>(url);
}
getFolioLookupsById(saccId:any): Observable<any> 
{
    let url = this.rootUrl+"AdTrialBalanceReport/GetPartyFolioById/"+this.companyid+'/'+saccId
    return this.http.get<any>(url);
}
getFolioLookups(): Observable<any> 
{
    let url = this.rootUrl+"AdTrialBalanceReport/GetAllFolioLookups/"+this.companyid;
    return this.http.get<any>(url);
}
// TRAIL BALANCE REPORT
getTrailBal(tDate:any, lgType:any): Observable<any> {
  let compID=Number(localStorage.getItem('COMPANY_ID'));
  let url = this.rootUrl+"AdTrialBalanceReport/GetAllTrialBalance/"+compID+'/'+this.branchid+'/'+tDate+'/'+lgType;
  return this.http.get<any>(url);

}

getTrialFiltered(tDate:any,cateAccId:any, lgType:any):Observable<any>
{
  let url=this.rootUrl+'AdTrialBalanceReport/GetTrialBalanceFiltered/'+this.companyid+'/'+tDate+'/'+cateAccId+'/'+lgType;
  return this.http.get<any>(url);
}
getCateAccounts():Observable<any>
{
  let url=this.rootUrl+'AdTrialBalanceReport/GetCateAccLookups/'+this.companyid;
  return this.http.get<any>(url);
}
getSummary(fDate:any,tDate:any,opt:any): Observable<any> {
  let compID=Number(localStorage.getItem('COMPANY_ID'));
  let branchID=Number(localStorage.getItem('BRANCH_ID'));
  let url = this.rootUrl+"AdTrialBalanceReport/GetISummeryReport/"+compID+'/'+branchID+'/'+fDate+'/'+tDate+'/'+opt;
  return this.http.get<any>(url);

}
getDailyCashReport(fDate: any,tDate:any): Observable<any>{
  let compID= Number(localStorage.getItem('COMPANY_ID'));
   // 
  let url= this.rootUrl+"AdTrialBalanceReport/GetDailyCashReport/"+compID+'/'+fDate+'/'+tDate
  return this.http.get<any>(url);
}
GetDaybookReport(fDate: any,tDate:any,ttype:any): Observable<any>{
  let compID= Number(localStorage.getItem('COMPANY_ID'));
  let url= this.rootUrl+"AdTrialBalanceReport/GetDaybookReport/"+compID+'/'+fDate+'/'+tDate+'/'+ttype;
  console.log(url)
  return this.http.get<any>(url);
}

 /*-----------------------STOCK LIST------------------------------*/ 
 getStockList(cateId:any, scateId:any, tillDate:any):Observable<any>
 {
   let url=this.rootUrl+"StockReport/GetStockList/"+this.companyid+'/'+cateId+'/'+scateId+'/'+tillDate;
   return this.http.get<any>(url);
 }
 getStockListCategorized():Observable<any>
 {
   let url=this.rootUrl+"CodeCodings/GetStockListCategorized/"+this.companyid;
   return this.http.get<any>(url);
 }

 getAllCodes(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetAllCodes/"+this.companyid
      return this.http.get<any>(url);
  }
  getCateLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetCodeCatelookUps/"+this.companyid
      return this.http.get<any>(url);
  }
  getSubCateLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetCodeSubCategorylookUps/"+this.companyid
      return this.http.get<any>(url);
  }
  GetAllTransactionTypesLookups(): Observable<any> 
  {
      let url = this.rootUrl+"AdTrialBalanceReport/GetAllTransactionTypesLookups/"+this.companyid
      return this.http.get<any>(url);
  }

/*--------------ITEM LEDGER-------------------*/
getBrandLedger(cid:any, fDate:any, tDate:any,ttype:any): Observable<any> {
  // 
  let compID=Number(localStorage.getItem('COMPANY_ID'));
  let url = this.rootUrl+"StockReport/GetBrandLedger/"+compID+'/'+cid+'/'+fDate+'/'+tDate+'/'+ttype;
  return this.http.get<any>(url);
}
getStockFolioLookups(itemId:any):Observable<any>
{
  let compID=Number(localStorage.getItem('COMPANY_ID'));
  let url = this.rootUrl+'StockReport/GetTransactionTypes/'+compID+'/'+itemId;
  return this.http.get<any>(url);
}
}


