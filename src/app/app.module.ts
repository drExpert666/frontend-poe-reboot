import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CamerasComponent} from './views/cameras/cameras.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CHANNEL_URL_TOKEN} from "./data/implementation/ChannelService";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServersComponent} from './views/servers/servers.component';
import {SERVER_URL_TOKEN} from "./data/implementation/ServerService";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EditChannelDialogComponent} from './dialog/edit-channel-dialog/edit-channel-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SWITCH_URL_TOKEN} from "./data/implementation/SwitchService";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {EditCameraDialogComponent} from './dialog/edit-camera-dialog/edit-camera-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {REBOOT_URL_TOKEN} from "./data/implementation/RebootService";
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {AfterConfirmRebootDialogComponent} from './dialog/after-confirm-reboot-dialog/after-confirm-reboot-dialog.component';
import {MatSortModule} from "@angular/material/sort";
import {AuthInterceptorService} from "./helper/auth-interceptor.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ErrorInterceptorService} from "./helper/error-interceptor.service";
import {LoginComponent} from './auth/login/login.component';
import {AppRoutingModule} from "./app.routing.module";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {MatCardModule} from "@angular/material/card";
import {USERS_URL_TOKEN} from "./data/implementation/UsersService";
import {ShowUserChannelsDialogComponent} from "./dialog/show-user-channels-dialog/show-user-channels-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    CamerasComponent,
    ServersComponent,
    EditChannelDialogComponent,
    EditCameraDialogComponent,
    ConfirmDialogComponent,
    AfterConfirmRebootDialogComponent,
    LoginComponent,
    NavigationComponent,
    ShowUserChannelsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    AppRoutingModule, // ???????????? ???????????? ???????????????????? ???????????? ?? ??????????????????
    MatCardModule,

  ],
  providers: [
    EditChannelDialogComponent,
    EditCameraDialogComponent,
    ConfirmDialogComponent,
    AfterConfirmRebootDialogComponent,
    ShowUserChannelsDialogComponent,
    // authInterceptorProviders,
    // authErrorInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: CHANNEL_URL_TOKEN,
      useValue: 'http://localhost:8080/common'
    },
    {
      provide: SERVER_URL_TOKEN,
      useValue: 'http://localhost:8080/server'
    },
    {
      provide: SWITCH_URL_TOKEN,
      useValue: 'http://localhost:8080/switch'
    },
    {
      provide: REBOOT_URL_TOKEN,
      useValue: 'http://localhost:8080/reboot'
    },
    {
      provide: USERS_URL_TOKEN,
      useValue: 'http://localhost:8080/users'
    }
    // ,
    // {
    //   provide: CHANNEL_URL_TOKEN,
    //   useValue: 'http://reboot:8080/rebooting-cameras/common'
    // },
    // {
    //   provide: SERVER_URL_TOKEN,
    //   useValue: 'http://reboot:8080/rebooting-cameras/server'
    // },
    // {
    //   provide: SWITCH_URL_TOKEN,
    //   useValue: 'http://reboot:8080/rebooting-cameras/switch'
    // },
    // {
    //   provide: REBOOT_URL_TOKEN,
    //   useValue: 'http://reboot:8080/rebooting-cameras/reboot'
    // },
    //     {
    //       provide: USERS_URL_TOKEN,
    //       useValue: 'http://reboot:8080/rebooting-cameras/users'
    //     }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
