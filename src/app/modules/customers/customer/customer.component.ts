import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalCustomerComponent } from '../customer-modal/customer-modal.component';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomersComponent implements OnInit {

  customerList: Customer[] = []

  @ViewChild(MatTable) table!: MatTable<Customer>;
  columns: string[] = ["id", "name", "email", "phone", "state", "actions"]

  constructor(
    private notificationService: NotificationService,
    private customerService: CustomerService,
    private titleService: Title,
    public dialog: MatDialog,
  ) {
    this.customerService.getCustomers().subscribe(item => this.customerList = item)
  }

  ngOnInit() {
    this.titleService.setTitle('Clientes')
  }

  reloadTable() {
    this.notificationService.openSnackBar("Operación exitosa")
    this.customerService.getCustomers().subscribe(item => this.customerList = item)
    this.table.renderRows()
  }

  openModal(id: number) {
    const dialogRef = this.dialog.open(ModalCustomerComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadTable()
    });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(item => this.reloadTable())
  }
}
