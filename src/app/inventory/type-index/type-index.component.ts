import { Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';
import { Observables } from '../../shared/services/observers';
import { ModalService } from '../../shared/_components/modal/modal.service';
import { ModalComponent } from '../../shared/_components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-index',
  templateUrl: './type-index.component.html',
  styleUrl: './type-index.component.scss'
})
export class TypeIndexComponent {
  config = InventoryConfigurations.types; 
  constructor(private observer: Observables, private modalService: ModalService,private route:Router) {
  }
  ngOnInit(): void {
    this.getData();
  }
 
  getData(){
    this.observer.getLookups(`${this.config.endpoints.getAll}`).subscribe(res=>{this.config.data=res})
  }
  add() { this.openCreateModal() }
  edit() { }
  delete(e:any) {
    
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
    this.modalTitle = 'Create New Type';
    this.currentTemplate = this.createTemplate;
    this.modalService.initModal('reusableModal');
    this.modalService.open();
  }

  openEditModal(param: any) {
    debugger
    // this.config.model=param;
    this.modalTitle = 'Edit Type';
    this.currentTemplate = this.editTemplate;
    this.modalService.initModal('reusableModal');
    this.modalService.open();
  }
}
