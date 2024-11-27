import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountIndexComponent } from './components/account-index/account-index.component';
import { SharedModule } from '../shared/shared.module';
import { NewaccountComponent } from './components/newaccount/newaccount.component';
import { InpSelectComponent } from '../shared/_components/inp-select/inp-select.component';


@NgModule({
  declarations: [
    AccountIndexComponent,
    NewaccountComponent
    
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    
  ]
})
export class AccountsModule { }
