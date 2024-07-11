
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopsisService {
  private apiUrl = 'http://localhost:8080/api/calculate';

  constructor(private http: HttpClient) { }

  calculateTopsis(data: {
    alternatives: string[],
    criteria: string[],
    criteriaValues: number[][],
    weights: number[],
    benefitCriteria: boolean[]
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/calculate`, data);
  }
}

