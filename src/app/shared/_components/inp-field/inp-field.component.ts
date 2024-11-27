import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inp-field',
  templateUrl: './inp-field.component.html',
  styleUrl: './inp-field.component.scss'
})
export class InpFieldComponent {
@Input() label ='';
}
