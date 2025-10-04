// helpers: uid, format, dates, geo utils
window.Utils = (function () {
  function uid(prefix = "id") {
    return prefix + "_" + Math.random().toString(36).slice(2, 10);
  }
  function nowISO() {
    return new Date().toISOString();
  }
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
  function haversine(a, b) {
    const R = 6371;
    const toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat),
      lat2 = toRad(b.lat);
    const aa =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.asin(Math.sqrt(aa));
  }
  function estimateETAKm(km, speedKmh = 25) {
    return Math.ceil((km / speedKmh) * 60);
  }
  function priceEstimate(base, km) {
    return Math.round(base + km * 20);
  }
  return { uid, nowISO, clamp, haversine, estimateETAKm, priceEstimate };
})();
