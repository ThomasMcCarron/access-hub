import { Provider } from "@nestjs/common";
import { OryClient } from "../interfaces";
import { OryClientOptions } from "../interfaces";
import { oryClientToken } from "../constants";
import { getOryClient } from "../util";

export function createOryClientProvider(options: OryClientOptions): Provider<OryClient> {
  return {
    provide: oryClientToken,
    useValue: getOryClient(options)
  };
}
