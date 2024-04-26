import { DynamicModule, Global, Module, Provider } from "@nestjs/common";

import { OryClientAsyncOptions, OryClientOptions, OryClientOptionsFactory } from "./interfaces";
import { oryClientToken, oryModuleOptions } from "./constants";
import { getOryClient } from "./util";
import { createOryClientProvider } from "./providers";

@Global()
@Module({})
export class OryClientCoreModule {
  public static forRoot(options: OryClientOptions): DynamicModule {
    const oryClientProvider = createOryClientProvider(options);

    return {
      exports: [oryClientProvider],
      module: OryClientCoreModule,
      providers: [oryClientProvider]
    };
  }

  static forRootAsync(options: OryClientAsyncOptions): DynamicModule {
    const oryClientProvider: Provider = {
      inject: [oryModuleOptions],
      provide: oryClientToken,
      useFactory: (oryOptions: OryClientOptions) =>
        getOryClient(oryOptions)
    };

    return {
      exports: [oryClientProvider],
      imports: options.imports,
      module: OryClientCoreModule,
      providers: [...this.createAsyncProviders(options), oryClientProvider]
    };
  }

  private static createAsyncProviders(options: OryClientAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: OryClientAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: oryModuleOptions,
        useFactory: options.useFactory
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: oryModuleOptions,
      useFactory: (optionsFactory: OryClientOptionsFactory) =>
        optionsFactory.createOryClientOptions()
    };
  }
}
