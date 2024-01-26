import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [   
   {path:"",component: ProductListComponent},
   {path: 'productlist', component: ProductListComponent},
  { path: 'products/:id', component: ProductItemComponent },
  { path: 'myproducts', component: BasketComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
