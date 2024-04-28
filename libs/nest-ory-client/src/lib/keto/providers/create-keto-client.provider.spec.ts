import { createKetoClientProvider } from "./create-keto-client.provider";
import { KetoGrpcClient } from "../grpc";
import { ketoClientToken } from "../../constants";
import { KetoHttpClient } from "../http";

describe('ketoClientProvider', () => {
  describe('when called', () => {
    it('should use the correct token', () => {
      const provider = createKetoClientProvider({
        clientUri: "string",
        ketoCheckUri: "string",
        ketoWriteUri: "string",
        ketoClient: "grpc",
        accessToken: "fakeAccessToken"
      });
      expect(provider).toHaveProperty('provide', ketoClientToken);
    });

    it('should provide a keto grpc client', () => {
      const provider = createKetoClientProvider({
        clientUri: "string",
        ketoCheckUri: "string",
        ketoWriteUri: "string",
        ketoClient: "grpc",
        accessToken: "fakeAccessToken"
      });
      expect(provider).toHaveProperty('useValue');
      expect((provider as any).useValue).toBeInstanceOf(KetoGrpcClient);
    });

    it('should provide a keto http client', () => {
      const provider = createKetoClientProvider({
        clientUri: "string",
        ketoCheckUri: "string",
        ketoWriteUri: "string",
        ketoClient: "http",
        accessToken: "fakeAccessToken"
      });
      expect(provider).toHaveProperty('useValue');
      expect((provider as any).useValue).toBeInstanceOf(KetoHttpClient);
    });
  });
});
