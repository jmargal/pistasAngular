import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';
import { Calendar, CalendarOptions, DateSelectArg } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Reservation } from '../../interfaces/Reservation.interface';
import { start } from '@popperjs/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarContext } from '@fullcalendar/core/internal';
import { INITIAL_EVENTS } from './event.utils';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  constructor(private route: ActivatedRoute, private courtSvc: CourtService) {}


  court!: Court;
  id:number=this.route.snapshot.params['id'];
  reservations:Reservation[]=[]


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




  ngOnInit(): void {
    this.courtSvc.getCourt(this.id).subscribe({
      next: (resp) => {
        this.court = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.paintCalendar();
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

  paintCalendar(){
    //Va a cargar las reservas en la propia lista de reservas del componente
    this.courtSvc.getBusyDates(this.id).subscribe({
      next:(resp)=>{
        this.reservations=resp;
        this.calendarOptions.events=this.chargeEvents()
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  //Transforma las reservas que estan en la lista del componente en objetos para el calendar
  chargeEvents(){
    let ocupadas=[]
    for(let i=0;i<this.reservations.length;i++){
      let hora=this.reservations[i].hour.split('-');
        let ocupado = {
        id:i.toString(),
        title: "OCUPADA",
        start: `${this.reservations[i].fechaReserva}T${hora[0]}`,
        end:`${this.reservations[i].fechaReserva}T${hora[1]}`
      };
      ocupadas.push(ocupado)
  }
  return ocupadas
}
}
