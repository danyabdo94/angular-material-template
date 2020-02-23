import { async, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PasserService } from "./passer.service";

describe("Service: Passer", () => {
  let service: PasserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [PasserService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(PasserService);
  }));

  it("should create", () => {
    expect(service).toBeTruthy();
  });
});
