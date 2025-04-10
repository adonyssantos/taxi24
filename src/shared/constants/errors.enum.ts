export enum Errors {
  // Passanger
  PASSENGER_NOT_FOUND = 'Passenger not found',
  PASSENGER_ALREADY_EXISTS = 'You cannot create a passenger with the same email',
  PASSENGER_INVALID_ID = 'Invalid passenger ID',

  // Driver
  DRIVER_NOT_FOUND = 'Driver not found',
  DRIVER_ALREADY_EXISTS = 'You cannot create a driver with the same email',
  DRIVER_INVALID_ID = 'Invalid driver ID',
  DRIVER_NOT_AVAILABLE = 'Driver is not available',
  DRIVER_ALREADY_HAS_ACTIVE_TRIP = 'Driver already has an active trip',

  // Trip
  TRIP_NOT_FOUND = 'Trip not found',
  TRIP_ALREADY_EXISTS = 'Trip already exists',
  TRIP_INVALID_ID = 'Invalid trip ID',
}
