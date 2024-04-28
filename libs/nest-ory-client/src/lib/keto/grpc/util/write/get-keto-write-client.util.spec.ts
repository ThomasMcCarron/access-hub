import { OryClientOptions } from "../../../../interfaces";
import { WriteServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_grpc_pb";
import { getKetoWriteClient } from "./get-keto-write-client.util";

describe('getKetoWriteClient', () => {
  let options: OryClientOptions;

  beforeEach(() => {
    options = {
      clientUri: 'http://localhost:4466',
      ketoCheckUri: 'http://localhost:4466/check',
      ketoWriteUri: 'http://localhost:4466/write',
      ketoClient: 'http',
      ketoRetryCount: 5,
      accessToken: 'testToken'
    };
  });

  test('should return a WriteServiceClient with secure credentials when accessToken is provided', () => {
    const client = getKetoWriteClient(options);
    expect(client).toBeInstanceOf(WriteServiceClient);
  });

  test('should return a WriteServiceClient with insecure credentials when accessToken is not provided', () => {
    options.accessToken = undefined;
    console.warn = jest.fn();

    const client = getKetoWriteClient(options);
    expect(client).toBeInstanceOf(WriteServiceClient);
    expect(console.warn).toHaveBeenCalledWith(`Creating insecure Keto Write Client`);
  });
});
