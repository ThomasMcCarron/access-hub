import { getOryClient } from "./get-ory-client.util";
import { defaultOryClientTestOptions, OryClient } from "../interfaces";

describe('getOryClient', () => {
  it('should return the ory client', () => {
    const oryClient = getOryClient(defaultOryClientTestOptions);
    expect(oryClient).toBeInstanceOf(OryClient);
  });

  it('should return the ory client with custom options', () => {
    const oryClient = getOryClient(defaultOryClientTestOptions);

    expect(oryClient).toBeInstanceOf(OryClient);
  });
});
