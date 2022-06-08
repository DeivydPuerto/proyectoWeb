import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { DataBase } from './db/db';
import { Profession } from 'src/app/model/profession';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private apiUrl = environment.urlApi + 'Professions'

  constructor(private http: HttpClient) {
  }

  getProfessions(): Observable<Profession[]> {
    return new Observable(observer => {
      this.http.get<Profession[]>(this.apiUrl).subscribe(body => {
        const response = body.map(element => {
          return this.responseToModel(element)
        })
        observer.next(response)
      }, err => {
        observer.next(DataBase.profession)
      })
    })
  }

  getProfession(id: number): Observable<Profession> {
    return new Observable(observer => {
      this.http.get<Profession>(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(this.responseToModel(body))
      }, err => {
        let data = DataBase.profession.find(item => item.id === id)
        observer.next(data)
      })
    })
  }

  saveProfession(obj: Profession): Observable<boolean> {
    return new Observable(observer => {
      const request = this.modelToRequest(obj)
      this.http.post(this.apiUrl, request).subscribe(body => {
        observer.next(true)
      }, err => {
        let latest = DataBase.profession[DataBase.profession.length - 1]
        obj.id = latest.id + 1
        DataBase.profession.push(obj)
        observer.next(true)
      })
    })
  }

  updateProfession(obj: Profession): Observable<boolean> {
    return new Observable(observer => {
      const request = this.modelToRequest(obj)
      this.http.put(this.apiUrl + '/' + obj.id, request).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.profession = DataBase.profession.map(item => {
          if (item.id == obj.id) {
            return obj
          }
          return item
        })
        observer.next(true)
      })
    })
  }

  deleteProfession(id: number): Observable<boolean> {
    return new Observable(observer => {
      this.http.delete(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.profession = DataBase.profession.filter(item => item.id != id)
        observer.next(true)
      })
    })
  }

  responseToModel(obj: Profession): Profession {
    return {
      id: obj.id,
      name: obj.name,
      description: obj.description,
      State: {
        id: obj.State?.id != undefined ? obj.State?.id : 0,
        name: obj.State?.name != undefined ? obj.State?.name : '',
        group: obj.State?.group != undefined ? obj.State?.group : '',
      }
    }
  }

  modelToRequest(obj: Profession): any {
    return {
      id: obj.id,
      name: obj.name,
      description: obj.description,
      id_state: obj.State?.id
    }
  }
}
