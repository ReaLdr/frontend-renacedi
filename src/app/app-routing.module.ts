import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportesComponent } from './components/reportes/reportes.component';
import { AdminGuard } from './guards/admin.guard';
import { CapturaActasComponent } from './components/captura-actas/captura-actas.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { ListadoBoletasDistritalesComponent } from './components/listado-boletas-distritales/listado-boletas-distritales.component';
import { CentralGuard } from './guards/central.guard';
import { SystemGuard } from './guards/system.guard';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
// import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { Boleta1Component } from './components/boleta1/boleta1.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    { path: 'emitir-voto', component: Boleta1Component, canActivate: [AuthGuard], canLoad: [AuthGuard] },
    {
        path: 'login-admin',
        component: AdminLoginComponent
    },
    {
        path: 'administracion-sistema',
        component: AppMainComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'graficas', component: GraficasComponent },
            // { path: 'boleta', component: BoletaComponent, canActivate: [AdminGuard] },
            { path: 'captura-actas', component: CapturaActasComponent, canActivate: [AdminGuard] },
            { path: 'editar-captura-acta/:id_mesa', component: CapturaActasComponent, canActivate: [AdminGuard] },
            { path: 'reportes', component: ReportesComponent },
            { path: 'eliminar-captura-boleta', component: ListadoBoletasDistritalesComponent, canActivate: [CentralGuard], canLoad: [CentralGuard] }
        ],
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    { path: '**', redirectTo: 'login' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
        // RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
