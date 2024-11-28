import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseIndexComponent } from './purchase-index/purchase-index.component';
import { PurchasewithstComponent } from './purchasewithst/purchasewithst.component';
import { SalewithstComponent } from './salewithst/salewithst.component';
import { StockadjustmentComponent } from './stockadjustment/stockadjustment.component';
import { SaleindexComponent } from './saleindex/saleindex.component';
import { CodeIndexComponent } from './code-index/code-index.component';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { SubcategoryIndexComponent } from './subcategory-index/subcategory-index.component';
import { UnitIndexComponent } from './unit-index/unit-index.component';
import { WarehouseIndexComponent } from './warehouse-index/warehouse-index.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    CategoryIndexComponent,
    SubcategoryIndexComponent,
    UnitIndexComponent,
    WarehouseIndexComponent,
    CategoryIndexComponent,
    CodeIndexComponent,
    PurchaseComponent,
    PurchaseIndexComponent,
    PurchasewithstComponent,
    SaleindexComponent,
    SalewithstComponent,
    StockadjustmentComponent,
    SubcategoryIndexComponent,
    UnitIndexComponent,
    SaleindexComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    InventoryRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
   
  ],
  providers: []
})
export class InventoryModule { }
