import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGodown } from 'src/app/shared/interface/IGodown';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  constructor(private service: InventoryService) { }
godown= new IGodown();
@Input() displayModal:boolean=false;
@Output() closeGoModal:EventEmitter<any>= new EventEmitter<any>();
@Output() saveGodown:EventEmitter<any>= new EventEmitter<any>();
@Output() triggerGetGodownLookups:EventEmitter<any>= new EventEmitter<any>();
  ngOnInit(): void {
    this.godown.companyId = Number(localStorage.getItem('COMPANY_ID'));
  }


save(){
  if(this.godown.goName){
    this.service.saveGodown(this.godown).subscribe(res=>{
      if(res){
        this.godown=new IGodown();
        this.triggerGetGodownLookups.emit();
      }
    })
    this.closeGoModal.emit();
  }
}
close() {
  this.closeGoModal.emit();
}

}
