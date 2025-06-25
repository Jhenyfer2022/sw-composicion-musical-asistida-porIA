import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Component({
  selector: 'app-score-harmony',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './score-harmony.component.html',
  styleUrls: ['./score-harmony.component.css']
})
export class ScoreHarmonyComponent {
  inputXml = '';
  harmonyXml = '';
  showExamples = true;
  currentExample: string | null = null;
  @ViewChild('osmdContainer') osmdContainer!: ElementRef;
  private osmd!: OpenSheetMusicDisplay;

  // Ejemplos de partituras en formato MusicXML simplificado
  examples = [
    {
    title: 'Te Vas Amor - Enanitos Verdes (Estrofa completa)',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1">
      <part-name>Voz</part-name>
    </score-part>
    <score-part id="P2">
      <part-name>Guitarra</part-name>
    </score-part>
  </part-list>
  
  <!-- Parte vocal -->
  <part id="P1">
    <!-- Primera línea -->
    <measure number="1">
      <attributes>
        <divisions>24</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>Te</text></lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>vas</text></lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>48</duration>
        <lyric><text>a</text></lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>mor</text></lyric>
      </note>
    </measure>
    
    <!-- Segunda línea -->
    <measure number="2">
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>Sí</text></lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>a</text></lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>sí</text></lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>lo</text></lyric>
      </note>
    </measure>
    
    <measure number="3">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>48</duration>
        <lyric><text>que</text></lyric>
      </note>
      <note>
        <pitch><step>C</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>res</text></lyric>
      </note>
      <note>
        <rest/>
        <duration>24</duration>
      </note>
      <note>
        <pitch><step>C</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>qué</text></lyric>
      </note>
    </measure>
    
    <measure number="4">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>pue</text></lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>48</duration>
        <lyric><text>do</text></lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>yo</text></lyric>
      </note>
    </measure>
    
    <!-- Continúa con el resto de la estrofa -->
  </part>
  
  <!-- Parte de guitarra con acordes -->
  <part id="P2">
    <measure number="1">
      <attributes>
        <divisions>24</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <harmony>
        <root><root-step>E</root-step></root>
        <kind>minor</kind>
      </harmony>
      <note>
        <pitch><step>E</step><octave>3</octave></pitch>
        <duration>96</duration>
      </note>
    </measure>
    
    <measure number="2">
      <harmony>
        <root><root-step>G</root-step></root>
        <kind>major</kind>
      </harmony>
      <note>
        <pitch><step>G</step><octave>3</octave></pitch>
        <duration>96</duration>
      </note>
    </measure>
    
    <measure number="3">
      <harmony>
        <root><root-step>D</root-step></root>
        <kind>major</kind>
      </harmony>
      <note>
        <pitch><step>D</step><octave>3</octave></pitch>
        <duration>96</duration>
      </note>
    </measure>
    
    <measure number="4">
      <harmony>
        <root><root-step>C</root-step></root>
        <kind>major</kind>
      </harmony>
      <note>
        <pitch><step>C</step><octave>3</octave></pitch>
        <duration>96</duration>
      </note>
    </measure>
  </part>
</score-partwise>`
  },
    {
      title: 'Los Pollitos Dicen',
      xml: `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise>
  <part-list>
    <score-part id="P1">
      <part-name>Melodía</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>24</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
      </attributes>
      <note>
        <pitch><step>C</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>Los</text></lyric>
      </note>
      <note>
        <pitch><step>C</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>po</text></lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>lli</text></lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>tos</text></lyric>
      </note>
    </measure>
  </part>
</score-partwise>`
    },
    {
      title: 'Cumpleaños Feliz',
      xml: `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise>
  <part-list>
    <score-part id="P1">
      <part-name>Melodía</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>24</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>3</beats><beat-type>4</beat-type></time>
      </attributes>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>Cum</text></lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>24</duration>
        <lyric><text>ple</text></lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>48</duration>
        <lyric><text>años</text></lyric>
      </note>
    </measure>
  </part>
</score-partwise>`
    }
  ];

  async ngAfterViewInit() {
    // Inicializar OSMD
    this.osmd = new OpenSheetMusicDisplay(this.osmdContainer.nativeElement, {
      autoResize: true,
      backend: "svg",
      drawTitle: true
    });
  }

  toggleExamples() {
    this.showExamples = !this.showExamples;
  }


   async loadExample(exampleXml: string) {
    this.inputXml = exampleXml;
    this.currentExample = exampleXml;
    await this.renderMusicXml(exampleXml);
  }

  async renderMusicXml(xml: string) {
  try {
    this.osmdContainer.nativeElement.innerHTML = '';
    this.osmd = new OpenSheetMusicDisplay(this.osmdContainer.nativeElement, {
      autoResize: true,
      backend: "svg",
      drawTitle: true
    });

    await this.osmd.load(xml);
    this.osmd.render();
    this.osmd.zoom = 0.9; // Ajusta el zoom según necesidad
  } catch (error) {
    console.error('Error al renderizar:', error);
  }
}

  async generateHarmony() {
    if (!this.inputXml.trim()) return;
    
    try {
      // Aquí iría la lógica para generar armonía si lo necesitas
      // Por ahora simplemente renderizamos el XML de entrada
      await this.renderMusicXml(this.inputXml);
    } catch (error) {
      console.error('Error al generar armonía:', error);
    }
  }
}