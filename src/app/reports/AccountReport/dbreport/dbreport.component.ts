import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IDaybookRepo } from '../interfaces/IDaybookRepo';
import { ReportsService } from '../../reports.service';
import { ProgressService } from 'src/app/services/progress.service';
@Component({
  selector: 'app-dbreport',
  templateUrl: './dbreport.component.html',
  styleUrls: ['./dbreport.component.scss'],
  
})
export class DbreportComponent implements OnInit {
  dbRepo = new Array <IDaybookRepo>();
  dbArr = new Array<IDaybookRepo>();
  fDate: any;
  tDate: any;
  isData = false;
  total: number = 0;
  filterTerm: string = '';
  todayDate: any;
  currentTime: any;
  ttype=[];  progress: number = 0;
  constructor(
    private _RS: ReportsService,
    public route: Router,
    public pipe: DatePipe,
    public location: Location,
    private acroute: ActivatedRoute,
    private progressService: ProgressService
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
    this._RS.GetAllTransactionTypesLookups().subscribe(res=>this.ttype=res)
  }
  transType:any;
  onSelectType=(e:any)=>{
    e?this.transType=e.lg_type:this.transType=''
  }
  getReport() {
    debugger
    this.progressService.startProgress();
   if(this.transType)
   {
  
    this._RS.GetDaybookReport(this.fDate, this.tDate,this.transType).subscribe((res) => {
      if (res) {
        
        this.isData = true;
        this.dbRepo = res;
        this.dbArr = res;
        console.log(res)
        for (let i = 0; i < this.dbArr.length; i++) {
          for (let x = 0; x < this.dbArr[i].eType.length; x++) {
            console.log(this.dbArr[i].eType[x].ttype);

            for (let y of this.dbArr[i].eType[x].details) {
              this.dbArr[i].eType
                .filter((b) => {
                  b.ttype === this.dbArr[i].eType[x].ttype;
                })
                .reduce(function (x: any, y: any) {
                  let total = x + y.dr;
                  console.log(total);
                }, 0);
            }
          }
        }
        this.progressService.endProgress();
      }
      else
      {
        this.isData=false;
        this.progressService.endProgress();
      }
    });
   }
   else
   {
    this._RS.GetDaybookReport(this.fDate, this.tDate,'0').subscribe((res) => {
      if (res) {
        this.isData = true;
        this.dbRepo = res;
        this.dbArr = res;
        console.log(res)
        for (let i = 0; i < this.dbArr.length; i++) {
          for (let x = 0; x < this.dbArr[i].eType.length; x++) {
            console.log(this.dbArr[i].eType[x].ttype);

            for (let y of this.dbArr[i].eType[x].details) {
              this.dbArr[i].eType
                .filter((b) => {
                  b.ttype === this.dbArr[i].eType[x].ttype;
                })
                .reduce(function (x: any, y: any) {
                  let total = x + y.dr;
                  console.log(total);
                }, 0);
            }
          }
        }
        this.progressService.endProgress();
      }
      else
      {
        this.isData=false;
        this.progressService.endProgress();
      }
    });
   }
  }
  reportContent() {
    let content = `<html>
    <head>
      <title>DAYBOOK REPORT</title>
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
    <h2>DAYBOOK REPORT </h2>
    </div>
    <br>
    `;
    this.dbArr.forEach(a => {
        content += `
            <div class="card border-0 shadow mt-3" >
                
                    <p style="text-align:center"><strong>Date: </strong> ${this.pipe.transform(a.lg_Date,'dd-MM-yyyy')}</p>

                    <hr>
                `;
        a.eType.forEach(b => {
            content += `
            <p style="text-align:center" ><strong>Transaction Type: </strong>${b.ttype}</p>
                <div class="card-body p-0 m-0">
                    <div class="table-responsive-sm">
                       
                       
                        <table class="table table-hover table-sm w-table table-bordered">
                            <thead>
                                <tr>
                                  
                                    <th style="width: 30%; text-align: left">A/C Name</th>
                                    <th style="width: 30%; text-align: left">Description</th>
                                    <th style="width: 10%; text-align: left">Folio</th>
                                    <th style="width: 10%; text-align: right">Debit</th>
                                    <th style="width: 10%; text-align: right">Credit</th>
                                </tr>
                            </thead>
                            <tbody>`;
            b.details.forEach(c => {
                content += `
                                <tr>
                                   
                                    <td style="width: 30%; text-align: left">${c.saccName}</td>
                                    <td style="text-align: left; width: 30%">${c.remarks}</td>
                                    <td style="text-align: left; width: 10%">${c.folio}</td>
                                    <td style="text-align: right; width: 10%">${c.dr}</td>
                                    <td style="text-align: right; width: 10%">${c.cr}</td>
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
