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

  public areaConsultoriaColumns: string[] = ['codigoArea', 'nombreArea', "cantidadConsultores"];
  public areaConsultoriaData!: AreaConsultoria[];

  constructor(public service: ApiService) {
    this.createFromAreaConsultor();
    this.getAreaConsultor();
  }

  ngOnInit(): void {

  }

  createFromAreaConsultor() {
    this.areaConsultorForm = new FormGroup({
      codigoArea: new FormControl("", [Validators.required]),
      nombreArea: new FormControl("", [Validators.required]),
      cantidadConsultores: new FormControl("", [Validators.required]),
    });
  }

  createAreaConsultor() {
    if (this.areaConsultorForm.valid) {
      this.service.postAreaConsultoria(this.areaConsultorForm.value).subscribe(
        data => {
          this.getAreaConsultor()
          this.areaConsultorTable.renderRows();
        }
      )
    }
  }

  getAreaConsultor() {
    this.service.getAllAreaConsultoria().subscribe((data: AreaConsultoria[]) => {
      this.areaConsultoriaData = data
    })
  }

  deleteAreaConsultor() {
    if (this.areaConsultorForm.value.codigoArea != 0) {
      this.service.deleteAreaConsultoria(this.areaConsultorForm.value).subscribe((data) => {
        this.getAreaConsultor()
        this.areaConsultorTable.renderRows();
      })
    }
  }

  putAreaConsultor() {
    if (this.areaConsultorForm.valid) {
      this.service.putAreaConsultoria(this.areaConsultorForm.value).subscribe(
        data => {
          this.getAreaConsultor()
          this.areaConsultorTable.renderRows();
        }
      )
    }
  }

  getByIdAreaConsultoria() {
    this.service.getByIdAreaConsultoria(this.areaConsultorForm.value).subscribe((data) => {
      //this.nombreArea = data
    })
    // if (this.areaConsultorForm.value.codigoArea != 0) {
    this.service.getByIdAreaConsultoria(this.areaConsultorForm.value).subscribe((data) => {
      this.getAreaConsultor()
      this.areaConsultorTable.renderRows();
    })
    // }
  }

}
