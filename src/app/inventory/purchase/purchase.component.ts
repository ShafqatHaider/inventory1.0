import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { DatePipe, Location } from '@angular/common';
import { IPurchase, IPurchaseDetail } from 'src/app/shared/interface/IPurchase';

import { ToastrService } from 'ngx-toastr';
import { internal } from 'src/app/shared/interface/internal-standard';
declare var window: any;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchase = new IPurchase();
  _pSub = new IPurchaseDetail();
  purchaseArr = new IPurchase();
  filterTerm: string = '';
  formModal: any;
  pmid: any;
  eDate: any;
  units=[
    {
      'cid': 0,
    "measurementName": "",
    }
  ];
  branchName=internal.branchName
  partyArr = [];
  itemsArr = [];
  ST = [
    { pTypeId: 1, pType: 'Purchase' },
    { pTypeId: 2, pType: 'Return' },
  ];
  selected: any;
  bnid: any;
  goArr: any;
  constructor(
    
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    public location:Location

  ) {}

  isPrint=false;
  // INITIALIZATION
  getAllLookups() {
    debugger
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
      this.purchase = res;

      this.eDate = res.eDate;
      let ddate = this.pipe.transform(this.purchase.eDate, 'yyyy-MM-dd');
      this.eDate = ddate;
      console.log(res);
      this.grossBill = this.purchase.gSale - this.purchase.sReturn;
      this.netBill =
        this.grossBill - (this.purchase.cashPay + this.purchase.discountUser);
    });
  }
  ngOnInit(): void {
     
    this.selected = 'Purchase';
    this.bnid = Number(localStorage.getItem('BNID'));
    this.ST[0].pType == 'Purchase';
    this._pSub.pTypeId = this.ST[0].pTypeId;
    this.purchase.eDate = new Date();
    let ddate = this.pipe.transform(this.purchase.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;

    this.pmid = Number(this.acroute.snapshot.params['pmid']);
    this.pmid ? this.getPuchaseById(this.pmid) : console.log('Not Data Found...');
    this.getAllLookups();
  }

  /*-------------------EVENT HANDLERS FOR LOOKUPS---------------------*/
  cashReceived(event: any) {
    event;
    let discountUser = Number(this.purchase.discountUser);
    let cashRece = this.purchase.cashPay;
    let tBill = this.purchase.gSale;
    let retBill = this.purchase.sReturn;
    let eve = tBill - cashRece;
    this.netBill =
      this.grossBill - (this.purchase.cashPay + this.purchase.discountUser);

    // =this.SMain.billAmount;
  }

  unitArr: any;
  uId = 0;
  itemUnit: any;
  lpr: any;
  sBal: any;
  iProfit: any;
  profit: any = [];
  billProfit: number = 0;
  getUnits = (e: any) =>this._IS.getUnitByItemId(e).subscribe((data) => (this.unitArr = data));
  
  getLastItem=(e:any)=>{
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
  }
  
  changeItem(event: any) {
    this._pSub.barcode = event.barcode;
    this._pSub.itemID = event.itemID;
    this._pSub.itemDescription = event.itemDescription;
    this._pSub.purchaseRate=event.purchaseRate;
    const mObj:any =  this.units.find(e => e.cid === event.measureId);
    this._pSub.measureUnit = mObj.measurementName;
    this._pSub.measureId = mObj.cid;
    this.getLastItem(event.itemID);
  }

  onChageGodown(e: any) {
    this._pSub.n1 = e.cId;
    this._pSub.txt1 = e.goName;
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

  /*-------------------FURTHER FUNCTIONS-------------------------------*/
  // DeleteLine(ssub: INewSaleDatail) {
  //   // console.log(sales);
  //   this.SMain.salesDetail = this.SMain.salesDetail.filter(res => res.sSid != ssub.sSid);

  // }
  editLine = (dbSub: IPurchaseDetail) => {
     
    this._pSub = dbSub;
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
    // console.log(sales);

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
  // TOTAL BILLS FUNCTIONALITY
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
  getTotal() {
    this.subType = this._pSub.pTypeId;
    this.subQty = this._pSub.qty;
    this.subRate = this._pSub.purchaseRate;
    this.purAmt = 0;
    this.retAmt = 0;
    for (let i = 0; i < this.purchase.purchasesDetail.length; i++) {
      if (this.purchase.purchasesDetail[i].pTypeId === 1) {
        this.purAmt += this.purchase.purchasesDetail[i].amount;
      }

      //if(this.purchase.purchasesDetail[i].pTypeId===2){
      else {
        this.retAmt += this.purchase.purchasesDetail[i].amount;
      }
    }
    this.purchase.gSale = this.purAmt;
    this.purchase.sReturn = this.retAmt;
    this.grossBill = this.purchase.gSale - this.purchase.sReturn;
    this.netBill =
      this.grossBill - (this.purchase.cashPay + this.purchase.discountUser);
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
    for (let a = 0; a > this.purchase.purchasesDetail.length; a++) {
      this.purchase.purchasesDetail[a].disPer;
    }
  };
  /*ADD OBJECT TO SALE SUB ARRAY...*/
  subTotal: any;
  totalDisc = 0;
  calculateDiscount(e:any){
    debugger
    let disAmt=0;
    if(e.disPer){
      disAmt = (e.disPer * e.purchaseRate);
      disAmt=disAmt / 100;
      this.totalDisc=disAmt* e.qty;
    }
    let tempAmt = this._pSub.purchaseRate * this._pSub.packet
    this._pSub.amount =  tempAmt - this.totalDisc;
  }

  addLine(){
    
    if(this.bnid==1){
      debugger
      this._pSub.packet = this._pSub.qty;
      this.calculateDiscount(this._pSub);
      this.delRet = 0;
      this.delAmt = 0;
      this._pSub.strg = '0';
    this._pSub.pTypeId ?this._pSub.pTypeId :this._pSub.pTypeId = 1;
    this._pSub.pTypeId == 1 ? this._pSub.pType = 'Purchase': this._pSub.pType = 'Return';
    
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
      alert("please fill mandaory fields");
      alert('Please fill mandatory fields. Error Code: GRN-02');
    }
    this.ST[0].pType == 'Purchase';
    }
  }

  addSmallLine = () => {
    debugger
    this._pSub.qty = this._pSub.packet * this._pSub.pktQty;
     
    let disAmt = (this._pSub.disPer * this._pSub.purchaseRate) / 100;
    this.totalDisc = disAmt * this._pSub.qty;
    let disQty = disAmt * this._pSub.qty;
    this._pSub.amount = this._pSub.purchaseRate * this._pSub.packet - disQty;
    console.log(this._pSub.disPer);
    this.delRet = 0;
    this.delAmt = 0;
    this._pSub.strg = '0';

    if (this._pSub.pTypeId == undefined || this._pSub.pTypeId == 0) {
      this._pSub.pTypeId = 1;
    } else {
      this._pSub.pTypeId;
    }
    if (this._pSub.pTypeId == 1) {
      this._pSub.pType = 'Purchase';
    }
    if (this._pSub.pTypeId == 2) {
      this._pSub.pType = 'Return';
    }
    if (
      this._pSub.itemDescription &&
      this._pSub.itemID &&
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
      alert("please fill mandaory fields");
     alert('Please fill mandatory fields. Error Code: GRN-02');
    }
    this.ST[0].pType == 'Purchase';
  };
  goTo(select: any) {
    select.focus();
  }

  // MODAL

  newBID: any;
  bText: any;

  /*SAVE BILL ON API LEVEL */
  Save() {
     
    this.purchase.gSale += this._pSub.amount;
    //  this.netBill=this.tbAmt-(this.purchase.cashPay+this.purchase.sReturn+this.purchase.discountUser);
    this.purchase.agentID = Number(localStorage.getItem('LOCAL_ID'));
    this.purchase.companyID = Number(localStorage.getItem('COMPANY_ID'));
    this.purchase.branchID = Number(localStorage.getItem('BRANCH_ID'));
    this.purchase.creditDays = 0;
    this._pSub.strg = '0';

    this.purchase.eDate = this.eDate;
    if (this.purchase.sAccID) {
      this._IS.savePurchase(this.purchase).subscribe((res) => {
        if (this.purchase.sAccID == 0 || this.purchase.sAccID == undefined) {
          if (Number(res > 0)) {
            this.purchase = new IPurchase();
            alert('New Purchase Has Been Saved Against ID# ' + res);
          }
          if (Number(res > 0)) {
            this.purchase = new IPurchase();
            if (!this.purchase) {
              this._IS.savePurchase(this.purchase).subscribe((res) => {
                if (Number(res > 0)) {
                  this.purchase = new IPurchase();
                 alert('New Purchase Has Been Saved Against ID# ' + res);
                } else {
                  alert('Error: Insert Failed');
                }
              });
            }
          }
        }
        alert(          'New Purchase Has Been Saved Against ID# ' + res
        );
        this.route.navigate(['/inventory/purchase']);
      });
    } else {
      alert('Please Select A Party First!!, Error Code: GRN-01');
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
     
    this._pSub.measureUnit = e.mUnit;
    this._pSub.measureId = e.unitId;
    this._pSub.purchaseRate = e.costRate;
    this._pSub.pktQty = e.pktQty;
  };

  back = () => this.route.navigate(['inventory/purchase']);
  home = () => this.route.navigate(['admin/dashboard']);


  addSmallLine4 = () => {
    debugger
    this._pSub.qty //= this._pSub.packet * this._pSub.pktQty;
     
    let disAmt = (this._pSub.disPer * this._pSub.purchaseRate) / 100;
    this.totalDisc = disAmt * this._pSub.qty;
    let disQty = disAmt * this._pSub.qty;
    this._pSub.amount = this._pSub.purchaseRate * this._pSub.packet - disQty;
    console.log(this._pSub.disPer);
    this.delRet = 0;
    this.delAmt = 0;
    this._pSub.strg = '0';

    if (this._pSub.pTypeId == undefined || this._pSub.pTypeId == 0) {
      this._pSub.pTypeId = 1;
    } else {
      this._pSub.pTypeId;
    }
    if (this._pSub.pTypeId == 1) {
      this._pSub.pType = 'Purchase';
    }
    if (this._pSub.pTypeId == 2) {
      this._pSub.pType = 'Return';
    }
   
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
    
    this.ST[0].pType == 'Purchase';
  };



  

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
        <p>Dated: <span class="underline" style="width: 200px;">${this.purchase.eDate}</span></p>
        <p >Sr No: <span class="underline" style="width: 100px;">${this.purchase.pMid}</span></p>
    </div>

    
        <p style="margin-top:10px">Buyer Name:  <b class="underline" style="width: 50%;" >${this.purchase.sAccName}</b>
        </p>
        


    <div style="display:flex;justify-content:space-between;margin-top:20px;">
        <p>D.O#: <span class="underline" style="width: 100px;">${this.purchase.biltyNo}</span></p>
        <p>Goods Dispatched Through: <span class="underline" style="width: 200px;">${this.purchase.goods}</span></p>
        <p>P.O#: <span class="underline" style="width: 100px;">${this.purchase.biltyNo}</span></p>
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

  for (let a of this.purchase.purchasesDetail) {
    content += `
    <tr>
    <td style="width:10%">${a.sSid}</td>
    <td style="width:40%">${a.itemDescription}</td>
    <td style="text-align: left;width:10%">${a.qty}</td>
    <td style="text-align: left;width:10%">${a.purchaseRate}</td>
    <td style="text-align: left;width:10%">${a.amount}</td>
    </tr>`;
  }

  content += `
        </tbody>
       <tfoot>
      <tr>
        <td class="pfoot" colspan="4">TOTAL</td>
        <td class="pfoot">${this.purchase.gSale - this.purchase.sReturn}</td>
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


}
