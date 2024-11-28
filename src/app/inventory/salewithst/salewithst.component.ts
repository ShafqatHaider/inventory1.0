import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { DatePipe, Location } from '@angular/common';
import { UsermanagmentService } from 'src/app/userManagement/usermanagment.service';
import { INewSale, INewSaleDatail } from 'src/app/shared/interface/INewSale';
import { ToastrService } from 'ngx-toastr';
import { internal } from 'src/app/shared/interface/internal-standard';

@Component({
  selector: 'app-salewithst',
  templateUrl: './salewithst.component.html',
  styleUrls: ['./salewithst.component.scss'],
})
export class SalewithstComponent implements OnInit {
  @ViewChild('bilty') inputName: any;
  @ViewChild('select') searchElement: ElementRef | any;
  // VERIABLE DECLARATION
  //#region
  branchName=internal.branchName
  SSubs = new Array<INewSaleDatail>();
  sParty = [];
  sItems = [];
  itemUnit = '';
  ddate: any;
  formModal: any;
  eDate: any;
  cId: any;
  sum = 0;
  retSum = 0;
  TotalBillAmount = 0;
  bnid: any;
  selectedSaleman: any;
  creditLimit: number = 0;
  receiveable: number = 0;
  contactNo: string = '';
  sAccName: any;
  sAccID: any;
  selectAcc: any;
  saleman: any = [];
  goArr: any;
  unitArr: any;
  grossBill: any;
  uId = 0;
  lsr: any;
  sBal: any;
  iProfit: any;
  billProfit: number = 0;
  profit: any = [];
  slt = '';
  stId: any;
  purAmt = 0;
  retAmt = 0;
  netBill = 0;
  bProfit: any;
  isPrint = false;
  companyName = localStorage.getItem('BRANCH_NAME');
  companyAddress = localStorage.getItem('address');
  itemProfit: number = 0;
  totalDisc: any;
  isBiltyReq = false;
  saleQty = 0;
  retQty = 0;
  totalInclSt = 0;
  totalExclSt = 0;
  totalSTAmt = 0;
  shopNo = 1;
  viewID: number = 0;
  cashRece = 0;
  smId:any;
  //#endregion

  SMain = new INewSale();
  ssmain = new Array<INewSale>();
  SSub = new INewSaleDatail();

  saleTo = [
    {
      id: 1,
      saleto: 'Shop',
    },
    {
      id: 2,
      saleto: 'Party',
    },
  ];
  // SALE TYPE OBJECT
  ST = [
    { saleType: 1, sType: 'Sale' },
    { saleType: 2, sType: 'Return' },
  ];
  units = [
    {
      cid: 0,
      measurementName: '',
    },
  ];
  // CONSTRUCTOR

  constructor(
    public acroute: ActivatedRoute,
    public _IS: InventoryService,
    public route: Router,
  
    public pipe: DatePipe,
    public location: Location
  ) {}

  // NG_ON_INIT
  getAllLookups() {
    this._IS.getSalesLookups().subscribe((res) => (this.ssmain = res));
    this._IS.getSaleMan().subscribe((res) => {
      this.saleman = res;
      // this.selectedSaleman = this.saleman[0].sAccId;
      this.SMain.agentID = this.selectedSaleman;
    });
    this._IS.getPartyLookup().subscribe((rep) => {
      this.sParty = rep;
      this.selectAcc = this.sParty.find((elem: any) => elem.customerID == 2);
      this.sAccID = this.selectAcc.customerID;
      this.sAccName = this.selectAcc.customerName;
    });

    this._IS.getItemsLookup().subscribe((ret) => {
      this.sItems = ret;
      console.log(ret);
    });
    this._IS.getGodownLookups().subscribe((res) => {
      this.goArr = res;
      this.SSub.n2 = res[0].cId;
    });

    this._IS.getUnitLookups().subscribe((res) => (this.units = res));
  }
  getSaleById(id: any) {
     
    let smid = Number(id);
    this._IS.getSalesById(smid).subscribe((res) => {
       
      
      this.SMain = res;
      this.smId=id;
      if(this.SMain){
        this.getTotal();
      
      }
       
      this.selectAcc.customerID = this.SMain.sAccID;
      this.selectAcc.customerName = this.SMain.sAccName;
      this.billProfit = this.SMain.billProfit;
      this.cashRece = res.cashRece;
      this.SMain.gSale = Math.round(res.gSale);
      this.netBill = Math.round(res.billAmount);
      this.SSub = res[0].salesDetail;
      const dd = this.pipe.transform(res.eDate, 'yyyy-MM-dd'); //+'T00:00:00.000Z' ;
      this.eDate = dd;

      this.SSub.saleType == 1
        ? (this.SSub.sType = this.ST[0].sType)
        : (this.SSub.sType = this.ST[1].sType);

      this.TotalBillAmount = Math.floor(this.SMain.billAmount);
      if (this.SMain.sMid == 0) {
        this.SMain.sAccID = this.sAccID;
        this.SMain.sAccName = this.sAccName;
      } else {
        this.sAccID = this.SMain.sAccID;
        this.sAccName = this.SMain.sAccName;
      }
      this.SMain.sAccID = this.sAccID;
      this.SMain.sAccName = this.sAccName;
      this.selectAcc.customerName = this.sAccName;
    });
    this.grossBill = this.SMain.gSale - this.SMain.sReturn;
    this.netBill =
      this.grossBill - (this.SMain.cashRece + this.SMain.discountUser);
  }
  lots: any[] = [];
  getLotLookups = (itemId: any) =>
    itemId
      ? this._IS.getLotLookups(itemId).subscribe((res) => (this.lots = res))
      : console.log('Not Found');

  ngOnInit() {
     
    this.bnid = Number(localStorage.getItem('BNID'));
    if (this.bnid == 4) {
      this.SMain.sAccID = 2;
    }
    this.SSub.saleType = this.ST[0].saleType;
    let ddate = this.pipe.transform(this.SMain.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;
    /*GET BILL BY SMID*/
    let id = this.acroute.snapshot.params['smId'];
    id ? this.getSaleById(id) : console.log('Not Data Found');
    /*GET ALL LOOKUPS*/
    this.getAllLookups();
  }
  /*------------------ ALL EVENTS FUNCTIONS---------------------*/
  onChangeUnit = (e: any) => {
    this.SSub.measureUnit = e.mUnit;
    this.SSub.measureId = e.unitId;
    !this.SSub.rate ? (this.SSub.rate = e.saleRate) : this.SSub.rate;
    this.SSub.pktQty = e.pktQty;
  };

  onChageGodown = (e: any) => {
    this.SSub.n2 = e.cId;
    this.SSub.txt2 = e.goName;
  };
  changeSaleMan = (event: any) =>
    !event
      ? (this.SMain.n2 = this.saleman[0].sAccId)
      : (this.SMain.agentID = event.sAccId);

  getTag() {
    let val = (document as any).getElementById('num');
    let val2 = (document as any).getElementById('num1');
    let val3 = (document as any).getElementById('num2');
    let val4 = (document as any).getElementById('num3');
    val.value == '0' ? (val.value = '') : val.value;
    val2.value == '0' ? (val2.value = '') : val2.value;
    val3.value == '0' ? (val3.value = '') : val3.value;
    val4.value == '0' ? (val4.value = '') : val4.value;
  }

  cashReceived(event: any) {
     
    event;
    let discountUser = Number(this.SMain.discountUser);
    let cashRece = Number(this.cashRece);
    this.SMain.cashRece = cashRece;
    let tBill = Math.round(this.SMain.gSale);
    let retBill = this.SMain.sReturn;
    let eve = tBill - cashRece;
    this.netBill = eve - retBill - discountUser;
    this.SMain.billAmount = Math.floor(this.netBill);
    this.netBill =
      this.grossBill - (this.SMain.cashRece + this.SMain.discountUser);
    console.log(this.netBill);
  }

  CustomerChanged(event: any) {
    this.SMain.sAccID = event.customerID;
    this.SMain.sAccName = event.customerName;
    this.creditLimit = event.creditLimit;
    this.receiveable = event.receivables;
    this.contactNo = event.whatsappno;
  }
  StPartyChanged(event: any) {
    this.SMain.stPartyId = event.customerID ?? 0;
  }

  changeItem(event: any) {
    this.SSub.barcode = event.barcode;
    this.SSub.itemID = event.itemID;
    this.SSub.itemDescription = event.itemDescription;
    this.SSub.rate = event.saleRate;
    const mObj: any = this.units.find((e) => e.cid === event.measureId);
    this.SSub.measureUnit = mObj.measurementName;
    this.SSub.measureId = mObj.cid;
    this.getLastItem(event.itemID);
    this.SSub.pktQty = 1;
    this.SSub.packet = 1;
    this.SSub.qty = this.SSub.pktQty * this.SSub.packet;
    this.SSub.amount = this.SSub.qty * this.SSub.rate;
    this.SSub.saleTaxPercent = 18;
    let tempTax = this.SSub.saleTaxPercent / 100;
    this.SSub.saleTaxAmount = this.SSub.amount * tempTax;
    debugger
    this.AmountInclSt = this.SSub.amount + this.SSub.saleTaxAmount;
  }

  stChooseItem(event: any) {
    this.SSub.itemID = event.itemId;
  }
  changeType(event: any) {
    let sType = event.target.value;
    if (sType == 'Sale' || sType == '' || sType == undefined) {
      this.SSub.saleType = 1;
      this.SSub.sType = 'Sale';
    } else {
      this.SSub.saleType = 2;
      this.SSub.sType = 'Return';
    }
  }

  getUnits = (e: any) =>
    this._IS.getUnitByItemId(e).subscribe((data) => {
      this.unitArr = data;
      this.SSub.measureId = data[0].unitId;
    });
  getLastItem = (e: any) => {
    this._IS.getLastItems(e).subscribe((res) => {
      this.lsr = res[0].lsr;
       
      this.sBal = res[0].stockBal;
      this.iProfit = res[0].itemProfit;
    });
  };
  itemChanged(event: any) {
     
    this.SSub.barcode = event.barcode;
    this.SSub.itemID = event.itemID;
    this.SSub.itemDescription = event.itemDescription;
    this.SSub.rate = event.saleRate;
    const mObj: any = this.units.find((e) => e.cid === event.measureId);
    this.SSub.measureUnit = mObj.measurementName;
    this.SSub.measureId = mObj.cid;
    this.getLastItem(event.itemID);
  }
  isPurchase = true;
  pLable = 'Sale';
  onSelectType() {
    if (this.isPurchase) {
      this.SSub.saleType = 1;
      this.SSub.sType = 'Sale';
      this.pLable = 'Sale';
    } else {
      this.SSub.saleType = 2;
      this.SSub.sType = 'Return';
      this.pLable = 'Return';
    }
  }
  onChangeRate() {
    this.SSub.qty = this.SSub.pktQty * this.SSub.packet;
    this.SSub.amount = this.SSub.qty * this.SSub.rate;
    let tempTax = this.SSub.saleTaxPercent / 100;
    this.SSub.saleTaxAmount = this.SSub.amount * tempTax;
    this.AmountInclSt = this.SSub.amount + this.SSub.saleTaxAmount;
  }

  onChangeSTPercent() {
    let tempTax = this.SSub.saleTaxPercent / 100;
    let tempSt = this.SSub.amount * Number(tempTax);
    this.SSub.saleTaxAmount = Number(tempSt);
    this.AmountInclSt = this.SSub.amount + this.SSub.saleTaxAmount;
  }
  onChangeDiscountRS() {}
  onChangeDiscountPer() {}

  AmountInclSt = 0;
  calculateQty(e: any): void {
    this.SSub.qty = this.SSub.pktQty * this.SSub.packet;
    this.SSub.amount = this.SSub.qty * this.SSub.rate;
  }

  getTotal(): void {
    this.purAmt = 0;
    this.retAmt = 0;
    let saleAmt = 0;
    this.saleQty = 0;
    this.retQty = 0;
    this.totalInclSt = 0;
    this.totalExclSt = 0;
    this.totalSTAmt = 0;
    let rtSaleTax=0;
    let saleTax=0;
    debugger
    for (let i = 0; i < this.SMain.salesDetail.length; i++) {
      if (this.SMain.salesDetail[i].saleType === 1) {
         
        saleAmt += Number(this.SMain.salesDetail[i].amount);
        this.saleQty += Number(this.SMain.salesDetail[i].qty);
        saleTax += Number(this.SMain.salesDetail[i].saleTaxPercent);
       
      } else {
        this.retAmt += this.SMain.salesDetail[i].amount;
        this.retQty += Number(this.SMain.salesDetail[i].qty);
        rtSaleTax+= Number(this.SMain.salesDetail[i].saleTaxPercent)
      }
    }
debugger
this.SMain.gSale +=saleAmt;
this.SMain.gSale +=this.retAmt;
    let netTax=saleTax- rtSaleTax
    let netbill= saleAmt-this.retAmt + (netTax)
   
    // this.SMain.gSale = Math.round(saleAmt);
    this.SMain.sReturn = this.retAmt;
    this.netBill = Math.round(
      this.SMain.gSale -
        (this.SMain.sReturn + this.SMain.cashRece + this.SMain.discountUser)
    );
    this.SMain.billAmount = Math.round(this.netBill);
    this.totalSTAmt =saleTax-rtSaleTax;
    this.totalExclSt = this.SMain.gSale - this.SMain.sReturn;
    debugger
    this.totalInclSt = this.totalExclSt + this.totalSTAmt;
    this.grossBill = saleAmt - this.SMain.sReturn+this.totalInclSt;
    this.netBill =  netbill - (this.SMain.cashRece + this.SMain.discountUser);
    // this.SMain.gSale=this.netBill;
    
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      item.barcode.toLocaleLowerCase().indexOf(term) > -1 ||
      item.itemDescription.toLocaleLowerCase().indexOf(term) > -1
    );
  }

  /*ADD OBJECT TO SALE SUB ARRAY...*/
  calculateDiscount(e: any): void {
    this.totalDisc = 0;
    let disAmt = 0;
    if (e.disPer) {
      disAmt = e.disPer * e.rate;
      disAmt = disAmt / 100;
      this.totalDisc = disAmt * e.qty;
    }
    let tempAmt = this.SSub.rate * this.SSub.packet;
     
    this.SSub.amount = tempAmt - this.totalDisc;
  }
  addLine(): void {
    
      this.SSub.packet = this.SSub.qty; //* this.SSub.pktQty;

      this.SSub.saleType ? this.SSub.saleType : (this.SSub.saleType = 1);

      this.calculateDiscount(this.SSub);
      this.SSub.saleType == 1
        ? (this.SSub.sType = 'Sale')
        : (this.SSub.sType = 'Return');

      this.netBill =
        this.SMain.gSale - (this.SMain.sReturn + this.SMain.discountUser);
      this.SSub.strg = '0';

      if (this.SSub.itemID && this.SSub.packet > 0 && this.SSub.rate > 0) {
        if (
          this.SSub.sSid == 0 ||
          this.SSub.sSid == null ||
          this.SSub.sSid == undefined
        ) {
          this.SSub.sSid = this.SMain.salesDetail.length + 1;
          this.SMain.salesDetail.push({ ...this.SSub });
          this.SSub = new INewSaleDatail();
          this.getTotal();
          this.SSub.sType = this.ST[0].sType;
        } else {
          this.SMain.salesDetail.forEach((dbsub) => {
            if (dbsub.sSid == this.SSub.sSid) {
              dbsub = this.SSub;
              dbsub.itemID = this.SSub.itemID;
              dbsub.barcode = this.SSub.barcode;
              dbsub.itemDescription = this.SSub.itemDescription;
              dbsub.measureId = this.SSub.measureId;
              dbsub.measureUnit = this.SSub.measureUnit;
              dbsub.packet = this.SSub.packet;
              dbsub.pktQty = this.SSub.pktQty;
              dbsub.qty = this.SSub.qty;
              dbsub.strg = '0';
            }
          });
          this.SSub = new INewSaleDatail();
          this.SSub.saleType = this.ST[0].saleType;
          this.AmountInclSt = 0;
        }
      } else {
        alert(
          'Error Code: GS-02 \n Please fill the mandatory fields first'
        );
      }

      //  }

      this.SSub.saleType = this.ST[0].saleType;

      this.SSub.n2 = this.goArr[0].cId;
  
  }

  addSmallLine(): void {
    this.SSub.qty = this.SSub.packet; //* this.SSub.pktQty;
    let disAmt = (this.SSub.disPer * this.SSub.rate) / 100;
    this.totalDisc = disAmt * this.SSub.qty;
    let disQty = disAmt * this.SSub.qty;
    this.SSub.amount =
      this.SSub.rate * this.SSub.packet - disAmt * this.SSub.qty;

    if (this.SSub.saleType == undefined || this.SSub.saleType == 0) {
      this.SSub.saleType = 1;
    } else {
      this.SSub.saleType;
    }

    this.getTotal();

    if (this.SSub.saleType == 1) {
      this.SSub.sType = 'Sale';
    }
    if (this.SSub.saleType == 2) {
      this.SSub.sType = 'Return';
    }

    this.netBill =
      this.SMain.gSale - (this.SMain.sReturn + this.SMain.discountUser);
    this.SSub.strg = '0';

    if (this.SSub.itemID && this.SSub.packet > 0 && this.SSub.rate > 0) {
      if (
        this.SSub.sSid == 0 ||
        this.SSub.sSid == null ||
        this.SSub.sSid == undefined
      ) {
        this.SSub.sSid = this.SMain.salesDetail.length + 1;
        this.SMain.salesDetail.push({ ...this.SSub });
        this.SSub = new INewSaleDatail();
        this.getTotal();
        this.SSub.sType = this.ST[0].sType;
      } else {
        this.SMain.salesDetail.forEach((dbsub) => {
          if (dbsub.sSid == this.SSub.sSid) {
            dbsub = this.SSub;
            dbsub.itemID = this.SSub.itemID;
            dbsub.barcode = this.SSub.barcode;
            dbsub.itemDescription = this.SSub.itemDescription;
            dbsub.measureId = this.SSub.measureId;
            dbsub.measureUnit = this.SSub.measureUnit;
            dbsub.packet = this.SSub.packet;
            dbsub.pktQty = this.SSub.pktQty;
            dbsub.qty = this.SSub.qty;
            dbsub.strg = '0';
          }
        });
        this.SSub = new INewSaleDatail();
        this.SSub.saleType = this.ST[0].saleType;
      }
    } else {
     alert(
        'Error Code: GS-02 \n Please fill the mandatory fields first'
      );
    }

  

    this.SSub.saleType = this.ST[0].saleType;

    this.SSub.n2 = this.goArr[0].cId;
  }
  goTo(select: any) {
    select.focus();
  }

  editLine(dbSub: INewSaleDatail) {
    this.SSub = dbSub;
    //SALE TYPE
    this.AmountInclSt = dbSub.saleTaxAmount * dbSub.qty;
    dbSub.saleType == 1 ? dbSub.sType == 'Sale' : dbSub.sType == 'Return';
    //FUNCTION FOR BILLING TOTAL
    this.getTotal();
    //WAREHOUSE
    dbSub.n2 = this.goArr[0].cId;
    //BILL PROFIT CALCULATIONS
    this.iProfit = this.itemProfit / this.SSub.qty;
    //ITEM UNIT
    this.itemUnit = dbSub.measureUnit;
    this.getUnits(dbSub.itemID);
    let tempTax = dbSub.saleTaxPercent / 100;
    let tempAmt = dbSub.amount * tempTax;
    this.AmountInclSt = dbSub.amount + dbSub.saleTaxAmount;
  }
  DeleteLine(ssub: INewSaleDatail) {
    this.SMain.salesDetail = this.SMain.salesDetail.filter(
      (res) => res.sSid != ssub.sSid
    );
    this.getTotal();
  }

  /*----------------------------IF BNID 3-----------------------------------*/
  addSmallLine2() {
     
    this.SSub.n1 = 1;

    if (this.SSub.saleType == undefined || this.SSub.saleType == 0) {
      this.SSub.saleType = 1;
      this.SSub.sType = 'Sale';
    } else {
      this.SSub.saleType;
    }

    if (this.SSub.saleType == 1) {
      this.SSub.sType = 'Sale';
    }
    if (this.SSub.saleType == 2) {
      this.SSub.sType = 'Return';
    }
    this.SSub.strg = '0';

    if (
      this.SSub.sSid == 0 ||
      this.SSub.sSid == null ||
      this.SSub.sSid == undefined
    ) {
      this.SSub.sSid = this.SMain.salesDetail.length + 1;
      this.SMain.salesDetail.push({ ...this.SSub });
      this.SSub = new INewSaleDatail();
    } else {
      this.SMain.salesDetail.forEach((dbsub) => {
        if (dbsub.sSid == this.SSub.sSid) {
          dbsub = this.SSub;
          dbsub.itemID = this.SSub.itemID;
          dbsub.barcode = this.SSub.barcode;
          dbsub.itemDescription = this.SSub.itemDescription;
          dbsub.measureId = this.SSub.measureId;
          dbsub.measureUnit = this.SSub.measureUnit;
          dbsub.pktQty = this.SSub.pktQty;
          dbsub.qty = this.SSub.qty;
          dbsub.strg = '0';
        }
      });
      this.SSub = new INewSaleDatail();
    }
    this.getTotal();
  }
  editLine2(dbSub: INewSaleDatail) {
     
    this.getTotal();
    if (dbSub.saleType == 1) {
      dbSub.sType == 'Sale';
    } else {
      dbSub.sType == 'Return';
    }
    this.SSub = dbSub;
  }
  DeleteLine2(ssub: INewSaleDatail) {
    this.SMain.salesDetail = this.SMain.salesDetail.filter(
      (res) => res.sSid != ssub.sSid
    );
    this.getTotal();
  }
  Save2() {
     
    // this.SMain.salesDetail.forEach((sale: any) => {
    //    
    //   this.SMain.billAmount = 1 * sale.qty;
    //   this.SMain.gSale = 1 * sale.qty;
    // });
     
    this.SMain.billNo = this.SMain.billNo.toString();
     
    if (!this.SMain.sAccID) {
      this.SMain.sAccID = 2;
    } else {
      this.SMain.sAccID;
    }
    this.SMain.agentID2 = 1;
    this.SMain.agentID = 1;
    if (this.SMain.sAccID === 2) {
      this.SMain.cashRece = this.netBill;
    }
    this.SMain.cashRece = this.cashRece;

    this.SMain.companyID = Number(localStorage.getItem('COMPANY_ID'));
    this.SMain.branchID = Number(localStorage.getItem('BRANCH_ID'));

    this.SMain.creditDays = 10;
    this.SMain.eDate = this.eDate;
    this.SMain.billProfit = this.billProfit;

    this.SMain.sAccName = this.SMain.remarks;

    if (this.SMain.sAccID !== 0) {
      this._IS.saveSale(this.SMain).subscribe((res) => {
        if (this.SMain.sAccID == 0 || this.SMain.sAccID == undefined) {
          if (Number(res > 0)) {
            this.SMain = new INewSale();
          }
          if (Number(res > 0)) {
            this.SMain = new INewSale();
            if (!this.SMain) {
              this._IS.saveSale(this.SMain).subscribe((res) => {
                if (Number(res > 0)) {
                  alert(
                    'New Sale Invoice has been generated against ID ' + res
                  );

                  this.SMain = new INewSale();
                  this.route.navigate(['inventory/sale-index']);
                } else {
                  alert('Insert Failed');
                }

                this.viewID = res;
                this.route.navigate(['inventory/sale-index']);
              });
            }
          }
        }

        alert('New Sale Invoice has been generated against ID ' + res);
        this.route.navigate(['inventory/sale-index']);
      });
    } else {
      alert('Choose Party First!s');
    }
  }

  /*---------------------CORE UX FUNCTOINALITY-------------------------*/

  back = () => this.route.navigate(['/admin/dashboard']);

  onItemChange = (value: any) => {
    this.shopNo = 0;
     
    if (value == 1) {
      this.SMain.sAccID = 105;
      this.SMain.sAccName = 'Stock Transfer To Shop';
      this.SMain.remarks = 'Stock Transfer To Shop';
    } else {
      this.SMain.remarks = '';
      this.SMain.sAccID = 2;
      this.shopNo = 1;
    }
  };
  printVoucher() {
     
    this.isPrint = true;
  }
  backToInvoice() {
    this.isPrint = false;
  }

  onPrint(): void {
     
    let content = '';
    content = `
    <html>
      <head>
        <title>Purchase View - ${this.SMain.sMid}</title>
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
            .pfoot{
  line-height: 1px !important;
  margin-top: 12px !important;
  margin-bottom: 12px !important;
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
          <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${
            this.SMain.billNo ?? this.SMain.sMid
          }</td>
          </tr>
          
          <tr>
          <td style="width:10%;border:0px solid #fff!important;">Customer:</td>
          <td style="border:0px solid #fff!important;">${
            this.SMain.sAccName
          }</td>
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

    for (let a of this.SMain.salesDetail) {
      content += `
      <tr>
      <td  style="width:40%">${a.itemDescription}</td>
      <td  style="width:10%">${a.qty}</td>
      <td style="text-align: left;width:10%">${a.rate}</td>
      <td style="text-align: left;width:10%">${a.amount}</td>
      <td style="text-align: left;width:10%">${a.saleTaxPercent}</td>
      <td style="text-align: left;width:10%">${a.saleTaxAmount}</td>
      <td style="text-align: left;width:10%">${a.saleTaxAmount + a.amount}</td>
    
      </tr>`;
    }

    content += `
          </tbody>
         <tfoot>
        <tr>
          <td class="pfoot"><b>Total</b></td>
          <td class="pfoot">${this.saleQty - this.retQty}</td>
           <td class="pfoot"></td>
          <td class="pfoot">${this.SMain.gSale - this.SMain.sReturn}</td>
          <td class="pfoot"></td>
          <td class="pfoot">${this.totalSTAmt}</td>
          <td class="pfoot">${this.totalInclSt}</td>
        </tr>
      </tfoot>
          
        </table>

      </div>
      <table  style="width:100%; 
          border:0px solid #fff!important; padding:0px!important;">
        
       
      
    
      
   
      
      <tr>
        <td style="width:75%;border:0px solid #fff!important;"></td>
        <td style="width:25%;border:0px solid #fff!important; text-align:right"> <p>Total Amount : <u>${
          this.SMain.gSale - this.SMain.sReturn
        }</u></p>
        </td>
        </tr>
        
        <tr>
        <td style="width:75%;border:0px solid #fff!important;"></td>
        <td style="width:25%;border:0px solid #fff!important; text-align:right"><p>Total Return Amount : <u>${
          this.SMain.sReturn ?? 0
        }</u></p>
        </td>
        </tr>
        </tr>
        <tr>
        <td style="width:75%;border:0px solid #fff!important;"></td>
        <td style="width:25%;border:0px solid #fff!important; text-align:right">  <p>Exclude ST Amount : <u>${
          this.SMain.gSale - this.SMain.sReturn
        }</u></p>
        </td>
        </tr>
        </tr>
        <tr>
        <td style="width:75% ;border:0px solid #fff!important;"></td>
        <td style="width:25%; border:0px solid #fff!important; text-align:right"><p>Sale Tax : <u>${
          this.totalSTAmt ?? 0
        }</u></p>
        </td>
        </tr>
        </tr>
        <tr>
        <td style="width:75%; border:0px solid #fff!important;"></td>
        <td style="width:25%; border:0px solid #fff!important;; text-align:right">   <p>Amount Include ST : <u>${
          this.totalInclSt
        }</u></p>
        </td>
        </tr>
        </tr>
         <tr>
        <td style="width:75%; border:0px solid #fff!important;"></td>
        <td style="width:25%; border:0px solid #fff!important;; text-align:right">   <p>Net Bill : <u>${
          this.totalInclSt
        }</u></p>
        </td>
        </tr>
        </tr>
        
      </table>
      
    
    </body>
  </html>`;

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
    popupWin.window.print();
  }
}
