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
    private formBld:FormBuilder,private userSvc:UserService,private cookieSvc:CookieService){}

  court!: Court;
  //Parametro del id de la pista
  id:number=this.route.snapshot.params['id'];
  reservations:Reservation[]=[]
  user!:User;

  //Opciones del calendario al iniciarse
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridFourDay', //Se muestran 4 dias
    validRange:function(nowDate){ //Solo se muestra de hoy hacia delante
      return{
        start:nowDate
      }
    },
    showNonCurrentDates: true,
    slotDuration: '00:60:00', //Cada celda dura una hora
    slotLabelInterval: { hours: 1 }, //Se muestran las celdas cada hora
    slotMinTime: '09:00:00', //Empieza a las 9:00
    slotMaxTime: '20:00:00', //Acaba a las 20:00
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, //Muestra en formato 24H
      meridiem: 'short',
    },
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    dateClick: this.handleDateClick.bind(this),
    editable: false, //Los eventos ocupados no se pueden editar
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        duration: { days: 4 },
      },
    },

  };

  //Formulario para hacer la reserva
  myForm:FormGroup=this.formBld.group({
    username:['',[Validators.required]],
    idCourt:['',[Validators.required]],
    idHorary:['',[Validators.required]],
    dateStamp:['',[Validators.required]],
    reserveDate:['',[Validators.required]]
  })

  //Al iniciarse obtiene la pista
  ngOnInit(): void {
    this.courtSvc.getCourt(this.id).subscribe({
      next: (resp) => {
        this.court = resp;
        this.paintCalendar(); // Mover aquí la llamada a paintCalendar()
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        });
      },
    });

    // Al iniciarse obtiene el usuario logueado
    this.userSvc.getUser(this.cookieSvc.get("username")).subscribe({
      next: (resp) => {
        this.user = resp;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        });
      },
    });
  }

  //Maneja la fecha donde han hecho click
  handleDateClick(arg: any) {
    this.handleDateSelect(arg)
  }

  handleDateSelect(selectInfo:any) {
      //Formateo las fechas para enviarselas como las espera la API
      const dateStamp= moment().format('YYYY-MM-DD')
      const format=selectInfo.dateStr
      let soloFecha=format.split('T')
      let fechaReserva=format.split('+')
      let fechaMensaje=soloFecha[1].split('+')
      this.myForm.controls['idHorary'].setValue(fechaReserva[0]);
      this.myForm.controls['dateStamp'].setValue(dateStamp);
      this.myForm.controls['reserveDate'].setValue(soloFecha[0]);
      //Muestra un alert para que se confirme si se va a reservar
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
        //Si confirma muestra un alert success y hace la reserva
        if (result.isConfirmed) {
          this.addReserve();
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
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        })
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

  //Va a enviar los datos que se necesitan para hacer la reserva
  addReserve() {
    const username = this.user.username;
    const idCourt = this.court.idCourt;
    const idHorary = this.myForm.controls['idHorary'].value;
    const dateStamp = this.myForm.controls['dateStamp'].value;
    const reserveDate = this.myForm.controls['reserveDate'].value;
    this.courtSvc.makeReservation(username, idCourt, idHorary, dateStamp, reserveDate).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Reserve complete!',
          text: 'Your reservation has been added successfully',
        }).then(() => {
          this.paintCalendar(); // Actualizar el calendario después de completar la reserva
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        });
      },
    });
  }


}
