import {AfterViewInit, Component, ElementRef, enableProdMode, OnInit, ViewChild} from '@angular/core';
import {ChannelService} from "./data/implementation/ChannelService";
import {Channel} from "../models/Channel";
import {ServerService} from "./data/implementation/ServerService";
import {Server} from "../models/Server";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ChannelSearchValues, RebootValues, ServerSearchValues, UsersValues} from "./data/search/search";
import {Switch} from "../models/Switch";
import {SwitchService} from "./data/implementation/SwitchService";
import {RebootService} from "./data/implementation/RebootService";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "./service/auth.service";
import {TokenStorageService} from "./service/token-storage.service";
import {NotificationService} from "./service/notification.service";
import set = Reflect.set;
import {environment} from "../environments/environment";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {UsersService} from "./data/implementation/UsersService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend-poe-reboot';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  sidenavIsReady = false; // флаг для отображения сайдбара только после инициализации

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

  usersValues : UsersValues; // передаём сюда данные по пользователям через Output декоратор(пока нигде не используем)

  isAuthorized = false;
  isSuperAdmin = false;


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private notificationService: NotificationService,
              private channelService: ChannelService,
              private serverService: ServerService,
              private switchService: SwitchService,
              private rebootService: RebootService,
              private observer: BreakpointObserver, // обсервер, необходим для отслеживания изменений в сайдбаре
              private matIconRegistry: MatIconRegistry, // для регистарции сторонних иконок
              private domSanitizer: DomSanitizer) { // для регистарции сторонних иконок

    if (this.tokenStorage.getUser()) // если пользоавтель аторизирован (есть токен)
    {

      /* проверяем, есть ли в ролях у пользователя роль админа */
      const jwt =  this.tokenStorage.getToken()?.split(' ')[1];
      // @ts-ignore
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let authorities = decodedJwtData.authorities;
      console.log(jwtData);
      console.log(decodedJwtJsonData);
      console.log(authorities);
      for (let item of authorities) {
        if(item.authority.includes('ROLE_ADMIN')) {
          this.isSuperAdmin = true;
        }
      }

      this.isAuthorized = true; // только после этого флага возможны обращения к БД (без него html с основными данными пустой)

      /* добавляем иконку и задаём ей имя, по которомы мы сможем обращаться к ней в html */
      this.matIconRegistry.addSvgIcon(
        "telegramIcon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/telegramIcon.svg")
      );

      this.usersValues = new UsersValues();

      this.channelSearchValues = new ChannelSearchValues();
      this.serverSearchValues = new ServerSearchValues();
      this.channelSearchValues.pageSize = this.defaultPageSize;
      this.channelSearchValues.pageNumber = this.defaultPageNumber;
      this.tmpChannel = new Channel(null, null, null, null, null,
        null, null, null, null, null, null, false);
      this.searchingByParams(this.channelSearchValues);
      this.findAllSwitches();
      this.findAllServers();

    }


  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    /* реализация взята из ютуб ролика, для избежания ошибки по изменению состояния сайдбара */
    setTimeout(() => {
      this.sidenavIsReady = true;
      if (this.isAuthorized) {
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

    }, 0)

  }


  /** методы работы с серверами */

  searchingByParams(searchValues: ChannelSearchValues) {
    this.channelSearchValues = searchValues;
    if (this.selectedServer) {
      this.channelSearchValues.guidServer = this.selectedServer.guid;
    } else {
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
      });

  }

  findAllServers() {
    this.serverService.findAll().subscribe(s => this.servers = s);
    // this.searchingByParams(this.channelSearchValues);
  }

  /* при клике на сервер из списка в сайд-баре */
  onSelectedServer(server: Server) {
    this.selectedServer = server;
    this.channelSearchValues.guidServer = server.guid; // присваиваем выбранный сервер в переменную для поиска каналов
    this.searchingByParams(this.channelSearchValues);
  }

  searchingByServer(searchValues: ServerSearchValues) {
    this.serverSearchValues = searchValues;
    this.serverService.findByParams(searchValues).subscribe(s => this.servers = s);
  }

  /** методы работы с каналами */

  // findAllChannels() {
  //   this.channelService.findAll().subscribe(c => this.channels = c);
  // }

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
    // this.findAllChannels();
  }

  updateChannel(channel: Channel) {
    this.tmpChannel = channel;
    this.channelService.update(channel).subscribe(res => this.searchingByParams(this.channelSearchValues));
  }

  rebootCamera(rebootValues: RebootValues) {
    this.rebootService.reboot(rebootValues).subscribe((res) => {
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

  logout() {
    this.tokenStorage.logOut();
  }


  getUsersFromChannel(usersValues: UsersValues) {
      this.usersValues = usersValues;
  }
}
