import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviderModule } from './database.provider';

@Module({
  imports: [ConfigModule, DatabaseProviderModule],
})
export class DatabaseModule {}
