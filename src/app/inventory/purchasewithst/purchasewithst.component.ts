import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPurchase, IPurchaseDetail } from 'src/app/shared/interface/IPurchase';
import { ToastrService } from 'ngx-toastr';
import { internal } from 'src/app/shared/interface/internal-standard';
@Component({
  selector: 'app-purchasewithst',
  templateUrl: './purchasewithst.component.html',
  styleUrls: ['./purchasewithst.component.scss']
})
export class PurchasewithstComponent implements OnInit {
  purchasemain = new IPurchase();
  purchasesub = new IPurchaseDetail();
  purchaseArr = new IPurchase();
  branchName=internal.branchName
  //#region for variable declaration
  filterTerm: string = '';
  formModal: any;
  pmid: any;
  eDate: any;
  selected: any;
  bnid: any;
  goArr: any;
  unitArr: any;
  uId = 0;
  itemUnit: any;
  lpr: any;
  sBal: any;
  iProfit: any;
  profit: any = [];
  billProfit: number = 0;
  payable = 0;
  delAmt = 0;
  delRet = 0;
  grossBill = 0;
  subType = 0;
  subPurchase = 0;
  retAmt = 0;
  purAmt = 0;
  tRet = 0;
  subDisc = 0;
  tDisc = 0;
  subQty = 0;
  subRate = 0;
  tAmount = 0;
  netBill = 0;
  tItemDisc = 0;
  saleQty=0;
  retQty=0;
  totalInclSt=0;
  totalExclSt=0;
  totalSTAmt=0;
  AmountInclSt=0;
  subTotal: any;
  totalDisc = 0;
  newBID: any;
  bText: any;
  pmId:any;
  isPrint=false;
  totalBillNet=0;
  companyName = localStorage.getItem("branchName");
  companyAddress = localStorage.getItem("address");
  
  //#endregion
 
  units=[
    {
      'cid': 0,
    "measurementName": "",
    }
  ];
  isPurchase=true;
  isBiltyReq=false;
  partyArr = [];
  itemsArr = [];
  ST = [
    { pTypeId: 1, pType: 'Purchase' },
    { pTypeId: 2, pType: 'Return' },
  ];
 
  constructor(
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    public location:Location,
    public http: HttpClient,
  ) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
  // INITIALIZATION
  getAllLookups() {
     
    this._IS.getAllPurchases().subscribe((res) => {
      this.purchaseArr = res;
    });
    this._IS.getPartyLookup().subscribe((rep) => {
      this.partyArr = rep;
    });

    this._IS.getItemsLookups().subscribe((res) => {
      this.itemsArr = res;
      console.log(res)
    });
    this._IS.getGodownLookups().subscribe((res) => (this.goArr = res));
    this._IS.getUnitLookups().subscribe((res)=>this.units=res)
  }
  getPuchaseById(id: any) {
    this._IS.getPurchaseById(id).subscribe((res) => {
      this.purchasemain = res;
      this.pmId=id;
      if(this.purchasemain){
        this.getTotal();
        this.onBiltyExpChange()
      }
      
      this.eDate = res.eDate;
      let ddate = this.pipe.transform(this.purchasemain.eDate, 'yyyy-MM-dd');
      this.eDate = ddate;
      this.grossBill = this.purchasemain.gSale - this.purchasemain.sReturn;
      this.netBill =
        this.grossBill - (this.purchasemain.cashPay + this.purchasemain.discountUser);
    });
  }
  ngOnInit(): void {
    this.selected = 'Purchase';
    this.bnid = Number(localStorage.getItem('BNID'));
    this.ST[0].pType == 'Purchase';
    this.purchasesub.pTypeId = this.ST[0].pTypeId;
    this.purchasemain.eDate = new Date();
    let ddate = this.pipe.transform(this.purchasemain.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;

    this.pmid = Number(this.acroute.snapshot.params['pmid']);
    this.pmid ? this.getPuchaseById(this.pmid) : console.log('Not Data Found...');
    this.getAllLookups();
  }

  /*-------------------EVENT HANDLERS FOR LOOKUPS---------------------*/
  cashReceived(event: any) {
    event;
    let discountUser = Number(this.purchasemain.discountUser);
    let cashRece = this.purchasemain.cashPay;
    let tBill = this.purchasemain.gSale;
    let retBill = this.purchasemain.sReturn;
    let eve = tBill - cashRece;
    this.netBill =
      this.grossBill - (this.purchasemain.cashPay + this.purchasemain.discountUser);

    // =this.SMain.billAmount;
  }

 
  getUnits = (e: any) =>this._IS.getUnitByItemId(e).subscribe((data) => (this.unitArr = data));
  
  getLastItem=(e:any)=>{
    this._IS.getLastItem(e).subscribe((res) => {
      this.lpr = res[0].lpr;
      this.sBal = res[0].stockBal;
      this.iProfit = res[0].itemProfit;
      if (this.purchasesub.itemID == res[0].itemID) {
        this.profit.push(this.iProfit);
      }
      this.profit.forEach((e: any) => {
        this.billProfit += Number(e);
      });
      console.log(this.billProfit);
    });
  }
  
  changeItem(event: any) {
    this.purchasesub.barcode = event.barcode;
    this.purchasesub.itemID = event.itemID;
    this.purchasesub.itemDescription = event.itemDescription;
    this.purchasesub.purchaseRate=event.purchaseRate;
    const mObj:any =  this.units.find(e => e.cid === event.measureId);
    this.purchasesub.measureUnit = mObj.measurementName;
    this.purchasesub.measureId = mObj.cid;
    this.getLastItem(event.itemID);
    this.purchasesub.pktQty=1
    this.purchasesub.packet=1
    this.purchasesub.qty=this.purchasesub.pktQty*this.purchasesub.packet
    this.purchasesub.amount=this.purchasesub.qty*this.purchasesub.purchaseRate;
    this.purchasesub.saleTaxPercent=18;
    let tempTax=this.purchasesub.saleTaxPercent/100
    this.purchasesub.saleTaxAmount=this.purchasesub.amount*tempTax;
    this.AmountInclSt=this.purchasesub.amount+this.purchasesub.saleTaxAmount;
    this.totalBillNet=this.AmountInclSt;
  }
  onChangeRate(){
    this.purchasesub.qty=this.purchasesub.pktQty*this.purchasesub.packet
    this.purchasesub.amount=this.purchasesub.qty*this.purchasesub.purchaseRate;
    let tempTax=this.purchasesub.saleTaxPercent/100
    this.purchasesub.saleTaxAmount=this.purchasesub.amount*tempTax;
    this.AmountInclSt=this.purchasesub.amount+this.purchasesub.saleTaxAmount;
    this.totalBillNet=this.AmountInclSt;
  }
  onChageGodown(e: any) {
    this.purchasesub.n1 = e.cId;
    this.purchasesub.txt1 = e.goName;
  }
  StPartyChanged(event: any) {
    this.purchasemain.stPartyId = event.customerID;
  }
  changeParty = (event: any) => {
    this.purchasemain.sAccID = event.customerID;
    this.purchasemain.sAccName = event.customerName;
    this.payable = event.receivables;
    this.purchasemain.contactNo = event.whatsappno;
  };
  changeType = (event: any) => {
    let pType = event.target.value;
    if (pType == 'Purchase' || pType == '' || pType == undefined) {
      this.purchasesub.pTypeId = 1;
    } else {
      this.purchasesub.pTypeId = 2;
    }
  };
  editLine = (dbSub: IPurchaseDetail) => {
    this.purchasesub = dbSub;
    this.purchasesub.packet = dbSub.packet;
    this.purchasesub.qty = dbSub.qty;
    this.purchasesub.pktQty = dbSub.pktQty;
    this.delAmt = dbSub.amount;
    this.subType = dbSub.pTypeId;
    this.purchasesub.measureId = dbSub.measureId;
    this.getTotal();
    this.itemUnit = dbSub.measureUnit;
    this.getUnits(dbSub.itemID);
    let tempTax=dbSub.saleTaxPercent/100
    let tempAmt=dbSub.amount*tempTax
    this.AmountInclSt=dbSub.amount+dbSub.saleTaxAmount;
  };
 
  deleteLine = (psub: IPurchaseDetail) => {
    this.purchasemain.purchasesDetail = this.purchasemain.purchasesDetail.filter(
      (res) => res.sSid != psub.sSid
    );
    this.subType = psub.pTypeId;
    if (this.subType == 1) {
      this.delAmt = psub.amount;
    }
    if (this.subType == 2) {
      this.delRet = psub.amount;
    }
    this.getTotal();
  };
  // TOTAL BILLS FUNCTIONALITY  
  calculateQty(e:any) :void{
    this.purchasesub.qty=this.purchasesub.pktQty*this.purchasesub.packet;
    this.purchasesub.amount=this.purchasesub.qty*this.purchasesub.purchaseRate;
  }
  onChangeDiscountPer(){}
  onChangeDiscountRS(){}
  onChangeSTPercent(){
    let tempTax=this.purchasesub.saleTaxPercent/100
    let tempSt=this.purchasesub.amount*Number(tempTax);
    this.purchasesub.saleTaxAmount=Number(tempSt);
    this.AmountInclSt=this.purchasesub.amount+this.purchasesub.saleTaxAmount
  }


  getTotal():void {
    debugger
    this.subType = this.purchasesub.pTypeId;
    this.subQty = this.purchasesub.qty;
    this.subRate = this.purchasesub.purchaseRate;
    this.purAmt = 0;
    this.retAmt = 0;
    this.purAmt = 0;
    this.retAmt = 0;
    let saleAmt=0;
    this.saleQty=0;
    this.retQty=0;
    this.totalInclSt=0;
    this.totalExclSt=0;
    this.totalSTAmt=0;
    let stpAmount=0,strAmount=0
    for (let i = 0; i < this.purchasemain.purchasesDetail.length; i++) {
      if (this.purchasemain.purchasesDetail[i].pTypeId === 1) {
        this.purAmt += this.purchasemain.purchasesDetail[i].amount;
        this.saleQty+=Number(this.purchasemain.purchasesDetail[i].qty)
        stpAmount+=Number(this.purchasemain.purchasesDetail[i].saleTaxAmount)
        
      }

      //if(this.purchase.purchasesDetail[i].pTypeId===2){
      else {
        this.retAmt += this.purchasemain.purchasesDetail[i].amount;
        this.retQty+=Number(this.purchasemain.purchasesDetail[i].qty)
        strAmount+=Number(this.purchasemain.purchasesDetail[i].saleTaxAmount)
      }
    }
    this.totalSTAmt=stpAmount-strAmount
    this.purchasemain.gSale = this.purAmt;
    this.purchasemain.sReturn = this.retAmt;
    this.grossBill = this.purchasemain.gSale - this.purchasemain.sReturn;
    this.netBill =this.grossBill - (this.purchasemain.cashPay + this.purchasemain.discountUser);
    this.totalExclSt=this.grossBill;
    this.totalInclSt=this.totalExclSt+this.totalSTAmt;
    let grs=this.purchasemain.gSale-this.purchasemain.sReturn
    this.tAmount=this.totalSTAmt+grs;
    this.totalBillNet=this.AmountInclSt;
    console.log(`tamt=${this.tAmount}, gs=${grs}`)
  }




  /*SEARCH ITEM WITH BARCODE...*/

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      item.barcode.toLocaleLowerCase().indexOf(term) > -1 ||
      item.itemDescription.toLocaleLowerCase().indexOf(term) > -1
    );
  }

  getItemDiscount = () => {
    for (let a = 0; a > this.purchasemain.purchasesDetail.length; a++) {
      this.purchasemain.purchasesDetail[a].disPer;
    }
  };
  /*ADD OBJECT TO SALE SUB ARRAY...*/
  
  calculateDiscount(e:any){
     
    let disAmt=0;
    if(e.disPer){
      disAmt = (e.disPer * e.purchaseRate);
      disAmt=disAmt / 100;
      this.totalDisc=disAmt* e.qty;
    }
    let tempAmt = this.purchasesub.purchaseRate * this.purchasesub.qty
    this.purchasesub.amount =  tempAmt - this.totalDisc;
  }
  pLable='Purchase'
  onSelectType(){
    if(this.isPurchase){
      this.purchasesub.pTypeId=1;
      this.pLable='Purchase';
    } 
    else{
      this.purchasesub.pTypeId=2;
      this.pLable='Return';
    }
  }
  addLine(){
    debugger
    this.onBiltyExpChange()
 
       
      
      this.calculateDiscount(this.purchasesub);
      this.delRet = 0;
      this.delAmt = 0;
      this.purchasesub.strg = '0';
      

    this.purchasesub.pTypeId ?this.purchasesub.pTypeId :this.purchasesub.pTypeId = 1;
    this.purchasesub.pTypeId == 1 ? this.purchasesub.pType = 'Purchase': this.purchasesub.pType = 'Return';
    
    if (
      this.purchasesub.itemDescription &&
      this.purchasesub.itemID &&
      this.purchasesub.packet > 0 &&
      this.purchasesub.purchaseRate > 0
    ) {
      this.purchasesub.companyID = Number(localStorage.getItem('COMPANY_ID'));
      this.purchasesub.branchID = Number(localStorage.getItem('BRANCH_ID'));
      if (!this.purchasesub.sSid) {
        this.purchasesub.sSid = this.purchasemain.purchasesDetail.length + 1;
        this.purchasemain.purchasesDetail.push({ ...this.purchasesub });
        console.log('btn-purchase-addLine'+this.purchasesub)
        this.purchasesub = new IPurchaseDetail();
        this.getTotal();
        this.purchasesub.pTypeId = this.ST[0].pTypeId;
      } else {
        this.purchasemain.purchasesDetail.forEach((dbsub) => {
          if (dbsub.sSid == this.purchasesub.sSid) {
            dbsub = this.purchasesub;
            dbsub.itemID = this.purchasesub.itemID;
            dbsub.barcode = this.purchasesub.barcode;
            dbsub.itemDescription = this.purchasesub.itemDescription;
            dbsub.measureId = this.purchasesub.measureId;
            dbsub.measureUnit = this.purchasesub.measureUnit;
            dbsub.packet = this.purchasesub.packet;
            dbsub.pktQty = this.purchasesub.pktQty;
            dbsub.qty = this.purchasesub.qty;
            dbsub.strg = '0';
            dbsub.amount = this.purchasesub.amount;
            //dbsub.amount = this.amount;
            this.getTotal();
          }
        });
        this.purchasesub = new IPurchaseDetail();
        this.purchasesub.pTypeId = this.ST[0].pTypeId;
        this.AmountInclSt=0
      }
      this.AmountInclSt=0
    } else {
      alert('Please fill mandatory fields., Error Code: GRN-02');
    }
    this.ST[0].pType == 'Purchase';
   
  }

 
  goTo(select: any) {
    select.focus();
  }

  // MODAL


  /*SAVE BILL ON API LEVEL */
  Save() {
     ;
    this.purchasemain.gSale += this.purchasesub.amount;
    this.purchasemain.agentID = Number(localStorage.getItem('LOCAL_ID'));
    this.purchasemain.companyID = Number(localStorage.getItem('COMPANY_ID'));
    this.purchasemain.branchID = Number(localStorage.getItem('BRANCH_ID'));
    this.purchasemain.creditDays = 0;
    this.purchasesub.strg = '0';
    this.purchasemain.eDate = this.eDate;
    this.purchasemain.agentID=2 //for sale tax invoice

    if (this.purchasemain.sAccID) {
      this._IS.savePurchase(this.purchasemain).subscribe((res) => {
        
          if (res) {
            this.pmId=res;
            if(confirm(`Do you want to print Purchase Voucher # ${res}`))
            {
               
              this.onPrint();
            }
            else{
              this.purchasemain = new IPurchase();
              alert('New Purchase Has Been Saved Against ID# ' + res);
              this.route.navigate(['/inventory/purchase'])
            }
          }
         
        
        
        
      });
    } else {
      alert('Please Select A Party First!! Error Code: GRN-01');
    }
  }
  openFormModal() {
    this.formModal.show();
  }

  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
    if (this.pmid) {
      this.route.navigate(['/inventory/purchase']);
    } else {
      this.route.navigate(['/inventory/purchase']);
    }
  }

  getTag() {
     ;
    let val = (document as any).getElementById('num');
    let val2 = (document as any).getElementById('num1');
    let val3 = (document as any).getElementById('num2');
    let val4 = (document as any).getElementById('num3');
    if (val.value == '0') {
      val.value = '';
    } else {
      val.value;
    }
    if (val2.value == '0') {
      val2.value = '';
    } else {
      val2.value;
    }
    if (val3.value == '0') {
      val3.value = '';
    } else {
      val3.value;
    }
    if (val4.value == '0') {
      val4.value = '';
    } else {
      val4.value;
    }
  }

  onChangeUnit = (e: any) => {
     ;
    this.purchasesub.measureUnit = e.mUnit;
    this.purchasesub.measureId = e.unitId;
    this.purchasesub.purchaseRate = e.costRate;
    this.purchasesub.pktQty = e.pktQty;
  };

  back = () => this.route.navigate(['inventory/purchase']);
  home = () => this.route.navigate(['admin/dashboard']);

  printVoucher(){
    debugger
    this.isPrint=true;
    
  }
  backToInvoice(){
   this.isPrint=false
    
  }
  onBiltyExpChange(){
    this.totalBillNet=this.totalInclSt+ Number(this.purchasemain.biltyExp)
  }
  onPrint():void{
    debugger
    let content='';
    content=`
    <html>
      <head>
        <title>Purchase View - ${this.purchasemain.pMid}</title>
        <style>
          /* Add your custom styles here */
          body {
            font-family: Arial, sans-serif;
            font-size: 18px;
            margin-top:25px;
          }
          .print-container {
           /* width: 8.27in; 210mm converted to inches */
           /*height: 11.69in; 297mm converted to inches */
            margin: 20px auto; /* Center the div on the page */
            font-size:18px;
            margin-top: 40px;
          }
          .container-fluid {
            margin: 10px;
         
          }
          .nav-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          h1 {
            text-align: center;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
          .empty-cell {
            background-color: #ffffff;
          }
          /* Add more styles as needed */
        </style>
      </head>
      <body>
        <div class="print-container" style="margin-top: 40px!important;">
          <h1 style="margin-top: 35px;">${this.companyName}</h1>
          <small>${this.companyAddress}</small>
          <br>
        
      
          <div class="nav-row" style="margin-top:10px">
          <table class="main-table" style="width:100%; 
          border:0px solid #fff!important; padding:0px!important;">
          <tr>
          <td style="width:10%;border:0px solid #fff!important;">Date:</td>
          <td style="border:0px solid #fff!important;">${this.eDate}</td>
          <td style="width:10%;text-align:last;border:0px solid #fff!important;">Invoice No:</td>
          <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.purchasemain.billNo ?? this.purchasemain.pMid}</td>
          </tr>
          
          <tr>
          <td style="width:10%;border:0px solid #fff!important;">Customer:</td>
          <td style="border:0px solid #fff!important;">${this.purchasemain.sAccName}</td>
          <td style="width:10%;text-align:right;border:0px solid #fff!important;"></td>
          <td  style="width:10%;text-align:right;border:0px solid #fff!important;"></td>
          </tr>
          
          </table>
            
          </div>
          
      
          <!-- Your report content here -->
          <table class="data-table">
          <thead>
          <tr >
          <th style="width:40%">Item Name</th>
          <th style="text-align: center;width:10%">Qty</th>
          <th style="text-align: left;width:10%">Rate</th>
          <th style="text-align: left;width:10%">Amount</th>
          <th style="text-align: left;width:10%">ST %</th>
          <th style="text-align: left;width:10%">ST Amount</th>
          <th style="text-align: left;width:10%">Amount Incl. St</th>
          <tr>
          </thead>
            <tbody>`;

  for (let a of this.purchasemain.purchasesDetail) {
    content += `
      <tr>
      <td  style="width:40%">${a.itemDescription}</td>
      <td  style="width:10%">${a.qty}</td>
      <td style="text-align: left;width:10%">${a.purchaseRate}</td>
      <td style="text-align: left;width:10%">${a.amount}</td>
      <td style="text-align: left;width:10%">${a.saleTaxPercent}</td>
      <td style="text-align: left;width:10%">${a.saleTaxAmount}</td>
      <td style="text-align: left;width:10%">${a.saleTaxAmount+a.amount}</td>
    
      </tr>`;
  }

  content += `
          </tbody>
         <tfoot>
        <tr>
          <td><b>Total</b></td>
          <td>${this.saleQty-this.retQty}</td>
          
          <td></td>
          <td>${this.purchasemain.gSale-this.purchasemain.sReturn}</td>
          <td></td>
          <td>${this.totalSTAmt}</td>
          <td>${this.totalInclSt}</td>
        </tr>
      </tfoot>
          
        </table>

      </div>
      <table  style="width:100%; 
          border:0px solid #fff!important; padding:0px!important;">      
      <tr>
        <td style="width:75%;border:0px solid #fff!important;"></td>
        <td style="width:25%;border:0px solid #fff!important; text-align:right"> <p>Total Amount : <u>${this.purchasemain.gSale-this.purchasemain.sReturn}</u></p>
        </td>
        </tr>
        
        <tr>
        <td style="width:75%;border:0px solid #fff!important;"></td>
        <td style="width:25%;border:0px solid #fff!important; text-align:right"><p>Total Return Amount : <u>${this.purchasemain.sReturn??0}</u></p>
        </td>
        </tr>
        </tr>
        <tr>
        <td style="width:75%;border:0px solid #fff!important;"></td>
        <td style="width:25%;border:0px solid #fff!important; text-align:right">  <p>Exclude ST Amount : <u>${this.purchasemain.gSale-this.purchasemain.sReturn}</u></p>
        </td>
        </tr>
        </tr>
        <tr>
        <td style="width:75% ;border:0px solid #fff!important;"></td>
        <td style="width:25%; border:0px solid #fff!important; text-align:right"><p>Sale Tax : <u>${this.totalSTAmt??0}</u></p>
        </td>
        </tr>
        </tr>
        <tr>
        <td style="width:75%; border:0px solid #fff!important;"></td>
        <td style="width:25%; border:0px solid #fff!important;; text-align:right">   <p>Amount Include ST : <u>${this.totalInclSt}</u></p>
        </td>
        </tr>
        </tr>
         <tr>
        <td style="width:75%; border:0px solid #fff!important;"></td>
        <td style="width:25%; border:0px solid #fff!important;; text-align:right">   <p>Net Bill : <u>${this.totalInclSt}</u></p>
        </td>
        </tr>
        </tr>
      </table>
    </body>
  </html>`
    // document.getElementById('print')?.innerHTML;
    let popupWin: any = window.open(
      '',
      'my_print',
      'top=0,left=0,height: 842px;width: 595px;'
    );
    popupWin.document.write(`
    <html>
    <head>
    <title></title>
    <style>
    body
    {
      text-align:center;
      margin-top:7.5pt;
      font-size:18pt
    }
    
    @media print {
      
      body{
        margin-top:14pt;
      
      }
      .page-break { display: block; page-break-before: always; }
      #print
      {
        margin-top:12pt;
        margin-bottom:12pt;
        font-weight:800;
      }
      #print p{
        font-size: 18pt;
      }
       #h2
      {
        font-size:18pt;
        font-weight:600;
        padding:4pt;
      }
  
  }
      
  .label
  {
    text-align:center;
  }
    </style>
    </head>
    <body>
    
    ${content}
    </body>
    </html>
    `);
    popupWin.print();
    // popupWin.close();
  }
  generatePDF() :any{
    const documentDefinition = {
      content: [
        {
          text: `Purchase View - ${this.purchasemain.pMid}`,
          style: 'header'
        },
        {
          text: `${this.companyName}\n${this.companyAddress}`,
          style: 'subheader'
        },
        {
          table: {
            body: [
              ['Date:', `${this.eDate}`],
              ['Invoice No:', `${this.purchasemain.billNo ?? this.purchasemain.pMid}`],
              ['Customer:', `${this.purchasemain.sAccName}`]
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            headerRows: 1,
            body: [
              ['Item Name', 'Qty', 'Rate', 'Amount', 'ST %', 'ST Amount', 'Amount Incl. St'],
              ...this.purchasemain.purchasesDetail.map(a => [
                a.itemDescription,
                a.qty,
                a.purchaseRate,
                a.amount,
                a.saleTaxPercent,
                a.saleTaxAmount,
                a.saleTaxAmount + a.amount
              ]),
              [
                { text: 'Total', bold: true },
                this.saleQty - this.retQty,
                '',
                this.purchasemain.gSale - this.purchasemain.sReturn,
                '',
                this.totalSTAmt,
                this.totalInclSt
              ]
            ]
          }
        },
        {
          text: `Total Amount: ${this.purchasemain.gSale - this.purchasemain.sReturn}\n` +
                `Total Return Amount: ${this.purchasemain.sReturn ?? 0}\n` +
                `Exclude ST Amount: ${this.purchasemain.gSale - this.purchasemain.sReturn}\n` +
                `Sale Tax: ${this.totalSTAmt ?? 0}\n` +
                `Amount Include ST: ${this.totalInclSt}\n` +
                `Net Bill: ${this.totalInclSt}`,
          style: 'summary'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, margin: [0, 0, 0, 10] },
        summary: { fontSize: 12, margin: [0, 20, 0, 0] }
      }
    };
  debugger
  return documentDefinition;
  }
  async uploadPDF(blob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('file', blob, 'document.pdf');
    const pdfKey = environment.pdfMakeKey; // Ensure this is defined in your environment file
    const uploadUrl = 'https://api.pdfrest.com/upload'; // Replace with the correct URL if different
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Api-Key': pdfKey, // Include your API key in the headers
      },
      body: formData
    });
  
    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
   
    const result = await response.json();
    const url = `https://api.pdfrest.com/resource/${result.files[0].id}?format=file`
    return url; 
  }
async shareOnWhatsApp() {
    try {

debugger
      window.close();
    } catch (error) {
      console.error('Error sharing PDF on WhatsApp:', error);
    }
  }
  
}
