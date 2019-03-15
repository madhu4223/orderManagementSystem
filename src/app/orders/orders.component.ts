import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './../shared/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { AddEditOrdersComponent } from './components/add-edit-orders/add-edit-orders.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersData:any = [];
  isDataFound:boolean;
  columnNames:any = [];

  constructor(
    private dialogue : MatDialog,
    private dataService:DataService,
    private toaster:ToastrService,
    private cd:ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private router :Router
  ) { }

  ngOnInit() {

    this.columnNames = ['S.No','Order Number','Due Date','Buyer Name','Address','Phone','Order Total','Actions']
    this.getOrdersList();
  }

  onAddEdit(type,orderData){
   
    let order = type == 'EDIT' ? orderData : {}
    order['isEdit'] = type == 'EDIT' ? true : false;
    let dialogRef = this.dialogue.open(AddEditOrdersComponent,{
      data:order
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getOrdersList();
      if (!res) {
        return;
      }
    });

    }
    
    onDelete(order){
      console.log('order to delete ',order)
      let id = order._id;
      let dataToModel = {
        id:id,
        isDelete:true
      }
      let dialogRef = this.dialogue.open(AddEditOrdersComponent,{
        data:dataToModel
      });
      dialogRef.afterClosed().subscribe(res => {
        this.getOrdersList();
        if (!res) {
          return;
        }
      });
    }

  
  getOrdersList(){
    this.spinner.show()
    this.dataService.post('api/get-orders',{}).subscribe((response:any)=>{
      // console.log('orders ',response)
      if(response['status_code'] == 200){
        if(response.status == 'NODATA'){
          this.ordersData = [];
          this.isDataFound = false;
          this.toaster.success('NO Data Found')
        }else{
          this.ordersData = response.data;
          this.isDataFound = true;
          this.spinner.hide()
          console.log('orders data ',this.ordersData)
        }
        this.cd.detectChanges();
        // this.toaster.success('success')
      }else{
          this.toaster.error(response['message'])
          this.isDataFound = false
        }
    })
  }
  onLogOut(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
