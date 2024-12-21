import { Booking } from "./booking";
import { Pet } from "./pet";

export interface UserDetails {
  displayName: string | null;
  name: string;
  email: string | null;
  refreshToken: string;
  uid: string;
  userInfo: {
    address: string;
    bookings: Booking;
    email: string;
    id: string;
    name: string;
    pets: Pet[];
    phone: string;
    role: number;
    updatedAt: string;
  };
}
