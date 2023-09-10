import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {DataService} from '../data.service';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxChange} from '@angular/material/checkbox'; // CheckboxChange türünün import edildiği yer

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginComponent {
  captchaError: boolean = false;
  mathQuestion: string = '';
  mathAnswer: number = 0;
  isCaptchaInvalid: boolean = false;
  isSubmitButtonDisabled: boolean = true;
  maxWrongAttempts: number = 3;
  remainingAttempts: number = this.maxWrongAttempts;
  wrongAttempts: number = 0;
  loginForm: FormGroup;
  hide: boolean = true;
  loginUsers: User[] = [];
  userId: number = 1;
  isAdmin: boolean = false;
  isNormal: boolean = false;
  passwordControl: FormControl = new FormControl('', Validators.required);
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
  )
  {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      unvan: ['', Validators.required],
      isAdmin: [false],
      isNormal: [false],
      mathAnswer: ['', Validators.required],
    });
    this.generateMathQuestion();
  }
  generateMathQuestion() {
    const operand1 = Math.floor(Math.random() * 10) + 1;
    const operand2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    this.mathAnswer = this.calculateMathAnswer(operand1, operand2, operator);
    this.mathQuestion = `${operand1} ${operator} ${operand2} = ?`;
  }
  calculateMathAnswer(operand1: number, operand2: number, operator: string): number {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      default:
        return 0;
    }
  }
  onSubmit(): void {
    if (!this.loginForm.valid) {
      // Form geçerli değilse (alanlar doğru doldurulmamışsa), işlemi durdur
      return;
    }

    const userAnswer = this.loginForm.get('mathAnswer')?.value; 

    if (userAnswer === this.mathAnswer) {
      // Kullanıcının girdiği cevap doğru, form gönderimi yapılabilir
      const formData = this.loginForm.value;
      formData.id = this.userId;
      this.userId++;
      this.loginUsers.push(formData);
      localStorage.setItem('loginUsers', JSON.stringify(this.loginUsers));
      this.dataService.addLoginUser(formData);
      console.log(formData);
      this.loginForm.reset(); // Formu sıfırla
      this.authService.login();

      // Kullanıcının yönlendirilmesi
      this.router.navigate(['home']);
    } else {
      // Kullanıcının girdiği cevap yanlış, CAPTCHA geçersiz kabul edilir
      this.isCaptchaInvalid = true;
      this.isSubmitButtonDisabled = true; // Submit butonunu inaktif hale getir
      this.wrongAttempts++; // Yanlış giriş sayısını artır
      this.remainingAttempts--; // Yanlış cevap verme hakkını azalt
      if (this.wrongAttempts >= this.maxWrongAttempts) {
        alert('You have exceeded the maximum number of wrong attempts.'); // Uyarı mesajı göster
        this.isSubmitButtonDisabled = true; // Submit butonunu devre dışı bırak
      }
    }
  }
  handleNormalCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.loginForm.controls['isAdmin'].setValue(false);
    }
  }

  handleAdminCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.loginForm.controls['isNormal'].setValue(false);
    }
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
