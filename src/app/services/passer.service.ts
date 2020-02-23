import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class PasserService {
  public fireError = new Subject();
  public fireErrorInVersions = new Subject();
  public fireLoading = new Subject();

  public puplishError(error) {
    this.fireError.next(error);
  }

  public publishErrorInVersions(bool) {
    this.fireErrorInVersions.next(bool);
  }
  public publishLoading(isLoading) {
    this.fireLoading.next(isLoading);
  }

  isAuthenticatedToPassPage(url) {
    return true;
    // this.permissionsTable = JSON.parse(localStorage.getItem("permissions"));
    // url = url.toUpperCase();
    // url += "_PAGE";
    // var added = false;
    // if (this.permissionsTable) {
    //   for (let x = 0; x < this.permissionsTable.length; x++) {
    //     const element = this.permissionsTable[x];

    //     if (element.key == url && element.enabled) {
    //       added = true;
    //     }
    //   }
    // }
    // return added;
  }

  // isAuthenticatedToPassButton(url) {
  //   url = url.toUpperCase();
  //   var added = false;
  //   if (this.permissionsTable) {
  //     for (let x = 0; x < this.permissionsTable.length; x++) {
  //       const element = this.permissionsTable[x];
  //       if (element.key == url && element.enabled) {
  //         console.log(element.key);
  //         added = true;
  //       }
  //     }
  //   }
  //   return added;
  // }
}
