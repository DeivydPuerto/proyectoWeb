import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { ConsultantService } from 'src/app/core/services/consultant.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Consultant } from 'src/app/model/consultant';
import { ModalConsultantsComponent } from '../consultant-modal/consultant-modal.component';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {

  consultantList: Consultant[] = []

  @ViewChild(MatTable) table!: MatTable<Consultant>;
  columns: string[] = ["id", "name", "profession", "experience", "email", "phone", "state", "actions"]

  constructor(
    private notificationService: NotificationService,
    private consultantService: ConsultantService,
    private titleService: Title,
    public dialog: MatDialog,
  ) {
    this.consultantService.getConsultants().subscribe(item => this.consultantList = item)
  }

  ngOnInit() {
    this.titleService.setTitle('Consultores')
  }

  reloadTable() {
    this.notificationService.openSnackBar("Operación exitosa")
    this.consultantService.getConsultants().subscribe(item => this.consultantList = item)
    this.table.renderRows()
  }

  openModal(id: number) {
    const dialogRef = this.dialog.open(ModalConsultantsComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadTable()
    });
  }

  deleteConsultant(id: number) {
    this.consultantService.deleteConsultant(id).subscribe(item => this.reloadTable())
  }
}
