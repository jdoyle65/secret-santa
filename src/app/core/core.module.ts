import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// Services
import { ParticipantService } from './participant.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [],
  declarations: [],
  providers: [
    ParticipantService
  ],
})
export class CoreModule { }
