import { useEffect, useState } from "react";
import { USER_URLS, axiosInstance } from "../../../../constants/urls/Urls";
import { useAppSelector } from "../../../../store/hooks";
import { FaHeart, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function PopularAds() {
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const isUserRole = isAuthenticated && user?.role === 'user';

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await axiosInstance.get(USER_URLS.GET_ADS);
                setAds(res.data.data.ads || res.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    const handleAddToFavorites = async (roomId: string) => {
        try {
            await axiosInstance.post(USER_URLS.ADD_FAVORITE_ROOM, { roomId });
            toast.success(t('explore_addFavSuccess'));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to add room to favorites");
        }
    };

    const validAds = ads.filter((ad) => ad && ad.room);

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[500px] text-gray-500">
                <div className="animate-pulse flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p>{t('popular_loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-6 py-16">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    {t('popular_title')} <span className="text-[var(--color-adminMainColor)]">{t('popular_titleHighlight')}</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('popular_desc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {validAds.slice(0, 6).map((ad) => (
                    <div key={ad._id} className="relative overflow-hidden rounded-2xl group shadow-lg h-[320px] bg-white border border-gray-100">
                        <img src={ad.room.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt={`${t('explore_room')} ${ad.room.roomNumber}`} />

                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full font-bold shadow-lg text-sm z-10 flex items-center gap-1">
                            <span className="text-[var(--color-adminMainColor)]">${ad.room.price}</span> {t('explore_perNight')}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                            {isUserRole && (
                                <button onClick={() => handleAddToFavorites(ad.room._id)} className="bg-white/20 hover:bg-white/40 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white" title={t('explore_addFavorite')} aria-label={t('explore_addFavorite')}>
                                    <FaHeart size={20} />
                                </button>
                            )}
                            <button onClick={() => navigate(`/room-details/${ad.room._id}`)} className="bg-[var(--color-adminMainColor)] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white" title={t('explore_viewDetails')} aria-label={t('explore_viewDetails')}>
                                <FaEye size={20} />
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-white text-2xl font-bold mb-1 drop-shadow-md">{t('explore_room')} {ad.room.roomNumber}</h3>
                                    <p className="text-gray-300 text-sm font-medium">{t('popular_premiumSuite')} • {ad.room.capacity} {t('explore_guests')}</p>
                                </div>
                                {ad.room.discount > 0 && (
                                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">{ad.room.discount}% OFF</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}