export interface PetData {
  name: string;
  breed: string;
  birth_date: string;
  size: string;
  vaccine_photo: string;
}

export interface BookingData {
  pet_owner_name: string;
  service: string;
  address: string;
  phone_number: string;
  email: string;
  check_in_date: string;
  check_out_date: string;
  raw_pet_data: PetData[];
}
