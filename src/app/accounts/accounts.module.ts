import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountIndexComponent } from './components/account-index/account-index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AccountIndexComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule
  ]
})
export class AccountsModule { }
