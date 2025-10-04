window.State = (function () {
  const KEYS = {
    USERS: "fixam_users",
    SERVICES: "fixam_services",
    BOOKINGS: "fixam_bookings",
    REVIEWS: "fixam_reviews",
    SESSION: "fixam_session",
    POS: "fixam_positions",
  };

  function read(k) {
    try {
      return JSON.parse(localStorage.getItem(k) || "null");
    } catch (e) {
      return null;
    }
  }
  function write(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }

  // fallback utils if Utils not loaded yet
  function uid(prefix = "id") {
    return prefix + "_" + Math.random().toString(36).slice(2, 9);
  }
  function nowISO() {
    return new Date().toISOString();
  }

  // init seed
  function seed() {
    if (!read(KEYS.SERVICES)) {
      const services = [
        {
          id: "svc_plumb",
          name: "Plumbing",
          icon: "🔧",
          basePrice: 2500,
          description: "Fix leaks, taps, piping",
        },
        {
          id: "svc_elec",
          name: "Electrical",
          icon: "💡",
          basePrice: 3000,
          description: "Wiring, sockets, lights",
        },
        {
          id: "svc_ac",
          name: "AC Repair",
          icon: "❄️",
          basePrice: 5000,
          description: "AC servicing & gas refill",
        },
        {
          id: "svc_clean",
          name: "Cleaning",
          icon: "🧹",
          basePrice: 1500,
          description: "Home deep clean",
        },
        {
          id: "svc_paint",
          name: "Painting",
          icon: "🎨",
          basePrice: 4000,
          description: "Interior painting",
        },
        {
          id: "svc_carp",
          name: "Carpentry",
          icon: "🪚",
          basePrice: 3500,
          description: "Furniture & fittings",
        },
        {
          id: "svc_appl",
          name: "Appliance",
          icon: "🔌",
          basePrice: 3200,
          description: "Fridge, stove, etc",
        },
        {
          id: "svc_hand",
          name: "Handyman",
          icon: "🔩",
          basePrice: 1200,
          description: "Odd jobs & fixes",
        },
      ];
      write(KEYS.SERVICES, services);
    }

    if (!read(KEYS.USERS)) {
      const users = [
        {
          id: uid("u"),
          role: "assistant",
          firstName: "Tunde",
          lastName: "A",
          phone: "+2348010000001",
          email: "tunde@example.com",
          passwordHash: "demo",
          serviceCategory: "Plumbing",
          skills: ["pipes", "taps"],
          yearsExp: 6,
          bio: "Experienced plumber",
          address: "Ikeja",
          city: "Lagos",
          state: "Lagos",
          coords: { lat: 6.597, lng: 3.342 },
          photoURLs: [],
          idCardNumber: "ID123",
          rating: { avg: 4.8, count: 54 },
          availability: "available",
          createdAt: nowISO(),
        },
        {
          id: uid("u"),
          role: "assistant",
          firstName: "Amaka",
          lastName: "B",
          phone: "+2348010000002",
          email: "amaka@example.com",
          passwordHash: "demo",
          serviceCategory: "Cleaning",
          skills: ["deep clean"],
          yearsExp: 3,
          bio: "Fast & neat",
          address: "Yaba",
          city: "Lagos",
          state: "Lagos",
          coords: { lat: 6.512, lng: 3.39 },
          photoURLs: [],
          idCardNumber: "ID124",
          rating: { avg: 4.6, count: 40 },
          availability: "available",
          createdAt: nowISO(),
        },
        // … add the rest same way …
      ];
      write(KEYS.USERS, users);
    }
  }

  return { read, write, seed, KEYS };
})();
