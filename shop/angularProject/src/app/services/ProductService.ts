import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../config";
import { Product } from "../interfaces/Product";

@Injectable({
  providedIn: 'root',
}) 
export class ProductService {
  
  constructor(private http: HttpClient) {}

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE_URL}/api/Product`);
  }

  GetProductById(id:number): Observable<Product> {
    return this.http.get<Product>(`${API_BASE_URL}/api/Product/id?id=${id}`);
  }
}
