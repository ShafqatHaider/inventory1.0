import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
declare var document :any;
@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" tabindex="-1" id="reusableModal" aria-labelledby="modalLabel" aria-hidden="true" >
      <div class="modal-dialog {{ size }}">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ng-container *ngIf="template; else componentContent">
              <ng-container *ngTemplateOutlet="template"></ng-container>
            </ng-container>
            <ng-template #componentContent>
              <ng-container *ngIf="component">
                <ng-container *ngComponentOutlet="component"></ng-container>
              </ng-container>
            </ng-template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="onSaveClick()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [

    `
 .modal-backdrop {
  display:none!important;
}

.modal {
  z-index: 1050 !important;
}


    `
    
  ],standalone:false
})
export class ModalComponent {

  @Input() title: string = 'Modal Title';
  @Input() size: string = 'modal-sm'; // Supports 'modal-sm', 'modal-lg', 'modal-xl'
  @Input() template?: TemplateRef<any>; // For passing template
  @Input() component?: any; // For passing component
  @Input() disableSave: boolean = false;

  @Output() save = new EventEmitter<void>();
  

  // ngOnInit() {
  //   const modalElement = document.getElementById('reusableModal');
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     modal.show();
  //   }
  // }
  onSaveClick() {
    this.save.emit();
  }
}
