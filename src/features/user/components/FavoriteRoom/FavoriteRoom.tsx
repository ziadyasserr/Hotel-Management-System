import { useEffect, useState } from "react";
import { USER_URLS, axiosInstance } from "../../../../constants/urls/Urls";
import { FaEye, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function FavoriteRoom() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFavorites = async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get(USER_URLS.GET_FAVORITES_ROOM);
            const data = res.data?.data;
            const favRooms = data?.favoriteRooms?.[0]?.rooms || data?.rooms || [];
            setFavorites(favRooms);
        } catch (error) {
            toast.error("Failed to fetch favorite rooms");
            setFavorites([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchFavorites(); }, []);

    const handleRemoveFavorite = async (roomId: string) => {
        try {
            await axiosInstance.delete(USER_URLS.REMOVE_FAVORITE_ROOM(roomId), { data: { roomId } });
            toast.success(t('fav_removedSuccess'));
            setFavorites((prev) => prev.filter((room) => room._id !== roomId));
        } catch (error) {
            toast.error("Failed to remove room from favorites");
        }
    };

    return (
        <section className="container mx-auto px-6 py-16 min-h-screen">
            <div className="mb-10">
                <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                    {t('fav_title')} <span className="text-[var(--color-adminMainColor)]">{t('fav_titleHighlight')}</span>
                </h2>
                <p className="text-gray-500 mt-2 text-lg">{t('fav_desc')}</p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-[300px] bg-gray-200 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((room) => (
                        <div key={room._id} className="relative overflow-hidden rounded-2xl group shadow-lg h-[300px]">
                            <img src={room.images?.[0] || "https://via.placeholder.com/600"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt={`${t('explore_room')} ${room.roomNumber}`} />

                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full font-bold shadow-lg text-sm z-10 flex items-center gap-1">
                                <span className="text-[var(--color-adminMainColor)]">${room.price}</span> {t('explore_perNight')}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                                <button onClick={() => handleRemoveFavorite(room._id)} className="bg-white/20 hover:bg-white/40 text-red-400 hover:text-red-500 p-4 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110" title={t('fav_removeTitle')}>
                                    <FaTrash size={20} />
                                </button>
                                <button onClick={() => navigate(`/room-details/${room._id}`)} className="bg-[var(--color-adminMainColor)] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110" title={t('explore_viewDetails')}>
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
                    <div className="text-6xl mb-4">💔</div>
                    <h4 className="text-3xl font-bold text-gray-700 mb-3">{t('fav_noFavTitle')}</h4>
                    <p className="text-gray-500 text-lg">{t('fav_noFavDesc')}</p>
                </div>
            )}
        </section>
    );
}

export default FavoriteRoom;