import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Center } from 'src/app/interfaces/Center.interface';
import { CentresService } from 'src/app/services/centres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-center',
  templateUrl: './edit-center.component.html',
})
export class EditCenterComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private centerSvc: CentresService,
    private router: Router
  ) {}

  center!: Center;
  id: number = this.route.snapshot.params['id'];

  @ViewChild('myForm') myForm!: NgForm;

  //Objeto para mostrar los datos iniciales
  initForm = {
    name: '',
    address: '',
  };

  /**
   *Obtiene el centro a editar según el id y carga sus datos en el objeto de formulario
   */
  ngOnInit(): void {
    this.centerSvc.getCenter(this.id).subscribe({
      next: (resp) => {
        this.center = resp;
        this.initForm = {
          name: this.center.name,
          address: this.center.address,
        };
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

  /**
   *Si el nombre del centro existe salta un alert, si no envía para actualizar
   */
  centerExists() {
    let name = this.myForm.controls['name'].value;
    this.centerSvc.getCenterByName(name).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'A center named ' + name + ' already exists',
        });
      },
      error: (err) => {
        this.update();
      },
    });
  }
  /**
   * Devuelve boolean sobre si es válido el campo name del formulario
   */
  isValidName() {
    return (
      this.myForm?.controls['name'].invalid &&
      this.myForm?.controls['name']?.touched
    );
  }

    /**
   * Devuelve boolean sobre si es válido el campo address del formulario
   */
  isValidAddress() {
    return (
      this.myForm?.controls['address'].invalid &&
      this.myForm?.controls['address']?.touched
    );
  }

  /**
   *Recoge los valores del formulario y actualiza, si es correcto, reenvía a la lista de centros
   */
  update() {
    let name = this.myForm.controls['name'].value;
    let address = this.myForm.controls['address'].value;
    this.centerSvc.updateCenter(this.id, name, address).subscribe({
      //Si se actualiza muestra un alert success
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Center updated',
        });
        this.router.navigate(['/manage/centers']);
      },
      //Si hay error muestra un alert fallido
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
