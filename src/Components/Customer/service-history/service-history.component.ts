import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceHistoryService } from '../dashboard/service-history.service';

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
  selector: 'app-service-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css'],
})
export class ServiceHistoryComponent implements OnInit {
  serviceHistory: ServiceHistory[] = [];
  showAddServiceModal: boolean = false;
  addServiceForm: FormGroup;

  // فلترة
  selectedServiceType: string = 'all';
  selectedVehicle: string = 'all';

  constructor(
    public serviceHistoryService: ServiceHistoryService,
    private fb: FormBuilder
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
    this.serviceHistoryService.history$.subscribe((history: ServiceHistory[]) => {
      this.serviceHistory = history;
    });
  }

  get filteredServices(): ServiceHistory[] {
    return this.serviceHistory.filter(service => {
      const matchesServiceType =
        this.selectedServiceType === 'all' || service.serviceType === this.selectedServiceType;
      const matchesVehicle =
        this.selectedVehicle === 'all' || service.vehicle.includes(this.selectedVehicle);
      return matchesServiceType && matchesVehicle;
    });
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
      
      const newServiceObj = {
        id: Date.now(),
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
      
      this.serviceHistoryService.addService(newServiceObj);
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

  trackByServiceId(index: number, service: ServiceHistory): number {
    return service.id;
  }
}
