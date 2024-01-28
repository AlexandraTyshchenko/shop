import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/ProductService';
import { Product } from '../interfaces/Product';
import { DOCUMENT } from '@angular/common';
import { CartService } from '../services/CartService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnDestroy {
  productId: number | null = null;
  product?: Product;
  private productSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? parseInt(idParam, 10) : null;

    if (this.productId !== null) {
      this.productSubscription = this.productService.GetProductById(this.productId).subscribe({
        next: (response: Product) => {
          this.product = response;
          console.log(this.product);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    }
  }

  addToLocalStorage(id: number): void {
    this.cartService.addToCart(id);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid potential memory leaks
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
