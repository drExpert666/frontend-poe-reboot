export class ChannelSearchValues {
  guidServer?: string;
  guidChannel?: string;
  name?: string;
  signal?: number | null;
  switchId?: number | null;
  ip?: string;

  // постарничность
  pageNumber = 0;
  pageSize = 5;

  // сортировка
  sortColumn = 'guidServer';
  sortDirection = 'asc';

  constructor(guidServer?: string, guidChannel?: string, name?: string, signal?: number, switchId?: number) {
    this.guidServer = guidServer;
    this.guidChannel = guidChannel;
    this.name = name;
    this.signal = signal;
    this.switchId = switchId;
  }
}

export class ServerSearchValues {
  serverName?: string;

  constructor(serverName?: string) {
    this.serverName = serverName;
  }
}

export class RebootValues {

  switchIp: string;
  cameraPort: string;

  constructor(switchIp: string, cameraPort: string) {
    this.switchIp = switchIp;
    this.cameraPort = cameraPort;
  }
}
