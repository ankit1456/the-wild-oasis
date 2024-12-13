import { format, isToday } from "date-fns";
import styled from "styled-components";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { ConfirmDelete, Menus, Modal, Table, Tag } from "../../ui";
import { statusToTagName } from "../../utils/constants";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { Status } from "../../utils/types";
import { useCheckout } from "../check-in-out";
import { TBooking } from "./booking.types";
import useDeleteBooking from "./hooks/useDeleteBooking";

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: Readonly<{
  booking: TBooking;
}>) {
  const navigate = useNavigate();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { checkoutMutate, isCheckingOut } = useCheckout();

  return (
    <Table.Row>
      <CabinName>{cabinName}</CabinName>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>
            {status === Status.UNCONFIRMED && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}
            {status === Status.CHECKED_IN && (
              <Menus.Button
                disabled={isCheckingOut}
                onClick={() => checkoutMutate(bookingId)}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opensWindowName="delete-booking">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="delete-booking">
          <ConfirmDelete
            disabled={isDeletingBooking}
            resourceName="cabin"
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export default BookingRow;