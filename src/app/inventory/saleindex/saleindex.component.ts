import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { DatePipe, Location } from '@angular/common';
import { INewSale } from 'src/app/shared/interface/INewSale';
import { internal } from 'src/app/shared/interface/internal-standard';

@Component({
  selector: 'app-saleindex',
  templateUrl: './saleindex.component.html',
  styleUrls: ['./saleindex.component.scss']
})
export class SaleindexComponent implements OnInit {

 
  constructor(
    public acroute: ActivatedRoute,
    public _IS: InventoryService,
    public route: Router,
    public pipe: DatePipe,
    // private _US: UsermanagmentService,
    public location: Location
  ) {}
  branchName=internal.branchName
  nsale = new INewSale();
  saleData = new Array<INewSale>();
  filterTerm: string = '';
  formModal: any;
  paginatedData: any[] = [];
  eDate: any;
  cId: any;
  pageItems = [10, 20, 50, 100];
  itemsPerPage: number = 0;
  currentPage = 1;
  assign: any;
  groupId: any;
  lcid: any;
  role: any;
  formName: any;
  isRead: any;
  isWrite: any;
  isDelete: any;
  elem: any;
  userRoles: [] = [];
  bit = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit() {
     
    let ddate = this.pipe.transform(this.nsale.eDate, 'yyyy-MM-dd');
    this.eDate = ddate;

    this.tDate = new Date();
    this.fDate = new Date();
    let ffd = new Date().setDate(this.fDate.getDate() - 30);
    let td = this.pipe.transform(this.tDate, 'yyyy-MM-dd');
    let fd = this.pipe.transform(ffd, 'yyyy-MM-dd');
    this.tDate = td;
    this.fDate = fd;

    this.assign = Number(localStorage.getItem('ASSIGN'));
    this.lcid = Number(localStorage.getItem('LINKED_COMPANY_ID'));
    this.groupId = Number(localStorage.getItem('GROUP_ID'));

    // this._US.getRolesById(this.lcid, this.groupId).subscribe(rep=>{
    //   this.userRoles=rep.userDetails

    //   console.log(rep.userDetails)
    //   if(this.userRoles)
    //   {
    //       this.elem= this.userRoles.filter((e:any)=>{
    //         this.formName= e.formName
    //         if(this.formName=='SaleIndex')
    //         {
    //           this.isRead=e.cRead
    //           this.isWrite=e.cWrite
    //           this.isDelete=e.cDelete
    //         }
    //       })
    //     }
    //  })

    this.getData();
  }
  // CORE FUNCTIONS

  getData = () =>
    this._IS.getSalesLookups().subscribe(
      (res) => {
        this.nsale = res;
        this.saleData = res;
        console.log(this.saleData);
      },
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
    this._IS.getAllSalesFilterByDate(this.fDate, this.tDate).subscribe(
      (res) => {
        this.nsale = res;
        this.saleData = res;
      },
      // res.sort((a:any, b:any) => (a.title < b.title ) ? -1 : 1)}
      (error) => console.log(error)
    );
    this.bit = 1;
    this.closeDateModal();
  };

  back = () => this.route.navigate(['/admin/dashboard']);
  selectPages = (event: any) => (this.itemsPerPage = event.target.value);
  newSaleWithST = () => this.route.navigate(['/inventory/saletax-invoice']);

  // NEW SALE
  newSale = () => this.route.navigate(['/inventory/sale-invoice']);
  // VIEW
  viewBill = (sale: any) =>
    this.route.navigate(['/inventory/saleview/' + sale.sMid]);
  // EDIT
  edit = (sale: any) => {
     
    this.route.navigate(['/inventory/sale-invoice/' + sale.sMid]);
  };
  editSTSale = (sale: any) => {
     
    this.route.navigate(['/inventory/saletax-invoice/' + sale.sMid]);
  };
  // DELETE
  delete = (sale: any) => {
    var result = confirm('Do you want to delete?');
    if (result) {
      this._IS.DeleteSale(sale.sMid).subscribe((res) => {
        alert('Sale Invoice has been deleted!!');
        this.ngOnInit();
      });
    }
  };

  //UTILITIES

  dateDisplay = 'none';
  openDateModal = () => (this.dateDisplay = 'block');
  closeDateModal = () => (this.dateDisplay = 'none');
  refresh = () => {
    this.bit = 0;
    this.ngOnInit();
  };

  clearSearch = () => {
    this.filterTerm = '';
  };
}
