function Loader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative">

        {/* OUTER */}
        <div
          className="
            w-16 h-16
            rounded-full
            border-4 border-gray-200
          "
        />

        {/* SPINNING */}
        <div
          className="
            absolute top-0 left-0
            w-16 h-16
            rounded-full
            border-4
            border-transparent
            border-t-[#1F263E]
            border-r-[#3B82F6]
            animate-spin
          "
        />

      </div>
    </div>
  );
}

export default Loader;