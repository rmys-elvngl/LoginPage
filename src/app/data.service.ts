import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private loginUsers: User[] = [];
  addLoginUser(user: User) {
    this.loginUsers.push(user);
    this.saveToLocalStorage();
  } 
  private loadFromLocalStorage() {
    const storedUsers = localStorage.getItem('loginUsers');
    if (storedUsers) {
      this.loginUsers = JSON.parse(storedUsers);
    }
  }
  getLoginUsers() {
    // localStorage'dan kaydedilmiş kullanıcıları alın
    this.loadFromLocalStorage();
    return this.loginUsers;
  }
  deleteLoginUser(id: number) {
    const index = this.loginUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.loginUsers.splice(index, 1);
      this.saveToLocalStorage();
    }
  }
  editLoginUser(updatedUser: User) {
    const index = this.loginUsers.findIndex((user: User) => user.id === updatedUser.id);
    if (index !== -1) {
      this.loginUsers[index] = updatedUser;
      this.saveToLocalStorage();
    }
  }
  private saveToLocalStorage() {
    localStorage.setItem('loginUsers', JSON.stringify(this.loginUsers));
  }

 
}
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
