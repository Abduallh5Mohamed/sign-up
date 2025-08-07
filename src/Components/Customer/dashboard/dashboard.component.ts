import { Component, OnInit } from '@angular/core';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { ServiceHistoryComponent } from '../service-history/service-history.component';
import { CustomerProfileComponent } from "../profile/profile.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceHistoryService } from './service-history.service';

interface UpcomingService {
  day: string;
  month: string;
  title: string;
  description: string;
  vehicle: string;
  time: string;
  status: string;
  statusText: string;
}

interface RecentActivity {
  icon: string;
  title: string;
  description: string;
  time: string;
}

interface ServiceHistory {
  id: number;
  title: string;
  status: string;
  price: number;
  rating: number;
  date: string;
  technician: string;
  vehicle: string;
  location: string;
  duration: string;
  serviceType: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, VehiclesComponent, ServiceHistoryComponent, CustomerProfileComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  activeTab: string = 'dashboard';

  // Sample data for upcoming services
  upcomingServices: UpcomingService[] = [
    {
      day: '15',
      month: 'Aug',
      title: 'Oil Change Service',
      description: 'Regular maintenance oil change',
      vehicle: 'Toyota Camry 2020',
      time: '10:00 AM',
      status: 'confirmed',
      statusText: 'Confirmed',
    },
    {
      day: '20',
      month: 'Aug',
      title: 'Brake Inspection',
      description: 'Comprehensive brake system check',
      vehicle: 'Honda Civic 2019',
      time: '2:00 PM',
      status: 'pending',
      statusText: 'Pending',
    },
    {
      day: '25',
      month: 'Aug',
      title: 'Tire Replacement',
      description: 'Replace front tires',
      vehicle: 'Toyota Camry 2020',
      time: '11:30 AM',
      status: 'confirmed',
      statusText: 'Confirmed',
    },
  ];

  // Sample data for recent activities
  recentActivities: RecentActivity[] = [
    {
      icon: 'fas fa-check-circle',
      title: 'Service Completed',
      description: 'Engine diagnostic completed successfully',
      time: '2 hours ago',
    },
    {
      icon: 'fas fa-calendar-plus',
      title: 'Service Scheduled',
      description: 'Oil change scheduled for August 15th',
      time: '1 day ago',
    },
    {
      icon: 'fas fa-car',
      title: 'Vehicle Added',
      description: 'Honda Civic 2019 added to your garage',
      time: '3 days ago',
    },
    {
      icon: 'fas fa-user-check',
      title: 'Profile Updated',
      description: 'Contact information updated',
      time: '1 week ago',
    },
  ];

  // Modal state
  showAddServiceModal: boolean = false;

  addServiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceHistoryService: ServiceHistoryService
  ) {
    this.addServiceForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      technician: ['', Validators.required],
      vehicle: ['', Validators.required],
      date: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {
    // Only need to initialize the form once, so remove this if already in constructor
    // this.addServiceForm = this.fb.group({
    //   title: ['', Validators.required],
    //   price: ['', Validators.required],
    //   technician: ['', Validators.required],
    //   vehicle: ['', Validators.required],
    //   date: ['', Validators.required],
    //   rating: ['', Validators.required]
    // });
  }

  openAddServiceModal(): void {
    this.showAddServiceModal = true;
    this.addServiceForm.reset({
      title: '',
      price: 0,
      technician: '',
      vehicle: '',
      date: '',
      rating: 5,
    });
  }

  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
    this.addServiceForm.reset({
      title: '',
      price: 0,
      technician: '',
      vehicle: '',
      date: '',
      rating: 5,
    });
  }

  addNewService(): void {
    if (this.addServiceForm.valid) {
      const formValue = this.addServiceForm.value;
      
      // Create new service object
      const newService = {
        id: Date.now(), // Generate unique ID
        title: formValue.title,
        status: 'Completed',
        price: formValue.price,
        rating: formValue.rating,
        date: this.formatDate(formValue.date),
        technician: formValue.technician,
        vehicle: formValue.vehicle,
        location: 'Main Branch',
        duration: '60 mins',
        serviceType: 'General Service'
      };

      // Add to service history using the service
      this.serviceHistoryService.addService(newService);
      
      // Close modal and reset form
      this.closeAddServiceModal();
    }
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
