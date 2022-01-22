export class Switch {

  id: Number;

  name: String;

  ip: String;

  ports: String;

  numbersOfPorts: Number;

  description: String;

  constructor(id: Number, name: String, ip: String, ports: String, numbersOfPorts: Number, description: String) {
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.ports = ports;
    this.numbersOfPorts = numbersOfPorts;
    this.description = description;
  }
}
