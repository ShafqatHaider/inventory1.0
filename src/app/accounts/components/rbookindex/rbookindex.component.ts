import { Component, OnInit } from '@angular/core';
import { AccountConfigurations } from '../../supportives/AccountConfigurations';
import { Observables } from '../../../shared/services/observers';

@Component({
  selector: 'app-rbookindex',
  templateUrl: './rbookindex.component.html',
  styleUrl: './rbookindex.component.scss'
})
export class RbookindexComponent implements OnInit{
add(){}
edit(){}
delete(){}
config=AccountConfigurations.receipt
/**
 *
 */
constructor(private observer:Observables) {
  
  
}
ngOnInit(): void {
  
}
getData(){
this.observer.getLookups(this.config.endPoints.getAll).subscribe(res=>this.config.data=res)
}
}
