import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParticipantService } from '../core/participant.service';

@Component({
  selector: 'ss-participants',
  templateUrl: 'participants.component.html',
  styleUrls: ['participants.component.scss']
})

export class ParticipantsComponent implements OnInit {

  public newPerson: SS.Participant

  constructor(
    private ParticipantService: ParticipantService,
    private Router: Router
  ) {
    this.newPerson = {
      id: null,
      first_name: '',
      last_name: '',
      email: ''
    };
    this.ParticipantService.fetchParticipants();
  }

  ngOnInit() { }

  public get participants$() {
    return this.ParticipantService.participants;
  }

  public onSubmitPerson() {
    this.ParticipantService.saveParticipant(this.newPerson)
      .subscribe(response => {
        this.newPerson = {
          id: null,
          first_name: '',
          last_name: '',
          email: ''
        };
        this.ParticipantService.fetchParticipants();
      }, err => {
        alert(JSON.stringify(err.error));
      });
  }

  public onSubmitAssign() {
    this.ParticipantService.assign()
      .subscribe(response => {
        this.Router.navigateByUrl('/participants/assignments');
      }, err => {
        alert(JSON.stringify(err.error));
      });
  }
}
