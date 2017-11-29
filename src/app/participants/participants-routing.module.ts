import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantsComponent } from './participants.component';
import { AssignmentsComponent } from './assignments/assignments.component';

const routes: Routes = [
  { path: '', component: ParticipantsComponent },
  { path: 'assignments', component: AssignmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantsRoutingModule { }

export const routedComponents = [
  AssignmentsComponent,
  ParticipantsComponent
];
