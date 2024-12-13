import { Status } from "../../utils/types";
import { TCabin } from "../cabins/cabin.types";
import { TGuest } from "../guests/guest.types";

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
