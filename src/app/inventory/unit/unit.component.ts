import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMeasurement } from 'src/app/shared/interface/IMeasurement';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    private formBuilder: FormBuilder,
  ) {}
  unit=new IMeasurement();
  unitForm: FormGroup | any;
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveUnit: EventEmitter<any> = new EventEmitter<any>();
  @Output() triggerGetUnitLookups = new EventEmitter<void>();

  ngOnInit(): void {
    this.unit.companyID=Number(localStorage.getItem('COMPANY_ID'));
    this.unit.branchID=Number(localStorage.getItem('BRANCH_ID'));
    this.createForm();
  }
  createForm(): void {
    debugger
    this.unitForm = this.formBuilder.group({
        cid:[this.unit.cid],
        measurementName:[this.unit.measurementName, Validators.required],
        measureQty:[this.unit.measureQty],
        companyID:[this.unit.companyID],
        branchID:[this.unit.branchID],
       
    });
  }

save() {
  this.saveUnit.emit(this.unit);
  debugger
  if (this.unit.measurementName) {
   
    this._IS.saveUnit(this.unit).subscribe((res) => {
   if(res){
     this.unitForm.reset();
     this.toast.success('New unit has been created Successfully!!');
     this.ngOnInit();
     this.closeModal.emit();
     this.triggerGetUnitLookups.emit();
   }
   
   });
 } else {
   // Form is invalid, show error messages
   // You can mark form controls as touched to display error messages
   this.markFormGroupTouched(this.unitForm);
 }
  
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
