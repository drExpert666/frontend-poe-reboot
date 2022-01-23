export class ChannelSearchValues {
  guidServer?: string;
  guidChannel?: string;
  name?: string;

  constructor(guidServer?: string, guidChannel?: string, name?: string) {
    this.guidServer = guidServer;
    this.guidChannel = guidChannel;
    this.name = name;
  }
}

export class ServerSearchValues {
  serverName?: string;

  constructor(serverName?: string) {
    this.serverName = serverName;
  }
}
