import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {UsersComponent} from './users.component';
import {DataService} from '../data.service';
import {RouterTestingModule} from '@angular/router/testing'; // RouterTestingModule ekleyin
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let dataService: DataService;
  let router: Router;
  // let dialog: MatDialog;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [], // UsersComponent'ı buraya ekleyin
      imports: [BrowserAnimationsModule, RouterTestingModule, UsersComponent, MatDialogModule], // RouterTestingModule ekleyin
      providers: [DataService, MatDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router); // Router servisini enjekte edin
    // dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete methods and show alerts correctly', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Kullanıcının admin olduğunu varsayalım
    spyOn(window, 'alert');

    const deleteLoginUserSpy = spyOn(dataService, 'deleteLoginUser');
    const getLoginUsersSpy = spyOn(dataService, 'getLoginUsers');
    const user: User = {
      id: 1,
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      unvan: '',
      isAdmin: true,
      isNormal: false,
    };
    component.deleteUser(user);
    expect(deleteLoginUserSpy).toHaveBeenCalledWith(user.id);
    expect(getLoginUsersSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User has been deleted.');
  });
  it('should navigate to home after creating user', () => {
    spyOn(router, 'navigate'); // Router servisinin navigate metodunu mocklayın

    component.createUser();

    expect(router.navigate).toHaveBeenCalledWith(['']); // Doğru yere yönlendirildi mi
  });
  const user1: User = {
    id: 1,
    name: 'User 1',
    email: '',
    password: '',
    unvan: '',
    isAdmin: false,
    isNormal: false,
    firstName: '',
    lastName: '',
  };

  const user2: User = {
    id: 2,
    name: 'User 2',
    email: '',
    password: '',
    unvan: '',
    isAdmin: false,
    isNormal: false,
    firstName: '',
    lastName: '',
  };
  it('should fetch data from local storage if available', () => {
    const storedUsers: User[] = [user1, user2];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUsers));
    spyOn(dataService, 'getLoginUsers');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('loginUsers');
    expect(component.users).toEqual(storedUsers);
    expect(dataService.getLoginUsers).not.toHaveBeenCalled();
  });

  it('should fetch data from service if local storage data is not available', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const serviceUsers: User[] = [
      {
        id: 3,
        name: 'User 3',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        unvan: '',
        isAdmin: false,
        isNormal: false,
      },
      {
        id: 4,
        name: 'User 4',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        unvan: '',
        isAdmin: false,
        isNormal: false,
      },
    ];

    spyOn(dataService, 'getLoginUsers').and.returnValue(serviceUsers);

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('loginUsers');
    expect(component.users).toEqual(serviceUsers);
    expect(dataService.getLoginUsers).toHaveBeenCalled();
  });
});

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  unvan: string;
  isAdmin: boolean;
  isNormal: boolean;
}
