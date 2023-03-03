import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  court!: Court;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridFourDay',
    showNonCurrentDates: false,
    slotDuration: '00:60:00',
    slotLabelInterval: { hours: 1 },
    slotMinTime: '09:00:00',
    slotMaxTime: '20:00:00',
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      meridiem: 'short',
    },
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    editable: false,
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        duration: { days: 4 },
      },
    },
  };

  constructor(private route: ActivatedRoute, private courtSvc: CourtService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.courtSvc.getCourt(id).subscribe({
      next: (resp) => {
        this.court = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: Date.now(),
      });
    }
  }
}
