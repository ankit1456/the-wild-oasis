import { Status } from "../../utils/types";
import { TCabin } from "../cabins/cabin.types";

type TGuest = {
  id: number;
  email: string;
  fullName: string;
  created_at: string;
  nationalId: string;
  countryFlag: string | null;
  nationality: string;
};

export type TBooking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice: number;
  status: Status;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string | null;
  cabins: Partial<TCabin>;
  guests: Partial<TGuest>;
};
