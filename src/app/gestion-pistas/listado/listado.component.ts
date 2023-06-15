import { Component, OnInit } from '@angular/core';
import { CourtService } from 'src/app/services/court.service';
import Swal from 'sweetalert2';
import { CentresService } from 'src/app/services/centres.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls:['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  constructor(
    private courtSvc: CourtService,
    private centerSvc: CentresService
  ) {}

  courtList: any[] = [];
  nameOfCenterMap: { [id: number]: string } = {};  //Mapper que mapea un number a un strin


  /**
   * Carga los datos al iniciarse el componente
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Método que carga todas las pistas y les pone el nombre de su centro
   */
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

  /**
   * Obtiene todos los nombres de los centros para mostrarlos en el html
   */
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

  /**
   *Pregunta si se desea borrar la pista, si se confirma la borra y vuelve a cargar los datos
   *para que estén actualizados
   * @param id de la pista
   */
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
