export class ChannelSearchValues {
  guidServer?: string;
  guidChannel?: string;
  name?: string;
  signal?: number | null;

  constructor(guidServer?: string, guidChannel?: string, name?: string, signal?: number) {
    this.guidServer = guidServer;
    this.guidChannel = guidChannel;
    this.name = name;
    this.signal = signal;
  }
}

export class ServerSearchValues {
  serverName?: string;

  constructor(serverName?: string) {
    this.serverName = serverName;
  }
}
