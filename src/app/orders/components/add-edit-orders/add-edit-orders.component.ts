import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './../../../shared/data.service';
import{ MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-edit-orders',
  templateUrl: './add-edit-orders.component.html',
  styleUrls: ['./add-edit-orders.component.css']
})
export class AddEditOrdersComponent implements OnInit {


  formHeading:String;
  orderNumber:number;
  dueDate:Date;
  buyerName:String;
  address:String;
  mobile:String;
  orderTotal:number;
  isEdit:boolean;
  isDelete:boolean;

  constructor(
    private toaster:ToastrService,
    private dataService:DataService,
    @Inject(MAT_DIALOG_DATA) public modelData: any,
    private dialogueRef:MatDialogRef<AddEditOrdersComponent>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('model data ',this.modelData);
    this.isEdit = this.modelData.isEdit;
    this.isDelete = this.modelData.isDelete;
    this.formHeading = this.isEdit ? 'EDIT ORDER' : 'NEW ORDER';
    if(this.isEdit){ 
      this.prepareCard(this.modelData)
    }
    
  }

  prepareCard(orderData){
    this.orderNumber = orderData.order_number;
    this.address = orderData.address;
    this.dueDate = orderData.due_date;
    this.buyerName = orderData.buyer_name;
    this.mobile = orderData.phone;
    this.orderTotal = orderData.order_total;
  }

  onSubmit(){
    var mobFormat = /^[6-9]{1}[0-9]{0,9}$/
    var nameFormat = /^[a-zA-Z ]*$/;
    let numberFormat = /^[0-9]*$/
    if(this.orderNumber != undefined && this.orderNumber != null){
      if(!isNaN(this.orderNumber)){
        if(this.dueDate != undefined && this.dueDate != null){
          if(this.buyerName!= undefined && this.buyerName != null && this.buyerName.length >0){
            if(this.buyerName.match(nameFormat)){
              if(this.address != undefined && this.address != null && this.address.length >0){
                if(this.mobile != undefined && this.mobile != null && this.mobile.length > 0){
                  if(this.mobile.match(mobFormat)){
                    if( this.mobile.length == 10){
                    if(this.orderTotal != undefined && this.orderTotal != null){
                      if(!isNaN(this.orderTotal)){
                      let params = {
                        order_number:this.orderNumber,
                        due_date:this.dueDate,
                        buyer_name:this.buyerName,
                        address:this.address,
                        phone:this.mobile,
                        order_total:this.orderTotal,
                        status:1
                        
                      }
                      params['isEdit'] = this.isEdit ? true : false;
                      if(this.isEdit){ params['id'] = this.modelData._id}
                      console.log('params ',params)
                      this.dataService.post('api/add-edit-orders',params).subscribe((response:any)=>{
                        if(response['status_code'] == 200 && response['status']== 'SUCCESS'){
                          let message = this.isEdit ? 'Order Updated Successfully' : 'Order Added Successfully';
                          this.toaster.success(message);
                          this.dialogueRef.close(true);
                        }else{
                          this.toaster.error(response['message']);
                          this.dialogueRef.close(false);
                        }
                      })
                    }else{
                      this.toaster.error('Order Total should be of type number only')
                    }
                    }else{
                      this.toaster.error('Please enter the Order Total')
                    }
                  }else{
                    this.toaster.error('Phone number should have 10 digits')
                  }

                  }else{
                    this.toaster.error('Phone number should start with 6,7,8,9')
                  }
                }else{
                  this.toaster.error('Please enter Phone number')
                }
              }else{
                this.toaster.error('Please enter the address')
              }
            }else{
              this.toaster.error('buyer name should contain characters and spaces only')
            }
          }else{
            this.toaster.error('Please enter Buyer Name')
          }

        }else{
          this.toaster.error('Please select Due Date');
        }
      }else{
        this.toaster.error('Please enter order number of type NUMBER ');
      }

    }else{
      this.toaster.error('Please enter Order Number');
    }


  }
  onClose(){
    this.dialogueRef.close();
  }
  onDelete(){
    let id = this.modelData.id;
    this.dataService.post('api/delete-order/',{id:id}).subscribe((response:any)=>{
        if(response.status_code == 200 && response.status == 'SUCCESS'){
          this.toaster.success('order deleted successfully');
          this.dialogueRef.close(true);
          this.cd.detectChanges();
        }else{
          this.toaster.error(response.message);
        }
    })
  }

}
