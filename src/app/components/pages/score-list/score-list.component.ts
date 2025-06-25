import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../../../services/score.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Component({
  selector: 'app-score-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './score-list.component.html',
  styleUrl: './score-list.component.css'
})
export class ScoreListComponent {
  scores: any[] = [];
  previewScore: any = null;
  @ViewChild('previewContainer', { static: false }) previewContainer!: ElementRef;
  osmdPreview: OpenSheetMusicDisplay | undefined;
  constructor(private scoreService: ScoreService, private router: Router) {}

  ngOnInit(): void {



    this.scoreService.getByUser(sessionStorage.getItem("userId")).subscribe(
      {
        next: (resp: any) => {
          this.scores = resp;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  editScore(id: number) {
    this.router.navigate(['/editor', id]);
  }

  newScore() {
    this.router.navigate(['/editor']);
  }

  openPreview(score: any) {
    this.previewScore = score;

    setTimeout(() => {
      if (this.previewContainer) {
        this.osmdPreview = new OpenSheetMusicDisplay(this.previewContainer.nativeElement);
        this.osmdPreview.load(score.musicXml).then(() => this.osmdPreview!.render());
      }
    }, 100);
  }
  closePreview() {
    this.previewScore = null;
    this.osmdPreview = undefined;
  }
  downloadMusicXml() {
    const blob = new Blob([this.previewScore.musicXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.previewScore.title || 'partitura'}.musicxml`;
    link.click();
    URL.revokeObjectURL(url);
  }
  downloadScoreImage() {
    const container: HTMLElement = this.previewContainer.nativeElement;
    const svg = container.querySelector('svg');
    if (!svg) return;
  
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
  
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
  
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        canvas.toBlob(blob => {
          if (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${this.previewScore.title || 'partitura'}.png`;
            link.click();
            URL.revokeObjectURL(link.href);
          }
        }, 'image/png');
      }
      URL.revokeObjectURL(url);
    };
    image.src = url;
  }
}
