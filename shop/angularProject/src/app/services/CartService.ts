import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorage: Storage;
  private itemCountSubject = new Subject<number>();

  constructor() {
    this.localStorage = window.localStorage;
    this.updateItemCount(); // Вызываем обновление сразу при создании сервиса
  }

  private updateItemCount(): void {
    if (this.localStorage) {
      const cartItems = this.localStorage.getItem('cartItems');
      const existingCartItems: number[] = cartItems ? JSON.parse(cartItems) : [];
      this.itemCountSubject.next(existingCartItems.length);
    }
  }

  addToCart(id: number): void {
    if (this.localStorage) {
      const cartItems = this.localStorage.getItem('cartItems');
      const existingCartItems: number[] = cartItems ? JSON.parse(cartItems) : [];
      existingCartItems.push(id);
      this.localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      this.updateItemCount();
      console.log('Updated Cart Items:', existingCartItems);
    } else {
      console.error('LocalStorage is not supported by the browser.');
    }
  }

  getItemsCount(): Observable<number> {
    return this.itemCountSubject.asObservable();
  }

  getCartItems(): number[] {
    if (this.localStorage) {
      const cartItems = this.localStorage.getItem('cartItems');
      return cartItems ? JSON.parse(cartItems) : [];
    } else {
      console.error('LocalStorage is not supported by the browser.');
      return [];
    }
  }
}
