import {Component, OnInit, ViewChild} from '@angular/core';

import { UserService } from '../services/user.service';
import {UserRequest} from '../services/user-request';
import {UserUpdateDTO} from '../services/user-update.dto';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: UserRequest[] = [];
  userUpdateDTO: UserUpdateDTO = new UserUpdateDTO();



  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this. fetchUsers();
  }

  // tslint:disable-next-line:typedef
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  saveChanges() {
    this.userService.saveUser(this.userUpdateDTO)
      .subscribe(
        (response) => {
          console.log('User saved successfully:', response);
          this.userUpdateDTO = new UserUpdateDTO();
        },
        (error) => {
          console.error('Error saving user:', error);
        }
      );
  }













}
