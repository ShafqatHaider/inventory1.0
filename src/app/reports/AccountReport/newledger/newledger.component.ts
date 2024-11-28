import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SnakbarService } from 'src/app/ui/components/alert/snakbar.service';
import { ILedgerMain, details } from '../interfaces/ILedgerNew';

@Component({
  selector: 'app-newledger',
  templateUrl: './newledger.component.html',
  styleUrls: ['./newledger.component.scss']
})
export class NewledgerComponent implements OnInit {
ledger= new Array<ILedgerMain>();
ledArr= new Array<ILedgerMain>();
details= new Array<details>();
sAccId:any; tDate:any; fDate:any; lgTypeId:any;crTotal=0; drTotal=0;
balance:any; folio='';bal:any; totaldr=0; totalcr=0; 
isData=false; accArr=[];sAccName:any;todayDate:any; folios=[];
currentTime:any;mobileNo:any; closingBalance=0;
  constructor(private service: ReportsService, private pipe:DatePipe,private location:Location, 
    private route:Router, private acroute:ActivatedRoute, public Service:SnakbarService) { }

  ngOnInit(): void {
    const currentDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    const currentTime = this.pipe.transform(new Date(), 'shortTime');
    this.todayDate=currentDate;
    this.currentTime=currentTime;
    this.lgTypeId=0 //=this.acroute.snapshot.params['lgType'];
    debugger
    this.tDate=new Date();
    let td= this.pipe.transform(this.tDate,'yyyy-MM-dd');
    this.tDate=td;
    this.fDate=new Date();
    let fd= this.pipe.transform(this.fDate,'yyyy-MM-dd');
    this.fDate=fd;
    this.service.getPartyLookups().subscribe(res=>{this.accArr=res;console.log(res)})
   
  }








  pdfGo=0
refresh()
{
  debugger
  // this.folio?this.folio:this.folio='';
  this.ledger= new Array<ILedgerMain>();
  this.ledArr= new Array<ILedgerMain>();
  this.details= new Array<details>();
  this.pdfGo=0
}

;
getReport()
{
  debugger
//   
//  

  if(this.folio)
  {
    this.service.getLedger(this.sAccId,this.folio, this.fDate, this.tDate,0).subscribe(res=>
      {debugger
      
     if(res)
     {
      this.pDrTotal=0;this.pCrTotal=0;
      this.refresh();
      this.totaldr=0;
      this.totalcr=0;
      this.isData=true;
      this.ledger=res;
      this.ledArr=res;
      this.details=res[0].details;
      this.pdfGo=1;
   this.closingBalance=res[0].closingBalance;
    res.forEach((element:any ,index:any)=> {
   
    let det = element.details;
    for(let a of det)
    {
      if(index == 0)
    debugger
     { this.bal = a.balance = 0; }
     if(a.drAmt> 0) 
     { this.bal = this.bal + a.drAmt; a.balance = this.bal; }
     if(a.crAmt > 0) 
     { this.bal =  this.bal- a.crAmt; a.balance = this.bal; }
     this.totaldr = this.totaldr + a.drAmt; 
     this.totalcr = this.totalcr + a.crAmt;
     a.balance=this.totaldr-this.totalcr
     debugger
     this.drTotal+=a.drAmt
     this.crTotal+=a.crAmt
    }
     
    })
    
     }
     else
     {
      this.isData=false;
      this.Service.error('No Data Found');
      this.pdfGo=0
     }
      })
  }
  else
  {
    this.service.getLedger(this.sAccId,'0', this.fDate, this.tDate,0).subscribe(res=>
      {debugger
      
     if(res)
     {
      this.pDrTotal=0;this.pCrTotal=0;
      this.refresh();
      this.totaldr=0;
      this.totalcr=0;
      this.isData=true;
      this.ledger=res;
      this.ledArr=res;
      this.details=res[0].details;
      this.pdfGo=1
   this.closingBalance=res[0].closingBalance;
    res.forEach((element:any ,index:any)=> {
   
    let det = element.details;
    for(let a of det)
    {
      if(index == 0)
    debugger
     { this.bal = a.balance = 0; }
     if(a.drAmt> 0) 
     { this.bal = this.bal + a.drAmt; a.balance = this.bal; }
     if(a.crAmt > 0) 
     { this.bal =  this.bal- a.crAmt; a.balance = this.bal; }
     this.totaldr = this.totaldr + a.drAmt; 
     this.totalcr = this.totalcr + a.crAmt;
     a.balance=this.totaldr-this.totalcr
     debugger
     this.drTotal+=a.drAmt
     this.crTotal+=a.crAmt
    }
     
    })
    
     }
     else
     {
      this.isData=false;
      this.Service.error('No Data Found');
      this.pdfGo=0
     }
      })
  }
    
}
pTotaldr=0;
pTotalcr=0;
pDrTotal=0;
pCrTotal=0;
  back=()=>this.location.back();
createPdf=()=>{window.print()}
PartyLedgerContent() {
//   this.pTotaldr=0
// this.pTotalcr=0

//   this.ledArr.forEach((element:any ,index:any)=> {
 
//     let det = element.details;
//     for(let a of det)
//     {
//       if(index == 0)
    
//     debugger
//      {
//       a.pBalance=0;
//       this.bal = a.balance = 0; }
//      if(a.drAmt> 0) 
//      { this.bal = this.bal + a.drAmt; a.balance = this.bal; }
//      if(a.crAmt > 0) 
//      { this.bal =  this.bal- a.crAmt; a.balance = this.bal; }
//      this.pTotaldr = this.pTotaldr + a.drAmt; 
//      this.pTotalcr = this.pTotalcr + a.crAmt;
//      a.pBalance=this.pTotaldr-this.pTotalcr
//      debugger
//      this.pDrTotal+=a.drAmt
//      this.pCrTotal+=a.crAmt
//     }
//   });  
  debugger
  let content = `
   <html>
  <head>
    <title>General Ledger - ${this.sAccName}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 18px;
        margin-top: 25px;
      }

      .print-container {
        margin: 20px auto; /* Center the div on the page */
        font-size: 18px;
        // margin-top: 20px; /* Reduced margin */
      }

      .container-fluid {
        margin: 10px;
      }

      h1 {
        text-align: center;
        margin-top: 20px; /* Adjusted margin */
      }

      .print-info {
        display: flex;
        justify-content: space-between;
        // margin-bottom: 10px;
      }

      .date-range {
        text-align: center;
        
        gap:10px;
      }

    

      table {
        border-collapse: collapse;
        width: 100%;
      }

      th,
      td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      th {
        background-color: #f2f2f2;
      }
        .main{
        display:flex;
        flex-direction:column;
        }
    </style>
  </head>

  <body>
    <div class="print-container">
      <div class="main"><div><h1>Account Statement</h1></div>
      <div class="date-range">
        <span>From:</span> ${this.fDate} &nbsp;&nbsp;
        <span>To:</span> ${this.tDate}
      </div></div>
      <!-- Print Date and Time on the same row, aligned to the right -->
      <div class="print-info">
       <div >
        <p><strong>Customer:</strong> ${this.sAccName}</p>
        <p><strong>Phone Number:</strong> ${this.mobileNo}</p>
        <p><strong>Closing Balance:</strong> ${this.closingBalance}</p>
      </div>
        <div style="text-align: right;">
          <span>Print Date:</span> ${this.todayDate} &nbsp;&nbsp;
          <span></span> ${this.currentTime}
        </div>
       
      </div>

      <!-- From and To Date aligned under General Ledger -->
      

      <!-- Customer Info Section -->
      

      <!-- Lower table with general ledger details -->
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:10%">Date</th>
            <th style="text-align: center;">Details</th>
            <th style="text-align: left;width:10%">Folio</th>
            <th style="text-align: left;width:10%">Debit</th>
            <th style="text-align: left;width:10%">Credit</th>
            <th style="text-align: left;width:10%">Balance</th>
          </tr>
        </thead>
        <tbody>
          ${this.details.map(a => `
            <tr>
              <td style="width:10%">${this.pipe.transform(a.eDate,'dd-MMM-yy')}</td>
              <td style="width:60%">${a.description}</td>
              <td style="text-align: left;width:10%">${a.folio}</td>
              <td style="text-align: left;width:10%">${a.drAmt}</td>
              <td style="text-align: left;width:10%">${a.crAmt}</td>
              <td style="text-align: left;width:10%">${a.balance}</td>
            </tr>`).join('')}
        </tbody>
        // <tfoot style="border:2px solid #000000">
                        
        //   <tr  class="tfoot-head" style="border-bottom:2px solid #000000">
        //       <td colspan="2"  style="width:15%"><strong> Total Of All Transactions:</strong> </td>
        //       <td style="text-align: left; width: 10%;"><strong>${this.pDrTotal}</strong></td>
        //       <td style="text-align: left; width: 10%;"><strong>${this.pCrTotal}</strong></td>
        //       <td style="text-align: left; width: 10%;"><strong>${this.pDrTotal-this.pCrTotal}</strong></td>
        //   </tr>
          
        // </tfoot>
      </table>
    </div>
  </body>
</html>
`;

  return content;
}


createReportPdf(){
    const printableWindow = window.open('', '_blank','width=800,height=600');
    printableWindow?.document.write(this.PartyLedgerContent());
    printableWindow?.document.close();
  
}

onSelectAccount=(event: any) =>{
  
  this.sAccId =event.vendorID; this.sAccName=event.vendorName; this.mobileNo=event.whatsappno
  this.service.getFolioLookupsById(event.vendorID).subscribe(res=>{
    debugger
    this.folios=res;
  })
}
onSelectFolio=(e:any)=>{
  debugger
  e?this.folio=e.lg_type:this.folio='';
} 

}




