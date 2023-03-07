import { EventInput } from '@fullcalendar/core';
import { CourtService } from '../../services/court.service';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    title:"event",
    start:"2023-03-11",
    end:"2023-03-11"
  }
];



export function createEventId() {
  return String(eventGuid++);
}
