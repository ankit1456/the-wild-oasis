import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Flag, Tag } from "../../ui";
import { Status } from "../../utils/types";
import { TBooking } from "../bookings/booking.types";
import useCheckOut from "./hooks/useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const GuestFullName = styled.div`
  font-weight: 500;
`;

const TodayItem = ({ activity }: { activity: TBooking }) => {
  const { checkoutMutate, isCheckingOut } = useCheckOut();
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === Status.UNCONFIRMED && <Tag type="green">Arriving</Tag>}
      {status === Status.CHECKED_IN && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag!} alt={`Flag of ${guests.countryFlag}`} />
      <GuestFullName>{guests.fullName}</GuestFullName>
      <div>{numNights} nights</div>

      {status === Status.UNCONFIRMED && (
        <Button as={Link} to={`/checkin/${id}`} size="small">
          Check in
        </Button>
      )}
      {status === Status.CHECKED_IN && (
        <Button
          $variant="primary"
          size="small"
          onClick={() => checkoutMutate(id)}
          disabled={isCheckingOut}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
};

export default TodayItem;
