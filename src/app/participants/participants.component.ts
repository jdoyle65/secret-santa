import { Component, OnInit } from '@angular/core';

import { ParticipantService } from '../core/participant.service';

@Component({
  selector: 'ss-participants',
  templateUrl: 'participants.component.html',
  styleUrls: ['participants.component.scss']
})

export class ParticipantsComponent implements OnInit {

  public newPerson: SS.Participant

  constructor(
    private ParticipantService: ParticipantService
  ) {
    this.newPerson = {
      id: null,
      firstName: '',
      lastName: '',
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
          firstName: '',
          lastName: '',
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
        console.log(response.data);
      }, err => {
        alert(JSON.stringify(err.error));
      });
  }
}
