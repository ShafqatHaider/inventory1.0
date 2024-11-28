import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, expand, map, reduce, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IBrand } from '../shared/interface/IBrand';
import { IBarcoding } from '../shared/interface/IBarcoding';
import { ICategory } from '../shared/interface/ICategory';
import { IDepartment } from '../shared/interface/IDepartment';
import { IGroup } from '../shared/interface/IGroup';
import { ISubCate } from '../shared/interface/ISubcategory';
import { ICodeCoding } from '../shared/interface/ICodeCoding';
import { IPurchase } from '../shared/interface/IPurchase';
import { INewSale } from '../shared/interface/INewSale';
import { IBranchInfo } from '../shared/interface/IBranchInfo';
import { IInvoiceVar } from '../shared/interface/IInvoiceVar';
import { IMeasurement } from '../shared/interface/IMeasurement';
import { IGodown } from '../shared/interface/IGodown';
import { ICodeEType } from '../shared/interface/ICodeEType';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  headers=new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  readonly rootUrl:string=environment.baseApiUrl;
  companyid=localStorage.getItem('COMPANY_ID');
  branchid=localStorage.getItem('BRANCH_ID');
  constructor(private http: HttpClient) { }

  /*-----------------------BRAND------------------------------*/ 
  saveBrand(brand:IBrand): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodingBrand/create";
    return this.http.post<any>(url,brand);
  }
  saveCodeWithBarcode(barcode:IBarcoding): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodings/createBarcode";
    return this.http.post<any>(url,barcode);
  }
  getAllBrandsLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodingBrand/GetAllBrands/"+this.companyid+'/'+this.branchid;
      return this.http.get<any>(url);
  }
  getBrandById(id:any): Observable<any> 
  {
    let url = this.rootUrl+"CodeCodingBrand/GetBrandById/"+this.companyid+'/'+this.branchid +'/'+ id
    return this.http.get<any>(url);
  }
  deleteBrand(id: number):Observable<any>
  {
    let url=this.rootUrl+"CodeCodingBrand/DeleteBrand/"+this.companyid+'/'+this.branchid +'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }
  /*-----------------------CATEGORY------------------------------*/ 
  saveCategory(category:ICategory): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodingCategory/create";
    return this.http.post<any>(url,category);
  }
  getAllCategories(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodingCategory/GetAllCategories/"+this.companyid;
      return this.http.get<any>(url);
  }
  getCategoryById(id:any): Observable<any> 
  {
     //debugger
    let url = this.rootUrl+"CodeCodingCategory/GetCateById/"+this.companyid+'/'+ id
    return this.http.get<any>(url);
  }
  deleteCategory(id: number):Observable<any>
  {
    let url=this.rootUrl+"CodeCodingCategory/Delete/"+this.companyid+'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }
  /*-----------------------DEPARTMENT------------------------------*/ 
  saveDeptt(deptt:IDepartment): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodingDepartment/create";
    return this.http.post<any>(url,deptt);
  }
  getAllDeptt(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodingDepartment/GetAllDepartments/"+this.companyid+'/'+this.branchid;
      return this.http.get<any>(url);
  }
  getDepttById(id:any): Observable<any> 
  {
    let url = this.rootUrl+"CodeCodingDepartment/GetDepartmentById/"+this.companyid+'/'+this.branchid +'/'+ id
    return this.http.get<any>(url);
  }
  deleteDeptt(id: number):Observable<any>
  {
    let url=this.rootUrl+"CodeCodingDepartment/Delete/"+this.companyid+'/'+this.branchid +'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }

  /*-----------------------GROUP------------------------------*/ 
  saveGroup(group:IGroup): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodingGroup/create";
    return this.http.post<any>(url,group);
  }
  getAllGroup(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodingGroup/GetAllGroups/"+this.companyid+'/'+this.branchid;
      return this.http.get<any>(url);
  }
  getGroupById(id:any): Observable<any> 
  {
    let url = this.rootUrl+"CodeCodingGroup/GetGroupById/"+this.companyid+'/'+this.branchid +'/'+ id
    return this.http.get<any>(url);
  }
  deleteGroup(id: number):Observable<any>
  {
    let url=this.rootUrl+"CodeCodingGroup/Delete/"+this.companyid+'/'+this.branchid +'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }

  /*-----------------------OPTIONS------------------------------*/ 
  // saveOptions(option:IOptions): Observable<any> 
  // {
  //    // 
  //   let url=this.rootUrl+"CodeCodingOptions/create";
  //   return this.http.post<any>(url,option);
  // }
  // getAllOptions(): Observable<any> 
  // {
  //     let url = this.rootUrl+"CodeCodingOptions/GetAllOptions/"+this.companyid;
  //     return this.http.get<any>(url);
  // }
  // getOptionById(id:any): Observable<any> 
  // {
  //   let url = this.rootUrl+"CodeCodingOptions/GetOptionById/"+this.companyid +'/'+ id
  //   return this.http.get<any>(url);
  // }
  // deleteOption(id: number):Observable<any>
  // {
  //   let url=this.rootUrl+"CodeCodingOptions/Delete/"+this.companyid+'/'+ id;
  //   console.log(url)
  //   return this.http.post<any>(url,{headers:this.headers});
  // }

  /*-----------------------SUBCATEGORY------------------------------*/ 
  saveSubCate(subCate:ISubCate): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodingSubCategory/create";
    return this.http.post<any>(url,subCate);
  }
  getAllSubCates(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodingSubCategory/GetAllSubCategories/"+this.companyid+'/'+this.branchid;
      return this.http.get<any>(url);
  }
  getSubCateById(id:any): Observable<any> 
  {
    let url = this.rootUrl+"CodeCodingSubCategory/GetSubCategoryByID/"+this.companyid+'/'+this.branchid +'/'+ id
    return this.http.get<any>(url);
  }
  deleteSubCate(id: number):Observable<any>
  {
    let url=this.rootUrl+"CodeCodingSubCategory/Delete/"+this.companyid+'/'+this.branchid +'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }
  /*-----------------------CODECODING------------------------------*/ 
  saveCode(code:ICodeCoding): Observable<any> 
  {
     // 
    let url=this.rootUrl+"CodeCodings/create";
    return this.http.post<any>(url,code);
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
  getGroupLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetCodeGrouplookUps/"+this.companyid
      return this.http.get<any>(url);
  }
  getBrandLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetCodeBrandlookUps/"+this.companyid
      return this.http.get<any>(url);
  }
  
  getVendorLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetCodeCodingVendorlookUps/"+this.companyid
      return this.http.get<any>(url);
  }
  getDepttLookups(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/GetCodeDepartmentlookUps/"+this.companyid
      return this.http.get<any>(url);
  }
  getROLevels(): Observable<any> 
  {
      let url = this.rootUrl+"CodeCodings/getReorderLevel/"+this.companyid
      return this.http.get<any>(url);
  }
  getCodeById(id:any): Observable<any> 
  {
    let url = this.rootUrl+"CodeCodings/GetCodeById/"+this.companyid+'/'+ id
    return this.http.get<any>(url);
  }
  deleteCode(id: number):Observable<any>
  {
    let url=this.rootUrl+"CodeCodings/DeleteCode/"+this.companyid +'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }
  /*-----------------------PURCHASE------------------------------*/
  
  savePurchase(purchase:IPurchase): Observable<any> 
  {
     // 
    let url=this.rootUrl+"Purchases/createPurchse";
    return this.http.post<any>(url,purchase);
  }
  getAllPurchases(): Observable<any> 
  {
    let branchid= Number(localStorage.getItem('BRANCH_ID'))
      let url = this.rootUrl+"Purchases/GetAllPurchase/"+this.companyid+'/'+branchid
      return this.http.get<any>(url);
  }
  
  getPartyLookups(): Observable<any> 
  {
      let url = this.rootUrl+"Purchases/GetLookUpsforParty/"+this.companyid
      return this.http.get<any>(url);
  }
  getItemsLookups(): Observable<any> 
  {
      let url = this.rootUrl+"Purchases/GetLookUpsforItems/"+this.companyid
      return this.http.get<any>(url);
  }
  getPurchaseById(id:any): Observable<any> 
  {
    let url = this.rootUrl+"Purchases/GetPurchaseById/"+this.companyid+'/'+ id
    return this.http.get<any>(url);
  }
  deletePurchase(id: number):Observable<any>
  {
    let url=this.rootUrl+"Purchases/Delete/"+this.companyid +'/'+ id;
    console.log(url)
    return this.http.post<any>(url,{headers:this.headers});
  }
  getLastItem(itemId:any){
    let url = this.rootUrl+"Purchases/GetItemDescById/"+this.companyid+'/'+ itemId
    return this.http.get<any>(url);
  }
  /*------------------NEW SALE --------------------------*/ 
saveSale(nsale:INewSale): Observable<any> {
  let url=this.rootUrl+"Sale/createSale";
  return this.http.post<any>(url,nsale);
}
saleIndex:any;
next: any; // url of next page, or null if there are no more items

getSalesLookups(): Observable<any> {
  let branchid= Number(localStorage.getItem('BRANCH_ID'))
  debugger
  let url = this.rootUrl+"Sale/GetAllSales/"+this.companyid+'/'+branchid;
  return this.http.get<any>(url)
}
getSalesById(id:any): Observable<any> {
  debugger
let url = this.rootUrl+"Sale/GetSaleById/"+id+'/'+this.companyid;
return this.http.get<any>(url);
}
getItemsLookup():Observable<any>{
  let url = this.rootUrl+"Sale/GetLookUpsforItems/"+this.companyid;
  return this.http.get<any>(url);
}
getPartyLookup():Observable<any>{
  let url=this.rootUrl+"Sale/GetLookUpsforParty/"+this.companyid;
  return this.http.get<any>(url);
}
getItemLookups():Observable<any>{
  let url=this.rootUrl+"Sale/GetLookUpsforItems/"+this.companyid;
  return this.http.get<any>(url);
}
DeleteSale(id:any):Observable<any>{
  let url=this.rootUrl+"Sale/Delete/"+id+'/'+this.companyid+'/'+this.branchid;
  return this.http.delete<any>(url);
}
getLastItems(itemId:any):Observable<any>{
  let url = this.rootUrl+"Sale/GetItemDescById/"+this.companyid+'/'+ itemId
  return this.http.get<any>(url);
}
getSaleMan():Observable<any>{
  let url = this.rootUrl+"Sale/GetLookupsForSaleMan/"+this.companyid;
  return this.http.get<any>(url);
}
getAllSalesFilterByDate(fromDate:any,toDate:any): Observable<any> { 
  let url = this.rootUrl+"Sale/GetAllSaleFilterByDate/"+this.companyid+'/'+fromDate+'/'+toDate;
  return this.http.get<any>(url);
}
getAllPurchaseFilterByDate(fromDate:any,toDate:any): Observable<any> { 
  let url = this.rootUrl+"Purchases/GetAllPurchaseFilterByDate/"+this.companyid+'/'+fromDate+'/'+toDate;
  return this.http.get<any>(url);
}

getUnitByItemId(itemId:any):Observable<any>
{
  let url=this.rootUrl+'Purchases/GetAllUnitByItemId/'+this.companyid+'/'+itemId
  return this.http.get<any>(url);
}
getGodownLookups():Observable<any>
{
  let url=this.rootUrl+'Purchases/GetGodownLookups/'+this.companyid  
  return this.http.get<any>(url);
}
  /*-----------------------STOCK LEDGER-----------------------------*/ 

  
 
  /*-----------------------WAREHOUSE------------------------------*/ 

  getPartysLookup():Observable<any>{
    let compID=Number(localStorage.getItem('COMPANY_ID'));
      let url= this.rootUrl+"TaskAssign/GetPartyLookups/"+ compID+ '/' + compID;
      return this.http.get<any>(url);
    }

/*-------------------------BRANCH INFO----------------------------*/ 



saveBranchInfo(info:IBranchInfo): Observable<any> 
  {
     // 
    let url=this.rootUrl+"BranchInfo/create";
    return this.http.post<any>(url,info);
  }


  getBranchInfo():Observable<any>
  {
    let url= this.rootUrl+"BranchInfo/GetBranchInfoByID/"+ this.companyid+ '/' + this.branchid;
    
    return this.http.get<any>(url);
  }
  /*---------------------INVOICE SETUP--------------------------*/ 
  saveInvoice(options: IInvoiceVar):Observable<any>
  {
    let url=this.rootUrl+"BranchInfo/create2";
    return this.http.post<any>(url,options);
  }
  getInvoice():Observable<any>{
    let url=this.rootUrl+"BranchInfo/GetVarInfo/"+ this.companyid;
    return this.http.get<any>(url);
  }

  /*--------------------UNIT SERVICE-----------------------*/ 
  saveUnit(unit:IMeasurement):Observable<any>
  {
    let url=this.rootUrl+'Measurements/create';
    return this.http.post(url, unit);
  }
  getUnitLookups(): Observable<any> 
  {
      let url = this.rootUrl+"Measurements/GetAllUnits/"+this.companyid
      return this.http.get<any>(url);
  }
  /*--------------------GODOWN SERVICE-----------------------*/ 

saveGodown(godown:IGodown):Observable<any>
{
  let url=this.rootUrl+'Warehouse/create';
  return this.http.post(url, godown);
}
godownLookups():Observable<any>
{
  debugger
  let url= this.rootUrl+'Warehouse/GetAllWarehouses/'+this.companyid;
  return this.http.get(url);
}

// CODE ETYPE SERVICE
saveCodeType(eType:ICodeEType):Observable<any>
{
  let url=this.rootUrl+'CodeType/create';
  return this.http.post(url, eType);
}
getAllProductTypes():Observable<any>
{
  const url= this.rootUrl+'CodeType/GetAllEtypes/'+this.companyid;
  return this.http.get(url);
}
getCateAccounts():Observable<any>
{
  let url=this.rootUrl+'AdTrialBalanceReport/GetCateAccLookups/'+this.companyid;
  return this.http.get<any>(url);
}
printBarcode(Id:any, qty:any):Observable<any>
{
  let url = this.rootUrl+'CodeCodings/GetBarcodeById/'+Id+'/'+qty+'/'+this.companyid  
  return this.http.get(url);
}

getLotLookups(itemId:any):Observable<any>{
  let url =this.rootUrl+'Purchases/GetLotLookups/'+itemId+'/'+this.companyid;
  return this.http.get<any>(url);
}

fetchPdf(url: string): Promise<Blob|any> {
  return this.http.get(url, { responseType: 'blob' })
  .toPromise();
}
getSalesInvoice(id:any):Observable<any>
{
  let url = this.rootUrl+'RptSales/GetSalesInvoice/'+this.companyid+'/'+this.branchid+'/'+id;
  return this.http.get(url, {headers:this.headers})

}
getPurchaseInvoice(id:any):Observable<any>
{
  let url = this.rootUrl+'RptSales/GetPurchaseInvoice/'+this.companyid+'/'+this.branchid+'/'+id;
  return this.http.get(url, {headers:this.headers})

}
}