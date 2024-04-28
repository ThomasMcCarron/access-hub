import { KetoClient } from "./keto-client.abstract";
import { getKetoReadClient, KetoGrpcClient } from "./grpc";
import { OryClientOptions } from "../interfaces";
import { getKetoWriteClient } from "./grpc";
import { getKetoCheckClient } from "./grpc";
import { KetoHttpClient } from "./http";

export function getKetoClient(options: OryClientOptions): KetoClient {
  console.debug(`Creating Keto Client with options: ${JSON.stringify(options)}`);

  switch (options.ketoClient) {
    case "grpc":
      return new KetoGrpcClient(
        getKetoWriteClient(options),
        getKetoCheckClient(options),
        getKetoReadClient(options),
        options.ketoRetryCount
      );
    case "http":
      return new KetoHttpClient(
        options.ketoRetryCount
      );
  }
}
