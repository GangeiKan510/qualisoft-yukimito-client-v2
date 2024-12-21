interface Pet {
  name: string;
  size: string;
  breed: string;
  birth_date: string;
  vaccine_photo: string;
}

export interface Booking {
  id: string;
  serial: number;
  pet_owner_name: string;
  service: string;
  address: string;
  phone_number: string;
  email: string;
  total_bill: number;
  check_in_date: string;
  check_out_date: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  raw_pet_data: Pet[];
}
