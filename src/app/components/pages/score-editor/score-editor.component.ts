import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../../services/score.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { ChangeDetectorRef } from '@angular/core';
import { AiService } from '../../../services/ai.service';

@Component({
  selector: 'app-score-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './score-editor.component.html',
  styleUrl: './score-editor.component.css'
})
export class ScoreEditorComponent {
  score: any = {
    title: '',
    composer: '',
    instrumentation: '',
    clef: 'G',
    timeSignature: '4/4',
    keySignature: 'C',
    musicXml: '',
    isPublic: false,
    userId: sessionStorage.getItem("userId")
  };
  editingId: number | null = null;
  @ViewChild('osmdContainer', { static: false }) osmdContainer!: ElementRef;
  osmd: OpenSheetMusicDisplay | undefined;
  isRecording = false;
  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  recordingStatus = '';
  
  clefOptions = [
    { label: 'Clave de Sol (G)', value: 'G' },
    { label: 'Clave de Fa (F)', value: 'F' },
    { label: 'Clave de Do (C)', value: 'C' },
    { label: 'Clave de Percusión', value: 'percussion' },
    { label: 'Tablatura (TAB)', value: 'TAB' }
  ];
  keySignatureOptions = [
    { label: 'Do Mayor (C)', value: 'C' },
    { label: 'Sol Mayor (G)', value: 'G' },
    { label: 'Re Mayor (D)', value: 'D' },
    { label: 'La Mayor (A)', value: 'A' },
    { label: 'Mi Mayor (E)', value: 'E' },
    { label: 'Fa Mayor (F)', value: 'F' },
    { label: 'Re menor (Dm)', value: 'Dm' },
    { label: 'Si bemol Mayor (Bb)', value: 'Bb' },
    // etc.
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService,
    private cdRef: ChangeDetectorRef,
    private aiService: AiService
  ) {}
  
  ngAfterViewInit(): void {
   this.osmd = new OpenSheetMusicDisplay(this.osmdContainer.nativeElement);
    if (!this.score.musicXml) {
      // this.generateMusicXmlTemplate(); 
      this.cdRef.detectChanges();
    }
  }
  ngOnInit(): void {
    // this.editingId = Number(this.route.snapshot.paramMap.get('id'));
    // if (this.editingId) {
    //   this.scoreService.getById(this.editingId).subscribe((resp: any) => {
    //     this.score = {
    //       id: resp.id,
    //       title: resp.title,
    //       musicXml: resp.musicXml,
    //       isPublic: resp.isPublic,
    //       composer: resp.composer ?? '',
    //       clef: resp.clef ?? 'G',
    //       timeSignature: resp.timeSignature ?? '4/4',
    //       keySignature: resp.keySignature ?? 'C'
    //     };
    //     this.renderScore();
    //   });
    // }
  }

  saveScore() {
    this.scoreService.save(this.score).subscribe(() => {
      this.router.navigate(['/scores']);
    });
  }

  // generateMusicXmlTemplate() {
  //   const { title, composer, clef, timeSignature, keySignature } = this.score;
  
  //   const [beats, beatType] = timeSignature.split('/'); // Ej: "4/4"
  //   const fifthsMap: Record<string, number> = {
  //     "C": 0, "G": 1, "D": 2, "A": 3, "E": 4, "B": 5, "F#": 6, "C#": 7,
  //     "F": -1, "Bb": -2, "Eb": -3, "Ab": -4, "Db": -5, "Gb": -6, "Cb": -7
  //   };
  
  //   const keyFifths = fifthsMap[keySignature] ?? 0;
  
  //   const xml = `<?xml version="1.0" encoding="UTF-8"?>
  //     <!DOCTYPE score-partwise PUBLIC
  //       "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
  //       "http://www.musicxml.org/dtds/partwise.dtd">
  //     <score-partwise version="3.1">
  //       <work>
  //         <work-title>${title}</work-title>
  //       </work>
  //       <identification>
  //         <creator type="composer">${composer}</creator>
  //       </identification>
  //       <part-list>
  //         <score-part id="P1">
  //           <part-name>Music</part-name>
  //         </score-part>
  //       </part-list>
  //       <part id="P1">
  //         <measure number="1">
  //           <attributes>
  //             <divisions>4</divisions>
  //             <key>
  //               <fifths>${keyFifths}</fifths>
  //             </key>
  //             <time>
  //               <beats>${beats}</beats>
  //               <beat-type>${beatType}</beat-type>
  //             </time>
  //             <clef>
  //               <sign>${clef}</sign>
  //               <line>2</line>
  //             </clef>
  //           </attributes>
  //           <note>
  //             <pitch>
  //               <step>C</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>4</duration>
  //             <type>whole</type>
  //           </note>
  //         </measure>
      
  //         <measure number="2">
  //           <note>
  //             <pitch>
  //               <step>D</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>1</duration>
  //             <type>quarter</type>
  //           </note>
  //           <note>
  //             <pitch>
  //               <step>E</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>1</duration>
  //             <type>quarter</type>
  //           </note>
  //           <note>
  //             <pitch>
  //               <step>F</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>1</duration>
  //             <type>quarter</type>
  //           </note>
  //           <note>
  //             <pitch>
  //               <step>G</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>1</duration>
  //             <type>quarter</type>
  //           </note>
  //         </measure>
      
  //         <measure number="3">
  //           <note>
  //             <pitch>
  //               <step>A</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>2</duration>
  //             <type>half</type>
  //           </note>
  //           <note>
  //             <pitch>
  //               <step>B</step>
  //               <octave>4</octave>
  //             </pitch>
  //             <duration>2</duration>
  //             <type>half</type>
  //           </note>
  //         </measure>
      
  //         <measure number="4">
  //           <note>
  //             <rest/>
  //             <duration>4</duration>
  //             <type>whole</type>
  //           </note>
  //         </measure>
      
  //       </part>
  //     </score-partwise>`;
  
  //   this.score.musicXml = xml;
  //   this.renderScore();
  // }
  generateMusicXmlTemplate() {
      const { title, composer, clef, timeSignature, keySignature } = this.score;
    
      const [beats, beatType] = timeSignature.split('/');
      const fifthsMap: Record<string, number> = {
        "C": 0, "G": 1, "D": 2, "A": 3, "E": 4, "B": 5, "F#": 6, "C#": 7,
        "F": -1, "Bb": -2, "Eb": -3, "Ab": -4, "Db": -5, "Gb": -6, "Cb": -7
      };
    
      const clefLineMap: Record<string, number> = {
        G: 2,
        F: 4,
        C: 3,
        percussion: 2,
        TAB: 3
      };
    
      const keyFifths = fifthsMap[keySignature] ?? 0;
      const clefLine = clefLineMap[clef] ?? 2;
    
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
      "http://www.musicxml.org/dtds/partwise.dtd">
    <score-partwise version="3.1">
      <work>
        <work-title>${title}</work-title>
      </work>
      <identification>
        <creator type="composer">${composer}</creator>
      </identification>
      <part-list>
        <score-part id="P1">
          <part-name>Music</part-name>
        </score-part>
      </part-list>
      <part id="P1">
        <measure number="1">
          <attributes>
            <divisions>4</divisions>
            <key><fifths>${keyFifths}</fifths></key>
            <time><beats>${beats}</beats><beat-type>${beatType}</beat-type></time>
            <clef><sign>${clef}</sign><line>${clefLine}</line></clef>
          </attributes>
          <note>
            <pitch><step>C</step><octave>4</octave></pitch>
            <duration>4</duration>
            <type>whole</type>
          </note>
        </measure>
        <measure number="2">
          <note><pitch><step>D</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
          <note><pitch><step>E</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
          <note><pitch><step>F</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
          <note><pitch><step>G</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
        </measure>
        <measure number="3">
          <note><pitch><step>A</step><octave>4</octave></pitch><duration>2</duration><type>half</type></note>
          <note><pitch><step>B</step><octave>4</octave></pitch><duration>2</duration><type>half</type></note>
        </measure>
        <measure number="4">
          <note><rest/><duration>4</duration><type>whole</type></note>
        </measure>
      </part>
    </score-partwise>`;
    
      this.score.musicXml = xml;
      this.renderScore();
  }
    

  renderScore() {
    if (this.osmd && this.score.musicXml) {
      this.osmd.load(this.score.musicXml).then(() => {
        this.osmd!.render();
      });
    }
  }
  
  startAudioRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];
  
      this.mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) this.recordedChunks.push(e.data);
      };
  
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        this.sendAudioToAI(audioBlob);
      };
  
      this.mediaRecorder.start();
      this.isRecording = true;
    }).catch(err => {
      console.error('Error al acceder al micrófono:', err);
    });
  }
  
  stopAudioRecording() {
    this.isRecording = false;
    this.mediaRecorder?.stop();
  }

  sendAudioToAI(blob: Blob) {
    const formData = new FormData();
    formData.append('audio', blob, 'audio.webm');
  
    this.aiService.transcribeFromAudio(blob).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.score.musicXml = resp.musicXml.musicXml;
        this.recordingStatus = 'Partitura generada con éxito 🎵';
        this.renderScore();
      },
      error: err => {
        console.error(err);
        this.recordingStatus = 'Error al procesar el audio';
      }
    });
  }


}
