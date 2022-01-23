import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Switch} from "../../../models/Switch";
import {Actions, ActionsResult} from "../../utils/ActionsResult";

@Component({
  selector: 'app-edit-channel-dialog',
  templateUrl: './edit-channel-dialog.component.html',
  styleUrls: ['./edit-channel-dialog.component.css']
})
export class EditChannelDialogComponent implements OnInit {

  EDIT_TITLE = 'Редактирование коммутатора';
  ADD_TITLE = 'Добавление коммутатора';


  constructor(private dialogRef: MatDialogRef<EditChannelDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Switch, Switch[]]) {
  }

  switches: Switch[];
  newSwitch: Switch;

  tmpTitle: string;
  newName: string;
  newIP: string;
  newDescription: string;


  ngOnInit(): void {
    this.newSwitch = this.data[0];
    this.switches = this.data[1];
    if (!this.data[0].id) {
      this.tmpTitle = this.ADD_TITLE;
    }

  }

  confirm() {
    this.newSwitch.name = this.newName;
    this.newSwitch.ip = this.newIP;
    this.newSwitch.description = this.newDescription;
    this.dialogRef.close(new ActionsResult(Actions.ADD, this.newSwitch));
  }

  cancel() {
    this.dialogRef.close(new ActionsResult(Actions.CANCEL));
  }
}
