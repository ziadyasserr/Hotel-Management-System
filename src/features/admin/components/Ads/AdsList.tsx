import { useEffect, useState } from 'react';
import AdminHeader from '../shared/AdminHeader';
import { ADMIN_URLS, axiosInstance } from "../../../../constants/urls/Urls";
import AdminTable from '../shared/AdminTable';
import DeleteModal from '../shared/DeleteModal';
import AdminFormAddModal from '../shared/AdminFormAddModal';
import Pagination from '../shared/Pagination';
import Loader from '../../../../shared/components/Loader/Loader';
import { toast } from 'sonner';

function AdsList() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // ✅ ADD MODAL
  const [isAddOpen, setIsAddOpen] = useState(false);

  // ✅ DELETE MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ================= GET ADS =================
  const getAds = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get(ADMIN_URLS.GET_ADS, {
        params: { page, size: 10 }
      });
      setAds(res.data.data.ads || res.data.data);
      setTotalCount(res.data.data.totalCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAds();
  }, [page]);

  // ================= DELETE =================
  const handleDelete = async () => {
    if (!selectedId) return;

    setLoadingg(true);

    try {
      await axiosInstance.delete(ADMIN_URLS.DELETE_ADS(selectedId));
      toast.success("Ad deleted successfully");
      getAds();
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoadingg(false);
      setIsOpen(false);
      setSelectedId(null);
    }
  };

  // ================= TABLE =================
  const columns = [
    {
      header: "Room",
      accessor: "room",
      render: (room: any) => room?.roomNumber || "-"
    },
    {
      header: "Discount",
      accessor: "room", // Actually, the response might have discount on the ad itself or inside room. We use the ad's discount. wait, let's just use accessor 'room' to get the full row or accessor 'room.discount'.
      render: (_: any, row: any) => {
        return row.room?.discount || "-"
      }
    },
    {
      header: "Active",
      accessor: "isActive",
      render: (isActive: boolean) => (
        <span className={`px-2 py-1 text-xs rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isActive ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      header: "Created By",
      accessor: "createdBy",
      render: (createdBy: any) => createdBy?.userName || "-"
    },
    {
      header: "Actions",
      accessor: "_id",
      render: (id: string) => (
        <button
          onClick={() => {
            setIsOpen(true);
            setSelectedId(id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      ),
    },
  ];

  // ================= FORM FIELDS =================
  const adFields = [
    { name: "room", label: "Room", type: "text" }, // Handled as select inside modal
    { name: "discount", label: "Discount", type: "number" },
    { name: "isActive", label: "Is Active", type: "boolean" }, // Handled as boolean select inside modal
  ];

  return (
    <>
      {/* ✅ ADD MODAL */}
      <AdminFormAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        endpoint={ADMIN_URLS.ADD_ADS}
        fields={adFields}
        onSuccess={getAds}
        title="Ads"
      />

      {/* ✅ DELETE MODAL */}
      <DeleteModal
        isOpen={isOpen}
        title="Delete Ad"
        description="Are you sure you want to delete this ad?"
        loading={loadingg}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />

      {/* ✅ HEADER */}
      <AdminHeader
        title="Ads"
        onAdd={() => setIsAddOpen(true)}
      />

      {/* ✅ TABLE */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminTable columns={columns} data={ads} />
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

export default AdsList;