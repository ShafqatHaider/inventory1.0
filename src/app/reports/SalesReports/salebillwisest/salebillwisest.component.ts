import { Component, OnInit } from '@angular/core';
import { ISaleBillWiseST } from '../../AllReportsInterfaces/ISaleBillWiseST';
import { DatePipe } from '@angular/common';
import { ReportsService } from '../../reports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-salebillwisest',
  templateUrl: './salebillwisest.component.html',
  styleUrls: ['./salebillwisest.component.scss']
})
export class SalebillwisestComponent implements OnInit {
  saleBillWise: any = new ISaleBillWiseST();
  saleBillArr: any = new Array<ISaleBillWiseST>();
  saleArr: any = [];
  filterTerm = '';
  tDate: any;
  fDate: any;
  billType: any;
  DateGroup: any;
  totalCash: any;
  totalRet: any;
  totalDiscount: any;
  totalBillMargin = 0;
  totalBillAmount = 0;
  isData = false;
  todayDate: any;
  currentTime: any;
  constructor(
    private service: ReportsService,
    private route: Router,
    private pipe: DatePipe,
    public acroute: ActivatedRoute,
    public location: Location
  ) {}
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
  getReport() {
    this.service.getBWSaleWithSTReport(this.fDate, this.tDate).subscribe((res) => {
    if(res)
    {
      this.isData=true;
      this.saleBillWise = res;
      this.saleBillArr=res;
      res.forEach((tb: any) => {
        this.saleArr.push(tb.bills);
      });

      for (let i = 0; i < this.saleArr.length; i++) {
         
        let billArr = this.saleArr[i];
        for (let i = 0; i < billArr.length; i++) {
           
          this.totalBillAmount += billArr[i].amount;
          this.totalBillMargin += billArr[i].margin;
        }
      }
      for (let a of this.saleBillWise) {
        this.billType = a.party;
        this.DateGroup = a.eDate;
      }
    }
    else
    {
      this.isData=false;
    }
    });
  }
  reportContent() {
    debugger
    let content = `<html>
    <head>
      <title>Bill Wise Sale Report</title>
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
    <h2>Bill Wise Sale Report</h2>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between">
    <div>Date: ${this.todayDate}</div>
    <div>Time: ${this.currentTime}</div>
    </div>
    <br>
    `;
    
        this.saleBillArr.forEach((b:any) => {
          debugger
            content += `
            <div style="display:flex; justify-content:space-between">
            <div>Bill No: ${b.smId}</div>
            <div></div>
            <h4 >Bill Date: ${this.pipe.transform(b.eDate,'dd-MM-yyyy')}</h4>
                </div>
                       
            <div style="display:flex; justify-content:space-between">
            <div>
            Party Name: ${b.partyName}
            </div>
           
                </div>
                       
                       
                        <table class="table table-hover table-sm w-table table-bordered">
                            <thead>
                                <tr>
                                <th style="width: 50%; text-align: left;">Item</th>
                                <th style="width: 10%; text-align: right;">Qty</th>
                                <th style="width: 10%; text-align: right;">Rate</th>
                                <th style="width: 10%; text-align: right;">Amount</th>
                                <th style="width: 10%; text-align: right;">Margin</th>
                                <th style="width: 10%; text-align: right;">Sale Tax</th>
                                </tr>
                            </thead>
                            <tbody>`;
            b.bills.forEach((c:any) => {
                content += `
                                <tr>
                                <td style="width: 50%; text-align: left;">${c.itemName}</td>
                                <td style="width: 10%; text-align: right;">${c.qty}</td>
                                <td style="width: 10%; text-align: right;">${c.rate}</td>
                                <td style="width: 10%; text-align: right;">${c.amount}</td>
                                <td style="width: 10%; text-align: right;">${c.margin}</td>
                                <td style="width: 10%; text-align: right;">${c.saleTaxAmount}</td>
                                </tr>`;
            });
            content += `
                            </tbody>
                           
                            <tfoot>
                            <tr>
                               <td colspan="3"><b>TOTAL</b></td>
                               <td style="width: 20%; text-align: right;"><b>${b.totalBill}</b></td>
                               <td style="width: 20%; text-align: right;"><b>${b.totalMargin}</b></td>
                               <td style="width: 20%; text-align: right;"><b>${b.totalSaleTaxAmount}</b></td>
                             </tr>
                           </tfoot>
                        </table>
                  `;
        });
        content += `
            </div>`;
   
    
content+=`
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


}
