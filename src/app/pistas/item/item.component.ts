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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/interfaces/User.interface';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
const moment = require('moment');


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  constructor(private route: ActivatedRoute, private courtSvc: CourtService,
    private formBld:FormBuilder,private userSvc:UserService,private cookieSvc:CookieService)
    {

    }


  court!: Court;
  id:number=this.route.snapshot.params['id'];
  reservations:Reservation[]=[]
  user!:User;

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

  myForm:FormGroup=this.formBld.group({
    username:['',[Validators.required]],
    idCourt:['',[Validators.required]],
    idHorary:['',[Validators.required]],
    dateStamp:['',[Validators.required]],
    reserveDate:['',[Validators.required]]
  })


  ngOnInit(): void {
    this.courtSvc.getCourt(this.id).subscribe({
      next: (resp) => {
        this.court = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.userSvc.getUser(this.cookieSvc.get("username")).subscribe({
      next:(resp)=>{
        this.user=resp;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.paintCalendar();
  }

  handleDateClick(arg: any) {
    this.handleDateSelect(arg)
  }

  handleDateSelect(selectInfo:any) {
      const dateStamp= moment().format('YYYY-MM-DD')
      const format=selectInfo.dateStr
      let soloFecha=format.split('T')
      let fechaReserva=format.split('+')
      let fechaMensaje=soloFecha[1].split('+')
      this.myForm.controls['idHorary'].setValue(fechaReserva[0]);
      this.myForm.controls['dateStamp'].setValue(dateStamp);
      this.myForm.controls['reserveDate'].setValue(soloFecha[0]);
      Swal.fire({
        title: 'Are you sure?',
        text: `You will reserve this court on
              ${soloFecha[0]} at ${fechaMensaje[0]}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Make reserve!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Reserve complete!',
            'Your reservation has been addedd successfully',
            'success'
          )
          this.addReserve()
        }
      })

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
        start: `${this.reservations[i].fechaReservada}T${hora[0]}`,
        end:`${this.reservations[i].fechaReservada}T${hora[1]}`
      };
      ocupadas.push(ocupado)
  }
  return ocupadas
}

  addReserve(){
    const username=this.user.username
    const idCourt=this.court.idCourt
    const idHorary=this.myForm.controls['idHorary'].value
    const dateStamp=this.myForm.controls['dateStamp'].value
    const reserveDate=this.myForm.controls['reserveDate'].value
    this.courtSvc.makeReservation(username,idCourt,idHorary,dateStamp,reserveDate).subscribe({
      next:(resp)=>{
        console.log(resp)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
