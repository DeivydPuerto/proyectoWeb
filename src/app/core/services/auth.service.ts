import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { DataBase } from './db/db';
import { Access } from 'src/app/model/access';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl = environment.urlApi + 'Acesses'

    constructor(private http: HttpClient, @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    private accessEmpty: Access = {
        id: 0,
        password: '',
        email: '',
        name: '',
        rol: ''
    }

    loadData() {
        this.http.get<Access[]>(this.apiUrl).subscribe(body => {
            DataBase.access = body.map(element => {
                return {
                    id: element.id,
                    password: element.password,
                    email: element.email,
                    name: element.name,
                    rol: element.rol
                }
            });
        }, err => {
        });
    }

    login(email: string, password: string): Observable<Access> {
        const accessResult = DataBase.access.find(data => (data.email === email && data.password === password))
        if (accessResult !== undefined) {
            this.localStorage.setItem('access', JSON.stringify(accessResult))
            return of(accessResult)
        } else {
            return of(this.accessEmpty)
        }
    }

    logout(): void {
        this.localStorage.removeItem('access');
    }

    getCurrentUser(): Access {
        const item = this.localStorage.getItem('access')
        if (item !== null) {
            return JSON.parse(item);
        }
        return this.accessEmpty
    }

    changePassword(email: string, currentPwd: string, newPwd: string): Observable<boolean> {
        return new Observable(observer => {
            const accessResult = DataBase.access.find(data => (data.email === email && data.password === currentPwd))
            if (accessResult !== undefined) {
                accessResult.password = newPwd
                this.http.put(this.apiUrl + "/" + accessResult.id, accessResult).subscribe(data => {
                    observer.next(true)
                    this.loadData()
                }, err => {
                    DataBase.access = DataBase.access.map(data => {
                        if (data.email === email && data.password === currentPwd) {
                            data.password = newPwd
                        }
                        return data
                    })
                    observer.next(true)
                });
            }
            observer.next(false)
        })
    }
}