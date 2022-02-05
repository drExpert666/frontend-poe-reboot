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
    if (this.tmpRebootValues.switchIp) {
      this.tmpTitle = this.tmpRebootValues.switchIp;
      console.log(this.tmpRebootValues);
      this.wasError = false;
    }
    else {
      this.tmpTitle = 'Произошла ошибка!'
      this.wasError = true;
    }

  }

  ok() {
    if (this.tmpTitle == 'Произошла ошибка!') {
      this.dialogRef.close(new ActionsResult(Actions.ERROR));
    } else {
      this.dialogRef.close(new ActionsResult(Actions.OK));
    }

  }
}
