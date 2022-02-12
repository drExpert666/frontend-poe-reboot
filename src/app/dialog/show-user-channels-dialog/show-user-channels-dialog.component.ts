import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersValues} from "../../data/search/search";

@Component({
  selector: 'app-show-user-channels-dialog',
  templateUrl: './show-user-channels-dialog.component.html',
  styleUrls: ['./show-user-channels-dialog.component.css']
})
export class ShowUserChannelsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShowUserChannelsDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: UsersValues[]) {

    dialogRef.disableClose = false;

    dialogRef.backdropClick().subscribe(() => {
        this.close();
        console.log('Click');
      });
  }


  tmpUsersValues: UsersValues[];

  ngOnInit(): void {
    this.tmpUsersValues = this.data;
    console.log(this.tmpUsersValues);
  }

  close() {
    this.dialogRef.close();
  }


}
