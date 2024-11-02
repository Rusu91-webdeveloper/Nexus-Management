"use client";

import { Suspense, lazy } from "react";
import { useGetBookingsDashboard } from "../hooks/useBook";
import { useFetchRooms } from "../hooks/useRoom";

// Lazy load components
const TotalBookings = lazy(() => import("../components/TotalBookings"));
const TotalSales = lazy(() => import("../components/TotalSales"));
const TotalOcupancy = lazy(() => import("../components/TotalOcupancy"));
const TableDashboardBookings = lazy(
  () => import("../components/TableDashboardBookings")
);
const SummaryChart = lazy(() => import("../components/SummaryChart"));
const StaffBookingsTable = lazy(
  () => import("../components/StaffBookingsTable")
);

const Dashboard = () => {
  // Fetch bookings data
  const {
    data: bookingsData,
    isError: bookingsError,
    isLoading: bookingsLoading,
  } = useGetBookingsDashboard();

  const {
    data: rooms,
    isError: roomsError,
    isLoading: roomsLoading,
  } = useFetchRooms(1);
  const roomsData = rooms?.length;

  // Handle loading state
  if (bookingsLoading || roomsLoading) {
    return <LoadingPlaceholder />;
  }

  // Handle error state
  if (bookingsError || roomsError) {
    return (
      <div className="text-red-500 p-8">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="text-gray-800 p-8 grid grid-cols-4 gap-4 bg-gray-800 ">
      {/* First section spanning all 4 columns */}
      <div className="col-span-4 flex justify-between gap-4">
        <Suspense fallback={<LoadingBox />}>
          <div className="flex-1 h-full border border-gray-400 p-8 rounded-lg place-content-center">
            <TotalBookings
              rooms={bookingsData}
              isLoading={bookingsLoading}
              isError={bookingsError}
            />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingBox />}>
          <div className="flex-1 h-full border border-gray-400 p-8 rounded-lg place-content-center">
            <TotalSales bookings={bookingsData} />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingBox />}>
          <div className="flex-1 h-full border border-gray-400 rounded-lg flex flex-col justify-center items-center p-8">
            <SummaryChart data={bookingsData} />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingBox />}>
          <div className="flex-1 h-full border border-gray-400 p-8 rounded-lg place-content-center">
            <TotalOcupancy bookings={bookingsData} allRooms={roomsData} />
          </div>
        </Suspense>
      </div>

      {/* Table spanning 4 columns */}
      <Suspense fallback={<LoadingBox className="col-span-4 h-[400px]" />}>
        <div className="col-span-4 mt-4 border border-gray-400 rounded-xl p-4">
          <TableDashboardBookings
            isLoading={bookingsLoading}
            bookings={bookingsData}
            isError={bookingsError}
          />
        </div>
      </Suspense>

      {/* Table spanning 4 columns */}
      <Suspense fallback={<LoadingBox className="col-span-4 h-[400px]" />}>
        <div className="col-span-4">
          <StaffBookingsTable data={bookingsData} />
        </div>
      </Suspense>
    </div>
  );
};

const LoadingPlaceholder = () => (
  <div className="text-gray-800 p-8 grid grid-cols-4 gap-4 bg-gray-800">
    <div className="col-span-4 flex justify-between gap-4">
      {[...Array(4)].map((_, index) => (
        <LoadingBox key={index} className="flex-1 h-[200px]" />
      ))}
    </div>
    <LoadingBox className="col-span-4 h-[400px]" />
    <LoadingBox className="col-span-4 h-[400px]" />
  </div>
);

const LoadingBox = ({ className = "" }) => (
  <div className={`bg-gray-700 animate-pulse rounded-lg ${className}`}></div>
);

export default Dashboard;
