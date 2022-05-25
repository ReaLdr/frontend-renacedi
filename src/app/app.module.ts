import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';

import { ComponentsModule } from './components/components.module';
import { HeaderComponent } from './shared/header/header.component';
import { Footer } from 'primeng/api';
import { PipesModule } from './pipes/pipes.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { AuthModule } from './auth/auth.module';
// import { BoletaPublicaComponent } from './components/boleta-publica/boleta-publica.component';

@NgModule({
    imports: [
        PrimeNgModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ComponentsModule,
        AuthModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        Footer
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MenuService, ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
