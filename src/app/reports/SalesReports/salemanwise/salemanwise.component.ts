import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISaleManWise } from '../../AllReportsInterfaces/ISaleManWise';

@Component({
  selector: 'app-salemanwise',
  templateUrl: './salemanwise.component.html',
  styleUrls: ['./salemanwise.component.scss']
})
export class SalemanwiseComponent implements OnInit {
smArr= new Array <ISaleManWise>();
filterTerm=''
  constructor(public _RS:ReportsService, public route:Router, public acroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._RS.getRptSaleMan().subscribe(res=>{
      this.smArr=res;
      console.log(res)
    })
  }
  back(){
    this.route.navigate(['/admin/dashboard'])
  }
}
