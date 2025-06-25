import { Component } from '@angular/core';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Component({
  selector: 'app-score-player',
  imports: [],
  templateUrl: './score-player.component.html',
  styleUrl: './score-player.component.css'
})
export class ScorePlayerComponent {

  score: any;

  ngOnInit() {
    this.score = JSON.parse(localStorage.getItem('scoreToPlay')!);
    const osmd = new OpenSheetMusicDisplay('osmd-container');
    osmd.load(this.score.musicXml).then(() => osmd.render());
  }
  
  play() {
    // Puedes integrar Tone.js o MIDI.js para reproducir notas reales.
    alert('🔊 Reproducción simulada...');
  }
}
