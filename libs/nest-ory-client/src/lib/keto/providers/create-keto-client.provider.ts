import { Provider } from "@nestjs/common";
import { KetoClient } from "../keto-client.abstract";
import { ketoClientToken } from "../../constants";
import { getKetoClient } from "../get-keto-client.util";
import { OryClientOptions } from "../../interfaces";

export function createKetoClientProvider(options: OryClientOptions): Provider<KetoClient> {
  return {
    provide: ketoClientToken,
    useValue: getKetoClient(options)
  };
}
