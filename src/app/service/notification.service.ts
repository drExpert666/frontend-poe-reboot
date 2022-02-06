import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";


/** модуль для отображения всплывающих сообщений */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {

  }

  public showSnack(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 2000 // время отображения снэкбара
    });
  }

}
