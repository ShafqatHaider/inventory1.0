import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { internal } from 'src/app/shared/interface/internal-standard';

@Component({
  selector: 'app-reportindex',
  templateUrl: './reportindex.component.html',
  styleUrls: ['./reportindex.component.scss'],
})
export class ReportindexComponent implements OnInit {
  constructor(public route: Router) {}
  branchName=internal.branchName
  ngOnInit(): void {}
  partyLedger = () => this.route.navigate(['/reports/account-Ledger']);
  trailBal = () => this.route.navigate(['/reports/trial-balance']);
  incomeStatement = () => this.route.navigate(['/reports/income-statement']);
  dbReport = () => this.route.navigate(['/reports/daily-report']);
  cashReport = () => this.route.navigate(['/reports/cashRepo']);
  itemProfit = () => this.route.navigate(['/reports/itemWiseProfit']);
  itemLedger = () => this.route.navigate(['/reports/item-ledger']);
  stockList = () => this.route.navigate(['/reporting/stock-list']);
  bcc = () => this.route.navigate(['/reports/SaleBcc']);
  SaleItemParty = () => this.route.navigate(['/reports/sale-itemParty']);
  SalePartyItem = () => this.route.navigate(['/reports/SalePartyItem']);
  SaleBillWise = () => this.route.navigate(['/reports/SaleBillWise']);
  purchaseBillWise = () => this.route.navigate(['/reports/purchaseBillWise']);
  purchaseItemParty = () =>
    this.route.navigate(['/reports/purchaseItemParty']);
  purchasePartyItem = () =>
    this.route.navigate(['/reports/purchasePartyItem']);
  stockProfit = () => this.route.navigate(['/reports/stock-profit/']);
  SaleItemPartyST = () => this.route.navigate(['/reports/sale-itemParty-withST']);
  SalePartyItemST = () => this.route.navigate(['/reports/SalePartyItemST']);
  SaleBillWiseST = () => this.route.navigate(['/reports/SaleBillWiseST']);
  PurchaseItemPartyST = () =>
    this.route.navigate(['/reports/purchaseItemPartyST']);
  PurchasePartyItemST = () =>
    this.route.navigate(['/reports/purchasePartyItemST']);
  PurchaseBillWiseST = () =>
    this.route.navigate(['/reports/purchaseBillWiseST']);
}
