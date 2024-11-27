import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SharedTableComponent } from './shared-table/shared-table.component';
import { FormsModule } from '@angular/forms';
import { InpSelectComponent } from './_components/inp-select/inp-select.component';
import { InpFieldComponent } from './_components/inp-field/inp-field.component';
import { InpTextareaComponent } from './_components/inp-textarea/inp-textarea.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { InpDateComponent } from './_components/inp-date/inp-date.component';



@NgModule({
  declarations: [
    CardComponent,
    SharedTableComponent,
    InpSelectComponent,
    InpFieldComponent,
    InpTextareaComponent,
    InpDateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,NgSelectComponent
  ],
  exports:[
    CardComponent,
    SharedTableComponent
  ]
})
export class SharedModule { }
