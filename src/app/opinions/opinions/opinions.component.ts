import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opinion } from 'src/app/interfaces/Opinion.interface';
import { OpinionsService } from 'src/app/services/opinions.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls:['./opinions.component.css'],
  providers:[DatePipe]
})
export class OpinionsComponent implements OnInit {
  constructor(
    private router: Router,
    private actualRoute: ActivatedRoute,
    private opinionSvc: OpinionsService,
    private datePipe: DatePipe,
    private cookieSvc:CookieService
  ) {}

  id!: number;
  opinionList!:Opinion[];

  ngOnInit(): void {
    this.id = this.actualRoute.snapshot.params['id'];
    this.loadData();
  }

  loadData(){
    this.opinionSvc.getOpinions(this.id).subscribe({
      next:(value) =>{
        this.opinionList=value;
      },
      error(err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        })
      },
    })
  }

  scoreArray(puntuacion: number): any[] {
    return Array(puntuacion).fill(0);
  }

  convertFecha(dateStamp:string){
    const date = new Date(dateStamp);
    return this.datePipe.transform(date, 'HH:mm:ss dd/MM/yyyy');
  }

  checkUser(username: string): boolean {
    return (this.cookieSvc.get('username') == username);
  }

  deleteOpinion(idCourt:number){
    this.opinionSvc.deleteOpinion(idCourt).subscribe({
      next:(value)=> {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Opinion deleted successfully',
        });
        this.loadData();
      },
      error(err) {
        console.log(err);
      },
    })
  }

  updateOpinion(id:number){
    this.router.navigate([`court/${id}/editOpinion`])
  }

}
