import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../config";
import { Product } from "../interfaces/Product";
import { ProductWithTotalPrice } from "../interfaces/ProductsWithTotalPrice";

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

  GetProductsByIds(ids: number[]): Observable<ProductWithTotalPrice> {
    return this.http.post<ProductWithTotalPrice>(`${API_BASE_URL}/api/Product`, ids);
  }
  
}
