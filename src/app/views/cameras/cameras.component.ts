import {AfterViewInit, Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Channel} from "../../../models/Channel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Server} from "../../../models/Server";
import {ChannelSearchValues, RebootValues} from "../../data/search/search";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditChannelDialogComponent} from "../../dialog/edit-channel-dialog/edit-channel-dialog.component";
import {Switch} from "../../../models/Switch";
import {Actions} from "../../utils/ActionsResult";
import {EditCameraDialogComponent} from "../../dialog/edit-camera-dialog/edit-camera-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'guidServer',
    'name', 'signal', 'reboot-button', 'ip',
    'model', 'lastUpdate', // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    'switchId',
    'port', 'poeInjector', 'edit'];
  dataSource: MatTableDataSource<Channel>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tmpChannelName: string;
  tmpChannelStatus: number | null;
  tmpSwitch: Switch | null;
  tmpChannel: Channel;
  tmpSwitchId: number | null;
  tmpChannelIp: string;

  changed = false; //todo флаг для сохранения изменений фильтрации (нужно внедрить)

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
    this.initSearchValues();
  }

  @Input()
  totalChannelsFounded: number;

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
  rebootCamera = new EventEmitter<RebootValues>();

  @Output()
  paging = new EventEmitter<PageEvent>(); // переход по страницам данных

  fillTable() {
    if (!this.dataSource) {
      console.log(this.dataSource);
      return;
    }

    this.dataSource.data = this.channels;
    this.dataSource.sort = this.sort;
    //todo работает без строчки ниже, выяснить почему
    // this.dataSource.paginator = this.paginator;
    console.log(this.channels);
    this.dataSource.sortingDataAccessor = (channel, colName) => {
      switch (colName) {
        case 'name': {
          return channel.name ? channel.name : '';
        }
        default:
          return '';
    };
    }

  }

  initSearchValues() {
    this.channelSearchValues.name = this.tmpChannelName;
    console.log(this.channelSearchValues);
  }

  /** методы фильтрации */
  onFilterByStatus() {
    this.channelSearchValues.signal = this.tmpChannelStatus;
    this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
    this.searchParams.emit(this.channelSearchValues);
    console.log(this.tmpChannelStatus);
  }

  onFilterBySwitch(switchId: Switch) {
    console.log(switchId);
    this.tmpSwitch = switchId;
    this.channelSearchValues.switchId = this.tmpSwitch?.id;
    this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
    this.searchParams.emit(this.channelSearchValues);
  }

  onFilterBySwitchIP(tmpSwitchId: number | null) {
    this.channelSearchValues.switchId  = tmpSwitchId;
    this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
    this.searchParams.emit(this.channelSearchValues);
  }

  findByChannelIp() {
    this.channelSearchValues.ip = this.tmpChannelIp;
    this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
    this.searchParams.emit(this.channelSearchValues); //todo вынести в отдельный метод повторяющиеся строки
  }

  findByTitle() {
    if (this.tmpChannelName != null && this.tmpChannelName.trim().length > 0) {
      this.channelSearchValues.name = this.tmpChannelName;
      this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
      this.searchParams.emit(this.channelSearchValues);
    }
  }


  /** сброс фильтрации */
  dropAllFilters() {
    this.tmpChannelStatus = null;
    this.tmpChannelName = '';
    this.tmpChannelIp = '';
    this.tmpSwitch = null;
    this.tmpSwitchId = null;
    this.channelSearchValues.ip = this.tmpChannelIp;
    this.channelSearchValues.signal = this.tmpChannelStatus;
    this.channelSearchValues.name = this.tmpChannelName;
    this.channelSearchValues.switchId = this.tmpSwitchId;
    this.channelSearchValues.guidServer = '';
    this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
    this.channelSearchValues.sortDirection = 'acs';
    this.channelSearchValues.sortColumn = 'guidServer';
    this.changed = false;

    this.searchParams.emit(this.channelSearchValues);
  }

  dropChannelNameFilter() {
    this.channelSearchValues.name = this.tmpChannelName;
    this.searchParams.emit(this.channelSearchValues);
  }

  dropSwitchFilter() {
    this.channelSearchValues.switchId = this.tmpSwitchId;
    this.searchParams.emit(this.channelSearchValues);
  }

  dropChannelIpFilter() {
    this.channelSearchValues.ip = this.tmpChannelIp;
    this.searchParams.emit(this.channelSearchValues);
  }

  /** диалоговые окна */
  // пока закомментирован, так как не знаю, нужна ли реаализация
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
        console.log(this.tmpChannel);
        // this.dropAllFilters();
        this.updateChannel.emit(this.tmpChannel);
      }
    });
  }

  /* метод перезагрузки камеры */
  cameraReboot(channel: Channel) {
    // @ts-ignore //проверки были осуществлены до вызова этого метода, поэтому тут проверки не делаю
    const switchIp = channel.switchId.ip;
    // @ts-ignore
    const cameraPort = channel.port.toString();
    // @ts-ignore
    const rebootValues = new RebootValues(switchIp, cameraPort);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: [channel, rebootValues],
      width:'350px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      // if (res && res.action == Actions.CONFIRM) {
      //   this.rebootCamera.emit(rebootValues); //todo - лишнее, нужно убрать
      // }
      if (res.action == Actions.CANCEL) { //todo обработать ошибки и изменить действи при подтверждении
        console.log("Нажали отмену");
      }
      if (res.action == Actions.ERROR) {
        console.log("Нажали ок, во время перезагрузки произошла ошибка");
      }
      if (res.action == Actions.OK) {
        console.log("Нажали ок, перезагрузка выполнилась успешно");
      }
    });
    //
  }

  /* проверка (можно ли перезагрузить камеру) */
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

  /* применение зел/красного стиля для порта канала */
  redGreenStylePort(channel: Channel): number {
    if (channel.switchId == null) {
      return 1;
    }
    if (channel.switchId.ip == null || channel.switchId.ports == null) {
      return 1;
    }
    if (channel.port == null) {
      return 1;
    }
    const ports = channel.switchId?.ports?.split(',');
    const port = channel.port.toString();
    if (ports.find(ports => ports == port) as string) {
      return 3;
    } else {
      return  2;
    }
  }

  /* изменился размер или страница таблице */
  pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }

  initSearch() {

    // this.channelSearchValues.pageSize = this.paginator.pageSize;
    // this.channelSearchValues.pageNumber = this.paginator.pageIndex;
    //
    // this.searchParams.emit(this.channelSearchValues);

  }

  /* сортировка */
  sortData(changingSortDirection: any) {
    if (!this.changed) {
      this.changed = !this.changed;
    }
    console.log(this.changed);
    console.log('Изменили направление');
    console.log(changingSortDirection);
    this.channelSearchValues.pageNumber = 0; //todo посмотреть нужно ли сбрасывать страницу в 0 при сбросе настроек
    this.channelSearchValues.sortColumn = changingSortDirection.active;
    this.channelSearchValues.sortDirection = changingSortDirection.direction;
    this.searchParams.emit(this.channelSearchValues);
  }

}
