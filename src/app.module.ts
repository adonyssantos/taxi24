import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassengersModule } from './passengers/passengers.module';
import { ConfigModule } from '@nestjs/config';
import { DriversModule } from './drivers/drivers.module';
import { TripsModule } from './trips/trips.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { PassengerDriversModule } from './passenger-drivers/passenger-drivers.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV_PATH || '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    PassengersModule,
    DriversModule,
    TripsModule,
    SharedModule,
    PassengerDriversModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
