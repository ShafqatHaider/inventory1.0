import { Component } from '@angular/core';
import { SidebarService } from '../supportives/sidbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  dropdowns:any = {
    receivables: false,
    payables: false,
  };

  constructor(public sidebarService: SidebarService) {}

  toggleMenu(menu: string) {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }
}
