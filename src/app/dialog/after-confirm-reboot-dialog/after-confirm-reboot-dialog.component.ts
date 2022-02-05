import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RebootValues} from "../../data/search/search";
import {Actions, ActionsResult} from "../../utils/ActionsResult";

@Component({
  selector: 'app-after-confirm-reboot-dialog',
  templateUrl: './after-confirm-reboot-dialog.component.html',
  styleUrls: ['./after-confirm-reboot-dialog.component.css']
})
export class AfterConfirmRebootDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AfterConfirmRebootDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RebootValues) {
  }

  tmpRebootValues: RebootValues;
  tmpTitle: string;
  wasError: boolean = false;


  ngOnInit(): void {
    this.tmpRebootValues = this.data;
    console.log(this.tmpRebootValues);
    if (this.tmpRebootValues.switchIp == 'OK') {
      this.tmpTitle = this.tmpRebootValues.switchIp;
      console.log(this.tmpRebootValues);
      this.wasError = false;
    }

    if (this.tmpRebootValues.switchIp == 'PORT_NOT_FOUND') {
      console.log(this.tmpRebootValues);
      this.wasError = true;
    }


    if (this.tmpRebootValues.switchIp == 'ERROR') {
      console.log(this.tmpRebootValues);
      this.wasError = true;
    }

    else {
      console.log(this.tmpRebootValues);
      this.wasError = true;
    }

  }

  ok() {
    if (this.wasError) {
      this.dialogRef.close(new ActionsResult(Actions.ERROR));
    } else {
      this.dialogRef.close(new ActionsResult(Actions.OK));
    }

  }
}
