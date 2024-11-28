import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { UsermanagmentService } from 'src/app/userManagement/usermanagment.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../shared/interface/ICategory';
import { internal } from 'src/app/shared/interface/internal-standard';
declare var window: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
@ViewChild('input') input : ElementRef|any;
loading:boolean=false;
  category = new ICategory();
  categoryArr = new Array<ICategory>();
  cateArr=new Array<ICategory>();
  filterTerm: string = '';
  formModal: any;
  cateId: any;
  eDate: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  fDate: any;
  tDate: any;
  bit = 0;
  branchName=internal.branchName
  constructor(
    private _US: UsermanagmentService,
    private formBuilder: FormBuilder,
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    public location:Location,
    private  toastr: ToastrService

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
  cateForm: FormGroup | any;
getUserRoles(){
  this.assign = Number(localStorage.getItem('ASSIGN'));
  this.lcid = Number(localStorage.getItem('LINKED_COMPANY_ID'));
  this.groupId = Number(localStorage.getItem('GROUP_ID'));
  this._US.getRolesById(this.lcid, this.groupId).subscribe((rep) => {
    this.userRoles = rep.userDetails;
    if (this.userRoles) {
      this.elem = this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        if (this.formName == 'Category') {
          this.isRead = e.cRead;
          this.isWrite = e.cWrite;
          this.isDelete = e.cDelete;
        }
      });
    }
  });

}
getLocalStoreData(){
  this.category.branchID=Number(localStorage.getItem('BRANCH_ID'))
  this.category.companyID=Number(localStorage.getItem('COMPANY_ID'))
  this.category.operatorID=Number(localStorage.getItem('OPERATOR_ID'))
}
ddate:any;
  ngOnInit(): void {
    
    this.getUserRoles();
    this.createForm();
    this.getLocalStoreData();
    this.getData();
    this.focusInput()
  }

getDate(){
  this.category.eDate=new Date();
  let ddate = this.pipe.transform(this.category.eDate, 'yyyy-MM-dd');
  this.ddate = ddate;
  this.category.eDate=this.ddate;
  
}
  createForm(): void {
    
 this.getDate();
    this.cateForm = this.formBuilder.group({
        cateID:[ this.category.cateID,],
        eDate:[this.category.eDate],
        title:[this.category.title, Validators.required],
        titleU:[this.category.titleU],
        companyID:[this.category.companyID],
        branchID:[this.category.branchID],
        operatorID:[this.category.operatorID],
        used:[this.category.used]
    });

  }
  
  // CORE FUNCTIONS
  getData = () =>
    this._IS.getAllCategories().subscribe(
      (res) => {this.categoryArr = res;this.cateArr=res},
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

  back() {
    this.route.navigate(['/admin/dashboard']);
  }
  isCategoryDuplicate(title:any) {
    debugger
    return this.cateArr.some((cate:any) => cate.title === title);
}
  save() {
    this.getData();
    this.loading=true;
    this._IS.saveCategory(this.category).subscribe((res) => {
      if(res && !this.cateId){
        if(res)
        {
          
          this.category=new ICategory();
          this.toastr.success('New category created Successfully!!', 'Success!');
          this.loading=false;
          this.ngOnInit();
        }
      }
      if(this.cateId)
        {
          this.category=new ICategory();
          this.toastr.success('category Updated Successfully!!', 'Success!');
          this.loading=false;
          this.ngOnInit();
        }
     
      },
      error=>{
        this.toastr.warning('Duplicate record found!!', 'Error!');
        this.loading=false;
      //  alert (`${error.error} `)
       this.category=new ICategory();
      });
  
      this.focusInput()
   
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  edit(cate: any) {
    this.cateId=cate.cateID;
    this._IS.getCategoryById(cate.cateID).subscribe((data)=>{
      
      data.eDate=new Date();
      let ddate = this.pipe.transform(data.eDate, 'yyyy-MM-dd');
      this.ddate=ddate;
      this.category=data;
      this.category.eDate=this.ddate
      
      this.focusInput()
    })
    //this.route.navigate(['inventory/category/' + cate.cateID]);
   
  }

  focusInput() {
    this.input.nativeElement.focus();
    this.setCursorToEnd(this.input.nativeElement);
  }

  setCursorToEnd(input: HTMLInputElement) {
    input.setSelectionRange(input.value.length, input.value.length);
  }
  
  delete(cate: any) {

    if(cate.used!==0){
      this.toastr.warning('This Categody is used, you cannot delete this category.','Alert')
      
    }
    else{
      var result = confirm('Do you want to delete?');
      if (result) {
        this._IS.deleteCategory(cate.cateID).subscribe((res) => {
          res ?? this.toastr.error('Category has been delete successfully!!','Info');
          this.ngOnInit();
        });
      }   
    }
   
   
  }
  
}
