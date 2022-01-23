export class Switch {

  id?: number | null;

  name?: string | null;

  ip?: string | null;

  ports?: string | null;

  numbersOfPorts?: number | null;

  description?: string | null;


  constructor(id: number | null, name: string | null, ip: string | null, ports: string | null, numbersOfPorts: number | null, description: string | null) {
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.ports = ports;
    this.numbersOfPorts = numbersOfPorts;
    this.description = description;
  }

}
