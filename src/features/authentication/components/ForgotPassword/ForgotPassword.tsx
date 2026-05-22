import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import Input from "../../../../shared/components/Input/Input";
import { axiosInstance, USERS_URLS } from "../../../../constants/urls/Urls";
import AuthFormHeader from "../shared/AuthFormHeader";
import AuthButton from "../shared/AuthButton";
import FormAlert from "../shared/FormAlert";
import type { ForgotPasswordFormValues } from "../../types/auth.types";
import { emailValidation } from "../../../../constants/validation/validation";

// ==================
// COMPONENT
// ==================
function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await axiosInstance.post(USERS_URLS.RESET_REQUEST, data);
      setIsSuccess(true);
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // SUCCESS STATE
  if (isSuccess) {
    return (
      <div className="w-full p-8">
        <div className="bg-green-50 border border-green-300 text-green-700 px-6 py-6 rounded-xl text-sm">
          <p className="font-semibold text-base mb-1">Check your email!</p>
          <p className="text-green-600">We've sent a password reset link to your inbox.</p>
          <Link to="/login" className="inline-block mt-4 text-blue-600 font-semibold hover:underline">
            ← Back to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      <AuthFormHeader
        title="Forgot password?"
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

        <AuthButton isLoading={isLoading} label="Send reset link" loadingLabel="Sending..." />

        <div className="text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
            ← Back to Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
