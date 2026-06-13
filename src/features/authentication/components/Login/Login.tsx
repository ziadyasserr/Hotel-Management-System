import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

import Input from "../../../../shared/components/Input/Input";
import { axiosInstance, USERS_URLS } from "../../../../constants/urls/Urls";
import AuthFormHeader from "../shared/AuthFormHeader";
import AuthButton from "../shared/AuthButton";
import FormAlert from "../shared/FormAlert";
import type { LoginFormValues } from "../../types/auth.types";
import { emailValidation, passwordValidation } from "../../../../constants/validation/validation";
import { toast } from "sonner";
import { setCredentials } from "../../../../store/slices/authSlice";
import { useAppDispatch } from "../../../../store/hooks";

// ==================
// COMPONENT
// ==================
function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);

      const token = response.data?.data?.token;

      if (token) {
        const cleanToken = token.replace("Bearer ", "");

        localStorage.setItem("token", cleanToken);

        dispatch(setCredentials({ token: cleanToken }));

        toast.success(t("auth_loginSuccess"));

        const decoded: any = jwtDecode(cleanToken);

        if (decoded?.role === "admin") {
          navigate("/dashboard/home", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || "An error occurred. Please try again.");
      toast.error(err.response?.data?.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      <AuthFormHeader
        title={t("auth_signIn")}
        subtitle={t("auth_noAccount")}
        linkText={t("auth_registerHere")}
        linkTo="/register"
      />

      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Input
          label={t("auth_email")}
          type="email"
          placeholder={t("auth_emailPlaceholder")}
          register={register("email", emailValidation)}
          error={errors.email}
        />

        <Input
          label={t("auth_password")}
          type="password"
          placeholder={t("auth_passwordPlaceholder")}
          register={register("password", passwordValidation)}
          error={errors.password}
        />

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end -mt-1">
          <Link to="/forgotPassword" className="text-sm text-[#4D4D4D] hover:underline">
            {t("auth_forgotPassword")}
          </Link>
        </div>

        <AuthButton isLoading={isLoading} label={t("auth_signInBtn")} loadingLabel={t("auth_signingIn")} />
      </form>
    </div>
  );
}

export default Login;