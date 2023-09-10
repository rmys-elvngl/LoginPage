import {TestBed} from '@angular/core/testing';
import {DataService} from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should created service', () => {
    expect(service).toBeTruthy();
  });

  it('should add a login user', () => {
    const user = {id: 1, name: 'User 1'};
    service.addLoginUser(user);
    expect(service.getLoginUsers().length).toBe(1);
  });

  it('should delete a login user', () => {
    const user = {id: 1, name: 'User 1'};
    service.addLoginUser(user);
    service.deleteLoginUser(1);
    expect(service.getLoginUsers().length).toBe(0);
  });

  it('should edit a login user', () => {
    const user = {id: 1, name: 'User 1'};
    service.addLoginUser(user);
    const updatedUser = {id: 1, name: 'Updated User 1'};
    service.editLoginUser(updatedUser);
    const users = service.getLoginUsers();
    const editedUser = users.find((u) => u.id === updatedUser.id);
    expect(editedUser?.name).toBe(updatedUser.name);
  });

  it('should load login users from local storage', () => {
    const storedUsers = [{id: 1, name: 'User 1'}];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUsers));
    service['loadFromLocalStorage'](); // Private metotu çağırmak için
    expect(service.getLoginUsers()).toEqual(storedUsers);
  });

  it('should save login users to local storage', () => {
    const user = {id: 1, name: 'User 1'};
    service.addLoginUser(user);
    const storedUsers = [{id: 1, name: 'User 1'}];
    spyOn(localStorage, 'setItem');
    service['saveToLocalStorage'](); // Private metotu çağırmak için
    expect(localStorage.setItem).toHaveBeenCalledWith('loginUsers', JSON.stringify(storedUsers));
  });
});
