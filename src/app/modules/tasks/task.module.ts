import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { ModalTasksComponent } from './task-modal/task-modal.component';



@NgModule({
  declarations: [
    TaskComponent,
    ModalTasksComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
