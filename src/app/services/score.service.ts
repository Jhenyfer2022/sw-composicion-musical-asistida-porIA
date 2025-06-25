import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseUrl = 'https://musiccomposebackend-production.up.railway.app/api/Scores';
  // private baseUrl = 'https://figmabackend-production.up.railway.app/api/User';
  constructor(private http: HttpClient) 
  { 

  }

   getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getByUser(data: any): Observable<any[]> {
    // Opcional: crear un endpoint en backend para listar todos los scores del usuario
    return this.http.get<any[]>(this.baseUrl+"/user/"+data);
  }

  save(score: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, score);
  }
}
