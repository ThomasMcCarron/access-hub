import { DynamicModule, Module } from "@nestjs/common";
import { OryClientCoreModule } from "./ory-client.core.module";
import { OryClientAsyncOptions, OryClientOptions } from "./interfaces";

@Module({})
export class OryClientModule {
  public static forRoot(options: OryClientOptions): DynamicModule {
    return {
      module: OryClientModule,
      imports: [OryClientCoreModule.forRoot(options)]
    };
  }

  public static forRootAsync(options: OryClientAsyncOptions): DynamicModule {
    return {
      module: OryClientModule,
      imports: [OryClientCoreModule.forRootAsync(options)]
    };
  }
}
