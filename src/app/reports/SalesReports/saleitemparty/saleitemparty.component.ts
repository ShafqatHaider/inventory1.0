import { Component, OnInit } from '@angular/core';
import { ISaleItemParty } from '../../AllReportsInterfaces/ISaleItemParty';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-saleitemparty',
  templateUrl: './saleitemparty.component.html',
  styleUrls: ['./saleitemparty.component.scss']
})
export class SaleitempartyComponent implements OnInit {
  saleItem= new Array<ISaleItemParty>();
  saleItemArr= new Array<ISaleItemParty>();
  filterTerm:string="";
  qtyTotal:number=0;
  billTotal: number=0;
  saleArray=[];
  products:any=[];
  bills:any=[];
  tDate:any;
  fDate:any;
  isData=false;
  todayDate: any;
  currentTime: any;
  grandTotalQty=0;grandTotalAmt=0;totalReturn=0;
  totalReturnAmt=0;totalMargin=0;
  constructor(private route: Router, private acroute: ActivatedRoute, 
     private service: ReportsService, public location: Location, public pipe:DatePipe) { }

  ngOnInit(): void {
     // 
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
    this.service.getIPSaleReport(this.fDate, this.tDate ).subscribe(res=>{
    
      if(res){
        this.isData=true;
        this.saleItem= res;
      this.saleArray=res;
      this.saleItemArr=res;
      console.log(res)
     debugger
      this.saleArray.forEach((elem:any)=>{
          this.products= elem.party;
          debugger
          this.products.forEach((e:any)=>{
            debugger
            this.bills= e.bills
            this.bills.forEach((t:any)=>{
              debugger
              this.qtyTotal+=t.qty;
              this.billTotal+=t.amount;
              this.totalReturn+=t.returnQty;
              this.totalReturnAmt+=t.returnAmt;
              this.totalMargin+=t.margin;
            })
          
          })
      
          
      })
      }
      else
      {
        this.isData=false;
      }
    })
  }
 
  reportContent() {
    let content = `<html>
    <head>
      <title>Item & Party Wise Sale Report</title>
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
    <h2>Item & Party Wise Sale Report</h2>
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
          <tr  style="margin-top:10px;margin-bottom:10px; ">
            <td style="width: 20%;font-weight: bold; background:#cecece;" colspan="2" rowspan="2">Grand Total:</td>
            
            <td style="font-weight: bold;text-align:right;background:#cecece;">Sold Qty</td>
            <td style="font-weight: bold;text-align:right;background:#cecece;">Sold Amount</td>
            <td style="font-weight: bold;text-align:right;background:#cecece;">Retrun Qty</td>
            <td style="font-weight: bold;text-align:right;background:#cecece;">Return Amount</td>
            <td style="font-weight: bold;text-align:right;background:#cecece;">Margin</td>
          </tr>
          <tr  style="margin-top:10px;margin-bottom:10px;">

           
            <td style="font-weight: bold;text-align:right;">${this.qtyTotal}</td>
            <td style="font-weight: bold;text-align:right;">${this.billTotal}</td>
            <td style="font-weight: bold;text-align:right;">${this.totalReturn}</td>
            <td style="font-weight: bold;text-align:right;">${this.totalMargin}</td>
          </tr>
          </table>
     
          </div>
          <hr>
    `;
    this.saleItemArr.forEach((a:any) => {
        content += `
            <div  >
            <table style="margin-top:10px; margin-bottom:10px; background-color: #000;color:#fff; font-weight:bold;">
            <tr>
            <td style="width:30%">Item Name: </td>
            <td >${a.variety}</td>
            <td >Total Item Sold Qty:</td>
            <td style="text-align:right">${a.totalCodeQty}</td>
            <td >Total Item Sold Qty:</td>
            <td style="text-align:right">${a.totalCodeReturnQty}</td>
            <td >Total Item Margin:</td>
            <td style="text-align:right">${a.totalCodeMargin}</td>
            </tr>

            </table>
               
                `;
        a.party.forEach((b:any) => {
            content += `
            <table style="margin-top:10px; margin-bottom:10px; background-color: #cecece; font-weight:bold;">
            <td style="width:30%">Party Name:</td>
            <td > ${b.partyName}</td>
            <td >Total Sold Qty To Party</td>
            <td style="text-align:right">${b.totalPartyQty}</td>
            <td >Total Retrun Qty</td>
            <td style="text-align:right">${b.totalPartyReturnQty}</td>
            <td >Total Margin</td>
            <td style="text-align:right">${b.totalPartyMargin}</td>
            
            </table>
                <div class="card-body p-0 m-0">
                    <div class="table-responsive-sm">
                       
                       
                        <table class="table table-hover table-sm w-table table-bordered">
                            <thead>
                                <tr>
                                <th style="text-align: left">Bill#</th>
                                <th style="text-align: left">Date</th>
                                <th style="text-align: left">Remarks</th>
                                <th style="text-align: right">Sold Qty</th>
                                <th style="text-align: right">Returned Qty</th>
                                <th style="text-align: right">Net Qty</th>
                                <th style="text-align: right">Rate</th>
                                <th style="text-align: right">Sale Amount</th>
                                <th style="text-align: right">Return Amount</th>
                                <th style="text-align: right">Net Amount</th>
                                <th style="text-align: right">Margin</th>
                                </tr>
                            </thead>
                            <tbody>`;
            b.bills.forEach((c:any) => {
                content += `
                                <tr>
                                <td style=" text-align: left">${c.smId}</td>
                                <td style=" text-align: left">${this.pipe.transform(c.edate,'dd-MM-yyyy')}</td>
                                <td style=" text-align: left">${c.remarks}</td>
                                <td style="text-align: right;">${c.saleQty}</td>
                                <td style="text-align: right;">${c.returnQty}</td>
                                <td style="text-align: right;">${c.netQty}</td>
                                <td style="text-align: right;">${c.rate}</td>
                                <td style="text-align: right;">${c.saleAmt}</td>
                                <td style="text-align: right;">${c.returnAmt}</td>
                                <td style="text-align: right;">${c.netAmt}</td>
                                <td style="text-align: right;">${c.margin}</td>
                                </tr>`;
            });
            content += `
                            </tbody>
                           
                        </table>
                    </div>
                </div>`;
        });
        content += `
            </div>`;
    });
    
content+=`
</body>
    </html>
`
    return content;
  }


 createReportPdf() {
    this.getReport();
    const printableWindow = window.open('', '_blank','width=800,height=600');
    printableWindow?.document.write(this.reportContent());
    printableWindow?.document.close();
  }
}


