import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from 'src/app/services/court.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  constructor(private courtSvc: CourtService, private router: Router) {}

  courtList!: Court[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courtSvc.getCourts().subscribe({
      next: (resp) => {
        this.courtList = resp;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  deleteCourt(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
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
          error(err) {
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
