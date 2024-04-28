import { WriteServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_grpc_pb";
import { CheckServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb";
import { KetoGrpcClient } from "./keto-grpc.client";
import { PermissionRelationTuple } from "../permissions";
import { CheckResponse } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb";
import { ServiceError } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import {
  DeleteRelationTuplesResponse,
  TransactRelationTuplesResponse
} from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_pb";
import { InternalServerErrorException } from "@nestjs/common";
import { ReadServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/read_service_grpc_pb";

describe("KetoGrpcClient", () => {
  let writeClient: WriteServiceClient;
  let checkClient: CheckServiceClient;
  let readClient: ReadServiceClient;
  let ketoClient: KetoGrpcClient;

  const testRelationTuple = new PermissionRelationTuple({
    namespace: "testNamespace",
    object: "testObject",
    relation: "testRelation",
    subject_id: "testSubject"
  });

  beforeEach(() => {
    // Initialize the client and the mock gRPC clients
    writeClient = jest.genMockFromModule<WriteServiceClient>("@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_grpc_pb");
    checkClient = jest.genMockFromModule<CheckServiceClient>("@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb");
    readClient = jest.genMockFromModule<ReadServiceClient>("@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/read_service_grpc_pb");
    ketoClient = new KetoGrpcClient(writeClient, checkClient, readClient, 3);
  });

  describe("check", () => {
    it("should return true if permission relation tuple exists", async () => {
      const expectedResponse: CheckResponse = new CheckResponse();
      expectedResponse.setAllowed(true);

      checkClient.check = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedResponse);
      });

      const result = await ketoClient.check(testRelationTuple);
      expect(result).toBe(true);
      expect(checkClient.check).toHaveBeenCalledTimes(1);
    });

    it("should return false if permission relation tuple does not exist", async () => {
      const expectedResponse: CheckResponse = new CheckResponse();
      expectedResponse.setAllowed(false);

      checkClient.check = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedResponse);
      });

      const result = await ketoClient.check(testRelationTuple);
      expect(result).toBe(false);
      expect(checkClient.check).toHaveBeenCalledTimes(1);
    });

    it("should retry and return false if the gRPC call fails", async () => {
      const expectedError: ServiceError = {
        name: "testError",
        code: Status.UNAVAILABLE,
        message: "Test Error",
        details: "",
        metadata: undefined
      };
      checkClient.check = jest.fn().mockImplementation((_, callback) => {
        callback(expectedError, null);
      });

      console.error = jest.fn();
      console.warn = jest.fn();

      expect(await ketoClient.check(testRelationTuple)).toBe(false);
      expect(console.warn).toHaveBeenNthCalledWith(1, "Remaining retries: 3");
      expect(console.warn).toHaveBeenNthCalledWith(2, "Remaining retries: 2");
      expect(console.warn).toHaveBeenNthCalledWith(3, "Remaining retries: 1");
      expect(console.error).toHaveBeenCalledWith(`Error with Keto request: 14 testError Test Error`);
      // 4 times as it is called once, then retried 3 times
      expect(console.error).toHaveBeenCalledTimes(4);
      expect(checkClient.check).toHaveBeenCalledTimes(4);
    });
  });

  describe("checkAdmin", () => {
    it("should call check with admin permission relation tuple", async () => {
      const expectedResponse: CheckResponse = new CheckResponse();
      expectedResponse.setAllowed(false);

      // Call the checkAdmin method with the admin tuple
      checkClient.check = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedResponse);
      });

      console.debug = jest.fn();

      const result = await ketoClient.checkAdmin(testRelationTuple);
      expect(console.debug).toHaveBeenCalledWith("testNamespace:*#testRelation@testSubject DENIED");
      expect(result).toBe(false);
    });
  });

  describe("delete", () => {
    it("should delete permission relation tuple", async () => {
      const expectedResponse: DeleteRelationTuplesResponse = new DeleteRelationTuplesResponse();
      writeClient.deleteRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedResponse);
      });

      console.debug = jest.fn();

      await expect(ketoClient.delete(testRelationTuple)).resolves.not.toThrowError();
      expect(console.debug).toHaveBeenCalledWith(`Deleted tuple '${testRelationTuple}'`);
      expect(writeClient.deleteRelationTuples).toHaveBeenCalledTimes(1);
    });

    it("should retry and throw an error if the gRPC call fails", async () => {
      const expectedError: ServiceError = {
        name: "testError",
        code: Status.UNAVAILABLE,
        message: "Test Error",
        details: "",
        metadata: undefined
      };
      writeClient.deleteRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(expectedError, null);
      });

      console.error = jest.fn();
      console.warn = jest.fn();

      await expect(ketoClient.delete(testRelationTuple)).rejects.toThrowError();
      expect(console.warn).toHaveBeenNthCalledWith(1, "Remaining retries: 3");
      expect(console.warn).toHaveBeenNthCalledWith(2, "Remaining retries: 2");
      expect(console.warn).toHaveBeenNthCalledWith(3, "Remaining retries: 1");
      expect(console.error).toHaveBeenNthCalledWith(1, "Error with Keto request: 14 testError Test Error");
      expect(console.error).toHaveBeenNthCalledWith(2, "Error with Keto request: 14 testError Test Error");
      expect(console.error).toHaveBeenNthCalledWith(3, "Error with Keto request: 14 testError Test Error");
      expect(console.error).toHaveBeenNthCalledWith(4, "Error deleting permission", JSON.stringify(expectedError));
    });
  });

  describe("write", () => {
    it("should attempt to delete the tuple, then write the tuple", async () => {
      const expectedDeleteResponse: DeleteRelationTuplesResponse = new DeleteRelationTuplesResponse();
      writeClient.deleteRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedDeleteResponse);
      });
      const expectedWriteResponse: TransactRelationTuplesResponse = new TransactRelationTuplesResponse();
      writeClient.transactRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedWriteResponse);
      });

      console.debug = jest.fn();

      await expect(ketoClient.write(testRelationTuple)).resolves.not.toThrowError();
      expect(console.debug).toHaveBeenCalledWith(`Deleted tuple '${testRelationTuple}'`);
      expect(console.debug).toHaveBeenCalledWith(`Created tuple '${testRelationTuple}'`);
    });

    it("should retry and throw an error if the delete gRPC call fails", async () => {
      const expectedError: ServiceError = {
        name: "testError",
        code: Status.UNAVAILABLE,
        message: "Test Error",
        details: "",
        metadata: undefined
      };
      writeClient.deleteRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(expectedError, null);
      });
      const expectedWriteResponse: TransactRelationTuplesResponse = new TransactRelationTuplesResponse();
      writeClient.transactRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedWriteResponse);
      });

      console.warn = jest.fn();
      console.error = jest.fn();

      await expect(ketoClient.write(testRelationTuple)).rejects.toThrowError();
      expect (writeClient.deleteRelationTuples).toHaveBeenCalled();
      expect(console.warn).toHaveBeenNthCalledWith(1, "Remaining retries: 3");
      expect(console.warn).toHaveBeenNthCalledWith(2, "Remaining retries: 2");
      expect(console.warn).toHaveBeenNthCalledWith(3, "Remaining retries: 1");
      expect(console.error).toHaveBeenNthCalledWith(1, "Error deleting before writing permission", JSON.stringify(expectedError));
      expect(console.error).toHaveBeenNthCalledWith(2, "Error with Keto request: undefined InternalServerErrorException error.deletePermission");
      expect(console.error).toHaveBeenNthCalledWith(3, "Error deleting before writing permission", JSON.stringify(expectedError));
      expect(console.error).toHaveBeenNthCalledWith(4, "Error with Keto request: undefined InternalServerErrorException error.deletePermission");
      expect(console.error).toHaveBeenNthCalledWith(5, "Error deleting before writing permission", JSON.stringify(expectedError));
      expect(console.error).toHaveBeenNthCalledWith(6, "Error with Keto request: undefined InternalServerErrorException error.deletePermission");
      expect(console.error).toHaveBeenNthCalledWith(7, "Error deleting before writing permission", JSON.stringify(expectedError));
      expect(console.error).toHaveBeenNthCalledWith(8, "Error writing permission", JSON.stringify(new InternalServerErrorException("error.deletePermission")));
      expect(writeClient.transactRelationTuples).not.toHaveBeenCalled();
    });

    it("should retry and throw an error if the write gRPC call fails", async () => {
      const expectedResponse: DeleteRelationTuplesResponse = new DeleteRelationTuplesResponse();
      writeClient.deleteRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(null, expectedResponse);
      });

      const expectedError: ServiceError = {
        name: "testError",
        code: Status.UNAVAILABLE,
        message: "Test Error",
        details: "",
        metadata: undefined
      };
      writeClient.transactRelationTuples = jest.fn().mockImplementation((_, callback) => {
        callback(expectedError, null);
      });

      console.debug = jest.fn();
      console.error = jest.fn();
      console.warn = jest.fn();

      await expect(ketoClient.write(testRelationTuple)).rejects.toThrowError();
      expect (writeClient.deleteRelationTuples).toHaveBeenCalled();
      expect (writeClient.transactRelationTuples).toHaveBeenCalled();

      expect(console.debug).toHaveBeenNthCalledWith(1, `Deleted tuple '${testRelationTuple}'`);
      expect(console.debug).toHaveBeenNthCalledWith(2, `Deleted tuple '${testRelationTuple}'`);
      expect(console.debug).toHaveBeenNthCalledWith(3, `Deleted tuple '${testRelationTuple}'`);

      expect(console.warn).toHaveBeenNthCalledWith(1, "Remaining retries: 3");
      expect(console.warn).toHaveBeenNthCalledWith(2, "Remaining retries: 2");
      expect(console.warn).toHaveBeenNthCalledWith(3, "Remaining retries: 1");

      expect(console.error).toHaveBeenNthCalledWith(1, "Error with Keto request: 14 testError Test Error");
      expect(console.error).toHaveBeenNthCalledWith(2, "Error with Keto request: 14 testError Test Error");
      expect(console.error).toHaveBeenNthCalledWith(3, "Error with Keto request: 14 testError Test Error");
      expect(console.error).toHaveBeenNthCalledWith(4, "Error writing permission", JSON.stringify(expectedError));
    });
  });
});
