import { Configuration, FrontendApi } from '@ory/client';
import { environment } from '../../../environments/environment';

export type OryClient = {
  frontend: FrontendApi;
};

export const ory: OryClient = {
  frontend: new FrontendApi(
    new Configuration({
      basePath: environment.oryBaseUrl,
      baseOptions: {
        withCredentials: environment.oryWithCredentials,
      },
    })
  ),
};
