import { createOryClientProvider } from "./create-ory-client.provider";
import { oryClientToken } from "../constants";
import { defaultOryClientTestOptions, OryClient } from "../interfaces";

describe('oryClientProvider', () => {
  describe('when called', () => {
    it('should use the correct token', () => {
      const provider = createOryClientProvider(defaultOryClientTestOptions);
      expect(provider).toHaveProperty('provide', oryClientToken);
    });

    it('should provide an ory client', () => {
      const provider = createOryClientProvider(defaultOryClientTestOptions);
      expect(provider).toHaveProperty('useValue');
      expect((provider as any).useValue).toBeInstanceOf(OryClient);
    });
  });
});
