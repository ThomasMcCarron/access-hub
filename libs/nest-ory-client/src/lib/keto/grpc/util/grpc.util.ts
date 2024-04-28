import { CallCredentials, ChannelCredentials, credentials, Metadata } from "@grpc/grpc-js";
import * as tls from "tls";

export function credentialsForToken(token?: string): ChannelCredentials {
  const metaCallback = (_: any, callback: any) => {
    const meta = new Metadata();
    if (token) {
      meta.add("authorization", "Bearer " + token);
    }
    callback(null, meta);
  };
  const callCredentials: CallCredentials = credentials.createFromMetadataGenerator(metaCallback);
  const channelCredentials = credentials.createFromSecureContext(tls.createSecureContext());
  return credentials.combineChannelCredentials(channelCredentials, callCredentials);
}
