import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/token/token-storage.service';
import { AuthLoginInfo } from '../services/token/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private router: Router,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) { }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();

      // Navigate after reload if a redirect path is stored
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        this.router.navigate([redirectPath]);
        localStorage.removeItem('redirectAfterLogin'); // Clear the stored path after navigating
      }
    }
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        // Store the target URL to navigate after reloading
        localStorage.setItem('redirectAfterLogin', '/profile');

        // Reload the page to reset the application state
        window.location.reload();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
