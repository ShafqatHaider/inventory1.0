import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportindexComponent } from './reportindex/reportindex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StocklistComponent } from './InventoryReport/stocklist/stocklist.component';
import { RpttrailbalComponent } from './AccountReport/rpttrailbal/rpttrailbal.component';
import { NewledgerComponent } from './AccountReport/newledger/newledger.component';
import { ItemledgerComponent } from './InventoryReport/itemledger/itemledger.component';
import { DailycashreportComponent } from './AccountReport/dailycashreport/dailycashreport.component';
import { StockprofitComponent } from './SalesReports/stockprofit/stockprofit.component';
import { PurchasepartyitemComponent } from './PurchaseReports/purchasepartyitem/purchasepartyitem.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { SnakbarComponent } from '../ui/components/alert/snakbar.component';
import { DbreportComponent } from './AccountReport/dbreport/dbreport.component';
import { ItempartystComponent } from './SalesReports/itempartyst/itempartyst.component';
import { ItemwiseprofitComponent } from './SalesReports/itemwiseprofit/itemwiseprofit.component';
import { SalebccComponent } from './SalesReports/salebcc/salebcc.component';
import { SalebillwiseComponent } from './SalesReports/salebillwise/salebillwise.component';
import { SalebillwisestComponent } from './SalesReports/salebillwisest/salebillwisest.component';
import { SaleitempartyComponent } from './SalesReports/saleitemparty/saleitemparty.component';
import { SaleitempartystComponent } from './SalesReports/saleitempartyst/saleitempartyst.component';
import { SalemanwiseComponent } from './SalesReports/salemanwise/salemanwise.component';
import { SalepartyitemComponent } from './SalesReports/salepartyitem/salepartyitem.component';
import { PurchasebillwiseComponent } from './PurchaseReports/purchasebillwise/purchasebillwise.component';
import { IssummaryComponent } from './AccountReport/issummary/issummary.component';
import { PurchaseitempartystComponent } from './PurchaseReports/purchaseitempartyst/purchaseitempartyst.component';
import { PurchasebillwisestComponent } from './PurchaseReports/purchasebillwisest/purchasebillwisest.component';
import { PurchaseitempartyComponent } from './PurchaseReports/purchaseitemparty/purchaseitemparty.component';
import { PurchasepartyitemstComponent } from './PurchaseReports/purchasepartyitemst/purchasepartyitemst.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SalepartyitemstComponent } from './SalesReports/salepartyitemst/salepartyitemst.component';

@NgModule({
  declarations: [
    PurchaseitempartystComponent,
    PurchasebillwiseComponent,
    PurchasebillwisestComponent,
    PurchaseitempartyComponent,
    PurchaseitempartystComponent,
    PurchasepartyitemComponent,
    PurchasepartyitemstComponent,
    DailycashreportComponent,
    DbreportComponent,
    ItempartystComponent,
    ItemwiseprofitComponent,
    SalebccComponent,
    SalebillwiseComponent,
    SalebillwisestComponent,
    SaleitempartyComponent,
    SaleitempartystComponent,
    SalemanwiseComponent,
    SalepartyitemComponent,
    SaleitempartystComponent,
    StockprofitComponent,
    ReportindexComponent,
    StocklistComponent,
    RpttrailbalComponent,
    NewledgerComponent,
    ItemledgerComponent,
    DailycashreportComponent,
    StockprofitComponent,
    PurchasepartyitemComponent,
    PurchasebillwiseComponent,
    IssummaryComponent,
    ProgressBarComponent,
    FilterPipe,
    SnakbarComponent,
    SalepartyitemstComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    DatePipe,
    ReactiveFormsModule
  ],
})
export class ReportsModule {}
