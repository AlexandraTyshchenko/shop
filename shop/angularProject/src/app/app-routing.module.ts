import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { BasketComponent } from './basket/basket.component';
import { OrderComponent } from './order/order.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';

const routes: Routes = [   
   {path:"",component: ProductListComponent},
   {path: 'productlist', component: ProductListComponent},
  { path: 'products/:id', component: ProductItemComponent },
  { path: 'myproducts', component: BasketComponent},
  {path:'order',component:OrderComponent},
  {path:'success', component:SuccessComponent},
  {path: 'cancel',component: CancelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
