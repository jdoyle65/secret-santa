declare namespace SS {
  interface ApiResponse {
    data: any;
  }

  interface Participant {
    id: string|number;
    first_name: string;
    last_name: string;
    email: string
  }

  interface Assignment {
    participant: SS.Participant;
    assignment: SS.Participant;
  }
}
