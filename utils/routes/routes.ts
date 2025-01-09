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
  profile: "/client/profile",
  userCreateBooking: "/client/profile/create-booking",
  userPersonalDetails: "/client/profile/personal-details",
  userPets: "/client/profile/my-pets",
  userBookingHistory: "/client/profile/booking-history",

  admin: "/admin",
  adminBookings: "/admin/bookings",
  adminInventory: "/admin/inventory",
  adminPendingVaccines: "/admin/pending-vaccines",
  adminUsers: "/admin/users",
  adminCustomers: "/admin/customers",
  adminVaccineInventory: "/admin/vaccine-inventory",
};

export { routes };
