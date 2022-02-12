import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false; // залогирован ли юзер
  isDataLoaded = false; // загрузились ли данные
  // (html страница отображается до того как мы получаем данные с сервера, поэтому нужна проверка данных)
  user: User;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken() // !! первый ! проверяет существует ли объект, второй ! переворачивает флаг

    if (this.isLoggedIn) {
      this.user = new User;
      this.userService.getCurrentUser().subscribe(data => {
        this.user.username = data.username;
        this.user.password = data.password;
        this.user.authorities = data.authorities;
        this.isDataLoaded = true;
        console.log(this.user);
      });
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login'])
  }

}
