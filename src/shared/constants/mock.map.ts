import { faker } from '@faker-js/faker';

export const Mock = Object.freeze({
  // Passenger
  PASSENGER_ID: faker.string.uuid(),
  PASSENGER_NAME: faker.person.fullName(),
  PASSENGER_EMAIL: faker.internet.email(),
  PASSENGER_PHONE: faker.phone.number({ style: 'international' }),
  PASSENGER_CURRENT_LAT: faker.location.latitude({ min: 18.45, max: 18.5 }),
  PASSENGER_CURRENT_LNG: faker.location.longitude({ min: -69.95, max: -69.85 }),
  PASSENGER_DESTINATION_LAT: faker.location.latitude({ min: 18.45, max: 18.5 }),
  PASSENGER_DESTINATION_LNG: faker.location.longitude({
    min: -69.95,
    max: -69.85,
  }),
  PASSENGER_DESTINATION_RADIUS: 3,
  PASSENGER_DRIVERS_LIMIT: 3,

  // Driver
  DRIVER_ID: faker.string.uuid(),
  DRIVER_NAME: faker.person.fullName(),
  DRIVER_EMAIL: faker.internet.email(),
  DRIVER_PHONE: faker.phone.number({ style: 'international' }),
  DRIVER_CURRENT_LAT: faker.location.latitude({ min: 18.45, max: 18.5 }),
  DRIVER_CURRENT_LNG: faker.location.longitude({ min: -69.95, max: -69.85 }),
  DRIVER_IS_AVAILABLE: true,
  DRIVER_CREATED_AT: new Date(),
  DRIVER_UPDATED_AT: new Date(),

  // Trip
  TRIP_ID: faker.string.uuid(),
  TRIP_STATUS: 'active',
});
