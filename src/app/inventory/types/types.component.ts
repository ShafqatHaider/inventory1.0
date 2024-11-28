import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICodeEType } from 'src/app/shared/interface/ICodeEType';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
  constructor(
    
    private toastr: ToastrService,
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    private formBuilder: FormBuilder
  ) {}
  eType = new ICodeEType();
  newForm: FormGroup | any;
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveType: EventEmitter<any> = new EventEmitter<any>();
  @Output() triggerGetTypeLookups = new EventEmitter<void>();
  eDate: any;
  ngOnInit(): void {
    this.eType.companyId = Number(localStorage.getItem('COMPANY_ID'));
    this.createForm();
  }
  createForm(): void {
    this.newForm = this.formBuilder.group({
      cid: [this.eType.cid],
      eType: [this.eType.eType, Validators.required],
      companyId: [this.eType.companyId],
    });
  }
  triggerParentGetTypeLookups() {
    this.triggerGetTypeLookups.emit();
  }
  save() {
    debugger
    this.saveType.emit(this.eType);
     
  
      this._IS.saveCodeType(this.eType).subscribe((res) => {
        if (res) {
          this.toastr.success('New type has been created Successfully!!');
          this.ngOnInit();
          this.eType=new ICodeEType();
          this.closeModal.emit();
          this.triggerParentGetTypeLookups()
        }
      });
  
  
  
  
  
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  close() {
    this.closeModal.emit();
  }
}
