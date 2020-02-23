import { NgModule, InjectionToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { LoginService } from "src/app/modules/authentication/services/login.service";
import { AuthService } from "./services/auth-service";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Config, LIB_CONFIG } from "./services/config.service";
import { AuthIntercept } from "./middlewares/auth-intercept";

const ROUTES = [{ path: "", component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: []
})
export class AuthenticationModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        LoginService,
        AuthService,
        {
          provide: LIB_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
