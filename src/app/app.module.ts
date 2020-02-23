import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app-component/app.component";
import { PasserService } from "./services/passer.service";
import { ParentService } from "./services/parent.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./modules/material/material.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { UsersComponent } from "./components/users/users.component";
import { AuthIntercept } from "./modules/authentication/middlewares/auth-intercept";
import { idDirective } from "./directives/id-directive";
import { OnlyNumber } from "./directives/phone-directive";
import { textDirective } from "./directives/textDirective";
import { TicketingModule } from 'projects/ticketing/src/lib/ticketing.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    idDirective,
    OnlyNumber,
    textDirective
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,

    AuthenticationModule.forRoot({
      loginApiUrl: "login",
      redirectUrl: "/users"
    }),
    TicketingModule.forRoot({
      systemKey: "users"
    })
  ],
  providers: [
    ParentService,
    PasserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
