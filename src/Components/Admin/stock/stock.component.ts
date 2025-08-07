// stock.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Part {
  name: string;
  partNumber: string;
  quantity: string;
  location: string;
  status: 'available' | 'order' | 'low';
}

interface ServiceData {
  name: string;
  percentage: number;
}

interface ServiceCost {
  service: string;
  count: number;
  amount: string;
  average: string;
  color: string;
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  searchText: string = '';
  originalPartsList: Part[] = [];
  filteredPartsList: Part[] = [];

  // Statistics
  availableParts: number = 156;
  partsOnOrder: number = 23;
  servicesToday: number = 8;
  emergencyCalls: number = 2;

  // Service frequency chart data
  serviceData: ServiceData[] = [
    { name: 'Air Filter', percentage: 85 },
    { name: 'Timing Belt', percentage: 72 },
    { name: 'Battery', percentage: 65 },
    { name: 'Spark Plug', percentage: 58 },
    { name: 'Engine', percentage: 45 },
    { name: 'Fuel Pump', percentage: 38 },
    { name: 'Alternator Belt', percentage: 30 },
    { name: 'Coolant Hose', percentage: 25 }
  ];

  // Service costs breakdown
  serviceCosts: ServiceCost[] = [
    {
      service: 'Coolant Hose',
      count: 12,
      amount: '1,250 EGP',
      average: '104 EGP',
      color: '#3b82f6'
    },
    {
      service: 'Timing Belt',
      count: 18,
      amount: '900 EGP',
      average: '50 EGP',
      color: '#10b981'
    },
    {
      service: 'Fuel Pump',
      count: 8,
      amount: '640 EGP',
      average: '80 EGP',
      color: '#f59e0b'
    },
    {
      service: 'Battery ',
      count: 5,
      amount: '750 EGP',
      average: '150 EGP',
      color: '#ef4444'
    },
    {
      service: 'Windshield Wipers',
      count: 6,
      amount: '900 EGP',
      average: '150 EGP',
      color: '#8b5cf6'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.originalPartsList = [
      {
        name: 'Brake Pads',
        partNumber: 'BP001',
        quantity: '25',
        location: 'Van A',
        status: 'available'
      },
      {
        name: 'Oil Filter',
        partNumber: 'OF105',
        quantity: '18',
        location: 'Van B',
        status: 'available'
      },
      {
        name: 'Spark Plugs',
        partNumber: 'SP220',
        quantity: '40',
        location: 'Warehouse',
        status: 'available'
      },
      {
        name: 'Battery 12V',
        partNumber: 'BT12V',
        quantity: '8',
        location: 'Van A',
        status: 'available'
      },
      {
        name: 'Tire Repair Kit',
        partNumber: 'TRK01',
        quantity: '15',
        location: 'Van C',
        status: 'available'
      },
      {
        name: 'Alternator Belt',
        partNumber: 'AB450',
        quantity: '3',
        location: 'Van B',
        status: 'low'
      },
      {
        name: 'Coolant Hose',
        partNumber: 'CH350',
        quantity: '0',
        location: 'Warehouse',
        status: 'order'
      },
      {
        name: 'Headlight Bulb',
        partNumber: 'HB55W',
        quantity: '12',
        location: 'Van A',
        status: 'available'
      },
      {
        name: 'Fuel Pump',
        partNumber: 'FP888',
        quantity: '2',
        location: 'Warehouse',
        status: 'low'
      },
      {
        name: 'Windshield Wipers',
        partNumber: 'WW24',
        quantity: '20',
        location: 'Van B',
        status: 'available'
      },
      {
        name: 'Oil Filter',
        partNumber: 'OF002',
        quantity: '15',
        location: 'Van B',
        status: 'order'
      },
      {
        name: 'Spark Plug',
        partNumber: 'SP003',
        quantity: '8',
        location: 'Van C',
        status: 'low'
      },
      {
        name: 'Air Filter',
        partNumber: 'AF004',
        quantity: '30',
        location: 'Van A',
        status: 'available'
      },
      {
        name: 'Timing Belt',
        partNumber: 'TB005',
        quantity: '5',
        location: 'Van D',
        status: 'low'
      }  
    ];
    
    this.filteredPartsList = [...this.originalPartsList];
    this.updateStatistics();
  }

  applyFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredPartsList = [...this.originalPartsList];
      return;
    }

    const searchTerm = this.searchText.toLowerCase();
    this.filteredPartsList = this.originalPartsList.filter(part =>
      part.name.toLowerCase().includes(searchTerm) ||
      part.partNumber.toLowerCase().includes(searchTerm) ||
      part.location.toLowerCase().includes(searchTerm) ||
      part.status.toLowerCase().includes(searchTerm)
    );
  }

  updateStatistics(): void {
    this.availableParts = this.originalPartsList.filter(part => part.status === 'available').length * 8;
    this.partsOnOrder = this.originalPartsList.filter(part => part.status === 'order').length * 12;
  }

  getRowClass(status: string): string {
    switch (status) {
      case 'low':
        return 'row-warning';
      case 'order':
        return 'row-danger';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'order':
        return 'status-order';
      case 'low':
        return 'status-low';
      default:
        return 'status-available';
    }
  }

  // ... rest of your existing methods ...
}