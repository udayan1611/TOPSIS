import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopsisService {
  private apiUrl = 'http://localhost:8080/api/topsis';

  constructor(private http: HttpClient) { }

  calculateTopsis(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/calculate`, data);
  }
}
