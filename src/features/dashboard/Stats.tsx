import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { TBooking } from "../bookings/booking.types";

type Props = {
  recentBookings: TBooking[] | undefined;
  confirmedStays: TBooking[] | undefined;
  numCabins: number | undefined;
  numDays: number;
};

function Stats({
  recentBookings,
  confirmedStays,
  numCabins,
  numDays,
}: Readonly<Props>) {
  const numBookings = recentBookings?.length;

  const sales = recentBookings?.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0
  );
  const totalCheckIns = confirmedStays?.length;

  // num checked in nights / all available nights (num days * num cabins)
  const occupancyRate =
    numCabins && confirmedStays
      ? (confirmedStays?.reduce((acc, stay) => acc + stay.numNights, 0) * 100) /
        (numDays * numCabins)
      : 0;
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Ocuupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate) + "%"}
      />
    </>
  );
}

export default Stats;
