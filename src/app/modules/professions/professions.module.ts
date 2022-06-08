import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalProfessionComponent } from './profession-modal/profession-modal.component';
import { ProfessionsRoutingModule } from './professions-routing.module';
import { ProfessionComponent } from './profession/profession.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProfessionComponent, ModalProfessionComponent],
  imports: [
    CommonModule,
    ProfessionsRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class ProfessionsModule { }
