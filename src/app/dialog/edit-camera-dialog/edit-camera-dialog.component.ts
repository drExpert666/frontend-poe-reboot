import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Channel} from "../../../models/Channel";
import {Actions, ActionsResult} from "../../utils/ActionsResult";
import {Switch} from "../../../models/Switch";

@Component({
  selector: 'app-edit-camera-dialog',
  templateUrl: './edit-camera-dialog.component.html',
  styleUrls: ['./edit-camera-dialog.component.css']
})
export class EditCameraDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditCameraDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Channel, Switch[]]) {


  }

  tmpSwitches: Switch[];
  tmpChannel: Channel;
  tmpSwitch: Switch | null;
  tmpPortNumber: number | null;
  tmpPoeInj: boolean | null;
  tmpSwitchIp: string | null;
  tmpLostChannel: boolean = false;

  wasChange = false;


  ngOnInit(): void {
    this.tmpChannel = this.data[0];
    this.tmpSwitches = this.data[1];
    console.log(this.tmpSwitches);
    this.tmpSwitch = this.tmpChannel.switchId ? this.tmpChannel.switchId : null;
    this.tmpPortNumber = this.tmpChannel.port ? this.tmpChannel.port : null;
    this.tmpPoeInj = this.tmpChannel.poeInjector ? this.tmpChannel.poeInjector : false;
    this.tmpSwitchIp = (this.tmpSwitch && this.tmpSwitch.ip) ? this.tmpSwitch.ip : null;
    this.tmpLostChannel = this.tmpChannel.lostChannel;

  }

  confirm() {
    this.tmpChannel.port = this.tmpPortNumber;
    this.tmpChannel.poeInjector = this.tmpPoeInj;
    this.tmpChannel.switchId = this.tmpSwitch;
    this.tmpChannel.lostChannel = this.tmpLostChannel;
    console.log(this.tmpChannel);
    this.dialogRef.close(new ActionsResult(Actions.EDIT, this.tmpChannel));
  }

  checkChanges(): boolean {
    console.log('asdasdadassdad')
    if (this.tmpChannel.port == this.tmpPortNumber &&
      this.tmpChannel.poeInjector == this.tmpPoeInj &&
      this.tmpChannel.switchId == this.tmpSwitch &&
      this.tmpChannel.lostChannel == this.tmpLostChannel) {
      this.wasChange = false;
    } else {
      this.wasChange = true;
    }
    console.log(this.wasChange);
    return this.wasChange;
  }

  cancel() {
    this.dialogRef.close(new ActionsResult(Actions.CANCEL));
  }


  onSelectSwitch(s: Switch) {
    this.tmpSwitch = s;
    console.log(this.tmpSwitch);

  }
}
