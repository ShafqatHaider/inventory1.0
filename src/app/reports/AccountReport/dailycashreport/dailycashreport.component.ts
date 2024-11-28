import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router , ActivatedRoute} from '@angular/router';
import { IDailyCashReport } from '../interfaces/IDailyCashReport';
import { ReportsService } from '../../reports.service';

@Component({
  selector: 'app-dailycashreport',
  templateUrl: './dailycashreport.component.html',
  styleUrls: ['./dailycashreport.component.scss']
})
export class DailycashreportComponent implements OnInit {

dcRepo:any= new Array<IDailyCashReport>();
tDate: any;

  fDate:any;
  bills:any;
  pName:any;
  sorted:any;
  eDate:any;
  val:any;
  bccLookups:any;
  totalCash:any=0;
  totalRet:any=0;
  totalDiscount: any=0;
  NoB:any=0;
  filterTerm:string="";
  billType=[];
  DateGroup=[];
  sbills:any;
  drTotal=[];
  crTotal=[];
  lDate:any;
  prevCash:number=0
  totalCashReceive:number=0;
  expnPayments:number=0;
  constructor(private service: ReportsService, private route: Router, 
    private pipe : DatePipe, private acroute: ActivatedRoute) { }

  ngOnInit(): void {
   // 
   this.fDate = this.acroute.snapshot.params['fDate'];
   this.tDate = this.acroute.snapshot.params['tDate'];
  let ddate=this.pipe.transform(this.fDate, 'yyyy-MM-dd')
  this.fDate=ddate;
  this.tDate = new Date();//this.acroute.snapshot.params['tDate'];
    let todate=this.pipe.transform(this.tDate, 'yyyy-MM-dd')
    this.tDate=todate;
    //this.acroute.snapshot.params['fDate'];
   
    this.service.getDailyCashReport(this.fDate,this.tDate ).subscribe(res=>
      {
        this.dcRepo=res;
        //console.log(this.dcRepo);
       

  
  //        // 
    for(let a of this.dcRepo){

      this.billType=a.party
      this.DateGroup=a.eDate;
      //this.drTotal=a.party;
      this.prevCash=a.prevCash;
      for(let b of a.party){
        this.totalCashReceive = b.totalDr;
      }
      for(let b of a.party){
        this.drTotal=b;
        this.drTotal.forEach((e:any)=>{
           // 
          this.expnPayments = e.totalCr;

        })
      }
      console.log(this.totalCashReceive +"-----" + this.expnPayments)
      // this.drTotal.forEach(
      //   (e:any)=>{
      //      // 
      //     this.totalCashReceive=Number(e.totalDr);
      //     this.expnPayments=Number(e.totalCr);
      //     console.log(e.totalCr +"-----" + this.expnPayments)
      //   }
      // )
      
       
      
        this.totalCash= a.totalCashRece;
        this.totalRet=a.totalRet;
        this.totalDiscount=a.totalDis;
      //console.log(this.totalCash, this.totalRet,this.totalDiscount)
      // this.sorted=this.groupBy(this.billType, (b:any)=>b.billType)
      // this.grouped=this.groupBy(this.DateGroup, (d:any)=>d.eDate)
    };
       
    // 
    // this.grouped=this.groupBy(this.sorted, (s:any)=>s.billType);
    // // console.log(this.sorted)
  // console.log(this.grouped);
      })
  }
  back(){
   
    this.route.navigate(['/admin/dashboard']);
  }
  exportPdf(){
    
    let data= document.getElementById('print')?.innerHTML;
     var originalContents = document.body.innerHTML;
     (document as any).body.innerHTML = data;
     (window as any).print();
     document.body.innerHTML = originalContents;
  }
}
