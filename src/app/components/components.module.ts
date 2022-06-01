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
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from '../pipes/pipes.module';
import { NgChartsModule } from 'ng2-charts';
import { ReportesComponent } from './reportes/reportes.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ListadoBoletasDistritalesComponent } from './listado-boletas-distritales/listado-boletas-distritales.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { Boleta1Component } from './boleta1/boleta1.component';
import { CargaCatalogosComponent } from './carga-catalogos/carga-catalogos.component';
import { EnviaCorreosComponent } from './envia-correos/envia-correos.component';
import { ActivarCuentaComponent } from './activar-cuenta/activar-cuenta.component';

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
    ReportesComponent,
    GraficasComponent,
    ListadoBoletasDistritalesComponent,
    ConfiguracionComponent,
    Boleta1Component,
    CargaCatalogosComponent,
    EnviaCorreosComponent,
    ActivarCuentaComponent,
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
    HeaderComponent
  ]
})
export class ComponentsModule { }
