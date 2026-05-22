import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { USER_URLS, axiosInstance } from "../../../../constants/urls/Urls";
import { FaCheckCircle, FaUser, FaDollarSign, FaTags, FaArrowLeft, FaBed, FaStar } from "react-icons/fa";
import { toast } from "sonner";
import { useAppSelector } from "../../../../store/hooks";

function RoomDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string>("");

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const isUser = isAuthenticated && user?.role === 'user';

    useEffect(() => {
        const fetchRoomDetails = async () => {
            setIsLoading(true);
            try {
                const res = await axiosInstance.get(USER_URLS.GET_ROOM_DETAILS(id));
                const roomData = res.data?.data?.room || res.data?.data || res.data;
                setRoom(roomData);
                if (roomData?.images?.length > 0) {
                    setActiveImage(roomData.images[0]);
                }
            } catch (error) {
                console.error("Error fetching room details:", error);
                toast.error("Failed to load room details");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchRoomDetails();
        }
    }, [id]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return toast.error("Comment cannot be empty");
        
        setIsSubmittingComment(true);
        try {
            await axiosInstance.post(USER_URLS.CREATE_COMMENT, {
                roomId: id,
                comment
            });
            toast.success("Comment added successfully!");
            setComment("");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add comment");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleAddReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!review.trim()) return toast.error("Review cannot be empty");
        
        setIsSubmittingReview(true);
        try {
            await axiosInstance.post(USER_URLS.CREATE_REVIEW, {
                roomId: id,
                rating,
                review
            });
            toast.success("Review added successfully!");
            setReview("");
            setRating(5);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add review");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 py-16 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-lg font-medium">Loading Room Details...</p>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="container mx-auto px-6 py-32 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Room Not Found</h2>
                <p className="text-gray-500 mb-8">The room you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-[var(--color-adminMainColor)] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const priceAfterDiscount = room.discount ? room.price - (room.price * (room.discount / 100)) : room.price;

    return (
        <section className="container mx-auto px-6 py-10">
            {/* ================= HEADER ================= */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-adminMainColor)] mb-4 transition"
                >
                    <FaArrowLeft />
                    Back
                </button>

                <h1 className="text-4xl font-bold text-gray-900">
                    Room {room.roomNumber}
                </h1>

                <p className="text-gray-500 mt-2">
                    Enjoy a premium and comfortable experience.
                </p>
            </div>

            {/* ================= IMAGES ================= */}
            <div className="mb-10">
                <div className="w-full h-[450px] rounded-3xl overflow-hidden">
                    <img
                        src={activeImage || "https://via.placeholder.com/1000"}
                        alt="Room"
                        className="w-full h-full object-cover"
                    />
                </div>

                {room.images && room.images.length > 1 && (
                    <div className="flex gap-4 mt-4 overflow-x-auto">
                        {room.images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`w-28 h-24 rounded-2xl overflow-hidden border-2 shrink-0 transition
                            ${activeImage === img
                                        ? "border-[var(--color-adminMainColor)]"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt="thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= CONTENT ================= */}
            <div className="flex flex-col lg:flex-row gap-10 items-start">

                {/* ================= LEFT SIDE ================= */}
                <div className="flex-1 space-y-10">

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Description
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Experience luxury and comfort in this premium room.
                            Perfect for relaxing stays with modern facilities
                            and elegant interior design.
                        </p>
                    </div>

                    {/* Facilities */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-5">
                            Room Facilities
                        </h2>

                        {room.facilities && room.facilities.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {room.facilities.map((facility: any) => (
                                    <div
                                        key={facility._id}
                                        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4"
                                    >
                                        <FaCheckCircle className="text-[var(--color-adminMainColor)]" />

                                        <span className="text-gray-700 font-medium">
                                            {facility.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No facilities available.
                            </p>
                        )}
                    </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="w-full lg:w-[380px] sticky top-24">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

                        {/* Price */}
                        <div className="mb-6">
                            {room.discount > 0 ? (
                                <>
                                    <span className="text-gray-400 line-through text-lg">
                                        ${room.price}
                                    </span>

                                    <h2 className="text-5xl font-bold text-[var(--color-adminMainColor)]">
                                        ${priceAfterDiscount.toFixed(2)}
                                    </h2>
                                </>
                            ) : (
                                <h2 className="text-5xl font-bold text-[var(--color-adminMainColor)]">
                                    ${room.price}
                                </h2>
                            )}

                            <p className="text-gray-500 mt-1">
                                per night
                            </p>
                        </div>

                        {/* Discount */}
                        <div className="flex items-center justify-between py-4 border-t border-gray-100">
                            <span className="text-gray-500">Discount</span>

                            <span className="font-semibold text-gray-900">
                                {room.discount ? `${room.discount}%` : "No Discount"}
                            </span>
                        </div>

                        {/* Start Date */}
                        <div className="flex items-center justify-between py-4 border-t border-gray-100">
                            <span className="text-gray-500">Start Date</span>

                            <span className="font-semibold text-gray-900">
                                12 Aug 2026
                            </span>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
                            <span className="text-gray-500">End Date</span>

                            <span className="font-semibold text-gray-900">
                                15 Aug 2026
                            </span>
                        </div>

                        {/* Booking Button */}
                        <button
                            className="w-full mt-8 bg-[var(--color-adminMainColor)] hover:opacity-90 text-white py-4 rounded-2xl font-semibold text-lg transition"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= REVIEWS & COMMENTS SECTION ================= */}
            {isUser && (
                <div className="mt-16 flex flex-col md:flex-row gap-10">
                    
                    {/* LEFT SIDE - Review */}
                    <div className="flex-1 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Review</h3>
                        <form onSubmit={handleAddReview} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar 
                                            key={star}
                                            size={28}
                                            className={`cursor-pointer transition ${star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                                <textarea 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-adminMainColor)] focus:bg-white transition resize-none"
                                    rows={4}
                                    placeholder="Tell us about your experience..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmittingReview}
                                className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-70"
                            >
                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SIDE - Comment */}
                    <div className="flex-1 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Comment</h3>
                        <form onSubmit={handleAddComment} className="space-y-5 h-full flex flex-col">
                            <div className="flex-grow">
                                <label className="block text-gray-700 font-medium mb-2">Your Comment</label>
                                <textarea 
                                    className="w-full h-[152px] bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-adminMainColor)] focus:bg-white transition resize-none"
                                    placeholder="Ask a question or leave a note..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmittingComment}
                                className="bg-[var(--color-adminMainColor)] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-70 mt-auto self-start"
                            >
                                {isSubmittingComment ? "Posting..." : "Post Comment"}
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </section>
    );
}

export default RoomDetails;