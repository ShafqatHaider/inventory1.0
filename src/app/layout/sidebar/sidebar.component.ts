import { Component } from '@angular/core';
import { SidebarService } from '../supportives/sidbar.service';
import { MenuConfig } from '../supportives/MenuConfig';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone:false
})
export class SidebarComponent {
  dropdowns:any = {
    receivables: false,
    payables: false,
  };
  config=MenuConfig.menuList
  constructor(public sidebarService: SidebarService) {}

  toggleMenu(menu: string) {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }
}
