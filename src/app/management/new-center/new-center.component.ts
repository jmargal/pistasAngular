import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CentresService } from '../../services/centres.service';
import { Center } from '../../interfaces/Center.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-center',
  templateUrl: './new-center.component.html',
})
export class NewCenterComponent {
  constructor(
    private formbuilder: FormBuilder,
    private centerSvc: CentresService,
    private router: Router
  ) {}

  myForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(8)]],
  });

  isValidName() {
    return (
      this.myForm?.controls['name'].errors &&
      this.myForm?.controls['name'].touched
    );
  }

  isValidAddress() {
    return (
      this.myForm?.controls['address'].errors &&
      this.myForm?.controls['address'].touched
    );
  }

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
        this.addCenter();
      },
    });
  }

  addCenter() {
    let name = this.myForm.controls['name'].value;
    let address = this.myForm.controls['address'].value;
    this.centerSvc.addCenter(name, address).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User updated',
        });
        this.router.navigate(['/manage/centers']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
