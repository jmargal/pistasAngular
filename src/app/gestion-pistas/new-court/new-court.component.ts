import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Center } from 'src/app/interfaces/Center.interface';
import { addCourt } from 'src/app/interfaces/Court.interface';
import { CentresService } from 'src/app/services/centres.service';
import { CourtService } from 'src/app/services/court.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-court',
  templateUrl: './new-court.component.html',
})
export class NewCourtComponent implements OnInit {
  centerList!: Center[];
  //Para obtener la imagen del formulario
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private formbuilder: FormBuilder,
    private courtSvc: CourtService,
    private centerSvc: CentresService,
    private router: Router
  ) {}

  /**
   * Obtiene todos los centros para el desplegable del html
   */
  ngOnInit(): void {
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
        })
      },
    });
  }

  myForm: FormGroup = this.formbuilder.group({
    sport: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(3)]],
    img: [null, [Validators.required]],
    center: ['', [Validators.required]],
  });

    /**
   * Devuelve boolean sobre si es válido el campo sport del formulario
   */
  isValidSport() {
    return (
      this.myForm?.controls['sport'].errors &&
      this.myForm?.controls['sport'].touched
    );
  }

    /**
   * Devuelve boolean sobre si es válido el campo price del formulario
   */
  isValidPrice() {
    return (
      this.myForm?.controls['price'].errors &&
      this.myForm?.controls['price'].touched
    );
  }

  /**
   * Comprueba si la extensión de la imagen está entre las opciones
   * @returns
   */
  isValidExtension() {
    const extensions: string[] = ['.png', '.jpg', '.jpeg'];
    let stringImage: string = this.myForm?.controls['img'].value;
    return extensions.some((extension) => stringImage.endsWith(extension));
  }

  /**
   *Manejar la imagen que llega del formulario
   *Recibe el archivo del formulario con un eventBinding
   * @param event
   */
  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    //Si es un archivo, la propiedad del formReactive será igual a este archivo
    if (file) {
      this.myForm.patchValue({
        img: file,
      });
      this.myForm.get('img')?.updateValueAndValidity();
    }
  }

  /**
   * Recoge los valores del formulario y añade la pista, reenvía al listado de pistas
   */
  addCourt() {
    let sport = this.myForm.controls['sport'].value;
    let price = this.myForm.controls['price'].value;
    let img = this.myForm.get('img');
    let center = this.myForm.controls['center'].value;
    const addCourt: addCourt = { sport, price };
    this.courtSvc.addCourt(addCourt, img?.value, center).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Court added successfully',
        });
        this.router.navigate(['manage/courts']);
      },
      error(err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        })
      },
    });
  }
}
