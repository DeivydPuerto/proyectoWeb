import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalProfessionComponent } from '../profession-modal/profession-modal.component';
import { Profession } from 'src/app/model/profession';
import { ProfessionService } from 'src/app/core/services/profession.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent implements OnInit {

  professionList: Profession[] = []

  @ViewChild(MatTable) table!: MatTable<Profession>;
  columns: string[] = ["id", "name", "description", "state", "actions"]

  constructor(
    private notificationService: NotificationService,
    private professionService: ProfessionService,
    private titleService: Title,
    public dialog: MatDialog,
  ) {
    this.professionService.getProfessions().subscribe(item => this.professionList = item)
  }

  ngOnInit() {
    this.titleService.setTitle('Clientes')
  }

  reloadTable() {
    this.notificationService.openSnackBar("Operación exitosa")
    this.professionService.getProfessions().subscribe(item => this.professionList = item)
    this.table.renderRows()
  }

  openModal(id: number) {
    const dialogRef = this.dialog.open(ModalProfessionComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadTable()
    });
  }

  deleteProfession(id: number) {
    this.professionService.deleteProfession(id).subscribe(item => this.reloadTable())
  }
}
