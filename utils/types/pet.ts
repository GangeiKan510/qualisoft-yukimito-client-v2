export interface Pet {
  id: string;
  serial: number;
  name: string;
  breed: string;
  birth_date: string;
  size: "Small" | "Medium" | "Large";
  vaccine_photo: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  bookingId: string;
}
