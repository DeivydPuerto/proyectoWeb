import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfessionService } from 'src/app/core/services/profession.service';
import { StateService } from 'src/app/core/services/state.service';
import { Profession } from 'src/app/model/profession';
import { State } from 'src/app/model/state';

@Component({
  selector: 'app-professions',
  templateUrl: './profession-modal.component.html',
  styleUrls: ['./profession-modal.component.css']
})
export class ModalProfessionComponent implements OnInit {

  professionEditId: number = 0;
  professionForm!: FormGroup;

  professionList: Profession[] = []
  statesList: State[] = []

  constructor(
    public dialogRef: MatDialogRef<ModalProfessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private professionService: ProfessionService,
    private stateService: StateService,
  ) {
    this.professionService.getProfessions().subscribe(item => this.professionList = item)
    this.statesList = this.stateService.getStates()
    this.getProfession(data)
  }

  ngOnInit() {
    this.createFromProfession()
  }

  createFromProfession() {
    this.professionForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,64}$')]),
      description: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,64}$')]),
      state: new FormControl("", [Validators.required]),
    })
  }

  createProfession(): Profession {
    const newProfession: Profession = {
      id: this.data,
      name: this.professionForm.get('name')?.value,
      description: this.professionForm.get('description')?.value,
      State: this.professionForm.get('state')?.value,
    }
    return newProfession
  }

  saveProfession() {
    if (this.professionForm.valid) {
      this.professionService.saveProfession(this.createProfession()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  editProfession() {
    if (this.professionForm.valid) {
      this.professionService.updateProfession(this.createProfession()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  getProfession(id: number) {
    if (id != 0) {
      this.professionService.getProfession(id).subscribe(item => {
        this.professionEditId = id
        this.professionForm.setValue({
          name: item?.name,
          description: item.description,
          state: item.State
        })
      })
    }
  }
}
