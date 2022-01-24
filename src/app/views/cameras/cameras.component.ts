import {AfterViewInit, Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Channel} from "../../../models/Channel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Server} from "../../../models/Server";
import {ChannelSearchValues, RebootValues} from "../../data/search/search";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditChannelDialogComponent} from "../../dialog/edit-channel-dialog/edit-channel-dialog.component";
import {Switch} from "../../../models/Switch";
import {Actions} from "../../utils/ActionsResult";
import {EditCameraDialogComponent} from "../../dialog/edit-camera-dialog/edit-camera-dialog.component";

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['guidServer',
    'name', 'signal', 'ip',
    'model', 'lastUpdate', // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    'switchId',
    'port', 'poeInjector', 'edit'];
  dataSource: MatTableDataSource<Channel>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator) paginator: MatPaginator;

  tmpChannelName: string;
  tmpChannelStatus: number | null;
  tmpSwitch: Switch | null;
  tmpChannel: Channel;

  constructor(private dialog: MatDialog) {

  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    // датасорс нужно обязательно создавать для таблицы, в него присваивается любой источник (БД, массивы, json)
    this.dataSource = new MatTableDataSource();
  }


  /** инпут декораторы */

  channels: Channel[];
  @Input('channels')
  set setChannels(value: Channel[]) {
    this.channels = value;
    this.fillTable();
  }

  servers: Server[];
  @Input('servers')
  set setServers(value: Server[]) {
    this.servers = value;
  }

  switches: Switch[];
  @Input('switches')
  set setSwitches(value: Switch[]) {
    this.switches = value;
  }

  @Input('channelSearchValues')
  channelSearchValues: ChannelSearchValues;
  set setChannelSearchValues(value: ChannelSearchValues) {
    console.log(this.channelSearchValues);
    this.channelSearchValues = value;
    this.initSearchValues()
  }

  /** аутпут декораторы */

  @Output()
  updateSwitch = new EventEmitter<Switch>();
  @Output()
  addSwitch = new EventEmitter<Switch>();

  @Output('searchParams')
  searchParams = new EventEmitter<ChannelSearchValues>();

  @Output()
  changeSelectedServer = new EventEmitter<Server>();

  @Output()
  updateChannel = new EventEmitter<Channel>();

  @Output()
  rebootCamera = new EventEmitter<RebootValues>()

  private fillTable() {
    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.channels;
    this.dataSource.paginator = this.paginator;
    console.log(this.channels);

  }


  private initSearchValues() {
    this.channelSearchValues.name = this.tmpChannelName;
    console.log(this.channelSearchValues);
  }

  dropFilters() {
    this.channelSearchValues.name = this.tmpChannelName;
    this.searchParams.emit(this.channelSearchValues);
  }


  findByTitle() {
    if (this.tmpChannelName != null && this.tmpChannelName.trim().length > 0) {
      this.channelSearchValues.name = this.tmpChannelName;
      this.searchParams.emit(this.channelSearchValues);
    }

  }

  openAddDialog() {
    const newSwitch = new Switch(null, null, null, null, null, null);
    const dialogRef = this.dialog.open(EditChannelDialogComponent, {
      data: [newSwitch, this.switches],
      autoFocus: false,
      width: '450px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.action == Actions.ADD) {
        this.addSwitch.emit(result.obj);
      }
      if (result.action == Actions.CANCEL) {
        console.log("Ничего не делаем");
      }

    });

  }

  onFilterByStatus() {
    this.channelSearchValues.signal = this.tmpChannelStatus;
    this.searchParams.emit(this.channelSearchValues)
    console.log(this.tmpChannelStatus);
  }

  onFilterBySwitch(channel: Channel) {
    this.tmpSwitch = channel.switchId;
    this.channelSearchValues.switchId = this.tmpSwitch?.id;
    this.searchParams.emit(this.channelSearchValues);
  }

  dropAllFilters() {
    this.changeSelectedServer.emit(undefined);
    this.tmpChannelStatus = null;
    this.tmpChannelName = '';
    this.channelSearchValues = new ChannelSearchValues();
    this.searchParams.emit(this.channelSearchValues);
  }

  openEditChannelDialog(channel: Channel) {
    const dialogRef = this.dialog.open(EditCameraDialogComponent, {
      data: [channel, this.switches],
      autoFocus: false,
      width: '550px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result.action == Actions.CANCEL) {
        console.log("Нажали отмену");
      }
      if (result.action == Actions.EDIT) {
        console.log("Нажали сохранить. Переданный объект:  " + result.obj);
        this.tmpChannel = result.obj;
        this.updateChannel.emit(this.tmpChannel);
        this.dropAllFilters();
      }
    });
  }

  canReboot(channel: Channel): boolean {
    if (channel.switchId == null) {
      return false;
    }
    if (channel.switchId.ip == null || channel.switchId.ports == null) {
      return false;
    }
    if (channel.port == null) {
      return false;
    }
    if (channel.poeInjector !=null && channel.poeInjector) {
      return false;
    }
    const ports = channel.switchId?.ports?.split(',');
    const port = channel.port.toString();
    if (ports.find(ports => ports == port) as string) {
      return true;
    } else {
      return  false;
    }
  }


  cameraReboot(channel: Channel) {
    // @ts-ignore
    const switchIp = channel.switchId.ip;
    // @ts-ignore
    const cameraPort = channel.port.toString();
    // @ts-ignore
    const rebootValues = new RebootValues(switchIp, cameraPort);
    this.rebootCamera.emit(rebootValues);
  }
}
