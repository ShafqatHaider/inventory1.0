import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inp-textarea',
  templateUrl: './inp-textarea.component.html',
  styleUrl: './inp-textarea.component.scss'
})
export class InpTextareaComponent {
@Input() label=''
}
