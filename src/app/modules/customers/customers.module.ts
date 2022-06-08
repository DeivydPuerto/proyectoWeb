import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomersComponent } from './customer/customer.component';
import { ModalCustomerComponent } from './customer-modal/customer-modal.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomersComponent,
    ModalCustomerComponent
  ],
  entryComponents: [
  ]
})
export class CustomersModule { }
