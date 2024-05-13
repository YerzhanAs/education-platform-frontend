import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContactDTO} from './contactDTO';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:8080/api/v1/contact';

  constructor(private http: HttpClient) { }

  saveContact(contact: ContactDTO): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/save`, contact, httpOptions);
  }
}
