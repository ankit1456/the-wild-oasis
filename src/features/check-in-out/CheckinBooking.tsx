import { useEffect, useState } from "react";
import styled from "styled-components";

import { useMoveBack } from "../../hooks";
import { BookingDataBox, useBooking } from "../bookings";

import {
  Button,
  ButtonGroup,
  ButtonText,
  Checkbox,
  Heading,
  Row,
  Spinner,
} from "../../ui";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings";
import useCheckin from "./hooks/useCheckin";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addbreakFast, setAddbreakFast] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isLoadingBooking } = useBooking();
  const { checkinMutate, isCheckingIn } = useCheckin();
  const { settings, isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;
  if (!booking || !settings) return null;

  const optionalBreakfastPrice = settings.breakfastPrice * booking.numNights;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addbreakFast && booking.totalPrice) {
      checkinMutate({
        bookingId: booking.id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: booking.totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkinMutate({ bookingId: booking?.id });
    }
  };
  return (
    <>
      <Row>
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addbreakFast}
            onChange={() => {
              setAddbreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="add-breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {booking.guests.fullName} has paid the total amount of{" "}
          {!addbreakFast
            ? formatCurrency(booking.totalPrice)
            : `${formatCurrency(
                booking.totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
        <ButtonGroup>
          <Button
            disabled={!confirmPaid || isCheckingIn}
            onClick={handleCheckin}
          >
            Check in booking #{booking.id}
          </Button>
          <Button $variant="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default CheckinBooking;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
