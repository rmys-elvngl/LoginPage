import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public router: Router) {}
  private isLoggedIn: boolean = false;

  login() {
    // Burada giriş işlemlerini yapabilirsiniz
    this.isLoggedIn = true;
    this.router.navigate(['home']);
    return false;
  }

  logout() {
    // Burada çıkış işlemlerini yapabilirsiniz
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
