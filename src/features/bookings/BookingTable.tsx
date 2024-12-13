import { Menus, Pagination, Spinner, Table } from "../../ui";
import { TBooking } from "./booking.types";
import BookingRow from "./BookingRow";
import useBookings from "./hooks/useBookings";

function BookingTable() {
  const { bookings, count, isLoadingBookings } = useBookings();
  if (isLoadingBookings) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking as unknown as TBooking}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={count!} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
