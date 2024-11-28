import { Component, Input, OnInit } from '@angular/core';
import { IItemWiseProfit } from '../../AllReportsInterfaces/IItemWiseProfit';
import { ReportsService } from '../../reports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
@Component({
  selector: 'app-itemwiseprofit',
  templateUrl: './itemwiseprofit.component.html',
  styleUrls: ['./itemwiseprofit.component.scss']
})
export class ItemwiseprofitComponent implements OnInit {
  @Input() periodic: boolean = false;
  @Input() today: boolean = true;
  @Input() filter: boolean = false;
  constructor(private _RS:ReportsService, private route:Router,
    private acroute: ActivatedRoute, public location: Location, public pipe: DatePipe) { }
  itemProfit = new Array<IItemWiseProfit>();
  filterTerm = '';
  margin: number = 0;
  tProfit: number = 0;
  isData = false;
  todayDate: any;
  rows: any = []
  isPeriodic = false;
  isToday = true;
  opt: any;
  fDate: any;
  tDate: any;
  tillDate: any;
  currentTime: any; totalSoldQty = 0; totalReturnedQty = 0; totalNetQty = 0; totalCostAmt = 0; totalSaleAmt = 0
  cate = [];
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
    this._RS.getCateLookups().subscribe(res => this.cate = res)
  }
  periodicChanged(event:Event) {
    const inputElement = event.target as HTMLInputElement;
    this.isPeriodic = inputElement.checked;
    this.opt = 2
    this.today = false
  }
  todayChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.isToday = inputElement.checked;
    this.opt = 1;
    this.periodic = false;
  }
  
  cateId = 0; isFilter = false;
  onSelectCategory = (e: any) => {
    e ? this.cateId = e.cateID : this.cateId = 0
  }
  filterChanged(event:Event) {
    const inputElement = event.target as HTMLInputElement;
    this.isFilter = inputElement.checked;
    if (!this.isFilter) {
      this.cateId = 0;
    }

    // You can now use the 'value' parameter in your TypeScript code
  }
  getTotal = (res: any) => {
    for (let i = 0; i < res.length; i++) {
      this.totalSoldQty += res[i].soldQty;
      this.totalReturnedQty += res[i].returnQty;
      this.totalNetQty += res[i].netqty;
      this.totalCostAmt += res[i].costAmt;
      this.totalSaleAmt += res[i].saleAmt
      this.margin = res[i].margin;
      this.tProfit += res[i].margin;

    }
  }
  getReport() {
    this.tProfit = 0; this.margin = 0
    this.totalSoldQty = 0; this.totalReturnedQty = 0; this.totalNetQty = 0; this.totalCostAmt = 0; this.totalSaleAmt = 0
    if (this.opt) {
      if (this.cateId) {
        this._RS.getItemWiseProfit(this.fDate, this.tDate, this.cateId, this.opt).subscribe(res => {
          if (res) {
            this.isData = true;
            this.itemProfit = res;
            this.rows = res;
            this.getTotal(res);
          }
          else {
            this.isData = false;
          }


        }
        )
      }
      else {
        this._RS.getItemWiseProfit(this.fDate, this.tDate, 0, this.opt).subscribe(res => {
          if (res) {
            this.isData = true;
            this.itemProfit = res;
            this.rows = res;
            this.getTotal(res)
          }
          else {
            this.isData = false;
          }


        }
        )
      }
    }


  }


  // Define table headers
  headers = ['Item Name', 'Sold Qty', 'Return Qty', 'Net Qty', 'Sale Amount', 'Cost Amount', 'Profit'];

  // Set initial sorting configuration
  sortColumn = 'id';
  sortDirection = 'asc';

  // Function to handle sorting
  onSort(column: string) {
    debugger
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting() {
    if (this.sortColumn) {
      this.rows.sort((a: any, b: any) => {
        const valA = a[this.sortColumn];
        const valB = b[this.sortColumn];
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      });
    }
  }
  PartyLedgerContent() {

    debugger
    let content = `
      <html>
        <head>
          <title>ITEM WISE PROFIT REPORT</title>
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
            .tableFixHead {
              max-height: 300px;
              overflow-y: scroll;
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
            <td style="width:10%;border:0px solid #fff!important;">Date:</td>
            <td style="border:0px solid #fff!important;">${this.todayDate}</td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">Time:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.currentTime}</td>
            </tr>
           
            </table>
              
            </div>
            
        
            <!-- Your report content here -->
            <table class="data-table">
            <thead>
            <tr >
            <th style="width: 35%; text-align: left;">Item Name</th>
                    <th style="width: 10%; text-align: right;">Sold Qty</th>
                    <th style="width: 10%; text-align: right;">Returned Qty</th>
                    <th style="width: 10%; text-align: right;">Net Qty</th>
                    <th style="width: 15%; text-align: right;">Sale Amount</th>
                    <th style="width: 15%; text-align: right;">Cost Amount</th>
                    <th style="width: 15%; text-align: right;">Profit</th>
            <tr>
            </thead>
              <tbody>`;

    for (let c of this.itemProfit) {
      content += `
        <tr>
        <td style="width: 35%; text-align: left;">${c.codeName}</td>
                    <td style="width: 10%; text-align: right;">${c.soldQty}</td>
                    <td style="width: 10%; text-align: right;">${c.returnQty}</td>
                    <td style="width: 10%; text-align: right;">${c.netqty}</td>
                    <td style="width: 15%; text-align: right;">${c.saleAmt}</td>
                    <td style="width: 15%; text-align: right;">${c.costAmt}</td>
                    <td style="width: 15%; text-align: right;">${c.saleAmt - c.costAmt}</td>
      
        </tr>`;
    }

    content += `
            </tbody>
            <tfoot>
            <tr>
        <td colspan="4">Total Profit</td>
 
                    <td style="width: 15%; text-align: right;"><b>${this.tProfit}</b></td>
      
        </tr>
            
            </tfoot>
          </table>
  
        </div>
      </body>
    </html>`;

    return content;
  }


  createReportPdf() {

    const printableWindow = window.open('', '_blank', 'width=800,height=600');
    printableWindow?.document.write(this.PartyLedgerContent());
    printableWindow?.document.close();

  }
}
