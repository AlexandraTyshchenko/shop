import { Product } from "./Product";

export interface ProductWithTotalPrice {
    products:Array<Product>,
    total:number
  }
  