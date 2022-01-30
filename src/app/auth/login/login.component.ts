import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    console.log("121213231132132");

    if (this.tokenStorage.getUser()) // если пользоавтель аторизирован (есть токен)
    {
      this.router.navigate(['/']); // перенаправляем на главную страницу (было подставлено 'main', изменил на /)
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])], // при заполнении юзернейма это поле является обязательным (Validators.required)
      password: ['', Validators.compose([Validators.required])]
    })
  }


  /* метод проверки логин/пароля при нажатии на кнопку */
  submit(): void {
    this.authService.login({ // передаём юзера для авторизации
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }).subscribe(data => { // получаем токен
      console.log(data);

      this.tokenStorage.saveToken(data.token); // сохраняем токен
      this.tokenStorage.saveUser(data); // сохраняем юзера

      this.notificationService.showSnack('Successfully logged in');
      this.router.navigate(['']);
      window.location.reload();
    }, error => { // если была ошибка
      console.log(error);
      this.notificationService.showSnack(error.message);
      }
    )
  }

}
