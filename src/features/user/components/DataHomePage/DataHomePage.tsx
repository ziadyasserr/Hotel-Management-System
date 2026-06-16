import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight, FaStar, FaQuoteLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function DataHomePage() {
    const { t } = useTranslation();

    const getOptimizedUnsplashUrl = (url: string, width = 400) => {
        if (!url || !url.includes("unsplash.com")) return url;
        const baseUrl = url.split("?")[0];
        return `${baseUrl}?auto=format&fit=crop&w=${width}&q=75`;
    };

    const renderTitle = (key: string) => {
        const title = t(key);
        const parts = title.split("|");
        if (parts.length > 1) {
            return (
                <>
                    {parts[0]}
                    <span className="text-[var(--color-adminMainColor)]">
                        {parts[1]}
                    </span>
                </>
            );
        }
        return title;
    };

    const backyardHouses = [
        {
            id: 1,
            name: "Modern Family House",
            address: "California, USA",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200",
        },
        // {
        //     id: 2,
        //     name: "Luxury Garden Villa",
        //     address: "Miami, USA",
        //     image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200",
        // },
        {
            id: 3,
            name: "Backyard Dream Home",
            address: "Texas, USA",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
        },
        {
            id: 4,
            name: "Elegant Residence",
            address: "New York, USA",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
        },
        {
            id: 5,
            name: "Green View Villa",
            address: "Florida, USA",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
        },
        {
            id: 6,
            name: "Luxury Backyard House",
            address: "Chicago, USA",
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200",
        },
        {
            id: 7,
            name: "Premium Home",
            address: "Los Angeles, USA",
            image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1200",
        },
        {
            id: 8,
            name: "Modern Villa",
            address: "Seattle, USA",
            image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200",
        },
        {
            id: 9,
            name: "Classic Family House",
            address: "Arizona, USA",
            image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200",
        },
        {
            id: 10,
            name: "Dream Backyard",
            address: "Nevada, USA",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
        },
    ];

    const livingRoomHotels = [
        {
            id: 1,
            name: "Modern Living Suite",
            address: "Tokyo, Japan",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
        },
        {
            id: 2,
            name: "Cozy Lounge Hotel",
            address: "Paris, France",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
        },
        {
            id: 3,
            name: "Luxury Penthouse Living",
            address: "London, UK",
            image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200",
        },
        {
            id: 4,
            name: "Scandinavian Living Suite",
            address: "Stockholm, Sweden",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
        },
        {
            id: 5,
            name: "Minimalist Elegant Suite",
            address: "Berlin, Germany",
            image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200",
        },
        {
            id: 6,
            name: "Grand Royal Suite",
            address: "Dubai, UAE",
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
        },
        {
            id: 7,
            name: "Contemporary Room Suite",
            address: "Sydney, Australia",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        },
        {
            id: 8,
            name: "Warm Wooden Lounge",
            address: "Vancouver, Canada",
            image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200",
        },
        {
            id: 9,
            name: "Bright Sunlight Suite",
            address: "Rome, Italy",
            image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1200",
        },
        {
            id: 10,
            name: "Elegant Marble Lounge",
            address: "Singapore",
            image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200",
        },
    ];

    const kitchenApartments = [
        {
            id: 1,
            name: "Modern Kitchen Set Flat",
            address: "Amsterdam, Netherlands",
            image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200",
        },
        {
            id: 2,
            name: "Luxury Island Kitchen Studio",
            address: "New York, USA",
            image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200",
        },
        {
            id: 3,
            name: "Scandinavian Kitchen Flat",
            address: "Copenhagen, Denmark",
            image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1200",
        },
        {
            id: 4,
            name: "Minimalist White Kitchen Loft",
            address: "Seoul, South Korea",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
        },
        {
            id: 5,
            name: "Sleek Grey Kitchen Flat",
            address: "Barcelona, Spain",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
        },
        // {
        //     id: 6,
        //     name: "Classic Wooden Cabin Kitchen",
        //     address: "Aspen, USA",
        //     image: "https://images.unsplash.com/photo-1565538810844-1e1194826c86?q=80&w=1200",
        // },
        {
            id: 7,
            name: "Industrial Style Kitchen Loft",
            address: "Chicago, USA",
            image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200",
        },
        {
            id: 8,
            name: "Compact City Apartment Kitchen",
            address: "Hong Kong",
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
        },
        {
            id: 9,
            name: "Luxury Marble Island Studio",
            address: "Zurich, Switzerland",
            image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d2?q=80&w=1200",
        },
        {
            id: 10,
            name: "Ultra-Modern Smart Kitchen Flat",
            address: "San Francisco, USA",
            image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=1200",
        },
    ];

    const adsStays = [
        {
            id: 1,
            name: "Tropical Beach Resort Escape",
            price: 150,
            originalPrice: 200,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
            discount: "25% OFF",
        },
        {
            id: 2,
            name: "Ocean View Villa Getaway",
            price: 180,
            originalPrice: 220,
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
            discount: "18% OFF",
        },
        {
            id: 3,
            name: "Mountain Cabin Cozy Retreat",
            price: 95,
            originalPrice: 120,
            image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200",
            discount: "20% OFF",
        },
        {
            id: 4,
            name: "Desert Oasis Luxury Villa",
            price: 210,
            originalPrice: 280,
            image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
            discount: "25% OFF",
        },
        {
            id: 5,
            name: "Private Infinity Pool Villa",
            price: 320,
            originalPrice: 400,
            image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200",
            discount: "20% OFF",
        },
        {
            id: 6,
            name: "Overwater Bungalow Suite",
            price: 450,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200",
            discount: "25% OFF",
        },
        {
            id: 7,
            name: "Luxury Ski Chalet Getaway",
            price: 160,
            originalPrice: 200,
            image: "https://images.unsplash.com/photo-1518098268026-4e43a1a009de?q=80&w=1200",
            discount: "20% OFF",
        },
        {
            id: 8,
            name: "Boutique City Hotel Stay",
            price: 110,
            originalPrice: 150,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
            discount: "26% OFF",
        },
        {
            id: 9,
            name: "Historic Palace Royal Stay",
            price: 270,
            originalPrice: 350,
            image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200",
            discount: "22% OFF",
        },
        {
            id: 10,
            name: "Modern Forest Eco-Lodge",
            price: 130,
            originalPrice: 170,
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200",
            discount: "23% OFF",
        },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Jane Cooper",
            role: "Family Traveler",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
            rating: 5,
            review: "Staying here was an absolute dream! The backyard was stunning and the kids loved playing there all day. The service was top-notch and we felt completely pampered.",
        },
        {
            id: 2,
            name: "Wade Warren",
            role: "Business Executive",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
            rating: 5,
            review: "I rented the suite with a large living room for a business trip. It was exceptionally spacious, quiet, and perfect for meetings. Highly recommend for any business traveler.",
        },
        {
            id: 3,
            name: "Esther Howard",
            role: "Solo Adventurer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
            rating: 5,
            review: "The apartment kitchen set was beautiful and fully equipped. Cooking my own meals while traveling solo made it feel like a home away from home. Simply amazing!",
        },
        {
            id: 4,
            name: "Albert Flores",
            role: "Couples Getaway",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
            rating: 4,
            review: "Grabbed a special offer for a beach resort. The discount was genuine and the quality exceeded all expectations. We will definitely book through this portal again.",
        },
        {
            id: 5,
            name: "Guy Hawkins",
            role: "Luxury Enthusiast",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
            rating: 5,
            review: "From the stunning villa exterior to the high-tech smart kitchen, everything was impeccable. Truly a premium experience worth every single penny.",
        },
    ];

    return (
        <div className="bg-[#FAF9F6]">
            {/* SECTION 1: Houses with beauty backyard */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {renderTitle("home_backyard_title")}
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        {t("home_backyard_desc")}
                    </p>
                </div>

                <div className="slider-wrapper">
                    <button className="custom-prev prev-backyard">
                        <FaArrowLeft />
                    </button>
                    <button className="custom-next next-backyard">
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".prev-backyard",
                            nextEl: ".next-backyard",
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={25}
                        slidesPerView={5}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                    >
                        {backyardHouses.map((house, idx) => (
                            <SwiperSlide key={house.id}>
                                <div className="group cursor-pointer">
                                    <div className="overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={getOptimizedUnsplashUrl(house.image, 400)}
                                            alt={house.name}
                                            loading={idx < 3 ? "eager" : "lazy"}
                                            fetchPriority={idx < 3 ? "high" : "low" as any}
                                            decoding="async"
                                            className="w-full h-[220px] object-cover transition-all duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--color-adminMainColor)] transition-colors">
                                            {house.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {house.address}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* SECTION 2: Hotels with large living rooms */}
            <section className="container mx-auto px-6 py-16 border-t border-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {renderTitle("home_living_title")}
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        {t("home_living_desc")}
                    </p>
                </div>

                <div className="slider-wrapper">
                    <button className="custom-prev prev-living">
                        <FaArrowLeft />
                    </button>
                    <button className="custom-next next-living">
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".prev-living",
                            nextEl: ".next-living",
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={25}
                        slidesPerView={5}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                    >
                        {livingRoomHotels.map((hotel) => (
                            <SwiperSlide key={hotel.id}>
                                <div className="group cursor-pointer">
                                    <div className="overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={getOptimizedUnsplashUrl(hotel.image, 400)}
                                            alt={hotel.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-[220px] object-cover transition-all duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--color-adminMainColor)] transition-colors">
                                            {hotel.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {hotel.address}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* SECTION 3: Apartments with kitchen set */}
            <section className="container mx-auto px-6 py-16 border-t border-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {renderTitle("home_kitchen_title")}
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        {t("home_kitchen_desc")}
                    </p>
                </div>

                <div className="slider-wrapper">
                    <button className="custom-prev prev-kitchen">
                        <FaArrowLeft />
                    </button>
                    <button className="custom-next next-kitchen">
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".prev-kitchen",
                            nextEl: ".next-kitchen",
                        }}
                        autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={25}
                        slidesPerView={5}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                    >
                        {kitchenApartments.map((apt) => (
                            <SwiperSlide key={apt.id}>
                                <div className="group cursor-pointer">
                                    <div className="overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={getOptimizedUnsplashUrl(apt.image, 400)}
                                            alt={apt.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-[220px] object-cover transition-all duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--color-adminMainColor)] transition-colors">
                                            {apt.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {apt.address}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* SECTION 4: Ads (Special Offers) */}
            <section className="container mx-auto px-6 py-16 border-t border-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {renderTitle("home_ads_title")}
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        {t("home_ads_desc")}
                    </p>
                </div>

                <div className="slider-wrapper">
                    <button className="custom-prev prev-ads">
                        <FaArrowLeft />
                    </button>
                    <button className="custom-next next-ads">
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".prev-ads",
                            nextEl: ".next-ads",
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={25}
                        slidesPerView={4}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        {adsStays.map((ad) => (
                            <SwiperSlide key={ad.id}>
                                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={getOptimizedUnsplashUrl(ad.image, 500)}
                                            alt={ad.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow">
                                            {ad.discount}
                                        </span>
                                        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[var(--color-adminMainColor)] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow">
                                            {t("home_ads_badge")}
                                        </span>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-adminMainColor)] transition-colors line-clamp-1">
                                            {ad.name}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-2xl font-black text-gray-900">
                                                ${ad.price}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                ${ad.originalPrice}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-auto">
                                                / night
                                            </span>
                                        </div>
                                        <button className="mt-5 w-full bg-gray-900 hover:bg-[var(--color-adminMainColor)] text-white text-sm font-semibold py-3 px-4 rounded-2xl transition-all duration-300">
                                            {t("home_ads_bookNow")}
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* SECTION 5: Happy Clients (Testimonials with Swiper) */}
            <section className="container mx-auto px-6 py-16 border-t border-gray-100 pb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {renderTitle("home_testimonials_title")}
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        {t("home_testimonials_desc")}
                    </p>
                </div>

                <div className="slider-wrapper max-w-5xl mx-auto">
                    <button className="custom-prev prev-testimonials">
                        <FaArrowLeft />
                    </button>
                    <button className="custom-next next-testimonials">
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        navigation={{
                            prevEl: ".prev-testimonials",
                            nextEl: ".next-testimonials",
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                        }}
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="pb-12">
                                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow border border-gray-50 relative h-full flex flex-col">
                                    <span className="absolute top-8 right-8 text-gray-100">
                                        <FaQuoteLeft size={40} />
                                    </span>
                                    <div className="flex items-center gap-1 mb-5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < item.rating ? "text-yellow-400" : "text-gray-200"}
                                                size={16}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 italic text-base leading-relaxed flex-1 mb-8">
                                        "{item.review}"
                                    </p>
                                    <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                                        <img
                                            src={getOptimizedUnsplashUrl(item.image, 100)}
                                            alt={item.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-14 h-14 rounded-full object-cover border-2 border-white ring-4 ring-gray-100"
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-[var(--color-adminMainColor)] font-semibold uppercase tracking-wider mt-0.5">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
}

export default DataHomePage;