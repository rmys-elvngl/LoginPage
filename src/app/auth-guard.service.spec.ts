import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

describe('AuthGuardService', () => {
  let guard: AuthGuardService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService, AuthService],
    });

    guard = TestBed.inject(AuthGuardService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access if user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = {url: 'test-url'} as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('should redirect to login page and return false if user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = {url: 'test-url'} as RouterStateSnapshot;
    const routerNavigateSpy = spyOn(router, 'navigate');

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['login']);
  });
});
