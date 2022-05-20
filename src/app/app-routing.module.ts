import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ConsultorComponent } from './components/consultor/consultor.component';

const routes: Routes = [
  {path: 'administrador', component: AdministradorComponent},
  {path: 'consultor', component: ConsultorComponent},
  {path: 'cliente', component: ClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
