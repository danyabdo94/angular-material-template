import { Component, OnInit } from "@angular/core";
import { ParentService } from "src/app/services/parent.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  constructor(private parentService: ParentService) {
    this.parentService.fakeCall(1).subscribe(data => {});
  }

  ngOnInit() {}
}
