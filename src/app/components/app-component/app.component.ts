import { Component } from "@angular/core";
import { PasserService } from "src/app/services/passer.service";
import { Data } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "template";
  loading = [];
  constructor(private passerService: PasserService) {
    this.passerService.fireError.subscribe((error: Data) => {
      if (error && error.error && error.error.message) {
        // this.snotifyService.error(
        //   error.error.message,
        //   error.statusText,
        //   this.passerService.getConfig()
        // );
      } else {
        // this.snotifyService.error(
        //   error.message,
        //   error.statusText,
        //   this.passerService.getConfig()
        // );
      }
    });
    this.passerService.fireLoading.subscribe((loading: boolean) => {
      if (loading) {
        this.loading.push(true);
      } else {
        if (this.loading.length === 0) {
          console.warn(
            "There is no difination for this loading",
            this.loading.length
          );
        }
        this.loading.pop();
      }
    });
  }
}
