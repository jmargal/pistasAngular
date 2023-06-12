import { Component, OnInit } from '@angular/core';
import { CentresService } from '../../services/centres.service';
import { Center } from '../../interfaces/Center.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html'
})
export class CentersComponent implements OnInit{

  constructor(private centerSvc:CentresService,private router:Router){}

  centerList!:Center[];
  /**
   * Al iniciarse carga la lista de centros
  */
  ngOnInit(): void {
    this.loadData()
  }

  /**
   * Obtiene todos los centros
   */
  loadData(){
    this.centerSvc.getCentres().subscribe({
      next:(resp)=>{
        this.centerList=resp
      },
      error:(err)=>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        })
      }
    })
  }

  /**
   * Recibe el id del centro a borrar
   * Si se ha borrado muestra un alert de success
   * Si no devuelve uno de error
   * @param id del centro
   * @param name para mostrar en el alert
   */
  deleteCenter(id:number, name:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You are going to delete center "+name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.centerSvc.deleteCenter(id).subscribe({
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

  /**
   * Reenvía al compontente de actualizar centro
   * @param id del centro
   */
  updateCenter(id:number){
    this.router.navigate(['/manage/editCenter'])
  }


}
