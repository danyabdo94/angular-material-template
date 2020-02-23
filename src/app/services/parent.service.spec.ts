import { async, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ParentService } from "./parent.service";

describe("Service: Parent", () => {
  let service: ParentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ParentService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(ParentService);
  }));

  it("should create", () => {
    expect(service).toBeTruthy();
  });
});
