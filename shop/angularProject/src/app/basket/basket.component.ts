import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/CartService';
import { Product } from '../interfaces/Product';
import { ProductService } from '../services/ProductService';
import { ProductWithTotalPrice } from '../interfaces/ProductsWithTotalPrice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {
  cartItems: number[] = []
  totalPrice = 0;
  products: Array<Product> = [];
  private productsSubscription?: Subscription;

  constructor(private cartService: CartService, private productService: ProductService) {
    this.updateCartItems();
  }

  private updateCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.loadProducts()
  }

  private loadProducts() {
    this.productsSubscription = this.productService.GetProductsByIds(this.cartItems).subscribe({
      next: (response: ProductWithTotalPrice) => {
        this.products = response.products;
        this.totalPrice = response.total;
        console.log(this.products);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  remove(id: number) {
    this.cartService.removeIdFromCart(id);
    console.log("ehf")
    this.updateCartItems();
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid potential memory leaks
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
