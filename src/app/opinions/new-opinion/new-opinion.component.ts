import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opinion } from 'src/app/interfaces/Opinion.interface';
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
    private formbuilder:FormBuilder,
    private cookieSvc:CookieService,
    private router:Router
  ) {}

  idCourt!: number;

  myForm: FormGroup = this.formbuilder.group({
    comment: ['', [Validators.required, Validators.minLength(2)]],
    score: ['', [Validators.required, Validators.min(1),Validators.max(5)]],
  });

  ngOnInit(): void {
    this.idCourt = this.actualRoute.snapshot.params['id'];
  }

  addOpinion(){
    const idCourt=this.idCourt;
    const comment=this.myForm?.controls['comment'].value;
    const score=this.myForm?.controls['score'].value;
    const user=this.cookieSvc.get("username");
    const now = new Date(Date.now());
    let fechaPartir = now.toISOString();
    const array=fechaPartir.split('.')
    const datestamp=array[0]
    const opinion:addOpinion={user,idCourt,comment,score,datestamp}
    this.opinionSvc.addOpinion(opinion).subscribe({
      next:(value)=> {
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Court added successfully',
        });
        this.router.navigate([`court/${idCourt}/opinions`]);
      },
      error(err) {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: 'It seems there was an error',
          })
      },
    })
  }
}
