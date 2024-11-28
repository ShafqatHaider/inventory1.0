import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewcodeComponent } from './newcode/newcode.component';
import { CategoryComponent } from './category/category.component';
import { CodeindexComponent } from './codeindex/codeindex.component';
import { NewsalesComponent } from './newsales/newsales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseIndexComponent } from './purchase-index/purchase-index.component';
import { Purchase2Component } from './purchase2/purchase2.component';
import { PurchasewithstComponent } from './purchasewithst/purchasewithst.component';
import { SalewithstComponent } from './salewithst/salewithst.component';
import { StockadjustmentComponent } from './stockadjustment/stockadjustment.component';
import { StocktransferComponent } from './stocktransfer/stocktransfer.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TypesComponent } from './types/types.component'; // Importing TypesComponent
import { UnitComponent } from './unit/unit.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { SaleindexComponent } from './saleindex/saleindex.component';

@NgModule({
  declarations: [
    NewcodeComponent,
    CategoryComponent,
    CodeindexComponent, 
    NewsalesComponent, 
    PurchaseComponent,
    PurchaseIndexComponent,
    Purchase2Component, 
    PurchasewithstComponent,
    SalewithstComponent,
    StockadjustmentComponent, 
    StocktransferComponent, 
    SubcategoryComponent,  
    TypesComponent,  // Include TypesComponent here
    UnitComponent, 
    WarehouseComponent, SaleindexComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    
  ],
  providers:[ToastrService]
})
export class InventoryModule { }
