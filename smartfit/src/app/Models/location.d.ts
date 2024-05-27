export interface Location {
  id: number;
  title: string;
  content: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules: Schedule[];
}

interface Schedule {
  weekdays: string;
  hour: string;
}
