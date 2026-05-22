import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../../../shared/components/Input/Input";
import { axiosInstance, USERS_URLS } from "../../../../constants/urls/Urls";
import AuthFormHeader from "../shared/AuthFormHeader";
import AuthButton from "../shared/AuthButton";
import FormAlert from "../shared/FormAlert";
import type { ResetPasswordFormValues } from "../../types/auth.types";
import {
  emailValidation,
  newPasswordValidation,
  confirmPasswordValidation,
  otpValidation,
} from "../../../../constants/validation/validation";

// ==================
// COMPONENT
// ==================
function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormValues>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await axiosInstance.post(USERS_URLS.RESET, data);
      navigate("/login");
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      <AuthFormHeader
        title="Reset password"
        subtitle="Remembered it?"
        linkText="Back to Sign in"
        linkTo="/login"
      />

      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          register={register("email", emailValidation)}
          error={errors.email}
        />

        <Input
          label="OTP Code"
          type="text"
          placeholder="Enter the OTP code from your email"
          register={register("seed", otpValidation)}
          error={errors.seed}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          register={register("password", newPasswordValidation)}
          error={errors.password}
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          register={register("confirmPassword", confirmPasswordValidation(password))}
          error={errors.confirmPassword}
        />

        <AuthButton isLoading={isLoading} label="Reset password" loadingLabel="Resetting..." />

        <div className="text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
            ← Back to Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
