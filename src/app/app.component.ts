import {Component, OnInit} from '@angular/core';
import {ChannelService} from "./data/implementation/ChannelService";
import {CommonChannel} from "../models/CommonChannel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend-poe-reboot';

  /** передаваемые параметры через Input декораторы */
  channels: CommonChannel[];

  constructor(private channelService: ChannelService) {

    this.findAllChannels();

  }

  /** методы работы с каналами */

  findAllChannels() {
    this.channelService.findAll().subscribe(c => this.channels = c);
    console.log(this.channels);
  }

  ngOnInit(): void {
  }

}
