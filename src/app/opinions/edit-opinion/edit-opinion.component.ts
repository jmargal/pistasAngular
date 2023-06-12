import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { addOpinion } from 'src/app/interfaces/Opinion.interface';
import { OpinionsService } from 'src/app/services/opinions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-opinion',
  templateUrl: './edit-opinion.component.html',
})
export class EditOpinionComponent implements OnInit {
  id!: number;
  opinion!: addOpinion;
  loadOpinion: boolean = false;

  constructor(
    private opinionSvc: OpinionsService,
    private actualRoute: ActivatedRoute,
    private cookieSvc: CookieService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  myForm: FormGroup = this.formbuilder.group({
    comment: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(400)],
    ],
    score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  /**
   *Obtiene la opinion según el id de la ruta
   */
  ngOnInit(): void {
    const id = this.actualRoute.snapshot.params['id'];
    this.opinionSvc.getAnOpinion(id).subscribe({
      next: (value) => {
        this.opinion = value;
        if (this.cookieSvc.get('username') == this.opinion.user) {
          this.loadOpinion = true;
        }
      },
      error(err) {
        console.log(err);
      },
    });
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
   * Obtiene los valores del formulario y actualiza, si es correcto envía a las opiniones de esa pista
   */
  update() {
    const idCourt = this.opinion.idCourt;
    const idOpinion = this.actualRoute.snapshot.params['id'];
    const comment = this.myForm?.controls['comment'].value;
    const score = this.myForm?.controls['score'].value;
    const user = this.cookieSvc.get('username');
    //Convierte la hora al formato deseado
    const datestamp = this.convertHora();
    const opinion: addOpinion = { user, idCourt, comment, score, datestamp };
    this.opinionSvc.updateOpinion(idOpinion, opinion).subscribe({
      next: (resp) => {
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
