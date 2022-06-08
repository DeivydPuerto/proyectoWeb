import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CustomerService } from 'src/app/core/services/customer.service';
import { StateService } from 'src/app/core/services/state.service';
import { Customer } from 'src/app/model/customer';
import { State } from 'src/app/model/state';

@Component({
  selector: 'app-customers',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class ModalCustomerComponent implements OnInit {

  customerEditId: number = 0;
  accessEdidtId: number = 0;
  customerForm!: FormGroup;

  customerList: Customer[] = []
  statesList: State[] = []

  constructor(
    public dialogRef: MatDialogRef<ModalCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private customerService: CustomerService,
    private stateService: StateService,
  ) {
    this.customerService.getCustomers().subscribe(item => this.customerList = item)
    this.statesList = this.stateService.getStates()
    this.getCustomer(data)
  }

  ngOnInit() {
    this.createFromCustomer()
  }

  createFromCustomer() {
    this.customerForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,64}$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("temporal", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{7,10}$')]),
      state: new FormControl("", [Validators.required]),
    })
  }

  createCustomer(): Customer {
    const newCustomer: Customer = {
      id: this.data,
      Access: {
        id: this.accessEdidtId,
        name: this.customerForm.get('name')?.value,
        email: this.customerForm.get('email')?.value,
        password: this.customerForm.get('password')?.value,
        rol: 'customer'
      },
      phone: this.customerForm.get('phone')?.value,
      State: this.customerForm.get('state')?.value,
    }
    return newCustomer
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      this.customerService.saveCustomer(this.createCustomer()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  editCustomer() {
    if (this.customerForm.valid) {
      this.customerService.updateCustomer(this.createCustomer()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  getCustomer(id: number) {
    if (id != 0) {
      this.customerService.getCustomer(id).subscribe(item => {
        this.customerEditId = item.id
        this.accessEdidtId = item.Access?.id != undefined ? item.Access?.id : 0
        this.customerForm.setValue({
          name: item.Access?.name,
          email: item.Access?.email,
          password: item.Access?.password,
          phone: item.phone,
          state: item.State
        })
      })
    }
  }
}
