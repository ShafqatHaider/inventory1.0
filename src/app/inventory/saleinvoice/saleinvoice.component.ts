import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../environment/environment';
import { INewSale, INewSaleDatail } from '../supportive/interfaces/INewSale';
import { ISaleInvoice } from '../supportive/interfaces/ISaleInvoice';
import { internal } from '../supportive/interfaces/internal-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-saleinvoice',
  templateUrl: './saleinvoice.component.html',
  styleUrl: './saleinvoice.component.scss'
})
export class SaleinvoiceComponent {
  @ViewChild('bilty') inputName: any;
  // @ViewChild('select') searchElement: ElementRef | any;
  // VERIABLE DECLARATION
  url = environment.baseApiUrl + 'CompanyInformation/GetImage';
  isPrint = false;
  SMain = new INewSale();
  ssmain = new Array<INewSale>();
  SSub = new INewSaleDatail();
  SSubs = new Array<INewSaleDatail>();
  invoice = new Array<ISaleInvoice>();
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
  branchName=internal.branchName
  bProfit: any;
  itemProfit: number = 0;
  totalDisc: any;
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

  saleManArr:any[]=[];
  
  // CONSTRUCTOR

  constructor(
    public acroute: ActivatedRoute,
    public _IS: InventoryService,
    public route: Router,
    // private toast: ToastrService,
    public pipe: DatePipe,
    public location: Location,
    // public sharedService: SharedService
  ) {}

  // NG_ON_INIT
  getSaleMan(){
    this._IS.getSaleMan().subscribe(res=>this.saleManArr=res)
  }
  getAllLookups() {
    this._IS.getSalesLookups().subscribe((res) => (this.ssmain = res));
    this._IS.getSaleMan().subscribe((res) => {
      this.saleman = res;
      // this.selectedSaleman = this.saleman[0].sAccId;
      // this.SMain.agentID = this.selectedSaleman;
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
      this.SSub.txt3=res[0].goName;
    });

    this._IS.getUnitLookups().subscribe((res) => (this.units = res));
  }
  getSaleById(id: any) {
    let smid = Number(id);
    this._IS.getSalesById(smid).subscribe((res) => {
      this.SMain = res;
      
      
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
      
      // @ViewChild('select') select: NgSelectComponent;

  ngOnInit() {
    
    this.bnid = Number(localStorage.getItem('BNID'));
    if (this.bnid == 4) {
      this.SMain.sAccID = 2;
    }
    this.getSaleMan();
    this.SSub.saleType = this.ST[0].saleType;
    let ddate = this.pipe.transform(this.SMain.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;
    /*GET BILL BY SMID*/
    debugger;
    let id = this.acroute.snapshot.params['smId'];
    id ? this.getSaleById(id) : console.log('Not Data Found');
    /*GET ALL LOOKUPS*/
    this.getAllLookups();
  }
  /*------------------ ALL EVENTS FUNCTIONS---------------------*/
  onChangeGodown(e:any){
    // console.log(e)
    debugger
    this.SSub.txt3=e.goName
    this.SSub.n2=e.cId
  }
  onChangeUnit = (e: any) => {
    this.SSub.measureUnit = e.mUnit;
    this.SSub.measureId = e.unitId;
    !this.SSub.rate ? (this.SSub.rate = e.saleRate) : this.SSub.rate;
    this.SSub.pktQty = e.pktQty;
  };
onChangeSaleMan(e:any){
  console.log(e)
  this.SMain.agentID=e.sAccId;
}

  changeSaleMan = (event: any) =>
    !event
      ? (this.SMain.agentID = this.saleman[0].sAccId)
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
    debugger
    let discountUser = Number(this.SMain.discountUser);
    let cashRece = Number(this.cashRece);
    this.SMain.cashRece = cashRece;
    let tBill = Math.round(this.SMain.gSale);
    let retBill = this.SMain.sReturn;
    this.netBill=tBill-retBill;
    this.SMain.billAmount = Math.floor(this.netBill);
    this.netBill=this.netBill-this.SMain.discountUser;
    this.netBill = this.netBill- this.cashRece
    console.log(this.netBill);
  }

  CustomerChanged(event: any) {
    this.SMain.sAccID = event.customerID;
    this.SMain.sAccName = event.customerName;
    this.creditLimit = event.creditLimit;
    this.receiveable = event.receivables;
    this.contactNo = event.whatsappno;
  }

  changeType(event: any) {
    debugger
    let sType = event.target.value;
    if (sType == 'Sale' || sType == '' || sType == undefined) {
      this.SSub.saleType = 1;
      this.SSub.sType = 'Sale';
    } else {
      this.SSub.saleType = 2;
      this.SSub.sType = 'Return';
    }
  }
onChangePkt(e:any){
  // this.SSub.pktQty=1
  this.SSub.qty = this.SSub.pktQty*this.SSub.packet;
}

disper2: Number=0;
disRs:number=0;
Amt(e:any){
  this.disper2=0 ;
  debugger
  this.SSub.qty=this.SSub.pktQty*this.SSub.packet
 this.SSub.amount=this.SSub.qty*(this.SSub.rate-(((this.SSub.rate*this.SSub.disPer)/100)+(this.SSub.disRS)))
 

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
    debugger;
    this.SSub.measureUnit = mObj.measurementName;
    this.SSub.measureId = mObj.cid;
    this.getLastItem(event.itemID);
  }

  getTotal() {
    debugger
    this.purAmt = 0;
    this.retAmt = 0;
    let saleAmt = 0;
    for (let i = 0; i < this.SMain.salesDetail.length; i++) {
      // this.SSub.amount=this.SSub.qty*this.SSub.rate
      if (this.SMain.salesDetail[i].saleType === 1) {
        saleAmt += Number(this.SMain.salesDetail[i].amount);
      } else {
        this.retAmt += this.SMain.salesDetail[i].amount;
      }
    }
    this.SMain.gSale = Math.round(saleAmt)??0;
    this.SMain.sReturn = this.retAmt??0;
    this.netBill = Math.round(this.SMain.gSale -this.SMain.sReturn);
    this.SMain.billAmount = Math.round(this.netBill);
    this.grossBill = this.SMain.gSale - this.SMain.sReturn;
    let cwd=this.SMain.cashRece + this.SMain.discountUser
    this.netBill =
      this.grossBill - (cwd>0?cwd:0);
  }
  /*CALCULATE DISCOUNT */

  /*Get Total of Each Item Amount */

  /*SEARCH ITEM WITH BARCODE...*/

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      item.barcode.toLocaleLowerCase().indexOf(term) > -1 ||
      item.itemDescription.toLocaleLowerCase().indexOf(term) > -1
    );
  }

  /*ADD OBJECT TO SALE SUB ARRAY...*/
  calculateDiscount(e: any) {
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
  addLine() {
   
      // this.SSub.packet = this.SSub.qty; //* this.SSub.pktQty;
      this.SSub.saleType ? this.SSub.saleType : (this.SSub.saleType = 1);
      this.getTotal()
     
      this.SSub.saleType == 1
        ? (this.SSub.sType = 'Sale')
        : (this.SSub.sType = 'Return');

      this.netBill =
        this.SMain.gSale - (this.SMain.sReturn + this.SMain.discountUser);
      this.SSub.strg = '0';

      if (this.SSub.itemID && this.SSub.packet  > 0 && this.SSub.rate  > 0/*as godown*/) {
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
              // dbsub.godown = this.SSub.godown;

              
            }
          });
          this.SSub = new INewSaleDatail();
          this.SSub.saleType = this.ST[0].saleType;
          
        }
      } else {
        alert('Error Code: GS-02 \n Please fill the mandatory fields first');
      }

      //  }
      this.SSub.n2 = this.goArr[0].cId;
      this.SSub.txt3=this.goArr[0].goName;
      this.SSub.saleType = this.ST[0].saleType;

      this.SSub.n2 = this.goArr[0].cId;
      setTimeout(() => {
        // this.select.focus();
      }, 0);
  }

  addSmallLine() {
    // this.SSub.qty = this.SSub.packet;
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

    if (this.SSub.amount>0) {
    if(this.SSub.itemID){
      if(this.SSub.qty){
        if(this.SSub.rate){
          if(this.SSub.n2){
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
                  dbsub.qty = this.SSub.disPer;
                  dbsub.qty = this.SSub.disRS;
                  dbsub.qty = this.SSub.amount;
                  dbsub.strg = '0';
                }
              });
              this.SSub = new INewSaleDatail();
              this.SSub.saleType = this.ST[0].saleType;
            }
          }else{
            alert('please fill rate')
          }
        }
      }else{
        alert('Please fill qty')
      }
    }
    } else {
      alert('Error Code: GS-02 \n Please fill the mandatory fields first');
    }

    //  }

    this.SSub.saleType = this.ST[0].saleType;

    this.SSub.n2 = this.goArr[0].cId;
  }
  goTo(select: any) {
    select.focus();
  }

  /*SAVE BILL ON API LEVEL */
  viewID: number = 0;
  cashRece = 0;
  Save() {
    this.SMain.billNo = this.SMain.billNo.toString();

    if (!this.SMain.sAccID) {
      this.SMain.sAccID = 2;
    } else {
      this.SMain.sAccID;
    }
    this.SMain.agentID2 = 1;
    if (this.SMain.sAccID === 2) {
      this.SMain.cashRece = 0;
    }
    this.SMain.cashRece = this.cashRece;

    this.SMain.companyID = Number(localStorage.getItem('COMPANY_ID'));
    this.SMain.branchID = Number(localStorage.getItem('BRANCH_ID'));

    this.SMain.creditDays = 10;
    this.SMain.eDate = this.eDate;
    this.SMain.billProfit = this.billProfit;

    if (this.SMain.sAccID && this.SMain.salesDetail.length > 0) {
      this._IS.saveSale(this.SMain).subscribe(res=>{alert(res), (err:any)=> alert(err), this.SMain=new INewSale(), this.route.navigate(['/inventory/sale-index'])});

      // this._IS.saveSale(this.SMain).subscribe((res) => {
      //   if (this.SMain.sAccID == 0 || this.SMain.sAccID == undefined) {
      //     if (Number(res > 0)) {
      //       this.SMain = new INewSale();
      //     }
      //     if (Number(res > 0)) {
      //       this.SMain = new INewSale();
      //       if (!this.SMain) {
      //         this._IS.saveSale(this.SMain).subscribe((res) => {
      //           if (Number(res > 0)) {
      //             alert('New Sale Invoice has been Updated Saved!!');

      //             this.route.navigate(['/inventory/saleview/' + res]);

      //             this.SMain = new INewSale();
      //             this.route.navigate(['/inventory/saleview/' + res]);
      //           } else {
      //             alert('Insert Failed');
      //           }

      //           this.getSaleById(res);
      //           this.isPrint = true;
      //         });
      //       }
      //     }
      //   }
      //   alert('New Sale Invoice has been generated against ID Saved!!');
      //   this.getSaleById(res);
      //   this.isPrint = true;
      // });
      console.log(this.SMain)
    } else {
      alert('Error Code : GS-01 Fill the mendatory fields please');
    }
  }
  save() {}

  editLine(dbSub: INewSaleDatail) {
    this.SSub = dbSub;
    this.SSub.n2=dbSub.n2;
    // this.SSub.godown=dbSub.godown;
    //SALE TYPE
    dbSub.saleType == 1 ? dbSub.sType == 'Sale' : dbSub.sType == 'Return';
    //FUNCTION FOR BILLING TOTAL
    this.getTotal();

//BILL PROFIT CALCULATIONS
    this.iProfit = this.itemProfit / this.SSub.qty;
    //ITEM UNIT
    this.itemUnit = dbSub.measureUnit;
    this.getUnits(dbSub.itemID);
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
      //this.getTotal()
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
  //
  Save2() {}

  /*---------------------CORE UX FUNCTOINALITY-------------------------*/

  back = () => this.route.navigate(['/admin/dashboard']);
  shopNo = 1;

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

  id = 0;
  img: any;
  printVoucher() {
    this.isPrint = true;
    this.id = 5;
    this._IS.getPurchaseInvoice(this.id).subscribe((res) => {
      this.invoice = res;

      this.img = this.url + '/' + res[0].companyLogo;
      console.log(this.img);
    });
  }

  onPrint(): void {
    let content = '';
    content = `
 <html>
<head>
<title>Print View</title>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
}

.container {
    width: 90%;
    margin: 20px auto;
}

.header {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}

.title {
    font-weight: bold;
}

.bill {
    font-weight: bold;
    background-color: black;
    color: white;
    padding: 5px 10px;
}

.contact-info, .contact-number, .details, .buyer-info, .order-info {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

h5, h4 {
    font-weight: bold;
}

.underline {
    border-bottom: 2px solid black;
    display: inline-block;
}

.table-container {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.signatures {
    display: flex;
    justify-content: space-between;
    margin-top: 70px;
}

.checked-by, .authorized-signature {
    text-align: center;
}
.details{
    display: flex;
    justify-content: space-between;
}
.order-info{
    display: flex;
    justify-content: space-between;
}

</style>
</head>
<body>
  <div  style="display:flex; align-items:center; justify-content:space-between;">
   <h2 class="title">S&A ENTERPRISES</h2>
      <h3 class="bill">BILL</h3>
  </div>
 <div class="header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-direction:column">
    <div class="details">
   

    <p  style="display:flex; align-self:flex-start; justify-content:space-between;"><b>Email:</b> sandaenterprisespk&#x40;gmail.com</p>
        <p  style="display:flex; align-self:flex-start; justify-content:space-between;">25 No Stop Allah Hu Darbar Main Sheikhupura Road Shahdra, Lahore</p>
        <p  style="display:flex; align-self:flex-start; justify-content:space-between;"><b>Cell: 0311-4328350</b></p>
        <p  style="display:flex; align-self:flex-start; justify-content:space-between;"><b>Cell: 0306-9088276</b></p>
    </div>

      <div >
        
     
      </div>
     
    </div>

<div class="container" >
   

  
    <div style="display:flex;justify-content:space-between;">
        <p>Dated: <span class="underline" style="width: 200px;">${this.SMain.eDate}</span></p>
        <p >Sr No: <span class="underline" style="width: 100px;">${this.SMain.sMid}</span></p>
    </div>

    
        <p style="margin-top:10px">Buyer Name:  <b class="underline" style="width: 50%;" >${this.SMain.sAccName}</b>
        </p>
        


    <div style="display:flex;justify-content:space-between;margin-top:20px;">
        <p>D.O#: <span class="underline" style="width: 100px;">${this.SMain.biltyNo}</span></p>
        <p>Goods Dispatched Through: <span class="underline" style="width: 200px;">${this.SMain.goods}</span></p>
        <p>P.O#: <span class="underline" style="width: 100px;">${this.SMain.biltyNo}</span></p>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>SR.N</th>
                    <th>DESCRIPTION</th>
                    <th>QTY IN KG</th>
                    <th>RATE KG</th>
                    <th>AMOUNT</th>
                </tr>
            </thead>
            <tbody>
           
        `;

    for (let a of this.SMain.salesDetail) {
      content += `
    <tr>
    <td style="width:10%">${a.sSid}</td>
    <td style="width:40%">${a.itemDescription}</td>
    <td style="text-align: left;width:10%">${a.qty}</td>
    <td style="text-align: left;width:10%">${a.rate}</td>
    <td style="text-align: left;width:10%">${a.amount}</td>
    </tr>`;
    }

    content += `
        </tbody>
       <tfoot>
      <tr>
        <td class="pfoot" colspan="4">TOTAL</td>
        <td class="pfoot">${this.SMain.gSale - this.SMain.sReturn}</td>
      </tr>
    </tfoot>
        
      </table>
    </div>

    <div class="signatures">
        <div class="checked-by">
            <div class="underline" style="width: 250px;"></div>
            <h5>Checked By</h5>
        </div>
        <div class="authorized-signature">
            <div class="underline" style="width: 250px;"></div>
            <h5>Authorized Signature</h5>
        </div>
    </div>

</div>



</body>
</html>`;

    // document.getElementById('print')?.innerHTML;
    let popupWin: any = window.open(
      '',
      'my_print',
      'top=0,left=0,height: 842px;width: 595px;'
    );
    popupWin.document.write(`
  
  
  ${content}
 
  `);
    popupWin.print();
    // popupWin.close();
    popupWin.window.print();
  }

  printView() {
    this.isPrint = true;
  }
}
