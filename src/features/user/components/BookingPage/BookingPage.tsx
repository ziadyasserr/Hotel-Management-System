import { useState } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import bookingImage from '../../../../assets/images/booking.png';

function BookingPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState(1);

  const navigate = useNavigate();

  const increaseCapacity = () => {
    setCapacity((prev) => prev + 1);
  };

  const decreaseCapacity = () => {
    if (capacity > 1) {
      setCapacity((prev) => prev - 1);
    }
  };

  const handleExplore = () => {
    if (!startDate || !endDate) {
      alert('Please select both Start Date and End Date!');
      return;
    }

    navigate(
      `/explore?startDate=${startDate}&endDate=${endDate}&capacity=${capacity}`,
    );
  };

  return (
    <section className="relative overflow-hidden py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900 max-w-lg">
                Find Your Perfect Place
                <span className="block text-[var(--color-adminMainColor)] mt-1">
                  To Stay & Relax
                </span>
              </h1>

              <p className="text-gray-500 text-sm lg:text-[15px] leading-7 max-w-md">
                Discover beautiful rooms and comfortable spaces for your next
                vacation. Relax, explore destinations, and create unforgettable
                memories with the people you love.
              </p>
            </div>

            {/* Booking Card */}
            <div className="relative bg-white border border-gray-100 rounded-[28px] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Soft Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-adminMainColor)]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 space-y-5">
                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Check In */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Check In
                    </label>

                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 transition-all duration-300 focus-within:border-[var(--color-adminMainColor)]">
                      <CiCalendarDate className="text-lg text-[var(--color-adminMainColor)]" />

                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-transparent outline-none w-full text-sm text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Check Out */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Check Out
                    </label>

                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 transition-all duration-300 focus-within:border-[var(--color-adminMainColor)]">
                      <CiCalendarDate className="text-lg text-[var(--color-adminMainColor)]" />

                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-transparent outline-none w-full text-sm text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Guests
                  </label>

                  <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3">
                    <button
                      onClick={decreaseCapacity}
                      className="w-9 h-9 rounded-full bg-white border border-gray-100 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaMinus className="text-gray-600 text-[10px]" />
                    </button>

                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800">
                        {capacity}
                      </h3>

                      <p className="text-[11px] text-gray-400">Guests</p>
                    </div>

                    <button
                      onClick={increaseCapacity}
                      className="w-9 h-9 rounded-full bg-[var(--color-adminMainColor)] text-white hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-md"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleExplore}
                  className="w-full py-3 rounded-2xl bg-[var(--color-adminMainColor)] text-white text-sm font-semibold shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  Explore Available Rooms
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative md:flex hidden justify-center lg:justify-end lg:-ml-6">
            {/* Blur */}
            <div className="absolute top-10 left-0 w-40 h-40 bg-[var(--color-adminMainColor)]/10 rounded-full blur-3xl animate-pulse"></div>

            {/* Image Wrapper */}
            <div className="relative group animate-[float_5s_ease-in-out_infinite]">
              {/* Custom Border Shape */}
              <div className="absolute -top-5 -left-5 w-[95%] h-[95%] border-l-[6px] border-t-[6px] border-[var(--color-adminMainColor)]/30 rounded-tl-[50px]"></div>

              {/* Floating Card */}
              <div className="absolute -left-8 top-8 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-4 py-2 z-20">
                <p className="text-[10px] text-gray-400 font-medium">
                  Trusted by
                </p>

                <h4 className="text-base font-bold text-gray-800">
                  10K+ Travelers
                </h4>
              </div>

              {/* Main Image */}
              <img
                src={bookingImage}
                alt="booking"
                className="relative z-10 w-[520px] h-[500px] object-cover rounded-[38px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] transition-all duration-500 group-hover:scale-[1.02]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 rounded-[38px] bg-gradient-to-t from-black/10 via-transparent to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
