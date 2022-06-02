import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaConsultoria } from '../model/areaConsultoria';
import { Usuarios } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "https://localhost:44363/"
  constructor(private http: HttpClient) { }

  getAllUsuarios() {
    return this.http.get<Usuarios>(this.url + "api/usuarios")
  }

  postUsuarios(user: Usuarios) {
    return this.http.post(this.url + "api/usuarios", user)
  }

  mockAreaConsultoria: AreaConsultoria[] = [
    {codigoArea: 10, nombreArea:"bogota" ,cantidadConsultores:2},
    {codigoArea: 11, nombreArea:"cali" ,cantidadConsultores:2},
    {codigoArea: 12, nombreArea:"medellin" ,cantidadConsultores:2},
    {codigoArea: 13, nombreArea:"barranquilla" ,cantidadConsultores:2},
  ]

  getAllAreaConsultoria() {
    return this.http.get<AreaConsultoria[]>(this.url + "api/areaConsultorias")
  }

  postAreaConsultoria(area: AreaConsultoria) {
    return this.http.post(this.url + "api/areaConsultorias", area)
  }

  deleteAreaConsultoria(codigoArea: Number) {
    return this.http.delete(this.url + "api/areaConsultorias/"+codigoArea)
  }

  putAreaConsultoria(area: AreaConsultoria) {
    return this.http.put(this.url + "api/areaConsultorias/"+area.codigoArea, area)
  }

  getByIdAreaConsultoria(codigoArea: Number) {
    return this.http.get<AreaConsultoria>(this.url + "api/areaConsultorias/"+codigoArea)
  }

  //MOCKS//
  getAllAreaConsultoriaMock() {
    return this.mockAreaConsultoria
  }

  postAreaConsultoriaMock(area: AreaConsultoria) {
    this.mockAreaConsultoria.push(area)
  }

  deleteAreaConsultoriaMock(codigoArea: Number) {
    this.mockAreaConsultoria = this.mockAreaConsultoria.filter(element => element.codigoArea != codigoArea)
  }

  putAreaConsultoriaMock(area: AreaConsultoria) {
    this.mockAreaConsultoria = this.mockAreaConsultoria.map(element => {
      if (element.codigoArea == area.codigoArea){
        return area
      }else{
        return element
      }
    })
  }
  
  getByIdAreaConsultoriaMock(codigoArea: Number) {
    return this.mockAreaConsultoria.find(element => element.codigoArea == codigoArea)
  }
}
