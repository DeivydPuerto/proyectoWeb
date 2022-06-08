import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataBase } from './db/db';
import { Customer } from 'src/app/model/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.urlApi + 'Customers'

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return new Observable<Customer[]>(observer => {
      this.http.get<Customer[]>(this.apiUrl).subscribe(body => {
        const response = body.map(element => {
          return this.responseToModel(element)
        })
        observer.next(response)
      }, err => {
        observer.next(DataBase.customer)
      })
    })
  }

  getCustomer(id: number): Observable<Customer> {
    return new Observable<Customer>(observer => {
      this.http.get<Customer>(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(this.responseToModel(body))
      }, err => {
        let data = DataBase.customer.find(item => item.id === id)
        observer.next(data)
      })
    })
  }

  saveCustomer(obj: Customer): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const request = this.modelToRequest(obj)
      this.http.post(this.apiUrl, request).subscribe(body => {
        observer.next(true)
      }, err => {
        let latest = DataBase.customer[DataBase.customer.length - 1]
        obj.id = latest.id + 1
        DataBase.customer.push(obj)
        observer.next(true)
      })
    })
  }

  updateCustomer(obj: Customer): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const request = this.modelToRequest(obj)
      this.http.put(this.apiUrl + '/' + obj.id, request).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.customer = DataBase.customer.map(item => {
          if (item.id == obj.id) {
            return obj
          }
          return item
        })
        observer.next(true)
      })
    })
  }

  deleteCustomer(id: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.delete(this.apiUrl + '/' + id).subscribe(body => {
        observer.next(true)
      }, err => {
        DataBase.customer = DataBase.customer.filter(item => item.id != id)
        observer.next(true)
      })
    })
  }

  responseToModel(obj: Customer): Customer {
    return {
      id: obj.id,
      Access: {
        id: obj.Access?.id != undefined ? obj.Access?.id : 0,
        password: obj.Access?.password != undefined ? obj.Access?.password : '',
        email: obj.Access?.email != undefined ? obj.Access?.email : '',
        name: obj.Access?.name != undefined ? obj.Access?.name : '',
        rol: obj.Access?.rol != undefined ? obj.Access?.rol : '',
      },
      phone: obj.phone,
      State: {
        id: obj.State?.id != undefined ? obj.State?.id : 0,
        name: obj.State?.name != undefined ? obj.State?.name : '',
        group: obj.State?.group != undefined ? obj.State?.group : '',
      }
    }
  }

  modelToRequest(obj: Customer): any {
    return {
      id: obj.id,
      Access: {
        id: obj.Access?.id != undefined ? obj.Access?.id : 0,
        password: obj.Access?.password != undefined ? obj.Access?.password : '',
        email: obj.Access?.email != undefined ? obj.Access?.email : '',
        name: obj.Access?.name != undefined ? obj.Access?.name : '',
        rol: obj.Access?.rol != undefined ? obj.Access?.rol : '',
      },
      phone: obj.phone,
      id_state: obj.State?.id
    }
  }
}
