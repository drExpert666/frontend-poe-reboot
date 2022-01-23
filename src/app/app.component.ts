import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChannelService} from "./data/implementation/ChannelService";
import {Channel} from "../models/Channel";
import {ServerService} from "./data/implementation/ServerService";
import {Server} from "../models/Server";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ChannelSearchValues, ServerSearchValues} from "./data/search/search";
import {Switch} from "../models/Switch";
import {SwitchService} from "./data/implementation/SwitchService";

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
  channels: Channel[];
  servers: Server[];
  switches: Switch[];
  channelSearchValues: ChannelSearchValues;
  serverSearchValues :ServerSearchValues;

  selectedServer: Server;

  constructor(private channelService: ChannelService,
              private serverService: ServerService,
              private switchService: SwitchService,
              private observer: BreakpointObserver) { // обсервер, необходим для отслеживания изменений в сайдбаре

    this.channelSearchValues = new ChannelSearchValues();
    this.serverSearchValues = new ServerSearchValues();
    this.findAllChannels();
    this.findAllServers();
    this.findAllSwitches();

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

  onSelectedServer(server: Server) {
    this.selectedServer = server;
    this.channelSearchValues.guidServer = server.guid;
    this.channelService.findByParams(this.channelSearchValues)
      .subscribe(c => this.channels = c);
  }

  searchingByParams(searchValues: ChannelSearchValues) {
    this.channelSearchValues.name = searchValues.name;
    this.channelSearchValues.signal = searchValues.signal;
    this.channelService.findByParams(this.channelSearchValues)
      .subscribe(c => this.channels = c);
  }

  searchingByServer(searchValues: ServerSearchValues) {
    this.serverSearchValues = searchValues;
    this.serverService.findByParams(searchValues).subscribe(s => this.servers = s);
  }


  /** методы работы с коммутаторами */

  findAllSwitches() {
    this.switchService.findAll().subscribe(sw => this.switches = sw);
  }


  addSwitch(switch1: Switch) {
    this.switchService.add(switch1).subscribe(res => {
      this.findAllSwitches();
    })
  }


}