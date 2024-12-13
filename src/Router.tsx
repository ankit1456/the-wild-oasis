import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Protected from "./features/authentication/Protected";
import {
  Account,
  Booking,
  Bookings,
  Cabins,
  Checkin,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
} from "./pages";
import { AppLayout } from "./ui";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Protected>
              <AppLayout />
            </Protected>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="checkin/:bookingId" element={<Checkin />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
