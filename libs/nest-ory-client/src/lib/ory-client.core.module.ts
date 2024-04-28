import { DynamicModule, Global, Module, Provider } from "@nestjs/common";

import { OryClientAsyncOptions, OryClientOptions, OryClientOptionsFactory } from "./interfaces";
import { ketoClientToken, oryClientToken, oryModuleOptions } from "./constants";
import { getOryClient } from "./util";
import { getKetoClient } from "./keto";
import { createKetoClientProvider } from "./keto";
import { createOryClientProvider } from "./providers";

@Global()
@Module({})
export class OryClientCoreModule {
  public static forRoot(options: OryClientOptions): DynamicModule {
    const oryClientProvider = createOryClientProvider(options);
    const ketoClientProvider = createKetoClientProvider(options);

    return {
      exports: [oryClientProvider, ketoClientProvider],
      module: OryClientCoreModule,
      providers: [oryClientProvider, ketoClientProvider]
    };
  }

  static forRootAsync(options: OryClientAsyncOptions): DynamicModule {
    const oryClientProvider: Provider = {
      inject: [oryModuleOptions],
      provide: oryClientToken,
      useFactory: (oryOptions: OryClientOptions) =>
        getOryClient(oryOptions)
    };

    const ketoClientProvider: Provider = {
      inject: [oryModuleOptions],
      provide: ketoClientToken,
      useFactory: (oryOptions: OryClientOptions) =>
        getKetoClient(oryOptions)
    };

    return {
      exports: [oryClientProvider, ketoClientProvider],
      imports: options.imports,
      module: OryClientCoreModule,
      providers: [...this.createAsyncProviders(options), oryClientProvider, ketoClientProvider]
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
