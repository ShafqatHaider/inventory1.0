import { Component, OnInit } from '@angular/core';
import { AccountConfigurations } from '../../supportives/AccountConfigurations';
import { Observables } from '../../../shared/services/observers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrl: './account-index.component.scss',
  standalone:false
})
export class AccountIndexComponent implements OnInit{
  constructor(private observers:Observables,private route:Router) { }
data:any[]=[]
onAdd(){this.route.navigate(['/Accounts/new-account'])}
onEdit(e:any){this.route.navigate(['/Accounts/new-account'+e.accID])}
onDelete(e:any){
  if(confirm('Do you want to delete this record?')){
    this.observers.delete(`${this.config.endPoints.delete(e.accID)}`).subscribe((res:any)=>{
      if(res){
        alert('Record Deleted successfully!');
        this.getData();
      }
    });
  }
}
config= AccountConfigurations.accounts;

ngOnInit(): void {
 this.getData();
}
getData(){
  this.observers.getLookups(`${this.config.endPoints.getAll}`).subscribe(res=>{this.config.data=res})
}
}
