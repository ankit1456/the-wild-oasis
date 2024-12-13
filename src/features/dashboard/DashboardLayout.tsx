import styled from "styled-components";
import { Spinner } from "../../ui";
import { TBooking } from "../bookings";
import { useCabins } from "../cabins";
import { TodayActivity } from "../check-in-out";
import DurationChart from "./DurationChart";
import useRecentBookings from "./hooks/useRecentBookings";
import useRecentStays from "./hooks/useRecentStays";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

function DashboardLayout() {
  const { recentBookings, isLoadingRecentBookings } = useRecentBookings();
  const { confirmedStays, isLoadingStays, numDays } = useRecentStays();
  const { cabins, isLoadingCabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings as TBooking[]}
        confirmedStays={confirmedStays}
        numCabins={cabins?.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
