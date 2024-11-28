import { Component, OnInit } from '@angular/core';
// import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  progress: number = 0;
/**
 *
 */
constructor() {
  
  
}
  // constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    // this.progressService.progress$.subscribe((progress) => {
    //   this.progress = progress;
    // });
  }
}
