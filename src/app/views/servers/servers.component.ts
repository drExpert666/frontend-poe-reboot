import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Server} from "../../../models/Server";
import {ChannelSearchValues, ServerSearchValues} from "../../data/search/search";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() {
  }


  tmpServerName: string;
  allChannelsCount: number;
  onlineChannelsCount: number;


  /** инпут декораторы */

  @Input()
  serverSearchValues: ServerSearchValues;

  servers: Server[];

  @Input("servers")
  set setServers(value: Server[]) {
    this.servers = value;
    this.getAllChannelsCount();
  }

  @Input()
  selectedServer: Server;

  channelSearchValues: ChannelSearchValues;

  /** аутпут декораторы */

  @Output()
  onSelectedServer = new EventEmitter<Server>();

  @Output()
  searchParams = new EventEmitter<ServerSearchValues>();

  ngOnInit(): void {
  }

  showSelectedServer(server: Server | null) {
    if (server) {
      this.selectedServer = server;
      this.onSelectedServer.emit(server);
    } else {
      //todo подумать над изменением реализации
      this.selectedServer = new Server('', '', '', 0, 0, 0, '', new Date(), '');
      this.onSelectedServer.emit(new Server('', '', '', 0, 0, 0, '', new Date(), ''))
    }
  }

  dropFilters() {
    this.serverSearchValues.serverName = this.tmpServerName;
    this.searchParams.emit(this.serverSearchValues);

  }

  startSearch() {
    if (this.tmpServerName != null && this.tmpServerName.trim().length > 0) {
      this.serverSearchValues.serverName = this.tmpServerName;
      this.searchParams.emit(this.serverSearchValues);
    }
  }

  getAllChannelsCount() {
    if (!this.servers) {
      return;
    }
    this.allChannelsCount = 0;
    this.onlineChannelsCount = 0;
    this.servers.forEach(s => {
      this.allChannelsCount += s.channelsTotal;
      this.onlineChannelsCount += s.channelsOnline;
    })
  }

}
