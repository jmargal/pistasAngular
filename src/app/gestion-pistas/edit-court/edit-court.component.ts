import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Center } from 'src/app/interfaces/Center.interface';
import { Court } from 'src/app/interfaces/Court.interface';
import { CentresService } from 'src/app/services/centres.service';
import { CourtService } from 'src/app/services/court.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-court',
  templateUrl: './edit-court.component.html',
})
export class EditCourtComponent implements OnInit {
  constructor(
    private router: Router,
    private courtSvc: CourtService,
    private actualRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private centerSvc: CentresService
  ) {}

  court!: Court;
  id!: number;
  centerList!: Center[];
  image: File | undefined;

  myForm: FormGroup = this.formbuilder.group({
    sport: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(3)]],
    center: [null, [Validators.required]],
    img: [null]
  });

  /**
   * Obtiene la pista según el id por ruta y obtiene todos los centros
   */
  ngOnInit(): void {
    this.id = this.actualRoute.snapshot.params['id'];
    this.courtSvc.getCourt(this.id).subscribe({
      next: (court) => {
        this.court = court;
      },
      error(err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        });
      },
    });
    this.centerSvc.getCentres().subscribe({
      next: (resp) => {
        this.centerList = resp;
      },
      error(err) {
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
   * Devuelve booleano sobre si es válido el campo sport del formulario
   */
  isValidSport() {
    return (
      this.myForm?.controls['sport'].errors &&
      this.myForm?.controls['sport'].touched
    );
  }

  /**
   * Devuelve booleano sobre si es válido el campo price del formulario
   */
  isValidPrice() {
    return (
      this.myForm?.controls['price'].errors &&
      this.myForm?.controls['price'].touched
    );
  }

  /**
   * Recibe el archivo del formulario con un eventBinding
   * Maneja la imagen que llega del formulario
   * @param event
   */
  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    // Si es un archivo, la propiedad del formReactive será igual a este archivo
    if (file) {
      this.image = file;
    }
  }

  /**
   * Obitene todos los campos del formulario y hace la petición para actualizar
   */
  update() {
    let sport = this.myForm?.controls['sport'].value;
    let price = this.myForm?.controls['price'].value;
    let img = this.image;
    let idCenter = this.myForm?.controls['center'].value;
    //Si viene imagen y no cumple las extensiones que están en el otro meetodo salta un error
    if (img && !this.isImageFile(img)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Image',
        text: 'Please select a valid image file.',
      });
    }
    //Si no, actualiza con todos los datos
    else {
      this.courtSvc
        .updateCourt(this.id, img, sport, price, idCenter)
        .subscribe({
          next: (value) => {
            Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: 'Court updated successfully',
            });
            this.router.navigate(['manage/courts']);
          },
          error(err) {
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
   * Devuelve boolean con el resultado de si lo que le han pasado es una imagen
   * @param file
   * @returns Boolean
   */
  isImageFile(file: File | undefined): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file?.name.split('.').pop()?.toLowerCase();
    return (fileExtension !== undefined && allowedExtensions.includes(fileExtension));
  }
}
