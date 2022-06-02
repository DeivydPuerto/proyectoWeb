import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { flatMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AreaConsultoria } from '../../model/areaConsultoria';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  @ViewChild(MatTable) areaConsultorTable!: MatTable<AreaConsultoria>;

  public areaConsultorForm!: FormGroup;

  public areaConsultoriaColumns: string[] = ['codigoArea', 'nombreArea', "cantidadConsultores", "actions"];
  public areaConsultoriaData!: AreaConsultoria[];

  constructor(public service: ApiService) {
    this.createFromAreaConsultor();
    this.getAreaConsultor();
  }

  ngOnInit(): void {

  }

  createFromAreaConsultor() {
    this.areaConsultorForm = new FormGroup({
      codigoArea: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,16}$')]),
      nombreArea: new FormControl("", [Validators.required, Validators.pattern('^[a-záéíóúñA-ZÁÉÍÓÚÑ]{1,64}$')]),
      cantidadConsultores: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,16}$')]),
    })
  }

  postAreaConsultor() {
    if (this.areaConsultorForm.valid) {
      // this.service.postAreaConsultoria(this.areaConsultorForm.value).subscribe(
      //   data => {
      //     this.getAreaConsultor()
      //     this.areaConsultorTable.renderRows();
      //   }
      // )
      this.service.postAreaConsultoriaMock(this.areaConsultorForm.value)
      this.getAreaConsultor()
      this.areaConsultorTable.renderRows()
      this.areaConsultorForm.setValue({
        codigoArea: "",
        nombreArea: "",
        cantidadConsultores: ""
      })
    }
  }

  getAreaConsultor() {
    // this.service.getAllAreaConsultoria().subscribe(
    //   (data: AreaConsultoria[]) => {
    //     this.areaConsultoriaData = data
    //   }
    // )
    this.areaConsultoriaData = this.service.getAllAreaConsultoriaMock()
  }

  deleteAreaConsultor(id: Number) {
    this.service.deleteAreaConsultoriaMock(id)
    this.getAreaConsultor()
    this.areaConsultorTable.renderRows()
  }

  putAreaConsultor() {
    if (this.areaConsultorForm.valid) {
      // this.service.putAreaConsultoria(this.areaConsultorForm.value).subscribe(
      //   data => {
      //     this.getAreaConsultor()
      //     this.areaConsultorTable.renderRows();
      //   }
      // )
      this.service.putAreaConsultoriaMock(this.areaConsultorForm.value)
      this.getAreaConsultor()
      this.areaConsultorTable.renderRows();
    }
  }

  getByIdAreaConsultoria(id: Number) {
    // this.service.getByIdAreaConsultoria(id).subscribe(
    //   (data: AreaConsultoria) => {

    //   }
    // )
    const data = this.service.getByIdAreaConsultoriaMock(id)
    this.areaConsultorForm.setValue({
      codigoArea: data?.codigoArea,
      nombreArea: data?.nombreArea,
      cantidadConsultores: data?.cantidadConsultores
    })
  }
}
