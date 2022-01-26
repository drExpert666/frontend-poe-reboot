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


  ngOnInit(): void {
    this.tmpChannel = this.data[0];
    this.tmpSwitches = this.data[1];
    console.log(this.tmpSwitches);
    this.tmpSwitch = this.tmpChannel.switchId? this.tmpChannel.switchId : null;
    this.tmpPortNumber = this.tmpChannel.port ? this.tmpChannel.port : null;
    this.tmpPoeInj = this.tmpChannel.poeInjector ? this.tmpChannel.poeInjector : false;
    this.tmpSwitchIp = (this.tmpSwitch && this.tmpSwitch.ip) ? this.tmpSwitch.ip : null;

  }

  confirm() {
    console.log(this.tmpSwitch);
    this.tmpChannel.port = this.tmpPortNumber;
    this.tmpChannel.poeInjector = this.tmpPoeInj;
    this.tmpChannel.switchId = this.tmpSwitch;
    console.log(this.tmpChannel);
    this.dialogRef.close(new ActionsResult(Actions.EDIT, this.tmpChannel));
  }

  cancel() {
    this.dialogRef.close(new ActionsResult(Actions.CANCEL));
  }


  onSelectSwitch(s: Switch) {
    this.tmpSwitch = s;
    console.log(this.tmpSwitch);

  }
}
