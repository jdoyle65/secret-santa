import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  ReplaySubject
} from 'rxjs/Rx';

@Injectable()
export class ParticipantService {

  private participants$: ReplaySubject<SS.Participant[]>;

  constructor(
    private httpClient: HttpClient
  ) {
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

  public saveParticipant(participant: SS.Participant) {
    return this.httpClient.post('/api/participant', participant);
  }

  public get participants(): Observable<SS.Participant[]> {
    return this.participants$.asObservable();
  }

  public assign(): Observable<SS.ApiResponse> {
    return <Observable<SS.ApiResponse>>this.httpClient.get('/api/participant/assign-all');
  }

}
