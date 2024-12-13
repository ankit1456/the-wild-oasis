import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../../services/apiBookings";
import { PAGE_SIZE } from "../../../utils/constants";

const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // sort
  const sortByRaw = searchParams.get("sortBy") ?? "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field,
    direction,
  };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending: isLoadingBookings,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // prefetch
  if (data?.count) {
    const pagesCount = Math.ceil(data.count / PAGE_SIZE);
    if (page < pagesCount)
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      });
  }
  return { isLoadingBookings, bookings: data?.data, count: data?.count, error };
};

export default useBookings;
