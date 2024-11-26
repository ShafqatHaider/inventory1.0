import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
