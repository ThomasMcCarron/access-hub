import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { InjectKetoClient } from "./inject-keto-client.decorator";
import { KetoClient } from "../keto-client.abstract";
import { OryClientModule } from "../../ory-client.module";
import { KetoGrpcClient } from "../grpc";
import { defaultOryClientTestOptions } from "../../interfaces";

describe("InjectKetoClient", () => {
  let module: TestingModule;

  @Injectable()
  class TestService {
    public constructor(@InjectKetoClient() public readonly ketoClient: KetoClient) {}
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OryClientModule.forRoot(defaultOryClientTestOptions)],
      providers: [TestService]
    }).compile();
  });

  describe("when decorating a class constructor parameter", () => {
    it("should inject the keto grpc client", () => {
      const testService = module.get(TestService);
      expect(testService).toHaveProperty("ketoClient");
      expect(testService.ketoClient).toBeInstanceOf(KetoGrpcClient);
    });
  });
});
