import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.signUpForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
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
      const formData = this.signUpForm.value;
      
      if (formData.password !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      // Handle sign up logic here
      console.log('Sign up form submitted:', formData);
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