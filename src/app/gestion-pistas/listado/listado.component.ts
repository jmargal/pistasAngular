import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from 'src/app/services/court.service';
import Swal from 'sweetalert2';
import { CentresService } from 'src/app/services/centres.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  constructor(
    private courtSvc: CourtService,
    private router: Router,
    private centerSvc: CentresService
  ) {}

  courtList: any[] = [];
  nameOfCenterMap: { [id: number]: string } = {};

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courtSvc.getCourts().subscribe({
      next: (resp) => {
        this.courtList = resp;
        this.loadNameOfCenters();//Añade nombre del centro a cada pista
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

  loadNameOfCenters() {
    //Bucle que por cada pista mapea su nombre de centro al idCentre
    this.courtList.forEach((court) => {
      this.centerSvc.getCenter(court.idCentre).subscribe({
        next: (value) => {
          this.nameOfCenterMap[court.idCentre] = value.name;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  deleteCourt(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are going to delete court with id: " + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courtSvc.deleteCourt(id).subscribe({
          next: (value) => {
            this.loadData();
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Ooops...',
              text: 'Something went wrong',
            });
          },
        });
      }
    });
  }
}
