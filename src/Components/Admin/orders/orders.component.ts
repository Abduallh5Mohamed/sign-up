import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../Services/theme.service';
import { Subscription } from 'rxjs';

interface Order {
  id: string;
  date: string;
  customer: string;
  payment: 'Pending' | 'Success';
  total: number;
  delivery: string;
  items: number;
  fulfillment: 'Unfulfilled' | 'Fulfilled';
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private themeSubscription?: Subscription;
  isDarkMode = false;

  orders: Order[] = [
    {
      id: '#001',
      date: '5 Aug, 2024',
      customer: 'Ahmed Hassan',
      payment: 'Success',
      total: 850.0,
      delivery: 'Cairo',
      items: 3,
      fulfillment: 'Fulfilled',
    },
    {
      id: '#002',
      date: '4 Aug, 2024',
      customer: 'Fatima Mohamed',
      payment: 'Pending',
      total: 620.0,
      delivery: 'Alexandria',
      items: 2,
      fulfillment: 'Unfulfilled',
    },
    {
      id: '#003',
      date: '3 Aug, 2024',
      customer: 'Omar Ibrahim',
      payment: 'Success',
      total: 1250.0,
      delivery: 'Giza',
      items: 5,
      fulfillment: 'Fulfilled',
    },
    {
      id: '#004',
      date: '2 Aug, 2024',
      customer: 'Aisha Ali',
      payment: 'Success',
      total: 450.0,
      delivery: 'Luxor',
      items: 1,
      fulfillment: 'Fulfilled',
    },
    {
      id: '#005',
      date: '1 Aug, 2024',
      customer: 'Mohamed Saeed',
      payment: 'Pending',
      total: 730.0,
      delivery: 'Aswan',
      items: 4,
      fulfillment: 'Unfulfilled',
    },
    {
      id: '#006',
      date: '31 Jul, 2024',
      customer: 'Nour Mahmoud',
      payment: 'Success',
      total: 920.0,
      delivery: 'Mansoura',
      items: 3,
      fulfillment: 'Fulfilled',
    },
    {
      id: '#007',
      date: '30 Jul, 2024',
      customer: 'Youssef Khaled',
      payment: 'Pending',
      total: 380.0,
      delivery: 'Tanta',
      items: 2,
      fulfillment: 'Unfulfilled',
    },
    {
      id: '#008',
      date: '29 Jul, 2024',
      customer: 'Maryam Adel',
      payment: 'Success',
      total: 1100.0,
      delivery: 'Ismailia',
      items: 4,
      fulfillment: 'Fulfilled',
    },
    {
      id: '#009',
      date: '28 Jul, 2024',
      customer: 'Karim Nasser',
      payment: 'Pending',
      total: 550.0,
      delivery: 'Suez',
      items: 2,
      fulfillment: 'Unfulfilled',
    },
    {
      id: '#010',
      date: '27 Jul, 2024',
      customer: 'Dina Fouad',
      payment: 'Success',
      total: 675.0,
      delivery: 'Port Said',
      items: 3,
      fulfillment: 'Fulfilled',
    },
    {
      id: '#011',
      date: '26 Jul, 2024',
      customer: 'Amr Hosny',
      payment: 'Pending',
      total: 820.0,
      delivery: 'Damanhur',
      items: 4,
      fulfillment: 'Unfulfilled',
    },
    {
      id: '#012',
      date: '25 Jul, 2024',
      customer: 'Salma Rashid',
      payment: 'Success',
      total: 490.0,
      delivery: 'Minya',
      items: 2,
      fulfillment: 'Fulfilled',
    },
  ];

  totalOrders = 75;
  orderItems = 45;
  returnOrders = 3;
  fulfilledOrders = 38;
  selectedAction = 'More actions';

  filters = ['All', 'Unfulfilled', 'Unpaid', 'Closed'];
  selectedFilter = 'All';
  filteredOrders: Order[] = [];

  showMoreActions = false;
  showDateDropdown = false;
  selectedDateRange = 'Aug 1 - Aug 6, 2024';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.filteredOrders = this.orders;

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => (this.isDarkMode = isDark)
    );
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'All') {
      this.filteredOrders = this.orders;
    } else if (filter === 'Unfulfilled') {
      this.filteredOrders = this.orders.filter(
        (o) => o.fulfillment === 'Unfulfilled'
      );
    } else if (filter === 'Unpaid') {
      this.filteredOrders = this.orders.filter((o) => o.payment === 'Pending');
    } else if (filter === 'Closed') {
      this.filteredOrders = [];
    }
  }

  toggleMoreActions(): void {
    this.showMoreActions = !this.showMoreActions;
  }

  toggleDateDropdown(): void {
    this.showDateDropdown = !this.showDateDropdown;
  }

  selectDateRange(range: string): void {
    this.selectedDateRange = range;
    this.showDateDropdown = false;
    // Here you could implement actual date filtering logic
  }

  createOrder(): void {
    console.log('Create new order');
    // Implementation for creating new order
  }

  exportOrders(): void {
    console.log('Export orders');
    // Implementation for exporting orders
  }

  viewOrder(orderId: string): void {
    console.log('View order:', orderId);
    // Implementation for viewing order details
  }

  editOrder(orderId: string): void {
    console.log('Edit order:', orderId);
    // Implementation for editing order
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orders = this.orders.filter((order) => order.id !== orderId);
      this.setFilter(this.selectedFilter); // Refresh filtered orders
      console.log('Order deleted:', orderId);
    }
  }

  selectMoreAction(action: string): void {
    this.selectedAction = action;
    this.showMoreActions = false;

    switch (action) {
      case 'Export CSV':
        this.exportOrders();
        break;
      case 'Create Order':
        this.createOrder();
        break;
      default:
        console.log('Selected action:', action);
    }
  }

  // Close dropdowns when clicking outside
  closeDropdowns(): void {
    this.showMoreActions = false;
    this.showDateDropdown = false;
  }

  // Track by function for better performance
  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }
}
