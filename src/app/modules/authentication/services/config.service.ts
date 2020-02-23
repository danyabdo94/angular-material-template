import { InjectionToken } from "@angular/core";

export const LIB_CONFIG = new
InjectionToken<Config>("LIB_CONFIG");
export interface Config {
  loginApiUrl: string;
  redirectUrl: string;
}
