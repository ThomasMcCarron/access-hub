import { Inject } from "@nestjs/common";
import { ketoClientToken } from "../../constants";

export function InjectKetoClient() {
  return Inject(ketoClientToken);
}
