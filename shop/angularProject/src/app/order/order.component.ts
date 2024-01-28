import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/CartService';
import { ProductService } from '../services/ProductService';
import { ProductWithTotalPrice } from '../interfaces/ProductsWithTotalPrice';
import { OrderService } from '../services/OrderService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../config';
import { Product } from '../interfaces/Product';
import { Subscription } from 'rxjs';
import { Order } from '../interfaces/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnDestroy {
  form: FormGroup;
  selectedPaymentType: string = "1";
  cartItems: number[] = [];
  products: Array<Product> = [];
  totalPrice = 0;
  order?: Order;
  private productsSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [''],
      paymentType: [null, Validators.required],
    });
    this.updateCartItems();
  }

  private updateCartItems() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
    this.loadPrice();
  }

  private loadPrice() {
    this.productsSubscription = this.productService.GetProductsByIds(this.cartItems).subscribe({
      next: (response: ProductWithTotalPrice) => {
        this.totalPrice = response.total;
        this.products = response.products;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onPaymentTypeChange(event: any): void {
    this.selectedPaymentType = event.value;
  }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get address() { return this.form.get('address'); }

  onSubmit() {
    this.order = {
      firstName: this.firstName?.value || '',
      lastName: this.lastName?.value || '',
      email: this.email?.value || '',
      phoneNumber: this.phoneNumber?.value || '',
      address: this.address?.value || '',
      productIds: this.cartItems,
    };

    if (this.form.valid) {
      this.orderService.СreateOrder(this.totalPrice, this.order).subscribe({
        next: (response: any) => {
          console.log("success");
          this._snackBar.open("Success","OK");
          if (this.selectedPaymentType === '2') {
            this.http.post(`${API_BASE_URL}/api/Payments/create-checkout-session?total=${this.totalPrice}`, this.products).subscribe((response: any) => {
              console.log(response);
              window.location.href = response.session;
            });
          }else{
            this.router.navigate(['/success']);
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid potential memory leaks
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
