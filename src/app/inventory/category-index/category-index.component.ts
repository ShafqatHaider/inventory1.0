import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Observables } from '../../shared/services/observers';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';
import { ModalService } from '../../shared/_components/modal/modal.service';
import { ModalComponent } from '../../shared/_components/modal/modal.component';
import { ICategory } from '../supportive/interfaces/ICategory';
import { TransactionService } from '../supportive/services/transaction.service';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.scss'
})
export class CategoryIndexComponent {
  config= InventoryConfigurations.category;
 
  constructor(private observer:Observables,private modalService: ModalService, private _trans: TransactionService) {
    
    
  }
  
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.observer.getLookups(`${this.config.endpoints.getAll}`).subscribe(res=>{
      this.config.data=res;
      // console.log(res)
    })
  }

delete(param:any){
    if(confirm('Do you want to delete the recored?'))
    this.observer.delete(`${this.config.endpoints.delete(param.cateID)}`).subscribe(res=>{
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
modalSize:any;

save(){
  if(this.config.model.title){
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
  alert('Please add category name first')
}
}
reset(){this.config.model=new ICategory()}
openCreateModal() {
  debugger
  this.modalTitle ='Create New Category' ;

  this.currentTemplate = this.createTemplate;
  this.modalService.initModal('reusableModal');
  this.modalService.open();
}

openEditModal(param:any) {
  debugger
  this.config.model=param;
  this.modalTitle = 'Edit Category';
  this.currentTemplate = this.editTemplate;
  this.modalService.initModal('reusableModal');
  this.modalService.open();
}
}
