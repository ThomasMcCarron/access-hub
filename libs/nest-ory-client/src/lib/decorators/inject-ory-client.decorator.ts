import { Inject } from "@nestjs/common";
import { oryClientToken } from "../constants";

export function InjectOryClient() {
  return Inject(oryClientToken);
}
