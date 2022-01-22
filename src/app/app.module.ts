import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CamerasComponent } from './views/cameras/cameras.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CHANNEL_URL_TOKEN} from "./data/implementation/ChannelService";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import { ServersComponent } from './views/servers/servers.component';
import {SERVER_URL_TOKEN} from "./data/implementation/ServerService";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    CamerasComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    // { //todo добавить позже
    //   provide: HTTP_INTERCEPTORS, // все Http запросы будут выполняться с отображением индикатора загрузки
    //   useClass: CustomHttpInterceptor,
    //   multi: true
    // },
    {
      provide: CHANNEL_URL_TOKEN,
      useValue: 'http://localhost:8080/common'
    },
    {
      provide: SERVER_URL_TOKEN,
      useValue: 'http://localhost:8080/server'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
