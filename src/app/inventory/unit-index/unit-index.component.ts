import { Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';
import { Observables } from '../../shared/services/observers';
import { ModalService } from '../../shared/_components/modal/modal.service';
import { ModalComponent } from '../../shared/_components/modal/modal.component';
import { IUnits } from '../supportive/interfaces/IUnits';

@Component({
  selector: 'app-unit-index',
  templateUrl: './unit-index.component.html',
  styleUrl: './unit-index.component.scss'
})
export class UnitIndexComponent {
  config = InventoryConfigurations.units;
  constructor(private observer: Observables, private modalService: ModalService) {
  }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.observer.getLookups(`${this.config.endpoints.getAll}`)
  }
  add() { this.openCreateModal() }
  edit() { }
  delete(param:any){
    if(confirm('Do you want to delete the recored?'))
    this.observer.delete(`${this.config.endpoints.delete(param.cid)}`).subscribe(res=>{
      alert('Record deleted successfully!')
      
    })
    this.getData();
  }
  
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('createTemplate') createTemplate!: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;

  modalTitle = '';
  currentTemplate!: TemplateRef<any>;
  itemName = '';
  editItemName = '';
  disableSave = true;
  modalSize: any;
  openCreateModal() {
    this.modalTitle = 'Create New Unit';
    this.currentTemplate = this.createTemplate;
    this.modalService.initModal('reusableModal');
    this.modalService.open();
  }

  openEditModal(param: any) {
    this.config.model=param;
    this.modalTitle = 'Edit Unit';
    this.currentTemplate = this.editTemplate;
    this.modalService.initModal('reusableModal');
    this.modalService.open();
  }
  reset(){
    this.config.model=new IUnits();
  }
  save(){
    if(this.config.model.measurementName){
    this.observer.create(this.config.endpoints.create, this.config.model).subscribe(res=>{
      if(res)
      {
        alert('Record created successfully!');
        this.getData();
        this.modalService.close();
       this.reset(); 
      }
    })
  }
  else{
    alert('Please add Unit name first')
  }
  }
}
