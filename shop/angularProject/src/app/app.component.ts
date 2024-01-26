import { Component, OnInit } from '@angular/core';
import { CartService } from './services/CartService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularProject';
  itemsCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItemsCount().subscribe(count => {
      this.itemsCount = count;
    });
  }
}
