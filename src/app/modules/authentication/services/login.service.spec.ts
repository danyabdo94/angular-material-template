import { async, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { LoginService } from "./login.service";
import { ParentService } from "../../../services/parent.service";

describe("Service: Login", () => {
  let service: LoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ParentService, LoginService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(LoginService);
  }));

  it("should create", () => {
    expect(service).toBeTruthy();
  });
});
