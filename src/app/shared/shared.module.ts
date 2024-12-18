import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SharedTableComponent } from './shared-table/shared-table.component';
import { FormsModule } from '@angular/forms';
import { InpSelectComponent } from './_components/inp-select/inp-select.component';
import { InpFieldComponent } from './_components/inp-field/inp-field.component';
import { InpTextareaComponent } from './_components/inp-textarea/inp-textarea.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InpDateComponent } from './_components/inp-date/inp-date.component';
import { ModalComponent } from './_components/modal/modal.component';
import { AutoFocusDirective } from './services/focus.directive';




@NgModule({
  declarations: [
    CardComponent,
    SharedTableComponent,
    InpSelectComponent,
    InpFieldComponent,
    InpTextareaComponent,
    InpDateComponent,
    ModalComponent,
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports:[
    CardComponent,
    FormsModule,
    SharedTableComponent,
    InpSelectComponent,
    InpFieldComponent,
    InpTextareaComponent,
    ModalComponent,
    AutoFocusDirective
  ]
})
export class SharedModule { }
