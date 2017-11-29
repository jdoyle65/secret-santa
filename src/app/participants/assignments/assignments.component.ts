import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../core/participant.service';

@Component({
  selector: 'ss-assignments',
  templateUrl: 'assignments.component.html'
})

export class AssignmentsComponent implements OnInit {
  constructor(
    private ParticipantService: ParticipantService
  ) { }

  ngOnInit() {
    this.ParticipantService.fetchAssignments();
  }

  public get assignments$() {
    return this.ParticipantService.assignments;
  }
}
