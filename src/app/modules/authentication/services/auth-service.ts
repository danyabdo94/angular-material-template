import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  public getToken(): string {
    return localStorage.getItem("auth");
  }
  public setToken(token: string): void {
    localStorage.setItem("auth", "Bearer " + token);
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  public setData(key, token: string): void {
    localStorage.setItem(key, token);
  }
}
