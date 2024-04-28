import { OryClientOptions } from '../../../../interfaces';
import { CheckServiceClient } from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb';
import { getKetoCheckClient } from "./get-keto-check-client.util";

describe('getKetoCheckClient', () => {
  it('should return an instance of CheckServiceClient', () => {
    const options: OryClientOptions = {
      clientUri: 'https://example.com',
      ketoCheckUri: 'https://keto-check.example.com',
      ketoWriteUri: 'https://keto-write.example.com',
      ketoClient: 'grpc',
      accessToken: '1234',
    };

    const client: CheckServiceClient = getKetoCheckClient(options);

    expect(client).toBeInstanceOf(CheckServiceClient);
  });

  it('should return an insecure CheckServiceClient if no access token is provided', () => {
    const options: OryClientOptions = {
      clientUri: 'https://example.com',
      ketoCheckUri: 'https://keto-check.example.com',
      ketoWriteUri: 'https://keto-write.example.com',
      ketoClient: 'grpc',
    };

    const client: CheckServiceClient = getKetoCheckClient(options);

    expect(client).toBeInstanceOf(CheckServiceClient);
  });
});
