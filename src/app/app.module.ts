import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { PistasModule } from './pistas/pistas.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PantallaPrincipalModule } from './pantalla-principal/pantalla-principal.module';
import { HttpClientModule } from '@angular/common/http';
import { CentresService } from './services/centres.service';
import { CourtService } from './services/court.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NavbarModule,
    PistasModule,
    RouterModule,
    AuthModule,
    NgbModule,
    PantallaPrincipalModule,
    HttpClientModule

  ],
  providers: [CentresService,CourtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
