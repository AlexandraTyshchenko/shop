import { Component } from '@angular/core';
import { ProductService } from '../services/ProductService';
import { Product } from '../interfaces/Product';
import { CartService } from '../services/CartService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products:Array<Product> = [];

  constructor( private cartService: CartService, private productService:ProductService) {

  }
  
private loadProducts(){
  this.productService.GetProducts().subscribe({
    next: (response: Array<Product> ) => {
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
}
