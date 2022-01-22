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

@NgModule({
  declarations: [
    AppComponent,
    CamerasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
