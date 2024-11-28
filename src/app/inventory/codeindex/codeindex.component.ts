import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { DatePipe, Location } from '@angular/common';
import { fromEvent, map, Observable, pairwise, startWith } from 'rxjs';
import { ICodeCoding } from 'src/app/shared/interface/ICodeCoding';
import { UsermanagmentService } from 'src/app/userManagement/usermanagment.service';
import { ToastrService } from 'ngx-toastr';
import { internal } from 'src/app/shared/interface/internal-standard';
declare var window: any;

@Component({
  selector: 'app-codeindex',
  templateUrl: './codeindex.component.html',
  styleUrls: ['./codeindex.component.scss']
})
export class CodeindexComponent implements OnInit {
  code = new Array<ICodeCoding>();
  codes = new ICodeCoding();
  filterTerm: string = '';
  formModal: any;
  cId: any;
  eDate: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  fDate: any;
  tDate: any;
  bit = 0;
  branchName=internal.branchName
  constructor(
    public _IS: InventoryService,
    public route: Router,
    public acroute: ActivatedRoute,
    public pipe: DatePipe,
    private _US: UsermanagmentService,
    private toast:ToastrService,
    public location:Location
  ) {}

  media(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((list: MediaQueryList) => list.matches)
    );
  }
  assign: any;
  btn_cate: any;
  scate: any;
  btn_brand: any;
  btn_deptt: any;
  groupId: any;
  lcid: any;
  btn_group: any;
  role: any;
  formName: any;
  isRead: any;
  isWrite: any;
  isDelete: any;
  elem: any;
  userRoles: any;

  ngOnInit(): void {
    this.media('print').pipe(pairwise());

    this.assign = Number(localStorage.getItem('ASSIGN'));
    this.lcid = Number(localStorage.getItem('LINKED_COMPANY_ID'));
    this.groupId = Number(localStorage.getItem('GROUP_ID'));
    this._US.getRolesById(this.lcid, this.groupId).subscribe((rep) => {
      this.userRoles = rep.userDetails;
      if (this.userRoles) {
        this.elem = this.userRoles.filter((e: any) => {
          this.formName = e.formName;
          if (this.formName == 'CodeIndex') {
            this.isRead = e.cRead;
            this.isWrite = e.cWrite;
            this.isDelete = e.cDelete;
          }
        });
      }
    });
    // let ddate = this.pipe.transform(this.code.eDate, 'yyyy-MM-dd');
    // this.eDate = ddate;
    this.getData();
  }
  // CORE FUNCTIONS
  getData = () =>
    this._IS.getAllCodes().subscribe(res=>{
      this.code = res;
      console.log(this.code)
    })
  onTableDataChange = (event: any) => {
    this.page = event;
    this.getData();
  };
  onTableSizeChange = (event: any): void => {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getData();
  };

  back = () => this.route.navigate(['/admin/dashboard']);

  openFormModal = () => this.formModal.show();

  goToLedger = (code: any) =>
    this.route.navigate(['/reports/item-ledger/' + code.cid]);
  brand = () => {
    if (this.assign == 1) {
      this.route.navigate(['/inventory/brand']);
    }
    if (this.assign == 2) {
      this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        this.isRead = e.cRead;
        this.isWrite = e.cWrite;
        this.isDelete = e.cDelete;
        if (this.formName === 'Brand') {
          this.route.navigate(['/inventory/brand']);
        }
      });
    }
  };

  newBarcode() {
    this.route.navigate(['/inventory/code']);
  }

  cate = () => {
    if (this.assign == 1) {
      this.route.navigate(['/inventory/category']);
    }
    if (this.assign == 2) {
      this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        this.isRead = e.cRead;
        this.isWrite = e.cWrite;
        this.isDelete = e.cDelete;
        if (this.formName === 'Category') {
          this.route.navigate(['/inventory/category']);
        }
      });
    }
  };
  group = () => {
    if (this.assign == 1) {
      this.route.navigate(['/inventory/group']);
    }
    if (this.assign == 2) {
      this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        this.isRead = e.cRead;
        this.isWrite = e.cWrite;
        this.isDelete = e.cDelete;
        if (this.formName === 'Group') {
          this.route.navigate(['/inventory/group']);
        }
      });
    }
  };
  deptt = () => {
    if (this.assign == 1) {
      this.route.navigate(['/inventory/deptt']);
    }
    if (this.assign == 2) {
      this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        this.isRead = e.cRead;
        this.isWrite = e.cWrite;
        this.isDelete = e.cDelete;
        if (this.formName === 'Department') {
          this.route.navigate(['/inventory/deptt']);
        }
      });
    }
  };
  subcate = () => {
    if (this.assign == 1) {
      this.route.navigate(['/inventory/subcate']);
    }
    if (this.assign == 2) {
      this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        this.isRead = e.cRead;
        this.isWrite = e.cWrite;
        this.isDelete = e.cDelete;
        if (this.formName === 'SubCategory') {
          this.route.navigate(['/inventory/subcate']);
        }
      });
    }
  };
  newCode = () => {
    if (this.assign == 1) {
      this.route.navigate(['/inventory/newcode']);
    }
    if (this.assign == 2) {
      this.userRoles.filter((e: any) => {
        this.formName = e.formName;
        this.isRead = e.cRead;
        this.isWrite = e.cWrite;
        this.isDelete = e.cDelete;
        if (this.formName === 'Code') {
          this.route.navigate(['/inventory/newcode']);
        }
      });
    }
  };
  edit = (code: any) => this.route.navigate(['/inventory/code/' + code.cid]);
  editBarcode = (code: any) =>
    this.route.navigate(['/inventory/barcode/' + code.cid]);

  newBID: any;
  bText: any;
  delete = (code: any) => {
    var result = confirm('Do you want to delete?');
    if (result) {
      this._IS.deleteCode(code.cid).subscribe((res) => {
       this.toast.success('Delete Successfully!!');
        this.ngOnInit();
      });
    }
  };

  cid: any;
  // barcode=(code:any)=>{this.cid=Number(code.cid);this.openCity()}
  // displayStyle='none';
  //   openCity=()=>
  //   {

  //     this.displayStyle="block"
  //     this._IS.getCodeById(this.cid).subscribe(res => {
  //       this.codes = res;

  //     })
  //   }
  //   close=()=>this.displayStyle="none"

  // print=(event:any)=>
  // {

  //   this.displayStyle="none"
  //   let data= document.getElementById('print')?.innerHTML;
  //    var originalContents = document.body.innerHTML;
  //    (document as any).body.innerHTML = data;
  //    (window as any).print();
  //    this.ngOnInit()
  //    document.body.innerHTML = originalContents;
  //    window.eventLinstener(event)
  // }

  dateDisplay = 'none';
  openDateModal = () => (this.dateDisplay = 'block');
  closeDateModal = () => (this.dateDisplay = 'none');
  refresh = () => {
    this.bit = 0;
    this.ngOnInit();
  };

}
