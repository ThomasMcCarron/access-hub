import { OryClientOptions } from "../../../../interfaces";
import { credentialsForToken } from "../grpc.util";
import { credentials } from "@grpc/grpc-js";
import { ReadServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/read_service_grpc_pb";

export function getKetoReadClient(options: OryClientOptions): ReadServiceClient {
  if (options.accessToken?.length) {
    return new ReadServiceClient(`${options.ketoCheckUri}`, credentialsForToken(options.accessToken));
  }

  console.debug("Creating insecure Ory Keto Check Client");
  return new ReadServiceClient(`${options.ketoCheckUri}`,
    credentials.createInsecure()
  );
}
