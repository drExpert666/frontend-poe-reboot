import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Channel} from "../../../models/Channel";
import {Actions, ActionsResult} from "../../utils/ActionsResult";
import {Switch} from "../../../models/Switch";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-camera-dialog',
  templateUrl: './edit-camera-dialog.component.html',
  styleUrls: ['./edit-camera-dialog.component.css']
})
export class EditCameraDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditCameraDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Channel, Switch[]]) {


  }

  /* сохраняем переданные данные в локальные переменные */
  tmpSwitches: Switch[];
  tmpChannel: Channel;
  tmpSwitch: Switch | null;
  tmpPortNumber: number | null;
  tmpPoeInj: boolean | null;
  tmpSwitchIp: string | null;
  tmpLostChannel: boolean = false;

  tmpSwitchPortNumbers: number | null = 48;
  numberFormControl: any;

  /* локальные временные переменные для отображения на HTML */

  htmlSwitch: Switch | null;
  htmlPortNumber: number | null;
  htmlPoeInj: boolean | null;
  htmlSwitchIp: string | null | undefined;
  htmlLostChannel: boolean = false;

  /* флаг изменений на html */
  wasChange = false;


  ngOnInit(): void {
    this.numberFormControl = new FormControl('', [Validators.min(1), Validators.max(48)]);
    this.tmpChannel = this.data[0];
    this.tmpSwitches = this.data[1];
    this.tmpSwitch = this.tmpChannel.switchId ? this.tmpChannel.switchId : null;
    this.tmpPortNumber = this.tmpChannel.port ? this.tmpChannel.port : null;
    this.tmpPoeInj = this.tmpChannel.poeInjector ? this.tmpChannel.poeInjector : null;
    this.tmpSwitchIp = (this.tmpSwitch && this.tmpSwitch.ip) ? this.tmpSwitch.ip : null;
    this.tmpLostChannel = this.tmpChannel.lostChannel;
    if (this.tmpSwitch && this.tmpSwitchIp && this.tmpSwitch.numbersOfPorts) {
      this.tmpSwitchPortNumbers = this.tmpSwitch.numbersOfPorts;
      this.numberFormControl = new FormControl('', [Validators.min(1),
        Validators.max(this.tmpSwitch.numbersOfPorts)]);
    }


    this.htmlSwitch = this.tmpSwitch;
    this.htmlLostChannel = this.tmpLostChannel;
    this.htmlPoeInj = this.tmpPoeInj;
    this.htmlPortNumber = this.tmpPortNumber;
    this.htmlSwitchIp = this.tmpSwitchIp;

    // this.changeSwitchPortNumbers();

  }

  confirm() {
    this.tmpChannel.port = this.htmlPortNumber;
    this.tmpChannel.poeInjector = this.htmlPoeInj;
    this.tmpChannel.switchId = this.htmlSwitch;
    this.tmpChannel.lostChannel = this.htmlLostChannel;
    console.log(this.tmpChannel);
    this.dialogRef.close(new ActionsResult(Actions.EDIT, this.tmpChannel));
  }

  checkChanges(): boolean {
    if (this.htmlPortNumber == this.tmpPortNumber &&
      this.htmlPoeInj == this.tmpPoeInj &&
      this.htmlSwitchIp == this.tmpSwitchIp &&
      this.htmlLostChannel == this.tmpLostChannel) {
      this.wasChange = false;
    }
      // if (this.tmpChannel.switchId && this.tmpChannel.switchId.ip == this.tmpSwitchIpInit) {
      //   this.wasChange = false;
      // }
      // if (!this.tmpChannel.switchId && !this.tmpSwitchIpInit) {
      //   this.wasChange = false;
    // }
    else {
      this.wasChange = true;
    }


    console.log(this.wasChange);
    return this.wasChange;
  }

  cancel() {
    this.dialogRef.close(new ActionsResult(Actions.CANCEL));
  }


  onSelectSwitch(ip: string | null | undefined) {
    console.log(ip);
    console.log(this.htmlSwitchIp);
    console.log(this.tmpSwitchIp);
    this.htmlSwitchIp = ip;

    if (this.tmpSwitchIp !== this.htmlSwitchIp) {
      this.wasChange = true;
    } else {
      this.wasChange = this.checkChanges();
      console.log(this.wasChange);
    }

    const findSwitchByIp = this.tmpSwitches.find(s => s.ip == this.htmlSwitchIp);
    if (findSwitchByIp) {
      this.htmlSwitch = findSwitchByIp;
    } else {
      this.htmlSwitch = null;
    }
    console.log(this.htmlSwitch);
    console.log(this.tmpSwitch);
    console.log(this.tmpChannel);
  }

  changeSwitchPortNumbers(switchIp: string | null | undefined) {
    const selectedSwitch = this.tmpSwitches.find(s => s.ip == switchIp);
    if (selectedSwitch && (selectedSwitch !== this.tmpSwitch)) {
      this.tmpSwitchPortNumbers = selectedSwitch.numbersOfPorts ? selectedSwitch.numbersOfPorts : null;
      this.numberFormControl = new FormControl('',
        [Validators.min(1), Validators.max(this.tmpSwitchPortNumbers ? this.tmpSwitchPortNumbers : 48)]);
      console.log(this.tmpSwitchPortNumbers);
    }
  }

}
