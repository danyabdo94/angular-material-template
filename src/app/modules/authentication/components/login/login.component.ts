import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { LoginService } from "src/app/modules/authentication/services/login.service";
import { AuthService } from "../../services/auth-service";
import { User } from 'src/app/models/user';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {
  userData = {
    email: null,
    password: null
  };
  loading: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService // private snotifyService: SnotifyService,
  ) {
    localStorage.clear();
  }
  ngOnInit() {}

  login() {
    this.loading = true;
    this.loginService
      .logIn(this.userData)
      .pipe()
      .subscribe(
        (data: User) => {
          // this.snotifyService.success("Welcome", data.name, {
          //   timeout: 5000
          // });
          // this.authService.setToken(data.token);
          // data.
          this.router.navigate([this.loginService.redirectUrl]);
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.authService.setToken("sss");
          this.router.navigate([this.loginService.redirectUrl]);
        }
      );
  }
  ngOnDestroy() {}
}
