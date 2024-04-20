/* nestjs */
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { CacheModule } from "@nestjs/cache-manager";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

/* modules */
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";
////////////////////////////////////////////////////////////////////////////////

const databaseFactory = async (
  configService: ConfigService,
  database: string = "db"
) => {
  const host = configService.get("DB_HOST");
  const nodeEnv = configService.get("NODE_ENV");
  const username = configService.get("DB_USERNAME");
  const password = configService.get("DB_PASSWORD");

  if (!nodeEnv) {
    console.error("NODE_ENV is not set. Exiting...");
    process.exit(1);
  }

  return {
    host,
    database,
    username,
    password,
    port: 3306,
    type: "mysql",
    cache: { duration: 30000 },
    autoLoadEntities: true,
    synchronize: nodeEnv !== "prod",
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    UserModule,
    AuthModule,
    HealthModule,
    /* see https://docs.nestjs.com/techniques/configuration#schema-validation
     * runtime environment variables (eg. OS shell exports) take precedence */
    // TODO : schema validation
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === "prod",
    }),
    /* see https://docs.nestjs.com/techniques/caching */
    CacheModule.register({ ttl: 1000 * 60 * 60 * 24 * 7, isGlobal: true }),
    /* see https://docs.nestjs.com/security/rate-limiting */
    ThrottlerModule.forRoot([{ ttl: 60, limit: 250 }]),
    /* see https://docs.nestjs.com/techniques/events */
    EventEmitterModule.forRoot(),
    /* see https://typeorm.io/data-source-options */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await databaseFactory(configService),
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
