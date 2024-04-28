import { OryClientOptions } from "../../../../interfaces";
import { credentialsForToken } from "../grpc.util";
import { CheckServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb";
import { credentials } from "@grpc/grpc-js";

export function getKetoCheckClient(options: OryClientOptions): CheckServiceClient {
  if (options.accessToken?.length) {
    return new CheckServiceClient(`${options.ketoCheckUri}`, credentialsForToken(options.accessToken));
  }

  console.debug("Creating insecure Ory Keto Check Client");
  return new CheckServiceClient(`${options.ketoCheckUri}`,
    credentials.createInsecure()
  );
}
