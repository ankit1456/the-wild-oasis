import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import useMoveBack from "../../hooks/useMoveBack";
import { statusToTagName } from "../../utils/constants";
import { Status } from "../../utils/types";
import useCheckOut from "../check-in-out/hooks/useCheckout";
import BookingDataBox from "./BookingDataBox";
import useBooking from "./hooks/useBooking";
import useDeleteBooking from "./hooks/useDeleteBooking";
import {
  Spinner,
  Row,
  Heading,
  Tag,
  ButtonText,
  ButtonGroup,
  Button,
  Modal,
  ConfirmDelete,
  Conditional,
  Empty,
} from "../../ui";

function BookingDetail() {
  const { booking, isLoadingBooking } = useBooking();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { checkoutMutate, isCheckingOut } = useCheckOut();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoadingBooking) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  return (
    <>
      <Row>
        <HeadingGroup>
          <Heading>Booking #{booking.id}</Heading>
          {booking.status && (
            <Tag type={statusToTagName[booking.status]}>
              {booking.status.replace("-", " ")}
            </Tag>
          )}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <ButtonGroup>
        <Conditional test={booking.status === Status.UNCONFIRMED}>
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        </Conditional>

        <Modal>
          <Modal.Open opensWindowName="delete-booking">
            <Button $variant="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window windowName="delete-booking">
            <ConfirmDelete
              disabled={isDeletingBooking}
              resourceName="cabin"
              onConfirm={() =>
                deleteBooking(booking.id, {
                  onSuccess: () => navigate("/bookings"),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Conditional test={booking.status === Status.CHECKED_IN}>
          <Button
            disabled={isCheckingOut}
            onClick={() => checkoutMutate(booking.id)}
          >
            Check out
          </Button>
        </Conditional>

        <Button $variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
