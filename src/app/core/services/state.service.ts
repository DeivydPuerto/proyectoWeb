import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataBase } from './db/db';
import { State } from 'src/app/model/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private apiUrl = environment.urlApi + 'States'

  constructor(private http: HttpClient) { }

  loadStates(): Observable<State[]> {
    return new Observable(observer => {
      this.http.get<State[]>(this.apiUrl).subscribe(body => {
        DataBase.state = body
      }, err => {
      });
    })
  }

  getStates(): State[] {
    return DataBase.state
  }
}