import { credentialsForToken } from "./grpc.util";
import { ChannelCredentials, credentials, Metadata } from "@grpc/grpc-js";

describe('credentialsForToken', () => {
  test('should return credentials with token if provided', () => {
    const token = 'my-token';
    const channelCredentials = credentialsForToken(token);

    expect(channelCredentials).toBeInstanceOf(ChannelCredentials);
    expect(channelCredentials._isSecure()).toBe(true);
  });

  test('should return insecure credentials if no token provided', () => {
    const credentials = credentialsForToken();

    expect(credentials).toBeInstanceOf(ChannelCredentials);
    expect(credentials._isSecure()).toBe(true);
  });
});
