import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from './auth/login/login.component';
import { BoletaPublicaComponent } from './components/boleta-publica/boleta-publica.component';
import { AuthGuard } from './guards/auth.guard';
import { BoletaDistritalComponent } from './components/boleta-distrital/boleta-distrital.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { AdminGuard } from './guards/admin.guard';
import { BienvenidxComponent } from './components/bienvenidx/bienvenidx.component';
import { CapturaActasComponent } from './components/captura-actas/captura-actas.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { ListadoBoletasDistritalesComponent } from './components/listado-boletas-distritales/listado-boletas-distritales.component';
import { CentralGuard } from './guards/central.guard';
import { SystemGuard } from './guards/system.guard';

const routes: Routes = [
    {
        path: '',
        component: BienvenidxComponent
    },
    {
        path: 'main', component: AppMainComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'graficas', component: GraficasComponent },
            { path: 'sistematizacion-boleta', component: BoletaDistritalComponent, canActivate: [AdminGuard] },
            { path: 'captura-actas', component: CapturaActasComponent, canActivate: [AdminGuard] },
            { path: 'editar-captura-acta/:id_mesa', component: CapturaActasComponent, canActivate: [AdminGuard] },
            { path: 'reportes', component: ReportesComponent },
            { path: 'eliminar-captura-boleta', component: ListadoBoletasDistritalesComponent, canActivate: [CentralGuard], canLoad: [CentralGuard] }
        ],
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'boleta', component: BoletaPublicaComponent, canActivate: [SystemGuard] },
    { path: '**', redirectTo: '' }
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
