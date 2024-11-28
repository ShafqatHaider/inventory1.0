import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportindexComponent } from './reportindex/reportindex.component';
import { NewledgerComponent } from './AccountReport/newledger/newledger.component';
import { RpttrailbalComponent } from './AccountReport/rpttrailbal/rpttrailbal.component';
import { IssummaryComponent } from './AccountReport/issummary/issummary.component';
import { DailycashreportComponent } from './AccountReport/dailycashreport/dailycashreport.component';
import { ItemledgerComponent } from './InventoryReport/itemledger/itemledger.component';
import { StocklistComponent } from './InventoryReport/stocklist/stocklist.component';
import { StockprofitComponent } from './SalesReports/stockprofit/stockprofit.component';
import { SalepartyitemComponent } from './SalesReports/salepartyitem/salepartyitem.component';
import { SalepartyitemstComponent } from './SalesReports/salepartyitemst/salepartyitemst.component';
import { SalebccComponent } from './SalesReports/salebcc/salebcc.component';
import { PurchasebillwisestComponent } from './PurchaseReports/purchasebillwisest/purchasebillwisest.component';
import { PurchasepartyitemstComponent } from './PurchaseReports/purchasepartyitemst/purchasepartyitemst.component';
import { PurchaseitempartystComponent } from './PurchaseReports/purchaseitempartyst/purchaseitempartyst.component';
import { SalebillwisestComponent } from './SalesReports/salebillwisest/salebillwisest.component';
import { PurchasepartyitemComponent } from './PurchaseReports/purchasepartyitem/purchasepartyitem.component';
import { PurchaseitempartyComponent } from './PurchaseReports/purchaseitemparty/purchaseitemparty.component';
import { PurchasebillwiseComponent } from './PurchaseReports/purchasebillwise/purchasebillwise.component';
import { SalebillwiseComponent } from './SalesReports/salebillwise/salebillwise.component';

const routes: Routes = [
  { path: 'report-index', component: ReportindexComponent },
  { path: 'account-Ledger', component: NewledgerComponent },
  { path: 'trial-balance', component: RpttrailbalComponent },
  { path: 'daily-report', component: DailycashreportComponent },
  { path: 'income-statement', component: IssummaryComponent },
  { path: 'item-ledger', component: ItemledgerComponent },
  { path: 'stock-list', component: StocklistComponent },
  { path: 'stock-profit', component: StockprofitComponent },
  { path: 'sale-itemParty', component: SalepartyitemComponent },
  { path: 'sale-itemParty-withST', component: SalepartyitemstComponent },
  { path: 'SaleBcc', component: SalebccComponent },
  { path: 'purchaseBillWiseST', component: PurchasebillwisestComponent },
  { path: 'purchasePartyItemST', component: PurchasepartyitemstComponent },
  { path: 'purchaseItemPartyST', component: PurchaseitempartystComponent },
  { path: 'SaleBillWiseST', component: SalebillwisestComponent},
  
  { path: 'purchasePartyItem', component: PurchasepartyitemComponent},
  { path: 'purchaseItemParty', component: PurchaseitempartyComponent},
  { path: 'purchaseBillWise', component: PurchasebillwiseComponent},
  { path: 'SaleBillWise', component: SalebillwiseComponent},
  { path: 'SalePartyItem', component: SalepartyitemComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
