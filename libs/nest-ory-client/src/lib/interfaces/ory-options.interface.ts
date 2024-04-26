import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export const defaultOryClientTestOptions: OryClientOptions = {
  clientUri: "http://localhost:3000",
  accessToken: "fakeAccessToken"
}

export interface OryClientOptions {
  clientUri: string;
  accessToken?: string;
}


export interface OryClientAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<OryClientOptionsFactory>;
  useExisting?: Type<OryClientOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<OryClientOptions> | OryClientOptions;
}

export interface OryClientOptionsFactory {
  createOryClientOptions(): Promise<OryClientOptions> | OryClientOptions;
}
