export class Switch {

  id: number;

  name: string;

  ip: string;

  ports: string;

  numbersOfPorts: number;

  description: string;


  constructor(id: number, name: string, ip: string, ports: string, numbersOfPorts: number, description: string) {
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.ports = ports;
    this.numbersOfPorts = numbersOfPorts;
    this.description = description;
  }
}
