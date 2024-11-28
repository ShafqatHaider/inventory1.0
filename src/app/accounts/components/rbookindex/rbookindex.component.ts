import { Component } from '@angular/core';
import { AccountConfigurations } from '../../supportives/AccountConfigurations';

@Component({
  selector: 'app-rbookindex',
  templateUrl: './rbookindex.component.html',
  styleUrl: './rbookindex.component.scss'
})
export class RbookindexComponent {
add(){}
edit(){}
delete(){}
config=AccountConfigurations.receipt
}
