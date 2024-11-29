import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { DatePipe, Location } from '@angular/common';
import { IPurchase } from '../supportive/interfaces/IPurchase';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';


@Component({
  selector: 'app-purchase-index',
  templateUrl: './purchase-index.component.html',
  styleUrls: ['./purchase-index.component.scss']
})
export class PurchaseIndexComponent implements OnInit {
  // branchName=internal.branchName


  config=InventoryConfigurations.puchase;
  purchase = new Array <IPurchase>();
  add(){}
  
  filterTerm: string = '';
  formModal: any;
  cId: any;
  bit = 0;
  eDate: any;
  assign: any;
  groupId: any;
  lcid: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  role: any;
  formName: any;
  isRead: any;
  isWrite: any;
  isDelete: any;
  elem: any;
  userRoles: any;
  constructor(
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    // private _US: UsermanagmentService,
    public location:Location
  ) {}

  ngOnInit(): void {
    this.tDate = new Date();
    this.fDate = new Date();
    let ffd = new Date().setDate(this.fDate.getDate() - 30);
    let td = this.pipe.transform(this.tDate, 'yyyy-MM-dd');
    let fd = this.pipe.transform(ffd, 'yyyy-MM-dd');
    this.tDate = td;
    this.fDate = fd;
    // let ddate = this.pipe.transform(this.purchase.eDate, 'yyyy-MM-dd');
    // this.eDate = ddate;

    this.assign = Number(localStorage.getItem('ASSIGN'));
    this.lcid = Number(localStorage.getItem('LINKED_COMPANY_ID'));
    this.groupId = Number(localStorage.getItem('GROUP_ID'));
    this.getData();
  }

  // CORE FUNCTIONS

  getData = () =>
    this._IS.getAllPurchases().subscribe(
      (res) => (this.purchase = res),
      (error) => console.log(error)
    );
  onTableDataChange = (event: any) => {
    this.page = event;
    this.getData();
    this.getFilteredData();
  };
  onTableSizeChange = (event: any): void => {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getData();
    this.getFilteredData();
  };

  fDate: any;
  tDate: any;
  getFilteredData = () => {
    this._IS.getAllPurchaseFilterByDate(this.fDate, this.tDate).subscribe(
      (res) => {
        this.purchase = res;
      },
      // res.sort((a:any, b:any) => (a.title < b.title ) ? -1 : 1)}
      (error) => console.log(error)
    );
    this.bit = 1;
    this.closeDateModal();
  };

  back = () => this.route.navigate(['/admin/dashboard']);

  openFormModal = () => this.formModal.show();
  newPurchase = () => this.route.navigate(['/inventory/purchase-voucher']);
  newPurchaseWithST = () => this.route.navigate(['/inventory/purchasetax-invoice']);
  editSTPurchase=(grn:any)=>{ debugger 
    this.route.navigate(['/inventory/purchasetax-invoice/'+grn.pMid]);}
  edit = (code: any) =>
    this.route.navigate(['/inventory/purchase-voucher/' + code.pMid]);

  delete = (code: any) => {
    var result = confirm('Do you want to delete?');
    if (result) {
      this._IS.deletePurchase(code.pMid).subscribe((res) => {
        alert('Purchase has been deleted!!');
        this.ngOnInit();
      });
    }
  };
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
    if (this.cId) {
      this.route.navigate(['/inventory/code']);
    } else {
      this.ngOnInit();
    }
  }

  //UTILITIES

  dateDisplay = 'none';
  openDateModal = () => (this.dateDisplay = 'block');
  closeDateModal = () => (this.dateDisplay = 'none');
  refresh = () => {
    this.bit = 0;
    this.ngOnInit();
  };
}
