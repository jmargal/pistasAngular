import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Court } from 'src/app/interfaces/Court.interface';
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
  ) {}

  court!: Court;
  id!: number;
  @ViewChild('fileInput') fileInput!: ElementRef;


  myForm: FormGroup = this.formbuilder.group({
    sport:['',[Validators.required,Validators.minLength(3)]],
    price:['',[Validators.required,Validators.min(3)]],
    img: [null],
  });

  ngOnInit(): void {
    this.id = this.actualRoute.snapshot.params['id'];
    this.courtSvc.getCourt(this.id).subscribe({
      next: (court) => {
        this.court = court;
      },
      error(err) {
        console.log(err);
      }
    });
  }

  isValidSport() {
    return (
      this.myForm?.controls['sport'].errors &&
      this.myForm?.controls['sport'].touched
    );
  }

  isValidPrice() {
    return (
      this.myForm?.controls['price'].errors &&
      this.myForm?.controls['price'].touched
    );
  }



  //Manejar la imagen que llega del formulario
  //Recibe el archivo del formulario con un eventBinding
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

  update(){
    let sport=this.myForm?.controls['sport'].value
    let price=this.myForm?.controls['price'].value
    let img = this.myForm.get('img');
    this.courtSvc.updateCourt(this.id,img?.value,sport,price).subscribe({
      next:(value)=> {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Court updated successfully',
        });
        this.router.navigate(['manage/courts']);
      },
      error(err) {
          console.log(err);
      },
    })
  }
}
