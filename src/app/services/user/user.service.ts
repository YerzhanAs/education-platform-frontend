import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';
import {UserRequest} from './user-request';
import {UserUpdateDTO} from './user-update.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/mod';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private allUrl = 'http://localhost:8080/api/test/all';
  private allUserUrl = 'http://localhost:8080/api/user/all';
  private delete = 'http://localhost:8080/api/user/delete';
  private addUser = 'http://localhost:8080/api/user/save';
  private uploadUrl = 'http://localhost:8080/api/v1/user/upload';

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, {  responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, {  responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {  responseType: 'text' });
  }

  getAllBoard(): Observable<string> {
    return this.http.get(this.allUrl, {  responseType: 'text' });
  }

  getAllUsers(): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(this.allUserUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.delete + `/${id}`);
  }

  saveUser(userUpdateDTO: UserUpdateDTO): Observable<any> {
    return this.http.post(this.addUser, userUpdateDTO);
  }

  uploadAvatar(file: File, id: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    formData.append('id', id.toString());
    return this.http.post(this.uploadUrl, formData, );
  }
}
