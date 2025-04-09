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
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: config.get('NODE_ENV') !== 'production',
    autoLoadEntities: true,
  }),
});
