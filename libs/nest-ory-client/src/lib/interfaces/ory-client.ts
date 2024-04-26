import { FrontendApi, IdentityApi, OAuth2Api } from "@ory/client";

export class OryClient {
  constructor(
    public readonly identity: IdentityApi,
    public readonly frontend: FrontendApi,
    public readonly oauth2: OAuth2Api
  ) {}
}
