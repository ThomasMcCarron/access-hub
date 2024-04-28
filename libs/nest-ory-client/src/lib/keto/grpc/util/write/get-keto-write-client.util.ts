import { OryClientOptions } from "../../../../interfaces";
import { credentialsForToken } from "../grpc.util";
import { credentials } from "@grpc/grpc-js";
import { WriteServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_grpc_pb";

export function getKetoWriteClient(options: OryClientOptions): WriteServiceClient {
  if (options.accessToken?.length) {
    return new WriteServiceClient(`${options.ketoWriteUri}`, credentialsForToken(options.accessToken));
  }

  console.warn(`Creating insecure Keto Write Client`);
  return new WriteServiceClient(`${options.ketoWriteUri}`,
    credentials.createInsecure()
  );
}
