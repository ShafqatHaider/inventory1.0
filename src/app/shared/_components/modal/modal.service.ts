import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap'; 
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalElement!: HTMLElement;

  initModal(modalId: string) {
    this.modalElement = document.getElementById(modalId) as HTMLElement;
    this.modalElement.addEventListener('shown.bs.modal', this.hideBackdrop);
    this.modalElement.addEventListener('hidden.bs.modal', this.showBackdrop);
  }

  open() {
    const modal = new bootstrap.Modal(this.modalElement);
    
    modal.show();
  }

  close() {
    const modal = bootstrap.Modal.getInstance(this.modalElement);
    modal?.hide();
  }

  private hideBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
    if (backdrop) {
      backdrop.style.display = 'none'; 
    }
  };

  // Show backdrop when modal is hidden
  private showBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
    if (backdrop) {
      backdrop.style.display = 'block'; 
    }
  };
}
