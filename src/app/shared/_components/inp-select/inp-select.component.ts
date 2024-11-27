import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inp-select',
  templateUrl: './inp-select.component.html',
  styleUrl: './inp-select.component.scss'
})
export class InpSelectComponent {
@Input() label=''
}
