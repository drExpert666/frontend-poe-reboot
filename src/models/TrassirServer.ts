export class TrassirServer {

  guid: String;

  serverName: String;

  serverIP: String;

  channels_total: Number;

  channels_online: Number;

  serverStatus: Number;

  sessionId: String;

  lustUpdate: Date;

  error_code: String;

  constructor(guid: String, serverName: String, serverIP: String, channels_total: Number, channels_online: Number, serverStatus: Number, sessionId: String, lustUpdate: Date, error_code: String) {
    this.guid = guid;
    this.serverName = serverName;
    this.serverIP = serverIP;
    this.channels_total = channels_total;
    this.channels_online = channels_online;
    this.serverStatus = serverStatus;
    this.sessionId = sessionId;
    this.lustUpdate = lustUpdate;
    this.error_code = error_code;
  }
}
