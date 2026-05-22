import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../../../../shared/components/Input/Input";
import { axiosInstance, USERS_URLS } from "../../../../constants/urls/Urls";
import AuthFormHeader from "../shared/AuthFormHeader";
import AuthButton from "../shared/AuthButton";
import FormAlert from "../shared/FormAlert";
import type { RegisterFormValues } from "../../types/auth.types";
import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  userNameValidation,
  phoneValidation,
  countryValidation,
} from "../../../../constants/validation/validation";

// ==================
// COMPONENT
// ==================
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { role: "user" },
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const password = watch("password");

  // ---- preview image on selection ----
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("country", data.country);
      formData.append("role", data.role);

      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      await axiosInstance.post(USERS_URLS.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/login");
    } catch (err: any) {
      setApiError(
        err.response?.data?.message ?? "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      <AuthFormHeader
        title="Create account"
        subtitle="Already have an account?"
        linkText="Sign in here!"
        linkTo="/login"
      />

      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

        {/* ROW: username + email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            register={register("userName", userNameValidation)}
            error={errors.userName}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            register={register("email", emailValidation)}
            error={errors.email}
          />
        </div>

        {/* ROW: phone + country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            register={register("phoneNumber", phoneValidation)}
            error={errors.phoneNumber}
          />
          <Input
            label="Country"
            type="text"
            placeholder="Enter your country"
            register={register("country", countryValidation)}
            error={errors.country}
          />
        </div>

        {/* ROW: password + confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            placeholder="Create password"
            register={register("password", passwordValidation)}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            register={register("confirmPassword", confirmPasswordValidation(password))}
            error={errors.confirmPassword}
          />
        </div>

        {/* hidden role field — value set via defaultValues */}
        <input type="hidden" {...register("role")} />

        {/* PROFILE IMAGE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#152C5B] tracking-wider">
            Profile Image
          </label>

          <label
            htmlFor="profileImage"
            className={`flex items-center gap-4 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
              ${errors.profileImage ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-[#3252DF] hover:bg-blue-50"}
            `}
          >
            {/* Avatar preview */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {previewUrl ? "Change photo" : "Upload profile photo"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF up to 5MB</p>
            </div>

            {/* Hidden file input */}
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="sr-only"
              {...register("profileImage", { required: "Profile image is required" })}
              onChange={(e) => {
                register("profileImage").onChange(e);
                handleImageChange(e);
              }}
            />
          </label>

          {errors.profileImage && (
            <span className="text-red-500 text-xs mt-0.5">
              {errors.profileImage.message as string}
            </span>
          )}
        </div>

        <AuthButton isLoading={isLoading} label="Create account" loadingLabel="Creating account..." />
      </form>
    </div>
  );
}

export default Register;