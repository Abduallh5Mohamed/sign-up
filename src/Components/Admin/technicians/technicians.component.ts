import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-technicians',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technicians.component.html',
  styleUrl: './technicians.component.css',
})
export class TechniciansComponent {
  constructor(private authService: AuthService) {}

  showAddTechnicianModal = false;
  showPassword = false; // متغير للتحكم في إظهار/إخفاء كلمة المرور

  // المعاينة قبل الحفظ
  previewImage: string | null = null;

  newTechnician = {
    name: '',
    specialty: '',
    certification: '',
    experience: '',
    joined: '',
    status: 'Available',
    rating: 0,
    completedJobs: 0,
    email: '',
    password: '',
    image: ''
  };

  // خيارات الحالات المتاحة
  statusOptions = [
    { value: 'Available', label: 'Available', class: 'available' },
    { value: 'Busy', label: 'Busy', class: 'busy' },
    { value: 'On Break', label: 'On Break', class: 'on-break' }
  ];

  technicians = [
    {
      id: 1,
      name: 'Mohamed Hassan',
      specialty: 'Engine Repair',
      certification: 'ASE Certified',
      image: './assets/technicians-img/tech1.jpg',
      joined: 'Aug 2021',
      experience: '8 Years',
      status: 'Available',
      rating: 4.9,
      completedJobs: 450,
      email: 'mohamed@example.com',
      password: '****'
    },
    {
      id: 2,
      name: 'Ahmed Farouk',
      specialty: 'Brake Service',
      certification: 'Master Tech',
      image: './assets/technicians-img/tech2.jpg',
      joined: 'Mar 2021',
      experience: '6 Years',
      status: 'Busy',
      rating: 4.7,
      completedJobs: 380,
      email: 'ahmed@example.com',
      password: '****'
    },
    {
      id: 3,
      name: 'Omar El-Sayed',
      specialty: 'Transmission',
      certification: 'Certified Tech',
      image: './assets/technicians-img/tech3.jpg',
      joined: 'Nov 2021',
      experience: '5 Years',
      status: 'Available',
      rating: 4.8,
      completedJobs: 320,
      email: 'omar@example.com',
      password: '****'
    },
    {
      id: 4,
      name: 'Youssef Mahmoud',
      specialty: 'Electrical',
      certification: 'Master Tech',
      image: './assets/technicians-img/tech4.jpg',
      joined: 'Jul 2022',
      experience: '4 Years',
      status: 'On Break',
      rating: 4.6,
      completedJobs: 280,
      email: 'youssef@example.com',
      password: '****'
    },
    {
      id: 5,
      name: 'Khaled Ibrahim',
      specialty: 'Suspension',
      certification: 'ASE Certified',
      image: './assets/technicians-img/tech5.jpg',
      joined: 'May 2021',
      experience: '7 Years',
      status: 'Available',
      rating: 4.9,
      completedJobs: 420,
      email: 'khaled@example.com',
      password: '****'
    },
    {
      id: 6,
      name: 'Mahmoud Ali',
      specialty: 'AC Repair',
      certification: 'Certified Tech',
      image: './assets/technicians-img/tech6.jpg',
      joined: 'Mar 2022',
      experience: '3 Years',
      status: 'Busy',
      rating: 4.5,
      completedJobs: 190,
      email: 'mahmoud.ali@example.com',
      password: '****'
    },
    {
      id: 7,
      name: 'Hassan Nasser',
      specialty: 'Tire Service',
      certification: 'Master Tech',
      image: './assets/technicians-img/tech7.jpg',
      joined: 'Nov 2022',
      experience: '2 Years',
      status: 'Available',
      rating: 4.4,
      completedJobs: 150,
      email: 'hassan@example.com',
      password: '****'
    },
    {
      id: 8,
      name: 'Ali Mostafa',
      specialty: 'Body Work',
      certification: 'Certified Tech',
      image: './assets/technicians-img/tech8.jpg',
      joined: 'Jul 2022',
      experience: '3 Years',
      status: 'On Break',
      rating: 4.6,
      completedJobs: 210,
      email: 'ali@example.com',
      password: '****'
    },
  ];

  openAddTechnicianModal() {
    this.showAddTechnicianModal = true;
  }

  closeAddTechnicianModal() {
    this.showAddTechnicianModal = false;
    this.previewImage = null;
    this.showPassword = false; // إعادة تعيين إظهار كلمة المرور
  }

  // اختيار الصورة + معاينة قبل الحفظ
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // إضافة التقني
  async addTechnician() {
    if (
      !this.newTechnician.name ||
      !this.newTechnician.specialty ||
      !this.newTechnician.certification ||
      !this.newTechnician.experience ||
      !this.newTechnician.joined ||
      !this.newTechnician.rating ||
      !this.newTechnician.completedJobs ||
      !this.newTechnician.email ||
      !this.newTechnician.password ||
      !this.previewImage
    ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Create technician account in Firebase
      await this.authService.signUp(
        this.newTechnician.email,
        this.newTechnician.password,
        this.newTechnician.name,
        'technician'
      );

      // Add to local technicians array for display
      const newTechnicianData = {
        ...this.newTechnician,
        id: this.technicians.length + 1,
        image: this.previewImage
      };

      this.technicians.push(newTechnicianData);

      // تصفير البيانات
      this.newTechnician = {
        name: '',
        specialty: '',
        certification: '',
        experience: '',
        joined: '',
        status: 'Available',
        rating: 0,
        completedJobs: 0,
        email: '',
        password: '',
        image: ''
      };
      this.previewImage = null;
      this.showPassword = false;

      this.closeAddTechnicianModal();
      
      this.showSuccessMessage('Technician account created successfully!');
    } catch (error: any) {
      console.error('Error creating technician account:', error);
      this.showErrorMessage('Failed to create technician account. Please try again.');
    }
  }

  private showErrorMessage(message: string) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  private showSuccessMessage(message: string) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  callTechnician(tech: any) {
    alert(`Certification: ${tech.certification} - ${tech.specialty} specialist with ${tech.experience} experience`);
  }

  emailTechnician(tech: any) {
    alert(`${tech.name} has completed ${tech.completedJobs} jobs with ${tech.rating}⭐ rating`);
  }

  viewTechnicianProfile(tech: any) {
    console.log('Viewing profile of technician:', tech.name);
  }

  removeTechnician(tech: any) {
    const confirmRemove = confirm(`Are you sure you want to remove ${tech.name}?`);
    if (confirmRemove) {
      this.technicians = this.technicians.filter((t) => t.id !== tech.id);
    }
  }

  // دالة محسّنة لتبديل إظهار كلمة المرور
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}