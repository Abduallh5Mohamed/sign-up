import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [ReactiveFormsModule]
})
export class SignUpComponent {
  signUpForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      displayName: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getFieldError(fieldName: string): string {
    const field = this.signUpForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        if (fieldName === 'displayName') {
          return 'Display name is required';
        }
        if (fieldName === 'acceptTerms') {
          return 'You must accept the terms and conditions';
        }
        return `${fieldName} is required`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors?.['requiredTrue']) {
        return 'You must accept the terms and conditions';
      }
    }
    
    // Check for password mismatch error at form level
    if (fieldName === 'confirmPassword' && this.signUpForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }
    
    return '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const formData = this.signUpForm.value;
      
      this.authService.signUp(formData.email, formData.password, formData.displayName)
        .then(() => {
          this.router.navigate(['/auth/pending-verification']);
        })
        .catch((error) => {
          this.errorMessage = error.message || 'An error occurred during sign up';
          this.isLoading = false;
        });
    }
  }

  signUpWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Handle Google sign up logic here
    console.log('Google sign up initiated');
    
    // Reset loading state (this would normally be done in success/error callbacks)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  signUpWithFacebook() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Handle Facebook sign up logic here
    console.log('Facebook sign up initiated');
    
    // Reset loading state (this would normally be done in success/error callbacks)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}