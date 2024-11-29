import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseIndexComponent } from './purchase-index/purchase-index.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { CodeIndexComponent } from './code-index/code-index.component';
import { SaleIndexComponent } from './sale-index/sale-index.component';
import { SubcategoryIndexComponent } from './subcategory-index/subcategory-index.component';
import { WarehouseIndexComponent } from './warehouse-index/warehouse-index.component';
import { TypeIndexComponent } from './type-index/type-index.component';
import { SharedTableComponent } from '../shared/shared-table/shared-table.component';
import { UnitIndexComponent } from './unit-index/unit-index.component';

@NgModule({
  declarations: [



    // PurchaseComponent,
    PurchaseIndexComponent,
    CategoryIndexComponent,
    CodeIndexComponent,
    SaleIndexComponent,
    SubcategoryIndexComponent,
    WarehouseIndexComponent,
    TypeIndexComponent,
    UnitIndexComponent,
    WarehouseIndexComponent,

    // StockadjustmentComponent, 
    // WarehouseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,


  ],
  providers: []
})
export class InventoryModule { }
