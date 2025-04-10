import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseProviderModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('POSTGRES_HOST'),
    port: config.get<number>('POSTGRES_PORT'),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DB'),
    entities: [
      process.env.NODE_ENV === 'production'
        ? __dirname + '/**/*.entity.js'
        : __dirname + '/**/*.entity.ts',
    ],
    synchronize: config.get('NODE_ENV') !== 'production',
    autoLoadEntities: true,
  }),
});
