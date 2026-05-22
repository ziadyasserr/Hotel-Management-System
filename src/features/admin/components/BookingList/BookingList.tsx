import { useEffect, useState } from "react";
import { ADMIN_URLS } from "../../../../constants/urls/urls";
import { axiosInstance } from "../../../../constants/urls/Urls";
import AdminTable from "../shared/AdminTable";
import AdminHeader from "../shared/AdminHeader";
import Pagination from '../shared/Pagination';
import Loader from "../../../../shared/components/Loader/Loader";

type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  user: {
    userName: string;
  };
  room: {
    roomNumber: string;
  };
};

function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getBooking = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(ADMIN_URLS.GET_BOOKINGS, {
        params: { page, size: 10 },
      });

      setBookings(res.data.data.booking || res.data.data.bookings || []);
      setTotalCount(res.data.data.totalCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooking();
  }, [page]);

  const columns = [
    {
      header: "User",
      accessor: "user",
      render: (user: any) => user?.userName || "-",
    },
    {
      header: "Room",
      accessor: "room",
      render: (room: any) => room?.roomNumber || "-",
    },
    {
      header: "Start Date",
      accessor: "startDate",
      render: (date: string) =>
        new Date(date).toLocaleDateString(),
    },
    {
      header: "End Date",
      accessor: "endDate",
      render: (date: string) =>
        new Date(date).toLocaleDateString(),
    },
    {
      header: "Total Price",
      accessor: "totalPrice",
    },
    {
      header: "Status",
      accessor: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded text-white text-xs ${status === "pending"
            ? "bg-yellow-500"
            : status === "completed"
              ? "bg-green-500"
              : "bg-gray-500"
            }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminHeader title="Booking" />

      {loading ? (
        <Loader/>
      ) : (
        <>
          <AdminTable columns={columns} data={bookings} />
          <Pagination 
            currentPage={page} 
            totalCount={totalCount} 
            onPageChange={setPage} 
          />
        </>
      )}
    </>
  );
}

export default BookingList;