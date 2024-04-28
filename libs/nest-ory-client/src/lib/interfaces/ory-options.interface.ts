import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export const defaultOryClientTestOptions: OryClientOptions = {
  clientUri: "http://localhost:3000",
  ketoCheckUri: "http://localhost:3000",
  ketoWriteUri: "http://localhost:3000",
  ketoClient: "grpc",
  ketoRetryCount: 2,
  accessToken: "fakeAccessToken"
}

export interface OryClientOptions {
  clientUri: string;
  ketoCheckUri: string;
  ketoWriteUri: string;
  ketoClient: 'grpc' | 'http';
  ketoRetryCount?: number;
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
