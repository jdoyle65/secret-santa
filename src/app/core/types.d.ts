declare namespace SS {
  interface ApiResponse {
    data: any;
  }

  interface Participant {
    id: string|number;
    firstName: string;
    lastName: string;
    email: string
  }
}
