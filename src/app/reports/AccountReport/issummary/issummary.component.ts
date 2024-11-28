import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { ReportsService } from '../../reports.service';
import { ISummaryReport } from '../interfaces/ISummaryReport';

@Component({
  selector: 'app-issummary',
  templateUrl: './issummary.component.html',
  styleUrls: ['./issummary.component.scss']   
})
export class IssummaryComponent implements OnInit {
  @Input() periodic: boolean = false;
  @Input() today: boolean = true;
  
  loading: boolean = true; // Flag to indicate loading state
  dataLoaded: boolean = false; // Flag to indicate if data is loaded
  capital:number=0;
  gp:number=0; np:number=0;
  banner = false;
  cgs:number=0;
  expenses:number=0;
  grossProfit:number=0;
  netCapital:number=0;
  netProfit:number=0;
  preCapital:number=0;
  sales:number=0;
  isData=false;
  isPeriodic=false;
  isToday=true;
  opt:any;
summary= new Array<ISummaryReport>();
  constructor(public  service: ReportsService, public route:Router, public acroute:ActivatedRoute,public location:Location,
   public pipe:DatePipe ) { }
   todayDate:any;
   currentTime:any;
   fDate:any;
   tDate:any;
   tillDate:any;
  ngOnInit(): void {
   this.opt=1
    const currentDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    const currentTime = this.pipe.transform(new Date(), 'shortTime');
    this.todayDate = currentDate;
    this.currentTime = currentTime;

    this.tDate = new Date();
    let td = this.pipe.transform(this.tDate, 'yyyy-MM-dd');
    this.tDate = td;
    
    this.fDate = new Date();
    let fd = this.pipe.transform(this.fDate, 'yyyy-MM-dd');
    this.fDate = fd;
    
  
  }
  
getReport(){
  this.service.getSummary(this.fDate,this.tDate,this.opt).subscribe(res=>{
    if(res)
    {
    // Parse the date string into a Date object
let dateObject = new Date(this.fDate);

// Subtract one day from the date
let tillDate=dateObject.setDate(dateObject.getDate() - 1);
this.tillDate=tillDate
// Format the updated date back into a date string (in the same format)
let updatedDateString = dateObject.toISOString().slice(0, 10);
      this.summary=res;
    this.cgs=res[0].cgs;
     this.expenses=res[0].expenses;
    this.grossProfit=res[0].grossProfit;
    this.netCapital=res[0].netCapital;
    this.netProfit=res[0].netProfit;
    this.preCapital=res[0].preCapital;
    this.sales=res[0].sales;
    
    this.loading = false;
    this.dataLoaded = true;
    this.isData=true;
    }
    else{
      this.isData=false;
      this.loading = true;
      this.dataLoaded = false;
    }
  })
  // this._RS.getSummary().subscribe(res=>{
  //   this.summary=res;
  //   this.cgs=res[0].cgs;
  //    this.expenses=res[0].expenses;
  //   this.grossProfit=res[0].grossProfit;
  //   this.netCapital=res[0].netCapital;
  //   this.netProfit=res[0].netProfit;
  //   this.preCapital=res[0].preCapital;
  //   this.sales=res[0].sales;
  //   })
}
periodicChanged(value: boolean){
  this.isPeriodic=value;
  this.opt=2
  this.today=false
}
todayChanged(value: boolean){
  this.isToday=value;
  this.opt=1
  this.periodic=false
}

  reportContent() {
 
    debugger
    let content = `
      <html>
        <head>
          <title>SUMMARIZED INCOME STATEMENT</title>
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
            <h1 style="margin-top: 35px;">SUMMARIZED INCOME STATEMENT</h1>
            <br>
          
        
            <div class="nav-row" style="margin-top:10px">
            <table class="main-table" style="width:100%; border:0px solid #fff!important; padding:0px!important;">
            <tr>
            <td style="width:10%;border:0px solid #fff!important;">Date:</td>
            <td style="border:0px solid #fff!important;">${this.todayDate}</td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">Time:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.currentTime}</td>
            </tr>
            
            </table>
              
            </div>
            
        
            <!-- Your report content here -->
            <table>
            <tr>
              <th>Particulars</th>
              <th>Amount</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td><b>Previous Capital</b></td>
              <td class="empty-cell"></td>
              <td>${this.preCapital}</td>
            </tr>
            <tr>
              <td><b>SALES</b></td>
              <td>${this.sales}</td>
              <td class="empty-cell"></td>
            </tr>
            <tr>
              <td><b>C.G.S</b></td>
              <td>${this.cgs}</td>
              <td class="empty-cell"></td>
            </tr>
            <tr>
              <td><b>Gross Profit</b></td>
              <td>${this.grossProfit}</td>
              <td class="empty-cell"></td>
            </tr>
            <tr>
              <td><b>Less Expenses</b></td>
              <td>${this.expenses}</td>
              <td class="empty-cell"></td>
            </tr>
            <tr>
              <td><b>Net Profit</b></td>
              <td>${this.netProfit}</td>
              <td class="empty-cell"></td>
            </tr>
            <tr>
              <td><b>Net Capital</b></td>
              <td class="empty-cell"></td>
              <td>${this.netCapital}</td>
            </tr>
          </table>
   
  
   
          </table>
  
        </div>
      </body>
    </html>`;
  
    return content;
  }
  
  
  exportPdf(){
    this.getReport();
    const printableWindow = window.open('', '_blank','width=800,height=600');
    printableWindow?.document.write(this.reportContent());
    printableWindow?.document.close();
  
  }


  
}
