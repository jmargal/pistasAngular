import { Component, OnInit } from '@angular/core';
import { CentresService } from '../../services/centres.service';
import { Center } from '../../interfaces/Center.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls:['./centers.component.css']
})
export class CentersComponent implements OnInit{

  constructor(private centerSvc:CentresService,private router:Router){}

  centerList!:Center[];
  //Al iniciarse carga la lista de centros
  ngOnInit(): void {
    this.centerSvc.getCentres().subscribe({
      next:(resp)=>{
        this.centerList=resp
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  //Recibe el id del centro a borrar
  //Si se ha borrado muestra un alert de success
  //Si no devuelve uno de error
  deleteCenter(id:number){
    this.centerSvc.deleteCenter(id).subscribe({
      next:(resp)=>{
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Center deleted successfully',
        })
      this.router.navigate(['/centers'])
      },
      error:(err)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'Something went wrong',
        })
      }
    })
  }

  updateCenter(id:number){
    this.router.navigate(['/manage/editCenter'])
  }


}
