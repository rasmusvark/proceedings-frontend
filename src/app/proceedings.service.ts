// proceedings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProceedingsService {
  private apiUrl = 'http://localhost:8080/api/proceedings';

  constructor(private http: HttpClient) {}

  createProceeding(proceedingData: any): Observable<any> {
    return this.http.post(this.apiUrl, proceedingData);
  }

  getAllProceedings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
