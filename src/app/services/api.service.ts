import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { areaConsultoria } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
url:string="https://localhost:44363/"
  constructor(private http:HttpClient) { }

  getAllUsuarios(){
    return this.http.get<areaConsultoria>(this.url + "api/areaConsultorias")
  }

  postUsuarios(area: areaConsultoria){
    return this.http.post(this.url + "api/areaConsultorias", area)
  }
}
