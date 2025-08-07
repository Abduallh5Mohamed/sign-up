import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const { email, password } = this.loginForm.value;
        await this.authService.signIn(email, password);
        
        // Get user role and navigate accordingly
        const userRole = this.authService.getUserRole();
        
        if (userRole === 'admin') {
          this.router.navigate(['/admin']);
        } else if (userRole === 'technician') {
          this.router.navigate(['/technician/dashboard']);
        } else if (userRole === 'driver') {
          this.router.navigate(['/driver/dashboard']);
        } else if (this.authService.isEmailVerified()) {
          this.router.navigate(['/customer/dashboard']);
        } else {
          this.router.navigate(['/auth/pending-verification']);
        }
      } catch (error: any) {
        this.errorMessage = error;
      } finally {
        this.isLoading = false;
      }
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.signInWithGoogle();
      
      // Get user role and navigate accordingly
      const userRole = this.authService.getUserRole();
      
      if (userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'technician') {
        this.router.navigate(['/technician/dashboard']);
      } else if (userRole === 'driver') {
        this.router.navigate(['/driver/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }
    } catch (error: any) {
      this.errorMessage = error;
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithFacebook() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.signInWithFacebook();
      
      // Get user role and navigate accordingly
      const userRole = this.authService.getUserRole();
      
      if (userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'technician') {
        this.router.navigate(['/technician/dashboard']);
      } else if (userRole === 'driver') {
        this.router.navigate(['/driver/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }
    } catch (error: any) {
      this.errorMessage = error;
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
    }
    return '';
  }
}