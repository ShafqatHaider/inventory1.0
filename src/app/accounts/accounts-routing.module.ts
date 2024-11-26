import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountIndexComponent } from './components/account-index/account-index.component';

const routes: Routes = [
  {path:'account-index',component:AccountIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
