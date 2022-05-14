import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabla1Component } from './components/tabla1/tabla1.component';
import { Tablero1Component } from './components/tablero1/tablero1.component';

const routes: Routes = [

  {path: 'tabla1', component: Tabla1Component},
  {path: 'tablero1', component: Tablero1Component}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
