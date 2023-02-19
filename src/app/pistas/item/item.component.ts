import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  court!:Court;

  constructor(private route:ActivatedRoute,private courtSvc:CourtService) { }

  ngOnInit(): void {
    const id=this.route.snapshot.params['id'];
    this.courtSvc.getCourt(id).subscribe({
      next:(resp)=>{
        console.log(resp)
        this.court=resp
        let img:string=this.court.img;
        console.log(img)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
