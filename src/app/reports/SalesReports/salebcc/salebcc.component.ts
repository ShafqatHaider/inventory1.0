import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { ISaleBCC } from '../../AllReportsInterfaces/ISaleBCC';
@Component({
  selector: 'app-salebcc',
  templateUrl: './salebcc.component.html',
  styleUrls: ['./salebcc.component.scss'],
})
export class SalebccComponent implements OnInit {
  bccRepo: any = new Array<ISaleBCC>();
  dataBcc: any;
  tDate: any;
  fDate: any;
  bills: any;
  pName: any;
  sorted: any;
  eDate: any;
  val: any;
  bccLookups: any;
  totalCash: any = 0;
  totalRet: any = 0;
  totalDiscount: any = 0;
  NoB: any = 0;
  filterTerm: string = '';
  billType = [];
  DateGroup = [];
  isData = false;
  todayDate: any;
  currentTime: any;totalSale=0;
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
    this.service.getBccReport(this.fDate, this.tDate).subscribe((res) => {
      if (res) {
        this.isData = true;
        this.bccRepo = res;
        for (let a of this.bccRepo) {
          this.billType = a.party;
          this.DateGroup = a.eDate;

          this.totalCash = a.totalCashRece;
          this.totalRet = a.totalRet;
          this.totalDiscount = a.totalDis;
          this.totalSale = a.totalSale;
        }
      } else {
        this.isData = false;
      }
    });
  }

  reportContent() {
    let content = `<html>
    <head>
      <title>BCC Report</title>
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
    <h2>BCC Report</h2>
    </div>
  
    <br>
    <div class="nav-row" style="margin-top:10px">
          <table class="main-table" style="width:100%; border:0px solid #fff!important; padding:0px!important;">
          <tr>
          <td style="width:10%;border:0px solid #fff!important;"></td>
          <td style="width:10%;border:0px solid #fff!important;">Print Date:</td>
          <td style="border:0px solid #fff!important;">${this.todayDate}</td>
          <td style="width:10%;text-align:right;border:0px solid #fff!important;">Print Time:</td>
          <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.currentTime}</td>
          </tr>
          <tr>
          <td style="width:10%;border:0px solid #fff!important;"></td>
          <td style="width:10%;border:0px solid #fff!important;">From:</td>
          <td style="border:0px solid #fff!important;">${this.fDate}</td>
          <td style="width:10%;text-align:right;border:0px solid #fff!important;">To:</td>
          <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.tDate}</td>
          </tr>
       
            <tr style="margin-top:10px">
              <td style="font-weight: bold;" rowspan="2" colspan="2">Grand Total:</td>
            <td style="font-weight: bold;text-align: center;">Total Sale</td>
            <td style="font-weight: bold;text-align: center;">Total Retrun</td>
            <td style="font-weight: bold;text-align: center;">Total Discount</td>
            <td style="font-weight: bold;text-align: center;">Total Cash Received</td>
            </tr>
            <tr>
         
              
            <td style="font-weight: bold;text-align: center;">${this.totalSale}</td>
              <td style="font-weight: bold;text-align: center;">${this.totalRet}</td>
              <td style="font-weight: bold;text-align: center;">${this.totalDiscount}</td>
              <td style="font-weight: bold;text-align: center;">${this.totalCash}</td>
            </tr>
         
          </table>
            </div>
       
          <hr>
    `;
    this.bccRepo.forEach((a:any) => {
        content += `
            <div class="card border-0 shadow mt-3" >
                
               
                    <table>
                <thead style="background:#cecece; margin-top:10px; margin-bottom:10px;">
                  <tr>
                    <th style="width: 20%; text-align: left">Date</th>
                    <th style="width: 20%; text-align: left">Total Cash Received</th>
                    <th style="width: 20%; text-align: left">Total Sale</th>
                    <th style="width: 20%; text-align: left">Total Return</th>
                    <th style="width: 20%; text-align: left">Total Discount</th>
      
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 20%; text-align: left">${this.pipe.transform(a.eDate,'dd-MM-yyyy')}</td>
                    <td style="width: 20%; text-align: left">${a.totalCashRece}</td>
                    <td style="width: 20%; text-align: left">${a.totalSale}</td>
                    <td style="width: 20%; text-align: left">${a.totalRet}</td>
                    <td style="width: 20%; text-align: left">${a.totalDis}</td>
                  </tr>
                </tbody>
               
              </table>
                    <hr>
                `;
        a.party.forEach((b:any) => {
            content += `
            <table style="background:#cecece; margin-top:10px; margin-bottom:10px;">
                        <td style="font-weight: bold;">Bill Type: </td>
                        <td style="text-align: right;">${b.billType}</td>
                        <td style="font-weight: bold;">Total Cash Received</td>
                        <td style="text-align: right;">${b.totalCashRece}</td>
                        <td style="font-weight: bold;">Total Sale</td>
                        <td style="text-align: right;">${b.totalSale}</td>
                        <td style="font-weight: bold;">Total Return</td>
                        <td style="text-align: right;">${b.totalRet}</td>
                        <td style="font-weight: bold;">Total Discount</td>
                        <td style="text-align: right;">${b.totalDis}</td>
                      </table>
        
                <div class="card-body p-0 m-0">
                    <div class="table-responsive-sm">
                       
                       
                        <table class="table table-hover table-sm w-table table-bordered">
                            <thead>
                                <tr>
                                <th style="width: 20%; text-align: left">Bill#</th>
                      <th style="width: 50%; text-align: left">Party</th>
                      <th style="width: 10%; text-align: right">Sale</th>
                      <th style="width: 10%; text-align: right">Return</th>
                      <th style="width: 10%; text-align: right">Discount</th>
                                </tr>
                            </thead>
                            <tbody>`;
            b.bills.forEach((c:any) => {
                content += `
                                <tr>
                                <td style="width: 20%; text-align: left">${c.smId}</td>
                                <td style="width: 50%; text-align: left">${c.partyName}</td>
                                <td style="text-align: right; width: 10%;">${c.gSales}</td>
                                <td style="text-align: right; width: 10%;">${c.sReturn}</td>
                                <td style="text-align: right; width: 10%;">${c.discountUser}</td>
                                </tr>`;
            });
            content += `
                            </tbody>
                            <tfoot>
                      <tr>
                          <td rowspan="2"><b>Total:</b> </td>
                          <td></td>
                          <td style="text-align: right;"><b>Cash Received</b></td>    
                          <td style="text-align: right;"><b>Return</b></td>    
                          <td style="text-align: right;"><b>Discount</b></td>    
                      </tr>
                    <tr>
                      <td></td>
                          <td style="width: 10%; text-align: right;">${a.totalCashRece}</td>
                          <td style="width: 10%; text-align: right;">${a.totalRet}</td>
                          <td style="width: 10%; text-align: right;">${a.totalDis}</td>
                      
                    </tr>
                  </tfoot>
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

  viewBill(sale: any) {
    this.route.navigate(['/inventory/saleview/' + sale.smId]);
  }

}
