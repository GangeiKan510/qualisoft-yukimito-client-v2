const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  services: "/services",
  createBooking: "/create-booking",

  about: "/about",
  gallery: "/gallery",
  requirements: "/requirements",
  rates: "/rates-and-services",
  team: "/team",

  // Protected routes
  profile: "/profile",
  userCreateBooking: "/profile/create-booking",
  userPersonalDetails: "/profile/personal-details",
  userPets: "/profile/my-pets",
  userBookingHistory: "/profile/booking-history",

  admin: "/admin",
  adminBookings: "/admin/bookings",
  adminInventory: "/admin/inventory",
  adminPendingVaccines: "/admin/pending-vaccines",
  adminUsers: "/admin/users",
};

export { routes };
