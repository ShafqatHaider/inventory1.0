import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { UsermanagmentService } from 'src/app/userManagement/usermanagment.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISubCate } from '../../shared/interface/ISubcategory';
import { internal } from 'src/app/shared/interface/internal-standard';
declare var window: any;

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  subCate = new ISubCate();
  subCateArr = new  Array<ISubCate>();
  subArr = new Array<ISubCate>();
  filterTerm: string = '';
  formModal: any;
  scid: any;
  eDate: any;
  constructor(
    private _US: UsermanagmentService,
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    public location:Location,
    private toastr:ToastrService,
    private formBuilder: FormBuilder
  ) {}
  assign: any;
  groupId: any;
  lcid: any;
  role: any;
  formName: any;
  isRead: any;
  isWrite: any;
  isDelete: any;
  elem: any;
  userRoles: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  fDate: any;
  tDate: any;
  bit = 0;
  scateForm: FormGroup | any;
  scate= new ISubCate();
@ViewChild('input') input : ElementRef|any;
loading:boolean=false;
  focusInput() {
    this.input.nativeElement.focus();
    this.setCursorToEnd(this.input.nativeElement);
  }

  setCursorToEnd(input: HTMLInputElement) {
    input.setSelectionRange(input.value.length, input.value.length);
  }
  getUserRoles(){
    debugger
    this.assign = Number(localStorage.getItem('ASSIGN'));
    this.lcid = Number(localStorage.getItem('LINKED_COMPANY_ID'));
    this.groupId = Number(localStorage.getItem('GROUP_ID'));
    this._US.getRolesById(this.lcid, this.groupId).subscribe((rep) => {
      this.userRoles = rep.userDetails;
      if (this.userRoles) {
        this.elem = this.userRoles.filter((e: any) => {
          this.formName = e.formName;
          if (this.formName == 'SubCategory') {
            this.isRead = e.cRead;
            this.isWrite = e.cWrite;
            this.isDelete = e.cDelete;
          }
        });
      }
    });
  }
  ngOnInit(): void {
    this.getUserRoles();
    this.createForm()
    this.getData();
    // 

    // 
  }
  createForm(): void {
    debugger
    this.subCate.eDate=new Date();
    let ddate = this.pipe.transform(this.subCate.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;
    this.subCate.eDate=this.eDate;
    this.scateForm = this.formBuilder.group({
        scid:[this.subCate.scid],
        eDate:[this.subCate.eDate],
        subTitle:[this.subCate.subTitle, Validators.required],
        subTitleU:[this.subCate.subTitleU],
        companyID:[this.subCate.companyID],
        branchID:[this.subCate.branchID],
      });
  }
  // CORE FUNCTIONS
  getData = () =>
    this._IS.getAllSubCates().subscribe(
      (res) => 
      {
        debugger
        this.subCateArr = res;
        this.subArr=res;
        this.subCateArr.sort((a, b) => {
          // Replace 'property' with the property name you want to sort by
          return a.scid - b.scid; 
        });
      },
      (error) => console.log(error)
    );
  onTableDataChange = (event: any) => {
    this.page = event;
    this.getData();
  };
  onTableSizeChange = (event: any): void => {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getData();
  };
  isCategoryDuplicate(subTitle:any) 
  {
    debugger
    return this.subArr.some((cate:any) => cate.subTitle === subTitle);
  }
  save() {
debugger
this.loading=true;
if(this.scate.subTitle){
  this._IS.saveSubCate(this.scate).subscribe((res) => {
    if(res && !this.scid){
      this.scate=new ISubCate();
     this.toastr.success('New category created Successfully!!','Success');
      this.getData();
      this.loading=false
    }
    if(this.scid)
    {
      this.scate=new ISubCate();
     this.toastr.success('Category updated Successfully!!', 'success');
      this.getData();
      this.loading=false
    }
    });
    
}
else{
  this.toastr.error('Please add a title');
  this.loading=false
}    
this.focusInput();
   }
   branchName=internal.branchName


  edit = (subcate: any) =>
  {
    debugger
    this.scid=subcate.scid;
    if (subcate.scid) {
      this._IS.getSubCateById(subcate.scid).subscribe((data) => {
        data.eDate=new Date();
        let ddate = this.pipe.transform(data.eDate, 'yyyy-MM-dd');
        this.eDate=ddate;
        this.scate = data;
        this.scate.eDate=this.eDate;
        // this.scateForm.patchValue({
        //   ...data,
        //   eDate: ddate // Patch the formatted date
        // }); 
      });
    }
    this.focusInput();
  }


  delete = (subcate: any) => {

debugger
    if(subcate.used!==0){
      this.toastr.warning('This Sub Categody is used, you cannot delete this sub category.');
    }
    else{
      var result = confirm('Do you want to delete?');
    if (result) {
      this._IS.deleteSubCate(subcate.scid).subscribe((res) => {
        this.toastr.error('Sub category has been deleted successfully!!');
        this.ngOnInit();
      });
    }
    }
   
  };

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
