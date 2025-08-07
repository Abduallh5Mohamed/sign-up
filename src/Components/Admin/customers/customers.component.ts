import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  customers = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      membershipType: 'Premium',
      totalOrders: 15,
      image: '/assets/dashboard-img/team-01.png',
      joined: 'Jan 2024',
      totalSpent: '12,500',
      location: 'Cairo, Egypt',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Fatima El-Sayed',
      membershipType: 'Gold',
      totalOrders: 8,
      image: '/assets/dashboard-img/team-02.png',
      joined: 'Feb 2024',
      totalSpent: '8,200',
      location: 'Alexandria, Egypt',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mohamed Ali',
      membershipType: 'Premium',
      totalOrders: 22,
      image: '/assets/dashboard-img/team-03.png',
      joined: 'Mar 2024',
      totalSpent: '18,900',
      location: 'Giza, Egypt',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Nour Ibrahim',
      membershipType: 'Silver',
      totalOrders: 12,
      image: '/assets/dashboard-img/team-04.png',
      joined: 'Apr 2024',
      totalSpent: '6,800',
      location: 'Mansoura, Egypt',
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Omar Mahmoud',
      membershipType: 'Gold',
      totalOrders: 18,
      image: '/assets/dashboard-img/team-05.png',
      joined: 'May 2024',
      totalSpent: '14,300',
      location: 'Aswan, Egypt',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Yasmin Farouk',
      membershipType: 'Silver',
      totalOrders: 9,
      image: '/assets/dashboard-img/team-01.png',
      joined: 'Jun 2024',
      totalSpent: '5,600',
      location: 'Luxor, Egypt',
      status: 'Active',
    },
    {
      id: 7,
      name: 'Karim Adel',
      membershipType: 'Premium',
      totalOrders: 25,
      image: '/assets/dashboard-img/team-02.png',
      joined: 'Jul 2024',
      totalSpent: '22,100',
      location: 'Tanta, Egypt',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Mariam Youssef',
      membershipType: 'Gold',
      totalOrders: 14,
      image: '/assets/dashboard-img/team-03.png',
      joined: 'Aug 2024',
      totalSpent: '9,750',
      location: 'Ismailia, Egypt',
      status: 'Active',
    },
  ];

  callCustomer(customer: any) {
    console.log('Contacting customer:', customer.name);
    alert(`Contacting ${customer.name} - ${customer.membershipType} member`);
  }

  emailCustomer(customer: any) {
    console.log('Viewing orders for customer:', customer.name);
    alert(`Viewing ${customer.totalOrders} orders for ${customer.name}`);
  }

  viewCustomerProfile(customer: any) {
    console.log('Viewing profile of customer:', customer.name);
    // Add navigation logic here
  }

  removeCustomer(customer: any) {
    const confirmRemove = confirm(
      `Are you sure you want to remove ${customer.name}?`
    );
    if (confirmRemove) {
      this.customers = this.customers.filter((c) => c.id !== customer.id);
      console.log('Customer removed:', customer.name);
    }
  }
}
