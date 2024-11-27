import { Component, OnInit } from '@angular/core';
import { AccountConfigurations } from '../../supportives/AccountConfigurations';
import { Observables } from '../../../shared/services/observers';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrl: './account-index.component.scss',
  standalone:false
})
export class AccountIndexComponent implements OnInit{
  constructor(private observers:Observables) { }
data:any[]=[]
add(){}
edit(){}
delete(){}
config= AccountConfigurations.accounts;
branchId=4;
companyId=4;
ngOnInit(): void {
  this.observers.getLookups(this.config.endPoints.getAll+this.companyId+'/'+this.branchId).subscribe(res=>{this.config.data=res; console.log(this.config.data)})
}
}
