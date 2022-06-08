import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataBase } from './db/db';
import { Task } from 'src/app/model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.urlApi + 'Tasks'

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return new Observable(observer => {
      this.http.get<Task[]>(this.apiUrl).subscribe(body => {
        observer.next(body)
      }, err => {
        DataBase.task
        observer.next(DataBase.task)
      })
    })
  }

  getTask(id: number): Observable<Task> {
    return new Observable(observer => {
      this.http.get<Task>(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(body)
      }, err => {
        let data = DataBase.task.find(item => item.id === id)
        observer.next(data)

      })
    })
  }

  saveTask(obj: Task): Observable<boolean> {
    return new Observable(observer => {
      this.http.post(this.apiUrl, obj).subscribe(body => {
        observer.next(true)
      }, err => {
        let latest = DataBase.task[DataBase.task.length - 1]
        obj.id = latest.id + 1
        DataBase.task.push(obj)
        observer.next(true)
      })
    })
  }

  updateTask(obj: Task): Observable<boolean> {
    return new Observable(observer => {
      this.http.put(this.apiUrl + '/' + obj.id, obj).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.task = DataBase.task.map(item => {
          if (item.id == obj.id) {
            return obj
          }
          return item
        })
        observer.next(true)
      })
    })
  }

  deleteTask(id: number): Observable<boolean> {
    return new Observable(observer => {
      this.http.delete(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.task = DataBase.task.filter(item => item.id != id)
        observer.next(true)
      })
    })
  }

  responseToModel(obj: Task): Task {
    return {
      id: obj.id,
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
      Consultant: {
        id: obj.Consultant?.id != undefined ? obj.Consultant?.id : 0,
        Access: {
          id: obj.Consultant?.Access?.id != undefined ? obj.Consultant?.Access?.id : 0,
          password: obj.Consultant?.Access?.password != undefined ? obj.Consultant?.Access?.password : '',
          email: obj.Consultant?.Access?.email != undefined ? obj.Consultant?.Access?.email : '',
          name: obj.Consultant?.Access?.name != undefined ? obj.Consultant?.Access?.name : '',
          rol: obj.Consultant?.Access?.rol != undefined ? obj.Consultant?.Access?.rol : '',
        },
        Profession: {
          id: obj.Consultant?.Profession?.id != undefined ? obj.Consultant?.Profession?.id : 0,
          name: obj.Consultant?.Profession?.name != undefined ? obj.Consultant?.Profession?.name : '',
          description: obj.Consultant?.Profession?.description != undefined ? obj.Consultant?.Profession?.description : '',
          State: {
            id: obj.Consultant?.Profession?.State?.id != undefined ? obj.Consultant?.Profession?.State?.id : 0,
            name: obj.Consultant?.Profession?.State?.name != undefined ? obj.Consultant?.Profession?.State?.name : '',
            group: obj.Consultant?.Profession?.State?.group != undefined ? obj.Consultant?.Profession?.State?.group : '',
          }
        },
        phone: obj.Consultant?.phone != undefined ? obj.Consultant?.phone : 0,
        experience: obj.Consultant?.experience != undefined ? obj.Consultant?.experience : '',
        State: {
          id: obj.Consultant?.State?.id != undefined ? obj.Consultant?.State?.id : 0,
          name: obj.Consultant?.State?.name != undefined ? obj.Consultant?.State?.name : '',
          group: obj.Consultant?.State?.group != undefined ? obj.Consultant?.State?.group : '',
        }
      },
      Customer: {
        id: obj.Customer?.id != undefined ? obj.Customer?.id : 0,
        Access: {
          id: obj.Customer?.Access?.id != undefined ? obj.Customer?.Access?.id : 0,
          password: obj.Customer?.Access?.password != undefined ? obj.Customer?.Access?.password : '',
          email: obj.Customer?.Access?.email != undefined ? obj.Customer?.Access?.email : '',
          name: obj.Customer?.Access?.name != undefined ? obj.Customer?.Access?.name : '',
          rol: obj.Customer?.Access?.rol != undefined ? obj.Customer?.Access?.rol : '',
        },
        phone: obj.Customer?.phone != undefined ? obj.Customer?.phone : 0,
        State: {
          id: obj.Customer?.State?.id != undefined ? obj.Customer?.State?.id : 0,
          name: obj.Customer?.State?.name != undefined ? obj.Customer?.State?.name : '',
          group: obj.Customer?.State?.group != undefined ? obj.Customer?.State?.group : '',
        }
      },
      name: obj.name,
      description: obj.description,
      State: {
        id: obj.State?.id != undefined ? obj.State?.id : 0,
        name: obj.State?.name != undefined ? obj.State?.name : '',
        group: obj.State?.group != undefined ? obj.State?.group : '',
      }
    }
  }

  modelToRequest(obj: Task): any {
    return {
      id: obj.id,
      id_profession: obj.Profession?.id,
      id_consultant: obj.Consultant?.id,
      id_customer: obj.Customer?.id,
      name: obj.name,
      description: obj.description,
      id_state: obj.State?.id
    }
  }
}