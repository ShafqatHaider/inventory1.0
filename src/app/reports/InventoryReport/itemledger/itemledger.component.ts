import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { DatePipe, Location } from '@angular/common';
import { ICodeBrandLedger } from '../Interfaces/ICodeBrandLedger';

@Component({
  selector: 'app-itemledger',
  templateUrl: './itemledger.component.html',
  styleUrls: ['./itemledger.component.scss'],
})
export class ItemledgerComponent implements OnInit {
  isData = false;
  pdate: Date = new Date();
  tDate: any;
  fDate: any;
  constructor(
    public  service: ReportsService,
    public pipe: DatePipe,
    public location: Location
  ) {}

  bl = new ICodeBrandLedger();
  blArr = new Array<ICodeBrandLedger>();
  // fDate:any;
  // tDate:any;
  cid: any;
  tIn: number = 0;
  tOut: number = 0;
  tBal: number = 0;
  closingBal: number = 0;
  filterTerm: string = '';
  myDate: any;
  brandName: any;
  tQty = 0;
  totalIn = 0;
  totalOut = 0;
  items = [];
  ttype=[];
todayDate:any; currentTime:any;
  ngOnInit(): void {
    const currentDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    const currentTime = this.pipe.transform(new Date(), 'shortTime');
    this.todayDate=currentDate;
    this.currentTime=currentTime;
    this.tDate=new Date();
    let td= this.pipe.transform(this.tDate,'yyyy-MM-dd');
    this.tDate=td;
    this.fDate=new Date();
    let fd= this.pipe.transform(this.fDate,'yyyy-MM-dd');
    this.fDate=fd;
    this.service.getAllCodes().subscribe((res) => this.items=res);
  
  }
  onSelectItem = (e: any) => {this.cid = e.cid
  
    this.service.getStockFolioLookups(e.cid).subscribe(res=>this.ttype=res)
  };
folio:any;
  onSelectType=(e:any)=>{
    e?this.folio=e.transType:this.folio=''
  }
  rows: any = [this.blArr];
  // Define table headers
  headers = ['Date', 'Reff', 'Detail', 'In', 'Out', 'Cost', 'Rate', 'Balance'];
  // Set initial sorting configuration
  sortColumn = 'id';
  sortDirection = 'asc';
  // Function to handle sorting
  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
  // Function to apply sorting
  applySorting() {
    const sortOrder = this.sortDirection === 'asc' ? 1 : -1;
    this.rows.sort((a: any, b: any) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      return valueA > valueB ? sortOrder : valueA < valueB ? -sortOrder : 0;
    });
  }
  getReport() {
    this.tIn=0;
    this.tOut=0;
    this.tBal=0;
    if(this.folio)
    {
      this.service
      .getBrandLedger(this.cid, this.fDate, this.tDate,this.folio)
      .subscribe((res) => {
        if (res) {
          this.isData = true;
          this.bl = res;
          this.blArr = res;
          this.rows = res;
          this.brandName = this.blArr[0].brandName;

          this.blArr.forEach((element: any, index: any) => {
            if (index == 0) {
              this.tBal = element.balance = 0;
            }
            if (element.qtyIn > 0) {
              this.tBal = this.tBal + element.qtyIn;
              element.balance = this.tBal;
            }
            if (element.qtyOut > 0) {
              this.tBal = this.tBal - element.qtyOut;
              element.balance = this.tBal;
            }
            this.tIn = this.tIn + element.qtyIn;
            this.tOut = this.tOut + element.qtyOut;

            this.totalIn += element.qtyIn;
            this.totalOut += element.qtyOut;
          });
        } else {
          this.isData = false;
        }
      });
    }
    else
    {
      this.service
      .getBrandLedger(this.cid, this.fDate, this.tDate,'0')
      .subscribe((res) => {
        if (res) {
          this.isData = true;
          this.bl = res;
          this.blArr = res;
          this.rows = res;
          this.brandName = this.blArr[0].brandName;

          this.blArr.forEach((element: any, index: any) => {
            if (index == 0) {
              this.tBal = element.balance = 0;
            }
            if (element.qtyIn > 0) {
              this.tBal = this.tBal + element.qtyIn;
              element.balance = this.tBal;
            }
            if (element.qtyOut > 0) {
              this.tBal = this.tBal - element.qtyOut;
              element.balance = this.tBal;
            }
            this.tIn = this.tIn + element.qtyIn;
            this.tOut = this.tOut + element.qtyOut;

            this.totalIn += element.qtyIn;
            this.totalOut += element.qtyOut;
          });
        } else {
          this.isData = false;
        }
      });
    }
  }
  PartyLedgerContent() {
    debugger
    let content = `
      <html>
        <head>
          <title>Item Ledger - ${this.brandName}</title>
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
            <h1 style="margin-top: 35px;">Item Ledger</h1>
            <br>
          
        
            <div class="nav-row" style="margin-top:10px">
            <table class="main-table" style="width:100%; border:0px solid #fff!important; padding:0px!important;">
            <tr>
            <td style="width:10%;border:0px solid #fff!important;">Date:</td>
            <td style="border:0px solid #fff!important;">${this.todayDate}</td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">Time:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.currentTime}</td>
            </tr>
           <tr>
            <td style="width:10%;border:0px solid #fff!important;">From:</td>
            <td style="border:0px solid #fff!important;">${this.fDate}</td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">To:</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.tDate}</td>
            </tr>
            <tr>
            <td style="width:10%;border:0px solid #fff!important;">Item Name:</td>
            <td style="border:0px solid #fff!important;">${this.brandName} </td>
            <td style="width:10%;text-align:right;border:0px solid #fff!important;">Balance</td>
            <td  style="width:10%;text-align:right;border:0px solid #fff!important;">${this.tBal}</td>
            </tr>
            </table>
              
            </div>
            
        
            <!-- Your report content here -->
            <table class="data-table">
            <thead>
            <tr >
            <th style="width:10%">Date</th>
            <th style="width:10%">Reff</th>
            <th style="width:30%;text-align: center;">Details</th>
            <th style="text-align: left;width:10%">In</th>
            <th style="text-align: left;width:10%">Out</th>
            <th style="text-align: left;width:10%">Cost</th>
            <th style="text-align: left;width:10%">Rate</th>
            <th style="text-align: left;width:10%">Balance</th>
            <tr>
            </thead>
              <tbody>`;
  
    for (let a of this.blArr) {
      content += `
        <tr>
        <td style="font-weight: 600; width: 10%; text-align: left">${this.pipe.transform(a.lg_date, 'dd-MM-yy')}</td>
        <td style="width: 10%; text-align: left">${a.lg_type}</td>
        <td style="width: 30%; text-align: left">${a.narat}</td>
        <td style="text-align: right; width: 10%;">${a.qtyIn}</td>
        <td style="text-align: right; width: 10%;">${a.qtyOut}</td>
        <td style="text-align: right; width: 10%;">${a.cost}</td>
        <td style="text-align: right; width: 10%;">${a.salePrice}</td>
        <td style="text-align: right; width: 10%;" ><strong> ${a.balance}</strong></td>
      
        </tr>`;
    }
  
    content += `
            </tbody>
            <tfoot style="border:2px solid #000000">
                          
            <tr>
            <td colspan="3"><strong> Total </strong> </td>
            <td style="text-align: right;"><strong>${this.tIn}</strong></td>
            <td style="text-align: right;"><strong>${this.tOut}</strong></td>
            <td></td>
            <td></td>
            <td style="text-align: right;"><strong>${this.tBal}</strong></td>
        </tr>
            
          </tfoot>
          </table>
  
        </div>
      </body>
    </html>`;
  
    return content;
  }
  
  
  createReportPdf(){
   
    const printableWindow = window.open('', '_blank','width=800,height=600');
    printableWindow?.document.write(this.PartyLedgerContent());
    printableWindow?.document.close();
  
  }
  
}
