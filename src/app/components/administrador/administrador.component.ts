import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
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
      codigoArea: new FormControl(),
      nombreArea: new FormControl(),
      cantidadConsultores: new FormControl(),
    });
  }

  createAreaConsultor() {
    console.log(this.areaConsultorForm.valid)
    if (this.areaConsultorForm.valid){
      this.service.postAreaConsultoria(this.areaConsultorForm.value)
    }
    this.getAreaConsultor()
    this.areaConsultorTable.renderRows();
  }

  getAreaConsultor(){
    this.areaConsultoriaData = this.service.getAllAreaConsultoria()
  }
}
