import { useEffect, useState } from 'react';
import AdminHeader from '../shared/AdminHeader';
import { ADMIN_URLS } from "../../../../constants/urls/Urls";
import { axiosInstance } from "../../../../constants/urls/Urls";
import AdminTable from '../shared/AdminTable';
import DeleteModal from '../shared/DeleteModal';
import AdminFormAddModal from '../shared/AdminFormAddModal';
import Pagination from '../shared/Pagination';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from '../../../../shared/components/Loader/Loader';
import { toast } from 'sonner';

function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ PAGINATION STATE
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // ✅ ADD / EDIT MODAL
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // ✅ DELETE MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ================= DELETE =================
  const handleDelete = async () => {
    if (!selectedId) return;

    setLoadingg(true);

    try {
      await axiosInstance.delete(ADMIN_URLS.DELETE_ROOM(selectedId));
      toast.success("Room deleted successfully");
      getRooms();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingg(false);
      setIsOpen(false);
      setSelectedId(null);
    }
  };

  // ================= GET ROOMS =================
  const getRooms = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get(ADMIN_URLS.GET_ROOMS, {
        params: { page, size: 10 },
      });
      // console.log(res.data.data.rooms);

      setRooms(res.data.data.rooms);
      setTotalCount(res.data.data.totalCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, [page]);

  // ================= TABLE =================
  const columns = [
    { header: "Room Number", accessor: "roomNumber" },
    {
      header: "Image",
      accessor: "images",
      render: (images: string[]) => (
        <img
          src={
            images?.[0]?.startsWith("http")
              ? images[0]
              : `https://upskilling-egypt.com:3000/${images?.[0]}`
          }
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      header: "Price",
      accessor: "price",
      render: (price: number) => `${price} LE`,
    },
    { header: "Capacity", accessor: "capacity" },
    { header: "Discount", accessor: "discount", render: (discount: number) => `${discount} %`, },


    // {
    //   header: "Facilities",
    //   accessor: "facilities",
    //   render: (facilities: any[]) =>
    //     facilities?.map((f) => f.name).join(", "),
    // },

    {
      header: "",
      accessor: "_id",
      render: (id: string) => (
        <div className="relative group flex justify-center">

          {/* 3 DOTS BUTTON */}
          <button
            aria-label="Actions"
            className="
          p-2 rounded-lg
          hover:bg-gray-100
          transition duration-200
        "
          >
            <HiOutlineDotsHorizontal
              size={20}
              className="text-gray-600"
            />
          </button>

          {/* DROPDOWN MENU */}
          <div
            className="
          absolute right-0 top-10
          w-40 bg-white
          border border-gray-100
          rounded-2xl
          shadow-xl
          opacity-0 invisible
          translate-y-2
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
          transition-all duration-200
          z-50
        "
          >

            {/* EDIT */}
            <button
              onClick={() => {
                const room = rooms.find((r: any) => r._id === id);

                setEditData(room);
                setIsEdit(true);
                setIsAddOpen(true);
              }}
              className="
            flex items-center gap-3
            w-full px-4 py-3
            text-sm text-gray-700
            hover:bg-gray-50
            rounded-t-2xl
            transition
          "
            >
              <FiEdit2 size={16} />
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={() => {
                setIsOpen(true);
                setSelectedId(id);
              }}
              className="
            flex items-center gap-3
            w-full px-4 py-3
            text-sm text-red-500
            hover:bg-red-50
            rounded-b-2xl
            transition
          "
            >
              <RiDeleteBinLine size={16} />
              Delete
            </button>

          </div>
        </div>
      ),
    },
  ];

  // ================= FORM FIELDS =================
  const roomFields = [
    { name: "roomNumber", label: "Room Number", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "capacity", label: "Capacity", type: "number" },
    { name: "discount", label: "Discount", type: "number" },
    { name: "facilities", label: "Facilities", type: "select" },
    { name: "imgs", label: "Images", type: "file" },
  ];

  return (
    <>
      {/* ✅ ADD + EDIT MODAL */}
      <AdminFormAddModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setIsEdit(false);
          setEditData(null);
        }}
        endpoint={
          isEdit
            ? ADMIN_URLS.UPDATE_ROOM(editData?._id)
            : ADMIN_URLS.ADD_ROOM
        }
        fields={roomFields}
        onSuccess={getRooms}
        defaultValues={
          isEdit
            ? {
              roomNumber: editData?.roomNumber,
              price: editData?.price,
              capacity: editData?.capacity,
              discount: editData?.discount,
              // 👇 IMPORTANT FIX 1: facilities ids only
              facilities: editData?.facilities?.map((f: any) => f._id),

              // 👇 IMPORTANT FIX 2: images keep existing (for edit UI only)
              imgs: editData?.images,

            }
            : {}
        }
        isEdit={isEdit}
        title="Room"
      />

      {/* ✅ DELETE MODAL */}
      <DeleteModal
        isOpen={isOpen}
        title="Delete Room"
        description="Are you sure you want to delete this room?"
        loading={loadingg}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />

      {/* ✅ HEADER */}
      <AdminHeader
        title="Room"
        onAdd={() => setIsAddOpen(true)}
      />

      {/* ✅ TABLE & PAGINATION */}
      {loading ? (
        <p className="p-5"><Loader /></p>
      ) : (
        <>
          <AdminTable columns={columns} data={rooms} />
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

export default RoomsList;