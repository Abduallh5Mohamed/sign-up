import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Vehicle {
  id: number;
  name: string;
  year: number;
  color: string;
  plateNumber: string;
  currentMileage: string;
  nextServiceDue: string;
  image: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [
    {
      id: 1,
      name: 'Dodge',
      year: 2021,
      color: 'Dark',
      plateNumber: 'ABC-123',
      currentMileage: '45,000',
      nextServiceDue: 'Oil Change (500 miles)',
      image: './assets/vehicles-img/Dodge.jpeg',
      email: 'dodge.owner@email.com',
      password: 'dodge123',
    },
    {
      id: 2,
      name: 'Jeep Renegade',
      year: 2022,
      color: 'Blue',
      plateNumber: 'FGH-652',
      currentMileage: '41,200',
      nextServiceDue: 'Battery Check (800 miles)',
      image: './assets/vehicles-img/jeep.jpeg',
      email: 'jeep.owner@email.com',
      password: 'jeep456',
    },
    {
      id: 3,
      name: 'BMW x6',
      year: 2024,
      color: 'Gray',
      plateNumber: 'XYZ-789',
      currentMileage: '38,000',
      nextServiceDue: 'Oil Change (500 miles)',
      image: './assets/vehicles-img/BMW_x6.jpeg',
      email: 'bmw.owner@email.com',
      password: 'bmw789',
    },
  ];

  // Modal state
  showAddVehicleModal = false;
  imagePreview: string | null = null;
  selectedImageFile: File | null = null;
  
  // New vehicle form data
  newVehicle: Omit<Vehicle, 'id'> = {
    name: '',
    year: 2024,
    color: '',
    plateNumber: '',
    currentMileage: '',
    nextServiceDue: 'Oil Change (3,000 miles)',
    image: '',
    email: '',
    password: ''
  };

  // TrackBy function for performance optimization
  trackByVehicleId(index: number, vehicle: Vehicle): number {
    return vehicle.id;
  }

  // Open add vehicle modal
  openAddVehicleModal(): void {
    this.showAddVehicleModal = true;
    // Reset form
    this.newVehicle = {
      name: '',
      year: 2024,
      color: '',
      plateNumber: '',
      currentMileage: '',
      nextServiceDue: 'Oil Change (3,000 miles)',
      image: '',
      email: '',
      password: ''
    };
    // Reset image preview
    this.imagePreview = null;
    this.selectedImageFile = null;
  }

  // Close add vehicle modal
  closeAddVehicleModal(): void {
    this.showAddVehicleModal = false;
  }

  // Add new vehicle
  addVehicle(): void {
    if (this.isFormValid()) {
      // Generate new ID
      const newId = Math.max(...this.vehicles.map(v => v.id), 0) + 1;
      
      // Create new vehicle object
      const vehicle: Vehicle = {
        ...this.newVehicle,
        id: newId,
        image: this.imagePreview || './assets/vehicles-img/default-car.jpg' // Use preview or default
      };

      // Add to vehicles array
      this.vehicles.push(vehicle);
      
      // Close modal
      this.closeAddVehicleModal();
      
      // Show success message (optional)
      console.log('Vehicle added successfully:', vehicle);
    }
  }

  // Handle image file selection
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.newVehicle.image = this.imagePreview;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  // Trigger file input click
  triggerFileInput(): void {
    const fileInput = document.getElementById('vehicleImage') as HTMLInputElement;
    fileInput?.click();
  }

  // Form validation
  private isFormValid(): boolean {
    return !!(
      this.newVehicle.name.trim() &&
      this.newVehicle.year &&
      this.newVehicle.color.trim() &&
      this.newVehicle.plateNumber.trim() &&
      this.newVehicle.currentMileage.trim() &&
      this.imagePreview && // Check for image preview instead of image string
      this.newVehicle.email.trim() &&
      this.newVehicle.password.trim()
    );
  }
}