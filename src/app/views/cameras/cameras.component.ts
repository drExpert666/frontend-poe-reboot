import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonChannel} from "../../../models/CommonChannel";
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
  dataSource: MatTableDataSource<CommonChannel>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {

  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    // датасорс нужно обязательно создавать для таблицы, в него присваивается любой источник (БД, массивы, json)
    this.dataSource = new MatTableDataSource();
  }

  channels: CommonChannel[];

  @Input("channels")
  set setChannels(value: CommonChannel[]) {
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
