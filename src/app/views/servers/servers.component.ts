import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Server} from "../../../models/Server";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  /** инпут декораторы */

  servers: Server[];
  @Input("servers")
  set setServers(value: Server[]) {
    this.servers = value;
    console.log(this.servers);
  }

  selectedServer: Server;

  /** аутпут декораторы */

  @Output()
  onSelectedServer = new EventEmitter<Server>();


  ngOnInit(): void {

  }

  showSelectedServer(server: Server) {
    this.selectedServer = server;
    this.onSelectedServer.emit(server);
  }
}
