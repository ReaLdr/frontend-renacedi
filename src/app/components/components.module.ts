import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMainComponent } from '../app.main.component';
import { AppTopBarComponent } from '../app.topbar.component';
import { AppFooterComponent } from '../shared/footer/app.footer.component';
// import { AppFooterComponent } from '../app.footer.component';
import { AppConfigComponent } from '../app.config.component';
import { AppMenuComponent } from '../app.menu.component';
import { AppMenuitemComponent } from '../app.menuitem.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { LoginComponent } from '../auth/login/login.component';
import { HeaderComponent } from '../shared/header/header.component';
import { BoletaPublicaComponent } from './boleta-publica/boleta-publica.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from '../pipes/pipes.module';
import { BoletaDistritalComponent } from './boleta-distrital/boleta-distrital.component';
import { NgChartsModule } from 'ng2-charts';
import { ReportesComponent } from './reportes/reportes.component';
import { BienvenidxComponent } from './bienvenidx/bienvenidx.component';
import { CapturaActasComponent } from './captura-actas/captura-actas.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ListadoBoletasDistritalesComponent } from './listado-boletas-distritales/listado-boletas-distritales.component';

@NgModule({
  declarations: [
    AppMainComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    BoletaPublicaComponent,
    BoletaDistritalComponent,
    ReportesComponent,
    BienvenidxComponent,
    CapturaActasComponent,
    GraficasComponent,
    ListadoBoletasDistritalesComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PipesModule,
    NgChartsModule
  ],
  exports: [
    AppMainComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    BoletaPublicaComponent
  ]
})
export class ComponentsModule { }
