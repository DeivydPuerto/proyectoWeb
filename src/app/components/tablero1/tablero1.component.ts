import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tablero1',
  templateUrl: './tablero1.component.html',
  styleUrls: ['./tablero1.component.css']
})
export class Tablero1Component {
  constructor(public service: ApiService ) {

  }

  getAllUsers(){
    this.service.getAllUsuarios().subscribe((data) => {
      console.log(data);
    });
  }
}
