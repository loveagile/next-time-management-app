export interface Event {
  id: number;
  label: string;
  value: string;
  status: boolean;
}

export interface Schedule {
  id: number;
  name: string;
  date: string;
  service: Event;
}
