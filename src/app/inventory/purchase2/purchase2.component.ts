import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { IPurchase, IPurchaseDetail } from 'src/app/shared/interface/IPurchase';
import { ToastrService } from 'ngx-toastr';
import { IPurchaseInvoice } from 'src/app/shared/interface/IPurchaseInvoice';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';
import { error } from 'console';
import { internal } from 'src/app/shared/interface/internal-standard';

@Component({
  selector: 'app-purchase2',
  templateUrl: './purchase2.component.html',
  styleUrls: ['./purchase2.component.scss'],
})
export class Purchase2Component implements OnInit {
  purchase = new IPurchase();
  isPrint:boolean= false;
  totalAmount = 0;
  totalQtyPurchased = 0;
  totalReturnedQty = 0;
  totalReturnedAmount = 0;
  netAmount = 0;
  eDate: any;
  grossBill = 0;
  saleManArr:any[]=[];
  units = [
    {
      cid: 0,
      measurementName: '',
    },
  ];
  partyArr = [];
  itemsArr = [];
  goArr = [];
  purchaseArr = [];
  ST = [
    { pTypeId: 1, pType: 'Purchase' },
    { pTypeId: 2, pType: 'Return' },
  ];
  selected: any;
  _pSub = new IPurchaseDetail();
  bnid: any;
  pmid = 0;
  unitArr: any;
  uId = 0;
  itemUnit: any;
  lpr: any;
  sBal: any;
  iProfit: any;
  profit: any = [];
  billProfit: number = 0;
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
  constructor(
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    public location: Location,
    public sharedService: SharedService
  ) {}
  printVoucher(){}
  getSaleMan(){
    this._IS.getSaleMan().subscribe(res=>this.saleManArr=res)
  }
  getAllLookups() {
     
    this._IS.getAllPurchases().subscribe((res) => {
      this.purchaseArr = res;
    });
    this._IS.getPartyLookup().subscribe((rep) => {
      this.partyArr = rep;
    });

    this._IS.getItemsLookups().subscribe((res) => {
      this.itemsArr = res;
      console.log(res);
    });
    this._IS.getGodownLookups().subscribe((res) => {
      this.goArr = res;
      this._pSub.n2=this.goArr[0].cId;
      this._pSub.txt3=this.goArr[0].goName;
    }
    );
    this._IS.getUnitLookups().subscribe((res) => (this.units = res));
  }
  getPuchaseById(id: any) {
    this._IS.getPurchaseById(id).subscribe((res) => {
      this.purchase = res;
      this.eDate = res.eDate;
      let ddate = this.pipe.transform(this.purchase.eDate, 'yyyy-MM-dd');
      this.eDate = ddate;
      console.log(res);
      this.grossBill = this.purchase.gSale - this.purchase.sReturn;
      this.netAmount =
        this.grossBill - (this.purchase.cashPay + this.purchase.discountUser);
    });
  }
  branchName=internal.branchName
  ngOnInit(): void {
    this.selected = 'Purchase';
    this.bnid = Number(localStorage.getItem('BNID'));
    this.ST[0].pType == 'Purchase';
    this._pSub.pTypeId = this.ST[0].pTypeId;
    this.purchase.eDate = new Date();
    let ddate = this.pipe.transform(this.purchase.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;

    this.pmid = Number(this.acroute.snapshot.params['pmId']);
    this.pmid
      ? this.getPuchaseById(this.pmid)
      : console.log('Not Data Found...');
    this.getAllLookups();
    this.getSaleMan();
  }
  getUnits = (e: any) =>
    this._IS.getUnitByItemId(e).subscribe((data) => (this.unitArr = data));
  getLastItem = (e: any) => {
    this._IS.getLastItem(e).subscribe((res) => {
      this.lpr = res[0].lpr;
      this.sBal = res[0].stockBal;
      this.iProfit = res[0].itemProfit;
      if (this._pSub.itemID == res[0].itemID) {
        this.profit.push(this.iProfit);
      }
      this.profit.forEach((e: any) => {
        this.billProfit += Number(e);
      });
      console.log(this.billProfit);
    });
  };

  changeItem(event: any) {
    this._pSub.barcode = event.barcode;
    this._pSub.itemID = event.itemID;
    this._pSub.itemDescription = event.itemDescription;
    this._pSub.purchaseRate = event.purchaseRate;
    const mObj: any = this.units.find((e) => e.cid === event.measureId);
    this._pSub.measureUnit = mObj.measurementName;
    this._pSub.measureId = mObj.cid;
    this.getLastItem(event.itemID);
  }

  onChageGodown(e: any) {
    
    this._pSub.n2 = +e.cId;
    this._pSub.txt3 = e.goName;
    
  }

  payable = 0;
  changeParty = (event: any) => {
    this.purchase.sAccID = event.customerID;
    this.purchase.sAccName = event.customerName;
    this.payable = event.receivables;
    this.purchase.contactNo = event.whatsappno;
  };
  changeType = (event: any) => {
    let pType = event.target.value;
    if (pType == 'Purchase' || pType == '' || pType == undefined) {
      this._pSub.pTypeId = 1;
    } else {
      this._pSub.pTypeId = 2;
    }
  };
  editLine = (dbSub: IPurchaseDetail) => {
     debugger
    this._pSub = dbSub;
    this._pSub.pktQty = dbSub.pktQty;
    this._pSub.packet = dbSub.packet;
    this._pSub.qty = dbSub.qty;
    this._pSub.n2 = dbSub.n2;
    this._pSub.txt3 = dbSub.txt3;
    this.delAmt = dbSub.amount;
  
    this.subType = dbSub.pTypeId;
    this._pSub.measureId = dbSub.measureId;
    this.getTotal();
    this.itemUnit = dbSub.measureUnit;
    this.getUnits(dbSub.itemID);
  };
  delAmt = 0;
  delRet = 0;
  DeleteLine = (psub: IPurchaseDetail) => {
    this.purchase.purchasesDetail = this.purchase.purchasesDetail.filter(
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
  getTotal() {
    this.subType = this._pSub.pTypeId;
    this.subQty = this._pSub.qty;
    this.subRate = this._pSub.purchaseRate;
    this.purAmt = 0;
    this.retAmt = 0;
    for (let i = 0; i < this.purchase.purchasesDetail.length; i++) {
      if (this.purchase.purchasesDetail[i].pTypeId === 1) {
        this.purAmt += this.purchase.purchasesDetail[i].amount;
      } else {
        this.retAmt += this.purchase.purchasesDetail[i].amount;
      }
    }
    this.purchase.gSale = this.purAmt;
    this.purchase.sReturn = this.retAmt;
    this.grossBill = this.purchase.gSale - this.purchase.sReturn;
    this.netBill =
      this.grossBill - (this.purchase.cashPay + this.purchase.discountUser);
  }
  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      item.barcode.toLocaleLowerCase().indexOf(term) > -1 ||
      item.itemDescription.toLocaleLowerCase().indexOf(term) > -1
    );
  }
  disper2: Number;
  disRs:number;
  Amt(e:any){
    this.disper2=0 ;
    debugger
    this._pSub.qty=this._pSub.pktQty*this._pSub.packet
   this._pSub.amount=this._pSub.qty*(this._pSub.purchaseRate-(((this._pSub.purchaseRate*this._pSub.disPer)/100)+(this._pSub.disRS)))
   
  
  }
  
  getItemDiscount = () => {
    for (let a = 0; a > this.purchase.purchasesDetail.length; a++) {
      this.purchase.purchasesDetail[a].disPer;
    }
  };
  subTotal: any;
  totalDisc = 0;
  calculateDiscount(e: any) {
     
    let disAmt = 0;
    if (e.disPer) {
      disAmt = e.disPer * e.purchaseRate;
      disAmt = disAmt / 100;
      this.totalDisc = disAmt * e.qty;
    }
    let tempAmt = this._pSub.purchaseRate * this._pSub.packet;
    this._pSub.amount = tempAmt - this.totalDisc;
  }
  onChangeSaleMan(e:any){
    console.log(e)
    this.purchase.agentID=e.sAccId;
  }
  cashReceived(event: any) {
    event;
    let discountUser = Number(this.purchase.discountUser);
    let cashRece = this.purchase.cashPay;
    let tBill = this.purchase.gSale;
    let retBill = this.purchase.sReturn;
    let eve = tBill - cashRece;
    this.netBill =
      this.grossBill - (this.purchase.cashPay + this.purchase.discountUser);
  }
  addLine() {
  debugger
    // this._pSub.packet = this._pSub.qty;
    // this.calculateDiscount(this._pSub);
    this.delRet = 0;
    this.delAmt = 0;
    this._pSub.strg = '0';
    this._pSub.pTypeId ? this._pSub.pTypeId : (this._pSub.pTypeId = 1);
    this._pSub.pTypeId == 1
      ? (this._pSub.pType = 'Purchase')
      : (this._pSub.pType = 'Return');

    if (
      this._pSub.itemDescription &&
      this._pSub.itemID &&
      this._pSub.packet > 0 &&
      this._pSub.purchaseRate > 0
    ) {
      this._pSub.companyID = Number(localStorage.getItem('COMPANY_ID'));
      this._pSub.branchID = Number(localStorage.getItem('BRANCH_ID'));
      if (!this._pSub.sSid) {
        this._pSub.sSid = this.purchase.purchasesDetail.length + 1;
        this.purchase.purchasesDetail.push({ ...this._pSub });
        this._pSub = new IPurchaseDetail();
        this.getTotal();
        this._pSub.pTypeId = this.ST[0].pTypeId;
      } else {
        this.purchase.purchasesDetail.forEach((dbsub) => {
          if (dbsub.sSid == this._pSub.sSid) {
            dbsub = this._pSub;
            dbsub.itemID = this._pSub.itemID;
            dbsub.barcode = this._pSub.barcode;
            dbsub.itemDescription = this._pSub.itemDescription;
            dbsub.measureId = this._pSub.measureId;
            dbsub.measureUnit = this._pSub.measureUnit;
            dbsub.packet = this._pSub.packet;
            dbsub.pktQty = this._pSub.pktQty;
            dbsub.qty = this._pSub.qty;
            dbsub.strg = '0';
            dbsub.amount = this._pSub.amount;
            //dbsub.amount = this.amount;
            this.getTotal();
          }
        });
        this._pSub = new IPurchaseDetail();
        this._pSub.pTypeId = this.ST[0].pTypeId;
      }
    } else {
      alert('Please fill mandatory fields. Error Code: GRN-02');
    }
    this.ST[0].pType == 'Purchase';
  }
  Save() {
     
    this.purchase.gSale += this._pSub.amount;
    //  this.netBill=this.tbAmt-(this.purchase.cashPay+this.purchase.sReturn+this.purchase.discountUser);
    this.purchase.agentID = Number(localStorage.getItem('LOCAL_ID'));
    this.purchase.companyID = Number(localStorage.getItem('COMPANY_ID'));
    this.purchase.branchID = Number(localStorage.getItem('BRANCH_ID'));
    this.purchase.creditDays = 0;
    this._pSub.strg = '0';

    this.purchase.eDate = this.eDate;
    console.log(this.purchase)
    this._IS.savePurchase(this.purchase).subscribe(res=>{alert(res), error=>alert(error), this.purchase= new IPurchase()})
    // if (this.purchase.sAccID) {
    //   this._IS.savePurchase(this.purchase).subscribe((res) => {
    //     if (this.purchase.sAccID == 0 || this.purchase.sAccID == undefined) {
    //       if (Number(res > 0)) {
    //         this.purchase = new IPurchase();
    //         alert('New Purchase Has Been Saved Against ID# ' + res);
    //       }
    //       if (Number(res > 0)) {
    //         this.purchase = new IPurchase();
    //         if (!this.purchase) {
    //           this._IS.savePurchase(this.purchase).subscribe((res) => {
    //             if (Number(res > 0)) {
    //               this.purchase = new IPurchase();
    //               alert('New Purchase Has Been Saved Against ID# ' + res);
    //             } else {
    //               alert('Insert Failed');
    //             }
    //           });
    //         }
    //       }
    //     }
    //     alert('New Purchase Has Been Saved Against ID# ' + res);
    //     this.route.navigate(['/inventory/purchase']);
    //   });
    // } else {
    //   alert('Please Select A Party First!! , Error Code: GRN-01');
    // }
  }
  
}
