import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../data.service';
import {EditUserDiaologComponent} from '../edit-user-diaolog/edit-user-diaolog.component';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  unvan: string;
  isAdmin: boolean;
  isNormal: boolean;
  id: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'password',
    'unvan',
    'isAdmin',
    'isNormal',
    'action',
  ];
  users: User[] = [];

  constructor(
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog,
  ) {
    this.users = this.dataService.getLoginUsers();
  }

  ngOnInit() {
    const storedUsers = localStorage.getItem('loginUsers');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = this.dataService.getLoginUsers();
    }
  }

  createUser() {
    this.router.navigate(['']);
  }

  openUser(user: User) {
    const userInfo = `
     Name: ${user.firstName} ${user.lastName}
     Email: ${user.email}
     Password: ${user.password}
     Unvan: ${user.unvan}
     Is Admin: ${user.isAdmin ? 'Yes' : 'No'}
     Is Normal: ${user.isNormal ? 'Yes' : 'No'}
   `;
    alert(userInfo);
  }
  editUser(user: User) {
    if (user.isNormal) {
      window.alert('You do not have permission to edit this user.');
    } else {
      const dialogRef = this.dialog.open(EditUserDiaologComponent, {
        width: '400px',
        data: {user},
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.dataService.editLoginUser(result);
        }
      });
    }
  }
  
  deleteUser(user: User) {
    if (user.isAdmin) {
      const confirmDelete = confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        this.dataService.deleteLoginUser(user.id);
        this.users = this.dataService.getLoginUsers();
        alert('User has been deleted.');
      }
    } else {
      alert('You do not have permission to delete an admin user.');
    }
  }
}
