import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import Input from "../../../../shared/components/Input/Input";
import { axiosInstance, USERS_URLS } from "../../../../constants/urls/Urls";
import AuthButton from "../shared/AuthButton";
import FormAlert from "../shared/FormAlert";
import type { ChangePasswordFormValues } from "../../types/auth.types";
import {
  oldPasswordValidation,
  newPasswordValidation,
  confirmPasswordValidation,
} from "../../../../constants/validation/validation";

// ==================
// COMPONENT
// ==================
function ChangePassword() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ChangePasswordFormValues>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMsg(null);
    try {
      await axiosInstance.post(USERS_URLS.CHANGE_PASSWORD, data);
      setSuccessMsg("Password changed successfully!");
      reset();
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Change password</h1>
        <p className="text-gray-500 text-sm">Keep your account secure with a strong password.</p>
      </div>

      <FormAlert message={successMsg} variant="success" />
      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter your current password"
          register={register("oldPassword", oldPasswordValidation)}
          error={errors.oldPassword}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          register={register("newPassword", newPasswordValidation)}
          error={errors.newPassword}
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          register={register("confirmPassword", confirmPasswordValidation(newPassword))}
          error={errors.confirmPassword}
        />

        <AuthButton isLoading={isLoading} label="Change password" loadingLabel="Updating..." />
      </form>
    </div>
  );
}

export default ChangePassword;