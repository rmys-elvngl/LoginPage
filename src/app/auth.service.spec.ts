import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user and navigate to home', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.login();
    expect(service.isAuthenticated()).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });

  it('should logout user', () => {
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
