import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeIndexComponent } from './code-index/code-index.component';
import { PurchaseIndexComponent } from './purchase-index/purchase-index.component';
import { SaleIndexComponent } from './sale-index/sale-index.component';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { SubcategoryIndexComponent } from './subcategory-index/subcategory-index.component';

const routes: Routes = [
  {path:'', redirectTo:'code', pathMatch:'full'},
 {
    path:'code-index', component:CodeIndexComponent
  },
  {
    path:'sale-index', component:SaleIndexComponent
  },
  {
    path:'purchase-index', component:PurchaseIndexComponent
  },
  {
    path:'category-index', component:CategoryIndexComponent
  },
  {
    path:'subcategory-index', component:SubcategoryIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }

