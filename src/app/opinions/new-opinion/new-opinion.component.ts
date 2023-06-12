import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpinionsService } from 'src/app/services/opinions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addOpinion } from '../../interfaces/Opinion.interface';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-opinion',
  templateUrl: './new-opinion.component.html',
})
export class NewOpinionComponent implements OnInit {
  constructor(
    private opinionSvc: OpinionsService,
    private actualRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private cookieSvc: CookieService,
    private router: Router
  ) {}

  idCourt!: number;

  myForm: FormGroup = this.formbuilder.group({
    comment: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(400)],
    ],
    score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  /**
   * Carga el id de la pista que envían por ruta
   */
  ngOnInit(): void {
    this.idCourt = this.actualRoute.snapshot.params['id'];
  }

  /**
   * Devuelve boolean sobre si es válido el campo comment del formulario
   */
  isValidComment() {
    return (
      this.myForm?.controls['comment'].errors &&
      this.myForm?.controls['comment'].touched
    );
  }

  /**
   * Devuelve boolean sobre si es válido el campo score del formulario
   */
  isValidScore() {
    return (
      this.myForm?.controls['score'].errors &&
      this.myForm?.controls['score'].touched
    );
  }

  /**
   * Devuelve la fecha actual en el formato cadena que espera la API
   * @returns String
   */
  convertHora() {
    const opciones = { timeZone: 'Europe/Madrid', hour12: false };
    const now = new Date().toLocaleString('es-Es', opciones);
    const [fechaStr, horaStr] = now.split(', ');
    const [diaStr, mesStr, anioStr] = fechaStr.split('/');
    const [hora, minutos, segundos] = horaStr.split(':').map(Number);
    const mes = Number(mesStr) - 1;
    const fechaObj = new Date(
      Number(anioStr),
      mes,
      Number(diaStr),
      hora,
      minutos,
      segundos
    );
    // Formateo la fecha y hora como una cadena en el formato deseado
    const anio = fechaObj.getFullYear();
    const mesFormateado = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const diaFormateado = fechaObj.getDate().toString().padStart(2, '0');
    const horaFormateada = fechaObj.getHours().toString().padStart(2, '0');
    const minutosFormateados = fechaObj
      .getMinutes()
      .toString()
      .padStart(2, '0');
    const segundosFormateados = fechaObj
      .getSeconds()
      .toString()
      .padStart(2, '0');
    return `${anio}-${mesFormateado}-${diaFormateado}T${horaFormateada}:${minutosFormateados}:${segundosFormateados}`;
  }

   /**
   * Obtiene los valores del formulario y crea, si es correcto envía a las opiniones de esa pista
   */
  addOpinion() {
    const idCourt = this.idCourt;
    const comment = this.myForm?.controls['comment'].value;
    const score = this.myForm?.controls['score'].value;
    const user = this.cookieSvc.get('username');
    //Formatea la fecha al formato deseado
    const datestamp = this.convertHora();
    const opinion: addOpinion = { user, idCourt, comment, score, datestamp };
    this.opinionSvc.addOpinion(opinion).subscribe({
      next: (value) => {
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Opinion added successfully',
        });
        this.router.navigate([`court/${idCourt}/opinions`]);
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
