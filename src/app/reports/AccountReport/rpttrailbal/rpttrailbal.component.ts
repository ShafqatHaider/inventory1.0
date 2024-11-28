import { Component, Input, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { DatePipe, Location } from '@angular/common';
import { IAdTrailBalance } from '../interfaces/IAdTrailBalance';
import { ILedgerMain, details } from '../interfaces/ILedgerNew';


@Component({
  selector: 'app-rpttrailbal',
  templateUrl: './rpttrailbal.component.html',
  styleUrls: ['./rpttrailbal.component.scss'],
})
export class RpttrailbalComponent implements OnInit {
  @Input() filter: boolean = false;
  constructor(
    public  service: ReportsService,
    public pipe: DatePipe,
    public location: Location
  ) {}
  isData = false;
  tDate: any;
  todayDate: any;
  currentTime: any;
  repoTrial = new Array<IAdTrailBalance>();
  trailArr = new Array<IAdTrailBalance>();
  subTrailArr: any = [];
  filterTerm: string = '';
  fromDate: any;
  toDate: any;
  totalBalance: number = 0;
  cateAcc = [];
  cateAccId = 0;
  text: string = '';
  dbAmt: any;
  crAmt: any;
  cateName:any;
  debitSum=0;
   creditSum=0;
   folios=[];folio='';
   period=0;
   grandTotalDr=0;
   grandTotalCr=0;
   grandTotalDiffer=0;
   isLoading = false;
  ngOnInit(): void {
    this.service.getCateAccounts().subscribe((res) => {
      this.cateAcc = res;
    });
    this.service.getFolioLookups().subscribe(res=>this.folios=res)
    const currentDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    const currentTime = this.pipe.transform(new Date(), 'shortTime');
    this.todayDate = currentDate;
    this.currentTime = currentTime;

    this.tDate = new Date();
    let td = this.pipe.transform(this.tDate, 'yyyy-MM-dd');
    this.tDate = td;
    this.cateAccId = 0;
    this.fDate='2001-01-01'
  }
  cateAccChange = (e: any) => {
    debugger
    this.cateAccId = e.cateAccId;
    this.cateName = e.cateAccTitle;
  };
  refresh=()=>{
    this.repoTrial = new Array<IAdTrailBalance>();
    this.trailArr = new Array<IAdTrailBalance>();
    this.grandTotalDr=0
    this.grandTotalCr=0
    this.grandTotalDiffer=0
  }
 
  getReport() {
    debugger
    this.isLoading = true;
    this.refresh();
    // if(this.folio){
      // if (!this.cateAccId) {
        this.cateAccId=0
        
        this.text = 'TRIAL BALANCE REPORT';
        this.service.getTrailBal(this.tDate, 0).subscribe((res) => {
         
          if (res) {
           
            this.isLoading=false;
            this.isData = true;
            this.repoTrial = res;
            this.trailArr = res;
            this.debitSum=res.debitSum;
            this.creditSum=res.creditSum;
            this.trailArr.forEach((e:any)=>{
              debugger
              this.grandTotalDr+=e.debitSum;
              this.grandTotalCr+=e.ceditSum;
              this.grandTotalDiffer=this.grandTotalDr-this.grandTotalCr;
            })
            this.subTrailArr = res.forEach((e: any) => {
              e.accounts;
            });
          
          } else {
            this.isData = false;
            this.isLoading = false;
          }
        });
      // }
      // if (this.cateAccId) {
      //   this.text = 'FILTERED TRIAL BALANCE REPORT';
      //   this.service.getTrialFiltered(this.tDate, this.cateAccId,this.folio).subscribe((res) => {
      //     if (res) {
      //       this.isData = true;
      //       this.repoTrial = res;
      //       this.trailArr = res;
      //       this.trailArr.forEach((e:any)=>{
      //         debugger
      //         this.grandTotalDr+=e.debitSum;
      //         this.grandTotalCr+=e.ceditSum;
      //         this.grandTotalDiffer=this.grandTotalDr-this.grandTotalCr;
      //       })
      //       this.subTrailArr = res.forEach((e: any) => {
      //         e.accounts;
      //       });
      //     } else {
      //       this.isData = false;
      //     }
      //   });
      // }
    // }
    // else
    // {
      // if (!this.cateAccId) {
      //   this.cateAccId=0
        
      //   this.text = 'TRIAL BALANCE REPORT';
      //   this.service.getTrailBal(this.tDate,'0').subscribe((res) => {
      //     if (res) {
      //       this.isData = true;
      //       this.repoTrial = res;
      //       this.trailArr = res;
      //       this.debitSum=res.debitSum;
      //       this.creditSum=res.creditSum;
      //       this.trailArr.forEach((e:any)=>{
      //         debugger
      //         this.grandTotalDr+=e.debitSum;
      //         this.grandTotalCr+=e.ceditSum;
      //         this.grandTotalDiffer=this.grandTotalDr-this.grandTotalCr;
      //       })
      //       this.subTrailArr = res.forEach((e: any) => {
      //         e.accounts;
      //       });
      //     } else {
      //       this.isData = false;
      //     }
      //   });
      // }
      // if (this.cateAccId) {
      //   this.text = 'FILTERED TRIAL BALANCE REPORT';
      //   this.service.getTrialFiltered(this.tDate, this.cateAccId,'0').subscribe((res) => {
      //     if (res) {
      //       this.isData = true;
      //       this.repoTrial = res;
      //       this.trailArr = res;
      //       this.trailArr.forEach((e:any)=>{
      //         debugger
      //         this.grandTotalDr+=e.debitSum;
      //         this.grandTotalCr+=e.ceditSum;
      //         this.grandTotalDiffer=this.grandTotalDr-this.grandTotalCr;
      //       })
      //       this.subTrailArr = res.forEach((e: any) => {
      //         e.accounts;
      //       });
      //     } else {
      //       this.isData = false;
      //     }
      //   });
      // }
    // }
    // this.isLoading = false;
  }
  isFilter = false;

  filterChanged(value: boolean) {
   
    this.isFilter = value;
    if(!this.isFilter)
    {
      this.cateAccId=0;
    }
    
    // You can now use the 'value' parameter in your TypeScript code
  }

  onSelectFolio=(e:any)=>{
    e?this.folio=e.lg_type:this.folio=''
  }



  reportContent() {
    debugger
    let content = `<html>
    <head>
      <title>Trail Balance</title>
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
    <div style="text-align:center;">
    <h2>Trail Balance</h2>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between">
    <div>Date: ${this.todayDate}</div>
    <div>Time: ${this.currentTime}</div>
    </div>
    <br>
    `;
    
        this.trailArr.forEach(b => {
          debugger
            content += `
            <h4 >Account Head: ${b.adCateAcc}</h4>
                
                       
                       
                        <table class="table table-hover table-sm w-table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 10%; text-align: left">Date</th>
                                    <th style="width: 70%; text-align: left">A/C Name</th>
                                    <th style="width: 10%; text-align: right">Debit</th>
                                    <th style="width: 10%; text-align: right">Credit</th>
                                </tr>
                            </thead>
                            <tbody>`;
            b.accounts.forEach(c => {
                content += `
                                <tr>
                                    <td style="width: 10%; text-align: left">${this.pipe.transform(c.eDate,'dd-MM-yyyy')}</td>
                                    <td style="width: 70%; text-align: left">${c.title}</td>
                                    <td style="text-align: right; width: 10%">${c.debit}</td>
                                    <td style="text-align: right; width: 10%">${c.credit}</td>
                                </tr>`;
            });
            content += `
                            </tbody>
                           
                 <tfoot>
                  <tr>
                    <td><b>TOTAL</b></td>
                    <td class="text-right"><b>Difference: ${b.debitSum+b.ceditSum }</b></td>
                    <td style="text-align:right;"><b>${b.debitSum}</b></td>
                    <td style="text-align:right;"><b>${b.ceditSum}</b></td>
                  </tr>
                 </tfoot>
                        </table>
                  `;
        });
        content += `
            </div>
        
    
</body>
    </html>
`
    return content;
  }

  createReportPdf() {
    debugger
    // this.getReport();
    const printableWindow = window.open('', '_blank','width=800,height=600');
    printableWindow?.document.write(this.reportContent());
    printableWindow?.document.close();
  }
  back = () => this.location.back();



sAccId:any;
fDate:any;
totalDr=0;
totalCr=0
ledger= new ILedgerMain();
ledArr= new Array<ILedgerMain>();
details= new Array<details>();
closingBalance=0;bal=0;totaldr=0;totalcr=0;drTotal=0; crTotal=0;
pTotaldr=0;
pTotalcr=0;
pDrTotal=0;
pCrTotal=0;
sAccName:any;mobileNo:any;
  getLedgerReport(e:any)
  {
    debugger
    this.refresh();
    this.totalDr=0;
  this.totalCr=0;
  
   
      this.service.getLedger(e,'0', this.fDate, this.tDate,0).subscribe(res=>
        {debugger
        
       if(res)
       {
        // this.isData=true;
        this.ledger=res;
        this.ledArr=res;
        this.details=res[0].details;
        this.sAccName=res[0].partyName;
     this.closingBalance=res[0].closingBalance;
     this.mobileNo=res[0].contactNo
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
      console.log(res)
      this.createLedgerReportPdf()
       }
       else
       {
        this.isData=false;
        // this.alertService.error('No Data Found');
       }
        })
    
      
  }

  PartyLedgerContent() {
    this.pTotaldr=0
  this.pTotalcr=0
  // this.getLedgerReport();
    this.ledArr.forEach((element:any ,index:any)=> {
   
      let det = element.details;
      for(let a of det)
      {
        if(index == 0)
      
      debugger
       {
        a.pBalance=0;
        this.bal = a.balance = 0; }
       if(a.drAmt> 0) 
       { this.bal = this.bal + a.drAmt; a.balance = this.bal; }
       if(a.crAmt > 0) 
       { this.bal =  this.bal- a.crAmt; a.balance = this.bal; }
       this.pTotaldr = this.pTotaldr + a.drAmt; 
       this.pTotalcr = this.pTotalcr + a.crAmt;
       a.pBalance=this.pTotaldr-this.pTotalcr
       debugger
       this.pDrTotal+=a.drAmt
       this.pCrTotal+=a.crAmt
      }
    });  
    debugger
    let content = `
      <html>
        <head>
          <title>General Ledger - ${this.sAccName}</title>
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
            <h1 style="margin-top: 35px;">General Ledger</h1>
            <br>
          
        
            <div class="nav-row" style="margin-top:10px">
            <table class="main-table" style="width:100%; border:0px solid #fff!important; padding:0px!important;">
            <tr>
            <td style="width:10%;border:0px solid #fff!important;"></td>
            <td style="border:0px solid #fff!important;"></td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">Date:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.todayDate}</td>
            </tr>
            <tr>
            <td style="width:10%;border:0px solid #fff!important;">Customer:</td>
            <td style="border:0px solid #fff!important;">${this.sAccName}</td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">Time:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.currentTime}</td>
            </tr>
            <tr>
            <td style="width:10%;border:0px solid #fff!important;">Phone Number:</td>
            <td style="border:0px solid #fff!important;">${this.mobileNo}</td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">From:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.fDate}</td>
            </tr>
            <tr>
            <td style="width:10%;border:0px solid #fff!important;">Closing Balance</td>
            <td style="border:0px solid #fff!important;">${this.closingBalance} </td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">To:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.tDate}</td>
            </tr>
            </table>
              
            </div>
            
        
            <!-- Your report content here -->
            <table class="data-table">
            <thead>
            <tr >
            <th style="width:10%">Date</th>
            <th style="text-align: center;">Details</th>
            <th style="text-align: left;width:10%">Debit</th>
            <th style="text-align: left;width:10%">Credit</th>
            <th style="text-align: left;width:10%">Balance</th>
            <tr>
            </thead>
              <tbody>`;
  
    for (let a of this.details) {
      content += `
        <tr>
        <td  style="width:10%">${this.pipe.transform(a.eDate,'dd-MMM-yy')}</td>
        <td  style="width:60%">${a.description}</td>
        <td style="text-align: left;width:10%">${a.drAmt}</td>
        <td style="text-align: left;width:10%">${a.crAmt}</td>
        <td style="text-align: left;width:10%">${a.pBalance}</td>
      
        </tr>`;
    }
  
    content += `
            </tbody>
            <tfoot style="border:2px solid #000000">
                          
            <tr  class="tfoot-head" style="border-bottom:2px solid #000000">
                <td colspan="2"  style="width:15%"><strong> Total Of All Transactions:</strong> </td>
                <td style="text-align: left; width: 10%;"><strong>${this.pDrTotal}</strong></td>
                <td style="text-align: left; width: 10%;"><strong>${this.pCrTotal}</strong></td>
                <td style="text-align: left; width: 10%;"><strong>${this.pDrTotal-this.pCrTotal}</strong></td>
            </tr>
            
          </tfoot>
          </table>
  
        </div>
      </body>
    </html>`;
  
    return content;
  }
  
  
  createLedgerReportPdf(){
    
    const printableWindow = window.open('', '_blank','width=800,height=600');
    printableWindow?.document.write(this.PartyLedgerContent());
    printableWindow?.document.close();
  
  }

  partyLedger=(e:any)=>{this.getLedgerReport(e.saccId)}
}
