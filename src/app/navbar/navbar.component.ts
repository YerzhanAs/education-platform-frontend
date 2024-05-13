import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/token/token-storage.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles: string[];
  authority: string;
  name: string;
  dropdownOpen = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.name = this.tokenStorage.getUsername();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
