import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ParticipantsRoutingModule, routedComponents } from './participants-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [ParticipantsRoutingModule],
  declarations: [
    ...routedComponents
  ],
  providers: [],
})
export class ParticipantsModule { }
