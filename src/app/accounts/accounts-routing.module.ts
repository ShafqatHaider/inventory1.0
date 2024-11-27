import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountIndexComponent } from './components/account-index/account-index.component';
import { NewaccountComponent } from './components/newaccount/newaccount.component';
import { RbookindexComponent } from './components/rbookindex/rbookindex.component';
import { PaymentindexComponent } from './components/paymentindex/paymentindex.component';
import { NewpaymentComponent } from './components/newpayment/newpayment.component';
import { NewrbookComponent } from './components/newrbook/newrbook.component';
import { DaybookindexComponent } from './components/daybookindex/daybookindex.component';
import { NewdaybookComponent } from './components/newdaybook/newdaybook.component';

const routes: Routes = [
  {path:'account-index',component:AccountIndexComponent},
  {path:'new-account',component:NewaccountComponent},
  {path:'new-account/:id',component:NewaccountComponent},
  {path:'rbook-index',component:RbookindexComponent},
  {path:'new-rbook',component:NewrbookComponent},
  {path:'new-rbook/:id',component:NewrbookComponent},
  {path:'payment-index',component:PaymentindexComponent},
  {path:'new-payment',component:NewpaymentComponent},
  {path:'new-payment/:id',component:NewpaymentComponent},
  {path:'daybook-index',component:DaybookindexComponent},
  {path:'new-daybook',component:NewdaybookComponent},
  {path:'new-daybook/:id',component:NewdaybookComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
