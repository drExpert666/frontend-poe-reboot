import {Switch} from "./Switch";
import {TrassirServer} from "./TrassirServer";

export class CommonChannel {

  guidServer: TrassirServer; // id канала

  guidChannel: String | null; // id канала

  name: String | null; // имя канала

  signal: Number; // состояние канала

  guidIpDevice: String | null; // id ip девайса

  ip: String | null; // ip адрес девайса

  model: String | null; // модель устройства

  lustUpdate: Date | null; // последнее обновление информации (когда был последний запрос);    @Basic

  poeInjector: Boolean;

  switchId:  Switch;


  constructor(guidServer: TrassirServer, guidChannel: String | null, name: String | null, signal: Number, guidIpDevice: String | null, ip: String | null, model: String | null, lustUpdate: Date | null, poeInjector: Boolean, switchId: Switch) {
    this.guidServer = guidServer;
    this.guidChannel = guidChannel;
    this.name = name;
    this.signal = signal;
    this.guidIpDevice = guidIpDevice;
    this.ip = ip;
    this.model = model;
    this.lustUpdate = lustUpdate;
    this.poeInjector = poeInjector;
    this.switchId = switchId;
  }
}
