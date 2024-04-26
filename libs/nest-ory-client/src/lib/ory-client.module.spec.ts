import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { defaultOryClientTestOptions, OryClient, OryClientOptions, OryClientOptionsFactory } from "./interfaces";
import { OryClientModule } from "./ory-client.module";
import { oryClientToken } from "./constants";

describe('OryClientModule', () => {
  class TestService implements OryClientOptionsFactory {
    createOryClientOptions(): OryClientOptions {
      return {
        clientUri: "http://localhost:3000",
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
    it('should provide the ory client', async () => {
      const module = await Test.createTestingModule({
        imports: [OryClientModule.forRoot(defaultOryClientTestOptions)],
      }).compile();

      const oryClient = module.get<OryClient>(oryClientToken);
      expect(oryClient).toBeDefined();
      expect(oryClient).toBeInstanceOf(OryClient);
    });
  });

  describe('forRootAsync', () => {
    describe('when the `useFactory` option is used', () => {
      it('should provide the ory client', async () => {
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
      });
    });

    describe('when the `useExisting` option is used', () => {
      it('should provide the ory client', async () => {
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
      });
    });

    describe('when the `useClass` option is used', () => {
      it('should provide the ory client', async () => {
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
      });
    });
  });
});
