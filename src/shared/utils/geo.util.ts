/**
 * Calculates the Haversine distance between two geographic coordinates.
 * The result is returned in kilometers.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.lat1 - Latitude of the first point in decimal degrees.
 * @param {number} params.lng1 - Longitude of the first point in decimal degrees.
 * @param {number} params.lat2 - Latitude of the second point in decimal degrees.
 * @param {number} params.lng2 - Longitude of the second point in decimal degrees.
 * @returns {number} The Haversine distance between the two points in kilometers.
 */
export function haversineDistance({
  lat1,
  lng1,
  lat2,
  lng2,
}: {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
