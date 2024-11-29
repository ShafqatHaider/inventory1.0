import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewcodeComponent } from './newcode/newcode.component';
import { CodeIndexComponent } from './code-index/code-index.component';
import { NewsalesComponent } from './newsales/newsales.component';
import { PurchaseIndexComponent } from './purchase-index/purchase-index.component';

const routes: Routes = [
  {path:'', redirectTo:'code', pathMatch:'full'},
  {
    path:'code', component:NewcodeComponent
  },
  {
    path:'code/:cid', component:NewcodeComponent
  },
  {
    path:'code-index', component:CodeIndexComponent
  },
  // {
  //   path:'saletax-invoice', component:SalewithstComponent
  // },
  // {
  //   path:'saletax-invoice/:smId', component:SalewithstComponent
  // },
  {
    path:'sale-invoice', component:NewsalesComponent
  },
  {
    path:'sale-invoice/:smId', component:NewsalesComponent
  },
  // {
  //   path:'sale-index', component:SaleindexComponent
  // },
  // {
  //   path:'category', component:CategoryComponent
  // },
  // {
  //   path:'sub-category', component:SubcategoryComponent
  // },
  // {
  //   path:'purchasetax-invoice', component:PurchasewithstComponent
  // },
  // {
  //   path:'purchasetax-invoice/:pmId', component:PurchasewithstComponent
  // },
  // {
  //   path:'purchase-voucher', component:Purchase2Component
  // },
  // {
  //   path:'purchase-voucher/:pmId', component:Purchase2Component
  // },
  {
    path:'purchase-index', component:PurchaseIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }

