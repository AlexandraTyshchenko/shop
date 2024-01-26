import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../../config";

@Injectable({
  providedIn: 'root',
}) 
export class ProductService {
  
  constructor(private http: HttpClient) {}

  GetProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/api/Product`);
  }
}