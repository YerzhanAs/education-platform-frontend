import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { SignUpInfo } from '../services/token/signup-info';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/auth/login']);
        this.toastr.success(`Вы успешно прошли регистрацию:`, 'Регистрация успешна');
      },
      error => {
        this.toastr.error(`Ошибка регистрации: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
