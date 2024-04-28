import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { defaultOryClientTestOptions, OryClient, OryClientOptions, OryClientOptionsFactory } from "./interfaces";
import { OryClientModule } from "./ory-client.module";
import { ketoClientToken, oryClientToken } from "./constants";
import { KetoClient } from "./keto";

describe('OryClientModule', () => {
  class TestService implements OryClientOptionsFactory {
    createOryClientOptions(): OryClientOptions {
      return {
        clientUri: "http://localhost:3000",
        ketoCheckUri: "http://localhost:3000",
        ketoWriteUri: "http://localhost:3000",
        ketoClient: "grpc",
        ketoRetryCount: 2,
        accessToken: "fakeAccessToken"
      };
    }
  }

  @Module({
    exports: [TestService],
    providers: [TestService],
  })
  class TestModule {
  }

  describe('forRoot', () => {
    it('should provide the ory client and keto client', async () => {
      const module = await Test.createTestingModule({
        imports: [OryClientModule.forRoot(defaultOryClientTestOptions)],
      }).compile();

      const oryClient = module.get<OryClient>(oryClientToken);
      expect(oryClient).toBeDefined();
      expect(oryClient).toBeInstanceOf(OryClient);

      const ketoClient = module.get<KetoClient>(ketoClientToken);
      expect(ketoClient).toBeDefined();
      expect(ketoClient).toBeInstanceOf(KetoClient);
    });
  });

  describe('forRootAsync', () => {
    describe('when the `useFactory` option is used', () => {
      it('should provide the ory client and keto client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            OryClientModule.forRootAsync({
              useFactory: () => (defaultOryClientTestOptions),
            }),
          ],
        }).compile();

        const oryClient = module.get<OryClient>(oryClientToken);
        expect(oryClient).toBeDefined();
        expect(oryClient).toBeInstanceOf(OryClient);

        const ketoClient = module.get<KetoClient>(ketoClientToken);
        expect(ketoClient).toBeDefined();
        expect(ketoClient).toBeInstanceOf(KetoClient);
      });
    });

    describe('when the `useExisting` option is used', () => {
      it('should provide the ory client and keto client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            OryClientModule.forRootAsync({
              imports: [TestModule],
              useExisting: TestService,
            }),
          ],
        }).compile();

        const oryClient = module.get<OryClient>(oryClientToken);
        expect(oryClient).toBeDefined();
        expect(oryClient).toBeInstanceOf(OryClient);

        const ketoClient = module.get<KetoClient>(ketoClientToken);
        expect(ketoClient).toBeDefined();
        expect(ketoClient).toBeInstanceOf(KetoClient);
      });
    });

    describe('when the `useClass` option is used', () => {
      it('should provide the ory client and keto client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            OryClientModule.forRootAsync({
              useClass: TestService,
            }),
          ],
        }).compile();

        const oryClient = module.get<OryClient>(oryClientToken);
        expect(oryClient).toBeDefined();
        expect(oryClient).toBeInstanceOf(OryClient);

        const ketoClient = module.get<KetoClient>(ketoClientToken);
        expect(ketoClient).toBeDefined();
        expect(ketoClient).toBeInstanceOf(KetoClient);
      });
    });
  });
});
