import { PermissionRelationTuple } from "../../../permissions";
import { CheckResponse } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb";
import { parseGRPCCheckResponse } from "./parse-grpc-check-response.util";
import { ServiceError } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";

describe("parseGRPCCheckResponse", () => {
  let rt: PermissionRelationTuple;

  beforeEach(() => {
    rt = new PermissionRelationTuple({
      namespace: "ns",
      object: "obj",
      relation: "rel",
      subject_id: "sub-123"
    });
  });

  test("should return true if response is allowed", async () => {
    const response = new CheckResponse();
    response.setAllowed(true);

    const result = await parseGRPCCheckResponse(Promise.resolve(response), rt);

    expect(result).toBe(true);
  });

  test("should return false if response is denied", async () => {
    const response = new CheckResponse();
    response.setAllowed(false);

    const result = await parseGRPCCheckResponse(Promise.resolve(response), rt);

    expect(result).toBe(false);
  });

  test("should log error and return false if there is a gRPC error", async () => {
    const error: ServiceError = {
      details: "Test Service Error",
      metadata: undefined,
      code: Status.UNAVAILABLE,
      name: "name",
      message: "message"
    };
    const promise = Promise.reject(error);

    console.error = jest.fn(); // mock console.error

    const result = await parseGRPCCheckResponse(promise, rt);

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith(`Error with gRPC Keto check request: ${error.code} ${error.name} ${error.message}`);
  });
});
