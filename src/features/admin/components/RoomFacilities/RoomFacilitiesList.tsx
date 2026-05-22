import { useEffect, useState } from 'react';
import AdminHeader from '../shared/AdminHeader';
import { ADMIN_URLS, axiosInstance } from "../../../../constants/urls/Urls";
import AdminTable from '../shared/AdminTable';
import DeleteModal from '../shared/DeleteModal';
import AdminFormAddModal from '../shared/AdminFormAddModal';
import Pagination from '../shared/Pagination';
import Loader from '../../../../shared/components/Loader/Loader';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { toast } from 'sonner';


function RoomFacilitiesList() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getFacilities = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(ADMIN_URLS.GET_FACILITIES, {
        params: { page, size: 10 }
      });
      setFacilities(res.data.data.facilities || res.data.data);
      setTotalCount(res.data.data.totalCount || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFacilities();
  }, [page]);

  const handleDelete = async () => {
    if (!selectedId) return;

    setLoadingg(true);
    try {
      await axiosInstance.delete(ADMIN_URLS.DELETE_FACILITY(selectedId));
      toast.success("Facility deleted successfully");
      getFacilities();
    } finally {
      setLoadingg(false);
      setIsOpen(false);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    {
      header: "Created By",
      accessor: "createdBy",
      render: (c: any) => c?.userName,
    },
    {
      header: "Actions",
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
                const facility = facilities.find((f: any) => f._id === id);
                setEditData(facility);
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

  const facilityFields = [
    { name: "name", label: "Name", type: "text" },
  ];

  return (
    <>
      <AdminFormAddModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setIsEdit(false);
          setEditData(null);
        }}
        endpoint={
          isEdit
            ? ADMIN_URLS.UPDATE_FACILITY(editData?._id)
            : ADMIN_URLS.ADD_FACILITY
        }
        fields={facilityFields}
        onSuccess={getFacilities}
        defaultValues={
          isEdit ? { name: editData?.name } : {}
        }
        isEdit={isEdit}
        title="facility"
      />

      <DeleteModal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
        loading={loadingg}
      />

      <AdminHeader title="Facilities" onAdd={() => setIsAddOpen(true)} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminTable columns={columns} data={facilities} />
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

export default RoomFacilitiesList;