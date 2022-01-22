import {Switch} from "./Switch";
import {TrassirServer} from "./TrassirServer";

export class CommonChannel {

  guidServer: TrassirServer | null; // id канала

  guidChannel: string | null; // id канала

  name: string | null; // имя канала

  signal: number | null; // состояние канала

  guidIpDevice: string | null; // id ip девайса

  ip: string | null; // ip адрес девайса

  model: string | null; // модель устройства

  lustUpdate: Date | null; // последнее обновление информации (когда был последний запрос);    @Basic

  poeInjector: boolean | null;

  switchId: Switch | null;


  constructor(guidServer: TrassirServer | null, guidChannel: string | null, name: string | null, signal: number | null, guidIpDevice: string | null, ip: string | null, model: string | null, lustUpdate: Date | null, poeInjector: boolean | null, switchId: Switch | null) {
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
