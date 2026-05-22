// TYPES
interface AuthButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

// COMPONENT
function AuthButton({ isLoading, label, loadingLabel }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 cursor-pointer bg-[#3252DF] text-white py-3 rounded-md font-semibold
        hover:bg-[#3252DF]/90 active:scale-[0.98] transition-all duration-150
        disabled:opacity-60 disabled:cursor-not-allowed mt-5 sm:mt-2 "
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {isLoading ? loadingLabel : label}
    </button>
  );
}

export default AuthButton;
