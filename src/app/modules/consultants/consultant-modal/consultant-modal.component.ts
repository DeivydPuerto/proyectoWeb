import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConsultantService } from 'src/app/core/services/consultant.service';
import { ProfessionService } from 'src/app/core/services/profession.service';
import { StateService } from 'src/app/core/services/state.service';
import { Consultant } from 'src/app/model/consultant';
import { Profession } from 'src/app/model/profession';
import { State } from 'src/app/model/state';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultant-modal.component.html',
  styleUrls: ['./consultant-modal.component.css']
})
export class ModalConsultantsComponent implements OnInit {

  consultantEditId: number = 0;
  accessEdidtId: number = 0;
  consultantForm!: FormGroup;

  consultantList: Consultant[] = []
  professionList: Profession[] = []
  statesList: State[] = []

  constructor(
    public dialogRef: MatDialogRef<ModalConsultantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private consultantService: ConsultantService,
    private professionService: ProfessionService,
    private stateService: StateService,
  ) {
    this.consultantService.getConsultants().subscribe(item => this.consultantList = item)
    this.professionService.getProfessions().subscribe(item => this.professionList = item)
    this.statesList = this.stateService.getStates()
    this.getConsultant(data)
  }

  ngOnInit() {
    this.createFromConsultant()
  }

  createFromConsultant() {
    this.consultantForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,64}$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("temporal", [Validators.required]),
      profession: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{7,10}$')]),
      experience: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
    })
  }

  createConsultant(): Consultant {
    const newConsultant: Consultant = {
      id: this.data,
      Access: {
        id: this.accessEdidtId,
        name: this.consultantForm.get('name')?.value,
        email: this.consultantForm.get('email')?.value,
        password: this.consultantForm.get('password')?.value,
        rol: 'consultant'
      },
      Profession: this.consultantForm.get('profession')?.value,
      phone: this.consultantForm.get('phone')?.value,
      experience: this.consultantForm.get('experience')?.value,
      State: this.consultantForm.get('state')?.value,
    }
    return newConsultant
  }

  saveConsultant() {
    if (this.consultantForm.valid) {
      this.consultantService.saveConsultant(this.createConsultant()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  editConsultant() {
    if (this.consultantForm.valid) {
      this.consultantService.updateConsultant(this.createConsultant()).subscribe(item => console.log(item))
      this.dialogRef.close();
    }
  }

  getConsultant(id: number) {
    if (id != 0) {
      this.consultantService.getConsultant(id).subscribe(item => {
        this.consultantEditId = item.id
        this.accessEdidtId = item.Access?.id != undefined ? item.Access?.id : 0
        this.consultantForm.setValue({
          name: item.Access?.name,
          email: item.Access?.email,
          password: item.Access?.password,
          profession: item.Profession,
          phone: item.phone,
          experience: item.experience,
          state: item.State
        })
      })
    }
  }
}
