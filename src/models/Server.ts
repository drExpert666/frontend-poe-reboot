export class Server {

  guid: string;

  serverName: string;

  serverIP: string;

  channelsTotal: number;

  channelsOnline: number;

  serverStatus: number;

  sessionId: string;

  lustUpdate: Date;

  errorCode: string;


  constructor(guid: string, serverName: string, serverIP: string, channelsTotal: number, channelsOnline: number, serverStatus: number, sessionId: string, lustUpdate: Date, errorCode: string) {
    this.guid = guid;
    this.serverName = serverName;
    this.serverIP = serverIP;
    this.channelsTotal = channelsTotal;
    this.channelsOnline = channelsOnline;
    this.serverStatus = serverStatus;
    this.sessionId = sessionId;
    this.lustUpdate = lustUpdate;
    this.errorCode = errorCode;
  }
}
