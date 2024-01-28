import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/CartService';
import { Product } from '../interfaces/Product';
import { ProductService } from '../services/ProductService';
import { ProductWithTotalPrice } from '../interfaces/ProductsWithTotalPrice';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
 cartItems: number[] =[]
totalPrice=0;
 products:Array<Product>=[];
  constructor(  private cartService: CartService,private productService:ProductService) {
    this.updateCartItems();
  }
  
  private updateCartItems(){
    this.cartItems = this.cartService.getCartItems();
    this.loadProducts()
   }

 private  loadProducts(){
  this.productService.GetProductsByIds(this.cartItems).subscribe({
    next: (response: ProductWithTotalPrice ) => {
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
  this.loadProducts()
}
remove(id:number){
  this.cartService.removeIdFromCart(id);
  console.log("ehf")
  this.updateCartItems()
}

}
