import {AfterViewInit, Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Channel} from "../../../models/Channel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Server} from "../../../models/Server";
import {ChannelSearchValues} from "../../data/search/search";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditChannelDialogComponent} from "../../dialog/edit-channel-dialog/edit-channel-dialog.component";
import {Switch} from "../../../models/Switch";
import {Actions} from "../../utils/ActionsResult";

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
    'port', 'poeInjector'];
  dataSource: MatTableDataSource<Channel>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator) paginator: MatPaginator;

  tmpChannelName: string;

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
    console.log(this.servers);
  }

  switches: Switch[];

  @Input('switches')
  set setSwitches(value: Switch[]) {
    this.switches = value;
    console.log(this.switches);
  }

  @Input('channelSearchValues')
  channelSearchValues: ChannelSearchValues;

  set setChannelSearchValues(value: ChannelSearchValues) {
    this.channelSearchValues = value;
    this.initSearchValues();
  }

  /** аутпут декораторы */

  @Output()
  updateSwitch = new EventEmitter<Switch>();
  @Output()
  addSwitch = new EventEmitter<Switch>();

  @Output('searchParams')
  searchParams = new EventEmitter<ChannelSearchValues>();

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
}
