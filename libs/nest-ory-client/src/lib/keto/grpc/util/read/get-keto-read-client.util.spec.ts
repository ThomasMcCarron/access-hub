import { OryClientOptions } from "../../../../interfaces";
import { getKetoReadClient } from "./get-keto-read-client.util";
import { ReadServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/read_service_grpc_pb";

describe('getKetoReadClient', () => {
  it('should return an instance of ReadServiceClient', () => {
    const options: OryClientOptions = {
      clientUri: 'https://example.com',
      ketoCheckUri: 'https://keto-check.example.com',
      ketoWriteUri: 'https://keto-write.example.com',
      ketoClient: 'grpc',
      accessToken: '1234',
    };

    const client: ReadServiceClient = getKetoReadClient(options);

    expect(client).toBeInstanceOf(ReadServiceClient);
  });

  it('should return an insecure ReadServiceClient if no access token is provided', () => {
    const options: OryClientOptions = {
      clientUri: 'https://example.com',
      ketoCheckUri: 'https://keto-check.example.com',
      ketoWriteUri: 'https://keto-write.example.com',
      ketoClient: 'grpc',
    };

    const client: ReadServiceClient = getKetoReadClient(options);

    expect(client).toBeInstanceOf(ReadServiceClient);
  });
});
