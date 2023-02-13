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
    PantallaPrincipalModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
