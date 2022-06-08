import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantsRoutingModule } from './consultants-routing.module';
import { ConsultantsComponent } from './consultant/consultants.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalConsultantsComponent } from './consultant-modal/consultant-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConsultantsRoutingModule
  ],
  declarations: [ConsultantsComponent, ModalConsultantsComponent]
})
export class UsersModule { }
