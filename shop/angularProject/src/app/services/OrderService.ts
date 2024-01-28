import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";  // Add this import
import { API_BASE_URL } from "../config";
import { Order } from "../interfaces/Order";

@Injectable({
  providedIn: 'root',
}) 
export class OrderService {
  
  constructor(private http: HttpClient) {}

  СreateOrder(price: number, order: Order): Observable<any> {
    return this.http.post(`${API_BASE_URL}/api/Order?price=${price}`, order);
  }
}
