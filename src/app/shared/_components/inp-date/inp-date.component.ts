import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inp-date',
  templateUrl: './inp-date.component.html',
  styleUrl: './inp-date.component.scss'
})
export class InpDateComponent {
@Input() label='';
today: string = '';
@Input() inputDate = '';

ngOnInit(): void {
  if (this.inputDate) {
    this.today = this.inputDate;
  } else {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }
}
}

