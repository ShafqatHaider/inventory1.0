import { DatePipe, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReportsService } from '../../reports.service';
import { ICodeStockList } from '../Interfaces/ICodeStockList';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss'],
})
export class StocklistComponent implements OnInit {
  @Input() filter: boolean = false;
  isData = false;
  todayDate: any;
  currentTime: any;
  items: string[] = ['Chemical'];
  selectedItem: string = '';
  constructor(
    private service: ReportsService,
    private route: Router,
    private pipe: DatePipe,
    public acroute: ActivatedRoute,
    public location: Location
  ) {}
  stockList = new Array<ICodeStockList>();
  filterTerm: string = '';
  bnid: any;
  totalQty: number = 0;
  totalQtyIn: number = 0;
  cate = [];
  tQtyOut: number = 0;
  totalStockValue: number = 0;
  stockValue: number = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  fDate: any;
  tDate: any;
  bit = 0;
  cateId: any;
  scateId: any;
  tillDate: any;
  isFilter = false;
  ngOnInit(): void {
    this.service.getCateLookups().subscribe((res) => {
      this.cate = res;
      console.log(res);
    });

    const currentDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    const currentTime = this.pipe.transform(new Date(), 'shortTime');
    this.todayDate = currentDate;
    this.currentTime = currentTime;
    this.tillDate = new Date();
    let td = this.pipe.transform(this.tillDate, 'yyyy-MM-dd');
    this.tillDate = td;
    this.fDate = new Date();
    let fd = this.pipe.transform(this.fDate, 'yyyy-MM-dd');
    this.fDate = fd;
    this.scateId = 0;
    this.cateId = 0;
  }
  onSelectCategory = (e: any) => {
    e ? (this.cateId = e.cateID) : (this.cateId = 0);
  };
  filterChanged(value: boolean) {
    this.isFilter = value;
    if (!this.isFilter) {
      this.cateId = 0;
    }

    // You can now use the 'value' parameter in your TypeScript code
  }

  // CORE FUNCTIONS
  getReport = () => {
    this.stockValue = 0;
    this.totalQty = 0;
    this.totalQtyIn = 0;
    this.tQtyOut = 0;
    this.scateId = 0;
    this.totalStockValue = 0;
    //  this.cateId=0
    this.service
      .getStockList(this.cateId, this.scateId, this.tillDate)
      .subscribe((res) => {
        if (res) {
          this.isData = true;
          this.stockList = res;

          for (let i = 0; i < this.stockList.length; i++) {
            this.totalQty += Number(this.stockList[i].balQty);
            this.totalQtyIn += Number(this.stockList[i].qtyIn);
            this.tQtyOut += Number(this.stockList[i].qtyOut);

            this.stockValue = Number(
              this.stockList[i].costRate * this.stockList[i].balQty
            );
            this.totalStockValue += Number(this.stockValue);
          }
        } else {
          this.isData = false;
        }
      });
  };

  PartyLedgerContent() {
    let content = `
      <html>
        <head>
          <title>Stock List</title>
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
            <h1 style="margin-top: 35px;">Stock List</h1>
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
            <tr>
            <th style=" text-align: left">ٰItem name</th>
            <th style=" text-align: right">Cost</th>
            <th style=" text-align: right">S.Price</th>
            <th style=" text-align: right">Qty In</th>
            <th style=" text-align: right">Qty Out</th>
            <th style=" text-align: right">Balance</th>
            <th style=" text-align: right">Value</th>
        </tr>
            <tr>
            </thead>
              <tbody>`;

    for (let code of this.stockList) {
      content += `
        <tr>
                        <td style=" text-align: left">${code.itemName}</td>
                        <td style=" text-align: right">${code.costRate}</td>
                        <td style=" text-align: right">${code.salerate}</td>
                        <td style=" text-align: right">${code.qtyIn}</td>
                        <td style=" text-align: right">${code.qtyOut}</td>
                        <td style=" text-align: right">${code.balQty}</td>
                        <td style=" text-align: right">${
                          code.balQty * code.costRate
                        }</td>
      
        </tr>`;
    }

    content += `
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3"><b>Total</b></td>
              <td style="text-align: right;"><b>${this.totalQtyIn}</b></td>
              <td style="text-align: right;"><b>${this.tQtyOut}</b></td>
              <td style="text-align: right;"><b>${this.totalQty}</b></td>
              <td style="text-align: right;"><b>${this.totalStockValue}</b></td>
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
