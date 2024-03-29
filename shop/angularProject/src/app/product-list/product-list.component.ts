import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../services/ProductService';
import { Product } from '../interfaces/Product';
import { CartService } from '../services/CartService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy {
  products: Array<Product> = [];
  private productsSubscription?: Subscription;

  constructor(private cartService: CartService, private productService: ProductService) {}

  private loadProducts(): void {
    this.productsSubscription = this.productService.GetProducts().subscribe({
      next: (response: Array<Product>) => {
        this.products = response;
        console.log(this.products);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  addToLocalStorage(id: number): void {
    this.cartService.addToCart(id);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid potential memory leaks
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
