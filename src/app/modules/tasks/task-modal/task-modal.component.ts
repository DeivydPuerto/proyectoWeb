import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskService } from 'src/app/core/services/task.service';
import { ProfessionService } from 'src/app/core/services/profession.service';
import { StateService } from 'src/app/core/services/state.service';
import { Task } from 'src/app/model/task';
import { Profession } from 'src/app/model/profession';
import { State } from 'src/app/model/state';
import { Consultant } from 'src/app/model/consultant';
import { Customer } from 'src/app/model/customer';
import { ConsultantService } from 'src/app/core/services/consultant.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class ModalTasksComponent implements OnInit {

  taskEditId: number = 0;
  taskForm!: FormGroup;

  taskList: Task[] = []
  professionList: Profession[] = []
  consultantList: Consultant[] = []
  customerList: Customer[] = []
  statesList: State[] = []

  constructor(
    public dialogRef: MatDialogRef<ModalTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private professionService: ProfessionService,
    private consultantService: ConsultantService,
    private customerService: CustomerService,
    private taskService: TaskService,
    private stateService: StateService,
  ) {
    this.taskService.getTasks().subscribe(item => this.taskList = item)
    this.professionService.getProfessions().subscribe(item => this.professionList = item)
    this.consultantService.getConsultants().subscribe(item => this.consultantList = item)
    this.customerService.getCustomers().subscribe(item => this.customerList = item)
    this.statesList = this.stateService.getStates()
    this.getTask(data)
  }

  ngOnInit() {
    this.createFromTask()
  }

  createFromTask() {
    this.taskForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,64}$')]),
      profession: new FormControl("", [Validators.required]),
      consultant: new FormControl("", [Validators.required]),
      customer: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,64}$')]),
      state: new FormControl("", [Validators.required]),
    })
  }

  createTask(): Task {
    const newTask: Task = {
      id: this.data,
      name: this.taskForm.get('name')?.value,
      Profession: this.taskForm.get('profession')?.value,
      Consultant: this.taskForm.get('consultant')?.value,
      Customer: this.taskForm.get('customer')?.value,
      description: this.taskForm.get('description')?.value,
      State: this.taskForm.get('state')?.value,
    }
    return newTask
  }

  saveTask() {
    if (this.taskForm.valid) {
      this.taskService.saveTask(this.createTask()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  editTask() {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.createTask()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  getTask(id: number) {
    if (id != 0) {
      this.taskService.getTask(id).subscribe(item => {
        this.taskEditId = id
        this.taskForm.setValue({
          name: item.name,
          profession: item.Profession,
          consultant: item.Consultant,
          customer: item.Customer,
          description: item.description,
          state: item.State,
        })
      })
    }
  }
}
