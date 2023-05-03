import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { PistasModule } from './pistas/pistas.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PantallaPrincipalModule } from './pantalla-principal/pantalla-principal.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CentresService } from './services/centres.service';
import { CourtService } from './services/court.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UserService } from './services/user.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { UserModule } from './user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from './register/register.module';
import { ManagementModule } from './management/management.module';
import { GestionPistasModule } from './gestion-pistas/gestion-pistas.module';


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
    UserModule,
    NgbModule,
    PantallaPrincipalModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    RegisterModule,
    ManagementModule,
    GestionPistasModule
  ],
  providers: [CentresService,CourtService,UserService,AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
