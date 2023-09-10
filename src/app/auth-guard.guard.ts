// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from './auth.service';
// export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const authService = route.injector.get(AuthService); // AuthService'ı doğrudan enjekte et

//   if (authService.isAuthenticated()) {
//     return true;
//   } else {
//     window.alert('You need to login to access this page.');
//     authService.router.navigate(['login']); // AuthService içerisindeki router nesnesini kullan
//     return false;
//   }
// };
