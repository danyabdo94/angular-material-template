import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth-service";

@Injectable()
export class AuthIntercept implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.getToken()) {
      const tempAuth = this.auth.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: tempAuth
        }
      });
    }
    return next.handle(request);
  }
}
