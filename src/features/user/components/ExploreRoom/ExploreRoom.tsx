import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { USER_URLS, axiosInstance } from "../../../../constants/urls/Urls";
import { FaEye, FaHeart } from "react-icons/fa";
import { useAppSelector } from "../../../../store/hooks";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function ExploreRoom() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const [rooms, setRooms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const isUserRole = isAuthenticated && user?.role === 'user';

    const handleAddToFavorites = async (roomId: string) => {
        try {
            await axiosInstance.post(USER_URLS.ADD_FAVORITE_ROOM, { roomId });
            toast.success(t('explore_addFavSuccess'));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to add room to favorites");
        }
    };

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);
            try {
                const params: any = { page: 1, size: 20 };
                if (startDate && endDate) { params.startDate = startDate; params.endDate = endDate; }
                const res = await axiosInstance.get(USER_URLS.GET_AVAILABLE_ROOMS, { params });
                const data = res.data?.data;
                setRooms(data?.rooms || data || []);
            } catch (error) {
                setRooms([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRooms();
    }, [startDate, endDate]);

    return (
        <section className="container mx-auto px-6 py-16">
            <div className="mb-10">
                <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                    {t('explore_title')} <span className="text-[var(--color-adminMainColor)]">{t('explore_titleHighlight')}</span>
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                    {startDate && endDate
                        ? t('explore_filterDesc', { startDate, endDate })
                        : t('explore_defaultDesc')}
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[300px] bg-gray-200 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : rooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room) => (
                        <div key={room._id} className="relative overflow-hidden rounded-2xl group shadow-lg h-[300px]">
                            <img src={room.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt={`${t('explore_room')} ${room.roomNumber}`} />

                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full font-bold shadow-lg text-sm z-10 flex items-center gap-1">
                                <span className="text-[var(--color-adminMainColor)]">${room.price}</span> {t('explore_perNight')}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                                {isUserRole && (
                                    <button onClick={() => handleAddToFavorites(room._id)} className="bg-white/20 hover:bg-white/40 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white" title={t('explore_addFavorite')} aria-label={t('explore_addFavorite')}>
                                        <FaHeart size={20} />
                                    </button>
                                )}
                                <button onClick={() => navigate(`/room-details/${room._id}`)} className="bg-[var(--color-adminMainColor)] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white" title={t('explore_viewDetails')} aria-label={t('explore_viewDetails')}>
                                    <FaEye size={20} />
                                </button>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-white text-2xl font-bold mb-1 drop-shadow-md">{t('explore_room')} {room.roomNumber}</h3>
                                        <p className="text-gray-300 text-sm font-medium">{t('explore_capacity')}: {room.capacity} {t('explore_guests')}</p>
                                    </div>
                                    {room.discount > 0 && (
                                        <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">{room.discount}% OFF</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-32 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-6xl mb-4">📭</div>
                    <h4 className="text-3xl font-bold text-gray-700 mb-3">{t('explore_noRooms')}</h4>
                    <p className="text-gray-500 text-lg">{t('explore_noRoomsDesc')}</p>
                </div>
            )}
        </section>
    );
}

export default ExploreRoom;