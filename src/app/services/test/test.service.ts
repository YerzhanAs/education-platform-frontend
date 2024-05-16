import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://localhost:8080/api/v1/tests';

  constructor(private http: HttpClient) { }

  getTest(testId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${testId}`);
  }

  submitTest(testSubmission: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${testSubmission.testId}/submit`, testSubmission);
  }
}
