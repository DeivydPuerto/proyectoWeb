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
    //return this.http.get<AreaConsultoria>(this.url + "api/areaConsultorias")
    return this.mockAreaConsultoria
  }

  postAreaConsultoria(area: AreaConsultoria) {
    //return this.http.post(this.url + "api/areaConsultorias", area)
    return this.mockAreaConsultoria.push(area)
  }
}
