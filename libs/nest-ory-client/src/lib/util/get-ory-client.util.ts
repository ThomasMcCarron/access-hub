import { OryClient, OryClientOptions } from "../interfaces";
import { Configuration, FrontendApi, IdentityApi, OAuth2Api } from "@ory/client";

export function getOryClient(options: OryClientOptions): OryClient {
  console.debug(`Creating Ory Client with options: ${JSON.stringify(options)}`);
  const config: Configuration = new Configuration({
    basePath: `${options.clientUri}`,
    accessToken: options.accessToken?.length ? options.accessToken : undefined
  });

  return new OryClient(
    new IdentityApi(config),
    new FrontendApi(config),
    new OAuth2Api(config)
  );
}
