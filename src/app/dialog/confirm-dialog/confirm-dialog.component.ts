import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Channel} from "../../../models/Channel";
import {Actions, ActionsResult} from "../../utils/ActionsResult";
import {NgxSpinnerService} from "ngx-spinner";
import {AfterConfirmRebootDialogComponent} from "../after-confirm-reboot-dialog/after-confirm-reboot-dialog.component";
import {RebootService} from "../../data/implementation/RebootService";
import {RebootValues} from "../../data/search/search";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Channel,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private rebootService: RebootService) {
  }

  tmpChannel: Channel;
  dialogTitle: string;
  tmpMessage: string;
  responseRebootValues: RebootValues;

  //todo убрать харкод строки в отдельные переменные
  ngOnInit(): void {
    if (this.data as Channel) {
      this.dialogTitle = 'Перезагрузка камеры';
    }
    this.tmpChannel = this.data;
    this.tmpMessage = 'Вы точно хотите перезагрузить камеру ' + this.tmpChannel.name + '?'
    this.responseRebootValues = new RebootValues('','');


  }

  onConfirm() {
    this.rebootService.reboot(new RebootValues('192.168.254.84', '3')).subscribe(res => {
      this.responseRebootValues = res;
    })
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 6000);

    setTimeout(() =>
      {
        this.dialog.open(AfterConfirmRebootDialogComponent, {data: this.responseRebootValues});
      },
      6000);


    // this.dialogRef.close(new ActionsResult(Actions.CONFIRM));
  }

  onCancel() {
    this.dialogRef.close(new ActionsResult(Actions.CANCEL));
  }
}
