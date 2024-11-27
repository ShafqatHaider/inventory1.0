import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountIndexComponent } from './components/account-index/account-index.component';
import { SharedModule } from '../shared/shared.module';
import { NewaccountComponent } from './components/newaccount/newaccount.component';
import { InpSelectComponent } from '../shared/_components/inp-select/inp-select.component';
import { RbookindexComponent } from './components/rbookindex/rbookindex.component';
import { PaymentindexComponent } from './components/paymentindex/paymentindex.component';
import { DaybookindexComponent } from './components/daybookindex/daybookindex.component';
import { NewrbookComponent } from './components/newrbook/newrbook.component';
import { NewpaymentComponent } from './components/newpayment/newpayment.component';
import { NewdaybookComponent } from './components/newdaybook/newdaybook.component';


@NgModule({
  declarations: [
    AccountIndexComponent,
    NewaccountComponent,
    RbookindexComponent,
    PaymentindexComponent,
    DaybookindexComponent,
    NewrbookComponent,
    NewpaymentComponent,
    NewdaybookComponent
    
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    
  ]
})
export class AccountsModule { }
