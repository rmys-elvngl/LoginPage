import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {EditUserDiaologComponent} from './edit-user-diaolog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EditUserDiaologComponent', () => {
  let component: EditUserDiaologComponent;
  let fixture: ComponentFixture<EditUserDiaologComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditUserDiaologComponent>>;

  const testData = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
      unvan: 'Engineer',
      isAdmin: true,
    },
  };

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<EditUserDiaologComponent>>(['close']);

    TestBed.configureTestingModule({
      declarations: [EditUserDiaologComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: MAT_DIALOG_DATA, useValue: testData},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserDiaologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close() when onCancelClick is called', () => {
    // Arrange

    // Act
    component.onCancelClick();

    // Assert
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
