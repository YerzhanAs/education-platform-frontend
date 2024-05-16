import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './services/token/token-storage.service'; // Убедитесь, что путь к сервису указан верно

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
