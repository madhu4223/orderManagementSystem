import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  
  {
    path:'login',
    component:LoginComponent
  },{
    path:'',
    component:OrdersComponent,canActivate:[AuthGuard]
  },{
    path:'orders',
    component:OrdersComponent, canActivate:[AuthGuard]
  }
]
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // declarations:[EamcetComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
