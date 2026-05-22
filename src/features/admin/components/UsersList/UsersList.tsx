import { useEffect, useState } from "react";
import AdminTable from "../shared/AdminTable";
import { ADMIN_URLS } from "../../../../constants/urls/Urls";
import { axiosInstance } from "../../../../constants/urls/Urls";
import AdminHeader from "../shared/AdminHeader";
import Pagination from '../shared/Pagination';
import Loader from "../../../../shared/components/Loader/Loader";

type User = {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    country: string;
    role: string;
    profileImage: string;
};

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    // Pagination states
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // ==================
    // FETCH USERS
    // ==================
    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(ADMIN_URLS.GET_USERS, {
                params: { page, size: 10 }
            });


            setUsers(res.data.data.users);
            setTotalCount(res.data.data.totalCount || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, [page]);



    // ==================
    // TABLE COLUMNS
    // ==================
    const columns = [
        // { header: "ID", accessor: "id" },
        {
            header: "Image",
            accessor: "profileImage",
            render: (img: string) => (
                <img
                    src={img || "/default-avatar.png"}
                    alt="User profile"
                    loading="lazy"
                    className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
                />
            )
        },
        { header: "Username", accessor: "userName" },
        { header: "Email", accessor: "email" },
        { header: "Phone", accessor: "phoneNumber" },
        { header: "Country", accessor: "country" },
        { header: "role", accessor: "role" },
        // { header: "Created At", accessor: "createdAt" },

    ];

    // ==================
    // RENDER
    // ==================
    return (
        <>
            <AdminHeader title="Users" />
            <div className="">

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <AdminTable columns={columns} data={users} />
                        <Pagination
                            currentPage={page}
                            totalCount={totalCount}
                            onPageChange={setPage}
                        />
                    </>
                )}

            </div>
        </>
    );
}

export default UsersList;