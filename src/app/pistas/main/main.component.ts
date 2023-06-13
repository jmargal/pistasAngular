import { Component, OnInit } from '@angular/core';
import { Court } from 'src/app/interfaces/Court.interface';
import { Center } from '../../interfaces/Center.interface';
import { CentresService } from '../../services/centres.service';
import { CourtService } from '../../services/court.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  centerList: Center[] = [];
  courtList: Court[] = [];
  sidebarMenuVisible: boolean = true;

  constructor(
    private centerSvc: CentresService,
    private courtService: CourtService
  ) {}

  /**
   * Carga todos los centros y todas las pistas por defecto
   */
  ngOnInit(): void {
    //Al iniciar carga los centros en el sidebar y carga todas las pistas por defecto
    this.centerSvc.getCentres().subscribe({
      next: (resp) => {
        this.centerList = resp;
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
    this.cargarPistas(0);
  }

  /**
   * Hace la peticion con las pistas del centro que le pasan por id
   * si el id es 0 es que se acaba de cargar el componente y muestra todo
   * @param idCentro
   */
  cargarPistas(idCentro: number) {
    if (idCentro != 0) {
      this.courtService.getCourtsByCenter(idCentro).subscribe({
        next: (resp) => {
          this.courtList = resp;
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
    } else {
      this.courtService.getCourts().subscribe({
        next: (resp) => {
          this.courtList = resp;
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
  }

  /**
   * Carga el centro con ese nombre y las pistas de ese centro o bien si se busca a vacío recarga el componente
   * @param name
   */
  searchCenter(name: String) {
    if (name !== '') {
      this.centerSvc.getCenterByName(name).subscribe({
        next: (resp) => {
          this.centerList = resp;
          this.cargarPistas(this.centerList[0].idCentre);
        },
        error(err) {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: 'There is not a center with name ' + name,
          });
        },
      });
    } else {
     this.ngOnInit()
    }
  }
}
