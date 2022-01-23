import {AfterViewInit, Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Channel} from "../../../models/Channel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Server} from "../../../models/Server";
import {ChannelSearchValues} from "../../data/search/search";

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['guidServer',
    'name', 'signal', 'ip',
    'model', 'lastUpdate', // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    'switchId', 'poeInjector'];
  dataSource: MatTableDataSource<Channel>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator) paginator: MatPaginator;

  tmpChannelName: string;

  constructor() {

  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    // датасорс нужно обязательно создавать для таблицы, в него присваивается любой источник (БД, массивы, json)
    this.dataSource = new MatTableDataSource();
  }


  /** инпут декораторы */

  channels: Channel[];
  @Input("channels")
  set setChannels(value: Channel[]) {
    this.channels = value;
    this.fillTable();
  }

  servers: Server[];
  @Input("servers")
  set setServers(value: Server[]) {
    this.servers = value;
    console.log(this.servers);
  }

  @Input('channelSearchValues')
  channelSearchValues: ChannelSearchValues;
  set setChannelSearchValues(value: ChannelSearchValues) {
    this.channelSearchValues = value;
    this.initSearchValues();
  }

  /** аутпут декораторы */

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
    this.channelSearchValues.name =this.tmpChannelName;
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
}
