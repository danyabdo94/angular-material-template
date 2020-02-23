import {
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  CanActivate
} from "@angular/router";
import { AuthService } from "../../modules/authentication/services/auth-service";
import { Injectable } from "@angular/core";
import { PasserService } from "../passer.service";

@Injectable()
export class AlwaysAuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private passerService: PasserService
  ) {}
  canActivateChild(activeRoute: ActivatedRouteSnapshot) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    } else {
      const testAuth = this.passerService.isAuthenticatedToPassPage(
        activeRoute.url[activeRoute.url.length - 1].path
      );
      if (!testAuth) {
        this.router.navigate(["login"]);
      }
      return testAuth;
    }
  }
  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
