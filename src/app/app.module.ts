import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatDialogModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DataService } from './shared/data.service';
import { OrdersComponent } from './orders/orders.component';
import { AddEditOrdersComponent } from './orders/components/add-edit-orders/add-edit-orders.component';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    AddEditOrdersComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  providers: [AuthGuard,DataService,AddEditOrdersComponent ],
  bootstrap: [AppComponent],
  entryComponents:[AddEditOrdersComponent]
})
export class AppModule { }
