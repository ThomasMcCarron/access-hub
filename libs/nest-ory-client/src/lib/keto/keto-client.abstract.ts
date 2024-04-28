import { PermissionRelationTuple } from "./permissions";

export abstract class KetoClient {
  protected constructor(private readonly numRetries?: number) {
    this.numRetries ??= 5;
  }

  abstract queryRelation(pageToken: string, pageSize: number, rt: PermissionRelationTuple): Promise<PermissionRelationTuple[]>;

  abstract queryNamespaces(): Promise<{ name: string }[]>;

  abstract write(rt: PermissionRelationTuple): Promise<void>;

  abstract delete(rt: PermissionRelationTuple): Promise<void>;

  abstract check(rt: PermissionRelationTuple): Promise<boolean>;

  abstract checkAdmin(rt: PermissionRelationTuple): Promise<boolean>;

  retryPermissionQuery<TupleType, ClientType>(
    fn: (client: ClientType, rt: PermissionRelationTuple) => Promise<TupleType>,
    client: ClientType,
    rt: PermissionRelationTuple,
    retriesLeft = this.numRetries,
    interval = 100
  ): Promise<TupleType> {
    return new Promise((resolve, reject) => {
      fn(client, rt)
        .then(resolve)
        .catch((error) => {
          // Reject if limit reached
          if (retriesLeft === 0) {
            reject(error);
            return;
          }

          console.error(`Error with Keto request: ${error.code} ${error.name} ${error.message}`);

          // Retry after timeout
          setTimeout(() => {
            console.warn(`Remaining retries: ${retriesLeft}`);
            this.retryPermissionQuery<TupleType, ClientType>(fn, client, rt, --retriesLeft, interval)
              .then(resolve, reject);
          }, interval);
        });
    });
  }
}
