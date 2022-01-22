import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Channel} from "../../../models/Channel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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

  constructor() {

  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    // датасорс нужно обязательно создавать для таблицы, в него присваивается любой источник (БД, массивы, json)
    this.dataSource = new MatTableDataSource();
  }

  channels: Channel[];

  @Input("channels")
  set setChannels(value: Channel[]) {
    this.channels = value;
    this.fillTable();
  }

  private fillTable() {
    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.channels;
    this.dataSource.paginator = this.paginator;
    console.log(this.channels);

  }
}
