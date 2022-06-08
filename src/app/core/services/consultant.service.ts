import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataBase } from './db/db';
import { Consultant } from 'src/app/model/consultant';
import { Observable } from 'rxjs';
import { Access } from 'src/app/model/access';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  private apiUrl = environment.urlApi + 'Consultants'

  constructor(private http: HttpClient) {
  }

  getConsultants(): Observable<Consultant[]> {
    return new Observable<Consultant[]>(observer => {
      this.http.get<Consultant[]>(this.apiUrl).subscribe(body => {
        const response = body.map(element => {
          return this.responseToModel(element)
        })
        observer.next(response)
      }, err => {
        observer.next(DataBase.consultant)
      })
    })
  }

  getConsultant(id: number): Observable<Consultant> {
    return new Observable<Consultant>(observer => {
      this.http.get<Consultant>(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(this.responseToModel(body))
      }, err => {
        let data = DataBase.consultant.find(item => item.id === id)
        observer.next(data)
      })
    })
  }

  saveConsultant(obj: Consultant): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const request = this.modelToRequest(obj)
      this.http.post(this.apiUrl, request).subscribe(body => {
        observer.next(true)
      }, err => {
        let latest = DataBase.consultant[DataBase.consultant.length - 1]
        obj.id = latest.id + 1
        DataBase.consultant.push(obj)
        observer.next(true)
      })
    })
  }

  updateConsultant(obj: Consultant): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const request = this.modelToRequest(obj)
      this.http.put(this.apiUrl + '/' + obj.id, request).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.consultant = DataBase.consultant.map(item => {
          if (item.id == obj.id) {
            return obj
          }
          return item
        })
        observer.next(true)
      })
    })
  }

  deleteConsultant(id: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.delete(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.consultant = DataBase.consultant.filter(item => item.id != id)
        observer.next(true)
      })
    })
  }

  responseToModel(obj: Consultant): Consultant {
    return {
      id: obj.id,
      Access: {
        id: obj.Access?.id != undefined ? obj.Access?.id : 0,
        password: obj.Access?.password != undefined ? obj.Access?.password : '',
        email: obj.Access?.email != undefined ? obj.Access?.email : '',
        name: obj.Access?.name != undefined ? obj.Access?.name : '',
        rol: obj.Access?.rol != undefined ? obj.Access?.rol : '',
      },
      Profession: {
        id: obj.Profession?.id != undefined ? obj.Profession?.id : 0,
        name: obj.Profession?.name != undefined ? obj.Profession?.name : '',
        description: obj.Profession?.description != undefined ? obj.Profession?.description : '',
        State: {
          id: obj.Profession?.State?.id != undefined ? obj.Profession?.State?.id : 0,
          name: obj.Profession?.State?.name != undefined ? obj.Profession?.State?.name : '',
          group: obj.Profession?.State?.group != undefined ? obj.Profession?.State?.group : '',
        }
      },
      phone: obj.phone,
      experience: obj.experience,
      State: {
        id: obj.State?.id != undefined ? obj.State?.id : 0,
        name: obj.State?.name != undefined ? obj.State?.name : '',
        group: obj.State?.group != undefined ? obj.State?.group : '',
      }
    }
  }

  modelToRequest(obj: Consultant): any {
    return {
      id: obj.id,
      Access: {
        id: obj.Access?.id != undefined ? obj.Access?.id : 0,
        password: obj.Access?.password != undefined ? obj.Access?.password : '',
        email: obj.Access?.email != undefined ? obj.Access?.email : '',
        name: obj.Access?.name != undefined ? obj.Access?.name : '',
        rol: obj.Access?.rol != undefined ? obj.Access?.rol : '',
      },
      id_profession: obj.Profession?.id,
      phone: obj.phone,
      experience: obj.experience,
      id_state: obj.State?.id
    }
  }
}


