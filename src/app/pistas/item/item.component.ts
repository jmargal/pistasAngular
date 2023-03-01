import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  court!:Court;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  constructor(private route:ActivatedRoute,private courtSvc:CourtService) { }

  ngOnInit(): void {
    const id=this.route.snapshot.params['id'];
    this.courtSvc.getCourt(id).subscribe({
      next:(resp)=>{
        this.court=resp

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
