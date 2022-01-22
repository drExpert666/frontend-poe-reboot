import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChannelService} from "./data/implementation/ChannelService";
import {CommonChannel} from "../models/CommonChannel";
import {ServerService} from "./data/implementation/ServerService";
import {TrassirServer} from "../models/TrassirServer";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend-poe-reboot';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  /** передаваемые параметры через Input декораторы */
  channels: CommonChannel[];
  servers: TrassirServer[];

  constructor(private channelService: ChannelService,
              private serverService: ServerService,
              private observer: BreakpointObserver) {

    this.findAllChannels();
    this.findAllServers();

  }

  ngOnInit(): void {
  }

  //todo выдаёт ошибку ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
  // Previous value: 'true'. Current value: 'false'. Исправить!!!
  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 1000px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  /** методы работы с каналами */

  findAllChannels() {
    this.channelService.findAll().subscribe(c => this.channels = c);
    console.log(this.channels);
  }

  /** методы работы с серверами */

  findAllServers() {
    this.serverService.findAll().subscribe(s => this.servers = s);
    console.log(this.channels);
  }

}
