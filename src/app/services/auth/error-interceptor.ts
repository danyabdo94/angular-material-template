import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap, finalize } from "rxjs/operators";
import { PasserService } from "../passer.service";
import { ParentService } from "../parent.service";
import { AuthService } from "../../modules/authentication/services/auth-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    public router: Router,
    private passerService: PasserService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log(event);
            // if (
            //   event.headers.get("server-name") !== "shady-pharmacies-server"
            // ) {
            //   let error = {
            //     message: "Response from unauthorized server",
            //     statusText: "409"
            //   };
            //   this.passerService.puplishError(error);
            //   this.router.navigate(["login"]);
            // }
            // if (
            //   event.headers.get("current-web-version") !==
            //   this.parentService.versionNumber
            // ) {
            //   this.passerService.publishErrorInVersions(true);
            // } else {
            // this.passerService.publishErrorInVersions(false);
            // }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            this.passerService.puplishError(error);
            if (error.status === 400) {
            }
            if (error.status === 401) {
              this.router.navigate(["login"]);
            }
          }
        }
      ),
      finalize(() => {
        this.passerService.publishLoading(false);
      })
    );
  }
}
