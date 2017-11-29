import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  ReplaySubject
} from 'rxjs/Rx';

@Injectable()
export class ParticipantService {

  private assignments$: ReplaySubject<SS.Assignment[]>;
  private participants$: ReplaySubject<SS.Participant[]>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.assignments$ = new ReplaySubject(1);
    this.participants$ = new ReplaySubject(1);
  }

  public fetchParticipants(): void {
    this.httpClient.get('/api/participant')
      .subscribe(
        (response: SS.ApiResponse) => {
          this.participants$.next(response.data);
        },
        err => alert(err)
      );
  }

  public fetchAssignments(): void {
    this.httpClient.get('/api/participant/assignments')
      .subscribe(
        (response: SS.ApiResponse) => {
          this.assignments$.next(response.data);
        },
        err => alert(JSON.stringify(err.error))
      );
  }

  public saveParticipant(participant: SS.Participant) {
    return this.httpClient.post('/api/participant', participant);
  }

  public get assignments(): Observable<SS.Assignment[]> {
    return this.assignments$.asObservable();
  }

  public get participants(): Observable<SS.Participant[]> {
    return this.participants$.asObservable();
  }

  public assign(): Observable<SS.ApiResponse> {
    return <Observable<SS.ApiResponse>>this.httpClient.get('/api/participant/assign-all');
  }

}
