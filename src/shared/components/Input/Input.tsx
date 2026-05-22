import React, { InputHTMLAttributes, useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

// TYPES
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | string;
  register?: UseFormRegisterReturn;
}

// COMPONENT
const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  type = "text",
  className = "",
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const errorMessage = typeof error === "string" ? error : error?.message;

  // Use the provided id or fall back to register name for label/input association
  const inputId = id || (register as any)?.name;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* LABEL */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[#152C5B] mb-1 tracking-wider "
        >
          {label}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-400 placeholder:text-sm
            ${
              errorMessage
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
            ${isPassword ? "pr-11" : ""}
          `}
          {...(register || {})}
          {...props}
        />

        {/* PASSWORD TOGGLE */}
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              // Eye-slash icon (hide password)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              // Eye icon (show password)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;