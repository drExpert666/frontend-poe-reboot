import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Channel} from "../../../models/Channel";
import {RebootValues} from "../../data/search/search";

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

  ngOnInit(): void {

    this.tmpRebootValues = this.data;
    this.tmpTitle = this.tmpRebootValues.switchIp;
  }

}
