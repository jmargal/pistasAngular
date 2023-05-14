import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Opinion } from 'src/app/interfaces/Opinion.interface';
import { OpinionsService } from 'src/app/services/opinions.service';

@Component({
  selector: 'app-edit-opinion',
  templateUrl: './edit-opinion.component.html',
})
export class EditOpinionComponent implements OnInit {
  id!: number;
  opinion!: Opinion;
  loadOpinion: boolean=false;

  constructor(
    private opinionSvc: OpinionsService,
    private actualRoute: ActivatedRoute,
    private cookieSvc:CookieService
  ) {}

  ngOnInit(): void {
    const id = this.actualRoute.snapshot.params['id'];
    this.opinionSvc.getAnOpinion(id).subscribe({
      next: (value) => {
        this.opinion = value;
        if(this.cookieSvc.get('username') == this.opinion.user){
          this.loadOpinion=true;
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
