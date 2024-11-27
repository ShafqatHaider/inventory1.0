import { Component, OnInit } from '@angular/core';
import { AccountConfigurations } from '../../supportives/AccountConfigurations';
import { Observables } from '../../../shared/services/observers';

@Component({
  selector: 'app-daybookindex',
  templateUrl: './daybookindex.component.html',
  styleUrl: './daybookindex.component.scss'
})
export class DaybookindexComponent implements OnInit{
config= AccountConfigurations.daybook;
/**
 *
 */
constructor(private observer:Observables) {
  
  
}

ngOnInit(): void {
  this.getData();
}
getData(){
  this.observer.getLookups(`${this.config.endPoints.getAll}${this.config.shared.companyId}/${this.config.shared.branchId}`)
}
add(){}
edit(){}
delete(){}
}
