import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChannelService} from "./data/implementation/ChannelService";
import {Channel} from "../models/Channel";
import {ServerService} from "./data/implementation/ServerService";
import {Server} from "../models/Server";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ChannelSearchValues, RebootValues, ServerSearchValues} from "./data/search/search";
import {Switch} from "../models/Switch";
import {SwitchService} from "./data/implementation/SwitchService";
import {RebootService} from "./data/implementation/RebootService";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend-poe-reboot';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  /** передаваемые параметры через Input декораторы */
  channels: Channel[];
  servers: Server[];
  switches: Switch[];

  channelSearchValues: ChannelSearchValues;
  serverSearchValues: ServerSearchValues;

  readonly defaultPageSize = 10;
  readonly defaultPageNumber = 0;
  totalChannelsFounded: number; // сколько всего найдено задач - для заполнения таблицы

  selectedServer: Server;
  tmpChannel: Channel;


  constructor(private channelService: ChannelService,
              private serverService: ServerService,
              private switchService: SwitchService,
              private rebootService: RebootService,
              private observer: BreakpointObserver) { // обсервер, необходим для отслеживания изменений в сайдбаре

    this.channelSearchValues = new ChannelSearchValues();
    this.serverSearchValues = new ServerSearchValues();
    this.channelSearchValues.pageSize = this.defaultPageSize;
    this.channelSearchValues.pageNumber = this.defaultPageNumber;
    this.tmpChannel = new Channel(null, null, null,null, null,
      null,null, null, null, null,null);
    this.searchingByParams(this.channelSearchValues);
    // this.findAllSwitches();
    // this.findAllServers();

  }

  ngOnInit(): void {
  }

  //todo выдаёт ошибку ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
  // Previous value: 'true'. Current value: 'false'. Исправить!!! Ошибка выскакивает при первом запуске страницы
  // и при открытом сайд-баре (при закрытом всё ок)
  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 1000px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }


  /** методы работы с серверами */

  searchingByParams(searchValues: ChannelSearchValues) {
    this.channelSearchValues = searchValues;
    if (this.selectedServer) {
      this.channelSearchValues.guidServer = this.selectedServer.guid;
    }
    else {
      this.channelSearchValues.guidServer = '';
    }

    this.channelService.findByParams(searchValues)
      .subscribe(c => {
        /* если выбранная страница для отображения больше, чем всего страниц - заново делаем поиск и показываем первую
        * если пользователь был например на 2й странице общего списка и выполнил поиск, в рез-те которого страниц
        * вернулось меньше, чем страница с которой совершили поиск, то нужно показать первую страницу */
        if (c.totalPages > 0 && this.channelSearchValues.pageNumber >= c.totalPages) {
          this.channelSearchValues.pageNumber = 0;
          this.searchingByParams(searchValues);
        }
        this.totalChannelsFounded = c.totalElements // получаем кол-во элементов в массиве
        this.channels = c.content;
        console.log(this.channels) // получаем массив
      });

  }

  findAllServers() {
    this.serverService.findAll().subscribe(s => this.servers = s);
    // console.log(this.channels);
    // this.searchingByParams(this.channelSearchValues);
  }

  onSelectedServer(server: Server) {
    this.selectedServer = server;
    this.channelSearchValues.guidServer = server.guid;
    this.searchingByParams(this.channelSearchValues);
  }

  searchingByServer(searchValues: ServerSearchValues) {
    this.serverSearchValues = searchValues;
    this.serverService.findByParams(searchValues).subscribe(s => this.servers = s);
  }

  /** методы работы с каналами */

  findAllChannels() {
    this.channelService.findAll().subscribe(c => this.channels = c);
    console.log(this.channels);
  }

  /** методы работы с коммутаторами */

  findAllSwitches() {
    this.switchService.findAll().subscribe(sw => this.switches = sw);
  }


  addSwitch(switch1: Switch) {
    this.switchService.add(switch1).subscribe(res => {
      this.findAllSwitches();
    })
  }


  changeSelectedServer(server: Server) {
    this.selectedServer = server;
    this.searchingByParams(this.channelSearchValues);
    this.findAllSwitches();
    this.findAllChannels();
  }

  updateChannel(channel: Channel) {
    console.log(channel);
    this.tmpChannel = channel;
    this.channelService.update(channel).subscribe(res => this.findAllChannels());
  }

  rebootCamera(rebootValues: RebootValues) {
    this.rebootService.reboot(rebootValues).subscribe((res) => {
      console.log(res);
    })
  }

  paging(pageEvent: PageEvent) {

    // если изменили настройку "кол-во на странице" - заново делаем запрос и показываем с 1й страницы (индекс 0)
    // if (this.channelSearchValues.pageSize != pageEvent.pageSize) {
    //   this.channelSearchValues.pageNumber = 0; // новые данные будем показывать с 1-й страницы (индекс 0)
    // } else {
    //   this.channelSearchValues.pageNumber = pageEvent.pageIndex;
    // }
    this.channelSearchValues.pageSize = pageEvent.pageSize;
    this.channelSearchValues.pageNumber = pageEvent.pageIndex;
    // this.findTasks(this.taskSearchValues); // показываем новые данные
    this.searchingByParams(this.channelSearchValues);

  }

}
