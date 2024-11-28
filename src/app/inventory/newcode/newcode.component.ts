import { Component, OnInit, ViewChild,ElementRef, EventEmitter, Input } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICodeCoding, ICodeCodingSub } from 'src/app/shared/interface/ICodeCoding';
import { IMeasurement } from 'src/app/shared/interface/IMeasurement';
import { IGodown } from 'src/app/shared/interface/IGodown';
import { ICodeEType } from 'src/app/shared/interface/ICodeEType';
import { DatePipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { internal } from 'src/app/shared/interface/internal-standard';

declare var window: any;

@Component({
  selector: 'app-newcode',
  templateUrl: './newcode.component.html',
  styleUrls: ['./newcode.component.scss']
})
export class NewcodeComponent implements OnInit {
  code = new ICodeCoding(); cateArr:any[]=[{cateID:0, title:''}]; subCateArr = [];
  @ViewChild ('select') select: NgSelectComponent;

  codeArr=  new ICodeCoding(); vendorArr = []; depttArr = [];
  filterTerm: string = ""; brandArr = []; groupArr = []; ;
  formModal: any;cid: any;eDate: any;bName:any;sTitle:any;gTitle:any;depttName:any
picture:any;myDate:any ;barname:any;text:any;isChecked:boolean=true;
BNID:any;language:any
units= new Array<IMeasurement>(); unitArr=new Array<IMeasurement>();
godown= new IGodown(); goArr= new Array<IGodown>();
etypeArr= new Array<ICodeEType>(); etype= new ICodeEType();
codeDetails= new Array<ICodeCodingSub>();
subModel= new ICodeCodingSub(); goDate:any;
  @ViewChild('barcode') barcode: ElementRef|any;
  branchName=internal.branchName
  // displayUnitModal: boolean = false;
  constructor(
    public _IS: InventoryService, 
    public route: Router,
     public acroute: ActivatedRoute, 
     public pipe: DatePipe,
     public location:Location,
     public formBuilder:FormBuilder,
     private toastr:ToastrService
     ) 
  {

   
  }
  codeForm:FormGroup|any;
  getRoles(){
    this.godown.eDate=new Date();
    let dd= this.pipe.transform(this.godown.eDate, 'yyyy-MM-dd');
    this.goDate=dd;

    this.units; this.godown;
    this.language=Number(localStorage.getItem('language'));
    this.BNID=Number(localStorage.getItem('BNID'));
    this.isChecked=false;
    this.text='Auto Barcode'
    this.code.eDate = new Date();
    let ddate = this.pipe.transform(this.code.eDate, 'yyyy-MM-dd')
    this.eDate = ddate;

    this.codeDetails;
  }
  getById(){
    this._IS.getCodeById(this.cid).subscribe(res => {
      this.code = res;
      this.eDate=res.eDate
      let ddate = this.pipe.transform(this.code.eDate, 'yyyy-MM-dd')
      this.eDate = ddate;
      this.code.measureUnit=res.measureUnit
      this.pcateName=res.pCateName

    })
  }
getAllLookups()
{
  
  this._IS.getAllCodes().subscribe(res => {this.codeArr = res})
  this._IS.getCateLookups().subscribe(res=>{this.cateArr=res})
  this._IS.getSubCateLookups().subscribe(res=>{this.subCateArr=res;})
  this._IS.getBrandLookups().subscribe(res=>{this.brandArr=res})
  this._IS.getDepttLookups().subscribe(res=>{this.depttArr=res})
  this._IS.getGroupLookups().subscribe(res=>{this.groupArr=res})
  this._IS.getVendorLookups().subscribe(res=>{this.vendorArr=res})

}
getTypeLookups=()=> {
  
  debugger
  this._IS.getAllProductTypes().subscribe(res=>this.etypeArr=res)}
getGodownLookups=()=>  this._IS.godownLookups().subscribe(res=>this.goArr=res)
getUnitLookups=()=>this._IS.getUnitLookups().subscribe(res=>this.unitArr=res)

  ngOnInit(): void {
    this.getRoles()
    this.cid = Number(this.acroute.snapshot.params['cid']);
    this.cid?this.getById():console.log('No Data Found...');
    /*-----------------------LOOKUPS-----------------------*/ 
    this.getAllLookups();
    this.getGodownLookups();
    this.getUnitLookups();
    this.getTypeLookups();
    this.createForm();
    this.createCodeDetail();
    this.createForm();
}
createForm() {
  this.code.eDate=new Date();
  let ddate = this.pipe.transform(this.code.eDate, 'yyyy-MM-dd');
  this.eDate = ddate;
  this.code.eDate=this.eDate;
  this.codeForm = this.formBuilder.group({
    cid:[this.code.cid],
    eDate:[this.code.eDate],
    codeName:[this.code.codeName, Validators.required],
    pCateID:[this.code.pCateID],
    pCateName:[this.code.pCateName],
    barcode:[this.code.barcode],
    code:[this.code.code],
    measureID:[this.code.measureID],
    measureUnit:[this.code.measureUnit],
    pktQty:[this.code.pktQty],
    qty:[this.code.qty],
    costRate:[this.code.costRate],
    saleRate:[this.code.saleRate],
    reorderLevelQty:[this.code.reorderLevelQty],
    itemDescription:[this.code.itemDescription],
    companyID:Number(localStorage.getItem('COMPANY_ID')),
    branchID:Number(localStorage.getItem('BRANCH_ID')),
    operatorID:Number(localStorage.getItem('OPERATOR_ID')),
    brandID:[this.code.brandID],
    colours:[this.code.colours],
    commPer:[this.code.commPer],
    commRS:[this.code.commRS],
    disPer:[this.code.disPer],
    disRS:[this.code.disRS],
    dpttID:[this.code.dpttID],
    groupID:[this.code.groupID],
    packet:[this.code.packet],
    sizeRange:[this.code.sizeRange],
    subcateID:[this.code.subcateID],
    vendorID:[this.code.vendorID],
    ifBarcode:[this.code.ifBarcode],
    n1:[this.code.n1],
    n2:[this.code.n2],
    n3:[this.code.n3],
    txt1:[this.code.txt1],
    txt2:[this.code.txt2],
    txt3:[this.code.txt3],
    codeDetails: this.formBuilder.array([])
  });
}
createCodeDetail(): FormGroup {
  return this.formBuilder.group({
    sCid: [this.code.codeDetails.length+1],
    unitId: [this.subModel.unitId],
    packet: [this.subModel.packet],
    pktQty: [this.subModel.pktQty],
    qty: [this.subModel.qty],
    totalQty: [this.subModel.totalQty, Validators.required],
    costRate: [this.subModel.costRate, Validators.required],
    saleRate: [this.subModel.saleRate, Validators.required],
    amount: [this.subModel.amount],
    godownId: [this.subModel.godownId],
    godownName: [this.subModel.godownName],
    unitName: [this.subModel.unitName],
    companyId: Number(localStorage.getItem('COMPANY_ID')),
    branchId: Number(localStorage.getItem('BRANCH_ID')),
    operatorId: Number(localStorage.getItem('OPERATOR_ID'))
  });
}
/*-------------------EVENT HANDLERS FOR LOOKUPS---------------------*/ 
vendorName:any;
changeVendor(event:any){
  this.code.vendorID=event.vendorId;
  this.vendorName=event.sAccName
}
ifChecked(){
  this.isChecked=!this.isChecked;
  this.text='Manual Barcode' 
  if(!this.isChecked){
    this.code.ifBarcode;
    this.text='Auto Barcode' 
  }
  
}
changeDeptt(event:any){
   // 
  this.code.dpttID=event.dpttID
  this.depttName=event.depttName;
}

onChageQty=(e:any)=>
{

  debugger
  this.subModel.packet=this.subModel.qty;
  // this.costRate=this.code.costRate;
  this.subModel.amount=this.costRate*this.subModel.qty;
  this.subModel.pktQty=this.pktQty;
  this.subModel.totalQty=this.pktQty*this.subModel.qty;

}



changeGroup=(event:any)=>{
   this.code.groupID=event.gcid;
   this.gTitle=event.title
}
pcateName='';
subCate='';
changeCate=(event:any)=>{
   // 
  this.code.pCateID=event.cateID;
  this.pcateName=event.title;
  this.code.pCateName=this.pcateName;
}

changeScate=(event:any)=>{
   // 
  this.code.subcateID=event.scid;
   this.sTitle=event.subTitle
}



changeUnit=(event:any)=>
{
   
  this.code.measureID=event.cid
  this.code.measureUnit=event.measurementName
}

changeBrand=(event:any)=>
{
   // 
  this.code.brandID= event.bcid;
  this.bName=event.brandName
}
qty:number=0
pktQty:number=0;
AC=()=>{
   
  this.qty=Number(this.code.packet)*this.code.pktQty
  this.code.qty=this.qty;
}

  


  
costRate:any;
onChangeRate=(e:any)=>{
  
  this.isInvalidCostRate(this.code.costRate)
  this.costRate=+this.code.costRate;

}

  // newFormation
onChangeUnit=(e:any)=>
{
  debugger
  this.subModel.unitId=e.cid; 
  this.subModel.unitName=e.measurementName;
  this.pktQty=e.measureQty;
   
  this.costRate=e.measureQty*this.code.costRate
}



onChangeGodown=(e:any)=>{
  this.subModel.godownId=e.cid;
  this.subModel.godownName=e.goName;
}
DeleteLine=(psub: ICodeCodingSub)=>this.code.codeDetails = this.code.codeDetails.filter(res => res.sCid != psub.sCid);
editLine=(dbSub: ICodeCodingSub) => {
  debugger
  this.subModel = dbSub; 
  this.costRate=this.subModel.packet*this.code.costRate};
onChangeProductType=(e:any)=>
{
  debugger
  this.code.n1=e.cid;
  this.code.txt1=e.eType;
}
onChangeBaseUnit=(e:any)=>{
  this.code.measureID=e.unitId;
  this.code.measureUnit=e
}
eTypeModal='none';
typeModal=false;
@Input() closeTypeModal: EventEmitter<any> = new EventEmitter<any>();
OnTypeModal=()=>this.eTypeModal='block'
offTypeModal=()=>this.eTypeModal='none'
saveType=(types:any)=>{

  this.typeModal = false;
  this.eTypeModal='none'
  this.getTypeLookups();
  
}


displayUnitModal='none';
UnitModal=false;
@Input() closeModal: EventEmitter<any> = new EventEmitter<any>();
unitModal() {
  // console.log('Unit modal clicked');
  // this.UnitModal=true;
  this.displayUnitModal='block'
}

onSaveUnit(units: any) {
  
  this.UnitModal = false;
  this.displayUnitModal='none'
  this.getUnitLookups();
}
displayGodownModal='none';
goModalBol=false;
@Input() closeGoModal: EventEmitter<any> = new EventEmitter<any>();
saveGodown=(godown:any)=> {
  this.goModalBol=false;
  this.displayGodownModal='none';
  this.getGodownLookups();
}
goModal=()=>{
  this.displayGodownModal='block'
  this.goModalBol=true;
}
isValValid=false;
isInvalidCustom(name: string) {
  // Add your custom validation logic here
  this.isValValid=name.toLowerCase() === 'invalid' && name=='' && name==undefined
  return this.isValValid;

}
isInvalidCostRate(costRate: number): boolean {
      return costRate >= 1 || costRate<0; 
}




addSmallLine() {
  debugger

  this.subModel.sCid=0;
  this.subModel.unitId=0;
  this.subModel.packet=0;
  this.subModel.pktQty=0;
  this.subModel.qty=0;
  this.subModel.totalQty=0;
  this.subModel.costRate=0;
  this.subModel.saleRate=0;
  this.subModel.amount=0;
  this.subModel.godownId=0;
  this.subModel.godownName='';
  this.subModel.unitName=''




  // const codeDetails = this.codeForm.get('codeDetails') as FormArray;
  this.code.codeDetails.push({...this.subModel});
}

// addSmallLine() {
 
// //  }




// }
calculateQty=()=> { 
  debugger
 this.code.qty+=this.subModel.totalQty
 }
 isDetailsValid=false;
isDetails(data:any)
{
  debugger
  data.length >= 1 ?this.isDetailsValid = true:false
  return this.isDetailsValid
}
save=() =>{

  this.addSmallLine();
  debugger
  this.isDetails(this.code.codeDetails);
  // this.isInvalidCustom(this.code.codeName)
  if(this.BNID==2){
    this.code.pktQty=1
    this.code.packet=1
  }
  else{
    this.code.pktQty
    this.code.packet
  }
  if(!this.isChecked){
    this.code.ifBarcode=1;
  }
      debugger
  if(this.isDetailsValid)
  {
       this.code.n2=0;
      this.code.n3=0;
      this.code.txt2='1';
      this.code.txt3='1';
      this.code.colours='1';
      this.code.sizeRange='1';
      this.code.measureUnit='1';
    
   // 
  this.code.code= this.code.barcode;
  this.code.companyID = Number(localStorage.getItem('COMPANY_ID'))
  this.code.branchID = Number(localStorage.getItem('BRANCH_ID'))
  this.code.operatorID = Number(localStorage.getItem('OPERATOR_ID'));
  this.code.eDate=this.eDate;
  
    this._IS.saveCode(this.code).subscribe(res => {
     if(res){
       this.code = new ICodeCoding();
       this.toastr.success('Code has been saved!!'+res)
       this.route.navigate(['/inventory/code-index']);
     

     }
      
   },
   
      error=>{
       alert(`${error.error} Duplicate record found`)
        this.code = new ICodeCoding();
      })
  }
  else{
   alert('Please fill mandatory Fields first')
  }
  

}
onEnter=()=>{
  let val=(document as any).getElementById('cls')
  if(val.value=='0'){ val.value='' }  else{val.value;}
  let val1=(document as any).getElementById('cls2')
  if(val1.value=='0') { val1.value=''} else { val1.value}
  let val2=(document as any).getElementById('cls3')
  if(val2.value=='0'){val2.value='' } else { val2.value }
  let val3=(document as any).getElementById('cls4')
  if(val3.value=='0'){val3.value='' } else{val3.value}
  let val4=(document as any).getElementById('cls5')
  if(val4.value=='0'){val4.value=''}else{val4.value}
  let val5=(document as any).getElementById('cls6')
  if(val5.value=='0'){val5.value=''}else{val5.value}
  let val6=(document as any).getElementById('cls7')
  if(val6.value=='0') {val6.value=''}else{ val6.value}
}
home=()=>this.route.navigate(['/admin/dashboard'])
back=()=> this.route.navigate(['/inventory/code'])

}
