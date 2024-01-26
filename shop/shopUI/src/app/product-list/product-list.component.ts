import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
   
      products = [];

      constructor(private productService:ProductService) {

      }
      
      ngOnInit(): void {
        this.productService.GetProducts().subscribe({
          next: (response: any) => {
            this.products = response;
            console.log(this.products);
          },
          error: (error) => {
            console.error('Error fetching data:', error);
          }
        });
      }
}