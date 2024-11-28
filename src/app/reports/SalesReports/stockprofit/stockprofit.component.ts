import { Component, OnInit } from '@angular/core';
import { DatePipe} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { IStockProfit } from '../../AllReportsInterfaces/IStockProfit';
import { Location } from '@angular/common';
@Component({
  selector: 'app-stockprofit',
  templateUrl: './stockprofit.component.html',
  styleUrls: ['./stockprofit.component.scss']
})
export class StockprofitComponent implements OnInit {

  constructor(private route: Router,
     private acroute: ActivatedRoute, private service: ReportsService, public location: Location,public pipe:DatePipe) { }
  sProfit= new Array<IStockProfit>();
  filterTerm: string = '';
  qtyTotal:number=0;
  billTotal: number=0;
  sale: number=0; qty:number=0; pRate:number=0; tAmt:number=0; tMar:number=0; tmAmt:number=0; cgs:number=0
  fDate:any;
  tDate:any;
  isData=false;
  todayDate: any;
  currentTime: any;
  ngOnInit(): void {
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
  getReport()
  {
    this.service.getStockProfitReport(this.fDate, this.tDate).subscribe(
      res=>{
        if(res)
        {
          this.isData=true
          this.sProfit=res;
          console.log(res)
          for(let i=0; i<this.sProfit.length; i++)
          {
            this.sale+=this.sProfit[i].saleRate;
            this.qty+=this.sProfit[i].itemSold;
            this.pRate+=this.sProfit[i].costRate;
            this.tAmt+=this.sProfit[i].saleAmount;
            this.tMar+=this.sProfit[i].itemMargin;
            this.tmAmt+=this.sProfit[i].itemMarginAmt;
            this.cgs+=this.sProfit[i].costRate*this.sProfit[i].itemSold;
          }
        }
        else
        {
          this.isData=false;
        }
      }
    )
  }
  reportContent() {
   let content = `<html>
   <head>
     <title>Stock Wise Profit Report</title>
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
   <h2>Stock Wise Profit Report</h2>
   </div>
 
   <br>
   <div class="nav-row" style="margin-top:10px">
         <table class="main-table" style="width:100%; border:0px solid #fff!important; padding:0px!important;">
         <tr>
         <td style="width:10%;border:0px solid #fff!important;">Print Date:</td>
         <td style="border:0px solid #fff!important;">${this.todayDate}</td>
         <td style="width:10%;text-align:right;border:0px solid #fff!important;">Print Time:</td>
         <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.currentTime}</td>
         </tr>
         <tr>
         <td style="width:10%;border:0px solid #fff!important;">From:</td>
         <td style="border:0px solid #fff!important;">${this.fDate}</td>
         <td style="width:10%;text-align:right;border:0px solid #fff!important;">To:</td>
         <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.tDate}</td>
         </tr>
         <tr>
         <td style="width:10%;border:0px solid #fff!important;">Total Sale:</td>
         <td style="border:0px solid #fff!important;">${this.tAmt}</td>
         <td style="width:10%;text-align:right;border:0px solid #fff!important;">Total Purchase:</td>
         <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.cgs}</td>
         <td style="width:10%;text-align:right;border:0px solid #fff!important;">Total Margin:</td>
         <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.tmAmt}</td>
         </tr>
        
         
         </table>
           
         </div>
         <hr>
         <table class="table table-hover table-sm w-table table-bordered">
         <thead>
       
             <tr>
               <th style="width: 30%; text-align: left">ٰItem name</th>
               <th style="width: 10%; text-align: right">Sale Rate</th>
               <th style="width: 10%; text-align: right">Purchase Rate</th>
               <th style="width: 10%; text-align: right">Qty</th>
               <th style="width: 10%; text-align: right">Sale Amount</th>
               <th style="width: 10%; text-align: right">CGS</th>
               <th style="width: 10%; text-align: right">Margin</th>
               <th style="width: 10%; text-align: right">Margin Amt</th>
           </tr>
             
         </thead>
         <tbody>
        
   `;
   this.sProfit.forEach((p:any) => {
       content += `
         
       <tr >
        
           <td style="width: 30%; text-align: left"><strong>${p.codeName}</strong></td>
           <td style="width: 10%; text-align: right">${p.saleRate}</td>
           <td style="width: 10%; text-align: right">${p.costRate}</td>
           <td style="width: 10%; text-align: right">${p.itemSold}</td>
           <td style="width: 10%; text-align: right">${p.saleAmount}</td>
           <td style="width: 10%; text-align: right">${p.costRate*p.itemSold}</td>
           <td style="width: 10%; text-align: right">${p.itemMargin}</td>
           <td style="width: 10%; text-align: right">${p.itemMarginAmt}</td>
           </tr>
      `;
   });
   content+=`
   

   </tbody>
   
 </table>
   
       </div>
   </body>
   </html>
   `
   debugger
   return content;
 }
 
 
 createReportPdf() {
   debugger
   this.getReport();
   const printableWindow = window.open('', '_blank','width=800,height=600');
   printableWindow?.document.write(this.reportContent());
   printableWindow?.document.close();
 }
 
}
