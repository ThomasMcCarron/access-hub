import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { InjectOryClient } from "./inject-ory-client.decorator";
import { defaultOryClientTestOptions, OryClient } from "../interfaces";
import { OryClientModule } from "../ory-client.module";

describe("InjectOryClient", () => {
  let module: TestingModule;

  @Injectable()
  class TestService {
    public constructor(@InjectOryClient() public readonly oryClient: OryClient) {}
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OryClientModule.forRoot(defaultOryClientTestOptions)],
      providers: [TestService]
    }).compile();
  });

  describe("when decorating a class constructor parameter", () => {
    it("should inject the ory client", () => {
      const testService = module.get(TestService);
      expect(testService).toHaveProperty("oryClient");
      expect(testService.oryClient).toBeInstanceOf(OryClient);
    });
  });
});
