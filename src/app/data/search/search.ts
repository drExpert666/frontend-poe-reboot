export class ChannelSearchValues {
  guidServer?: string;
  guidChannel?: string;
  name?: string;
  signal?: number | null;
  switchId?: number | null;

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
