export const Mock = Object.freeze({
  // Passenger
  PASSENGER_ID: 'passenger-id',
  PASSENGER_NAME: 'Adonys Passenger',
  PASSENGER_EMAIL: `passenger-${Date.now()}@adonys.me`,
  PASSENGER_PHONE: '+18090000000',
  PASSENGER_CURRENT_LAT: 100.7128,
  PASSENGER_CURRENT_LNG: -70.0006,
  PASSENGER_DESTINATION_LAT: 0.7128,
  PASSENGER_DESTINATION_LNG: -70.0006,
  PASSENGER_DESTINATION_RADIUS: 3,

  // Driver
  DRIVER_ID: 'driver-id',
  DRIVER_NAME: 'Adonys Driver',
  DRIVER_EMAIL: `driver-${Date.now()}@adonys.me`,
  DRIVER_PHONE: '+18090000001',
  DRIVER_CURRENT_LAT: 105.7128,
  DRIVER_CURRENT_LNG: -70.0006,
  DRIVER_IS_AVAILABLE: true,

  // Trip
  TRIP_ID: 'trip-id',
  TRIP_STATUS: 'active',
});
