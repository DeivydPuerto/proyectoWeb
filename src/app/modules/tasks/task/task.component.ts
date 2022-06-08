import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { TaskService } from 'src/app/core/services/task.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Task } from 'src/app/model/task';
import { ModalTasksComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskList: Task[] = []

  @ViewChild(MatTable) table!: MatTable<Task>;
  columns: string[] = ["id", "profession", "consultant", "customer", "name", "description", "state", "actions"]

  constructor(
    private notificationService: NotificationService,
    private taskService: TaskService,
    private titleService: Title,
    public dialog: MatDialog,
  ) {
    this.taskService.getTasks().subscribe(item => this.taskList = item)
  }

  ngOnInit() {
    this.titleService.setTitle('Consultores')
  }

  reloadTable() {
    this.notificationService.openSnackBar("Operación exitosa")
    this.taskService.getTasks().subscribe(item => this.taskList = item)
    this.table.renderRows()
  }

  openModal(id: number) {
    const dialogRef = this.dialog.open(ModalTasksComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadTable()
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(item => this.reloadTable())
  }
}
