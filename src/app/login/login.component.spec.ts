import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    formBuilder = TestBed.inject(FormBuilder); // FormBuilder enjekte edilir
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should contain input fields', () => {
    const inputElements = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElements.length).toBeGreaterThan(0);
  });
  it('should contain submit button', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton).toBeTruthy(); 
  });

  it('should contain router link', () => {
    const routerLink = fixture.debugElement.query(
      By.css('input[type="submit"][value="Go To Home"]'),
    );
    expect(routerLink).toBeTruthy();
  });

  it('should create a valid form', () => {
    const expectedForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      unvan: ['', Validators.required],
      isAdmin: [false],
      isNormal: [false],
      mathAnswer: ['', Validators.required],
    });

    expect(component.loginForm.value).toEqual(expectedForm.value);
  });
});
