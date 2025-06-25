import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  
  private baseUrl = 'https://musiccomposebackend-production.up.railway.app/api/AI/suggest/';
  // private baseUrl = 'https://figmabackend-production.up.railway.app/api/User';
  constructor(private http: HttpClient) 
  { 

  }

  suggestHarmony(musicXml: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/harmony`, { musicXml });
  }

  suggestMelody(musicXml: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/melody`, { musicXml });
  }

  suggestStructure(style: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/structure`, { style });
  }

  transcribeFromAudio(audioBlob: Blob): Observable<any> {

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    return this.http.post('https://musiccomposebackend-production.up.railway.app/api/AI/transcribe/audio', formData);
  }

}
