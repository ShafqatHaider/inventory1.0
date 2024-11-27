import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountIndexComponent } from './components/account-index/account-index.component';
import { NewaccountComponent } from './components/newaccount/newaccount.component';

const routes: Routes = [
  {path:'account-index',component:AccountIndexComponent},
  {path:'new-account',component:NewaccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
