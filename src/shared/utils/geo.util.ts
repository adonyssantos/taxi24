/**
 * Calculates the Haversine distance between two geographic coordinates.
 *
 * The Haversine formula determines the great-circle distance between two points
 * on a sphere given their longitudes and latitudes. It is a special case of the
 * law of haversines, which relates the sides and angles of spherical triangles.
 *
 * Formula:
 *   a = sin²(Δlat / 2) + cos(lat1) * cos(lat2) * sin²(Δlng / 2)
 *   c = 2 * atan2(√a, √(1−a))
 *   distance = R * c
 * Where:
 *   - R is the Earth's radius (mean radius = 6,371,000 meters)
 *   - Δlat is the difference in latitude
 *   - Δlng is the difference in longitude
 *
 * @param lat1 - Latitude of the first point in decimal degrees.
 * @param lng1 - Longitude of the first point in decimal degrees.
 * @param lat2 - Latitude of the second point in decimal degrees.
 * @param lng2 - Longitude of the second point in decimal degrees.
 * @returns The distance between the two points in meters.
 *
 * @see {@link https://en.wikipedia.org/wiki/Haversine_formula Haversine Formula on Wikipedia}
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const EARTH_RADIUS_IN_METERS = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_IN_METERS * c;
}

/**
 * Converts a distance from meters to kilometers.
 *
 * @param meters - The distance in meters.
 * @returns The distance in kilometers.
 */
export function metersToKm(meters: number): number {
  return meters / 1000;
}
