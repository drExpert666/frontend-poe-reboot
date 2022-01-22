import {Component, Input, OnInit} from '@angular/core';
import {TrassirServer} from "../../../models/TrassirServer";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  servers: TrassirServer[];

  selectedServer: TrassirServer;

  @Input("servers")
  set setServers(value: TrassirServer[]) {
    this.servers = value;
    console.log(this.servers);
  }

  ngOnInit(): void {

  }

  showSelectedServer(server: TrassirServer) {
    this.selectedServer = server;
  }
}
