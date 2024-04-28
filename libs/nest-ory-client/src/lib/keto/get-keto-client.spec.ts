import { getKetoClient } from "./get-keto-client.util";
import { KetoHttpClient } from "./http";
import { OryClientOptions } from "../interfaces";
import { KetoClient } from "./keto-client.abstract";
import { KetoGrpcClient } from "./grpc";

describe('getKetoClient', () => {
  it('should return a KetoGrpcClient instance when options.ketoClient is "grpc"', () => {
    const options: OryClientOptions = {
      clientUri: 'http://localhost',
      ketoCheckUri: 'http://localhost',
      ketoWriteUri: 'http://localhost',
      ketoClient: 'grpc',
      accessToken: 'accessToken'
    };
    const client: KetoClient = getKetoClient(options);
    expect(client).toBeInstanceOf(KetoGrpcClient);
  });

  it('should return a KetoHttpClient instance when options.ketoClient is "http"', () => {
    const options: OryClientOptions = {
      clientUri: 'http://localhost',
      ketoCheckUri: 'http://localhost',
      ketoWriteUri: 'http://localhost',
      ketoClient: 'http',
      accessToken: 'accessToken'
    };
    const client: KetoClient = getKetoClient(options);
    expect(client).toBeInstanceOf(KetoHttpClient);
  });
});
