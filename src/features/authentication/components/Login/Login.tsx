import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../../../shared/components/Input/Input";
import { axiosInstance, USERS_URLS } from "../../../../constants/urls/Urls";
import AuthFormHeader from "../shared/AuthFormHeader";
import AuthButton from "../shared/AuthButton";
import FormAlert from "../shared/FormAlert";
import type { LoginFormValues } from "../../types/auth.types";
import { emailValidation, passwordValidation } from "../../../../constants/validation/validation";
import { toast } from "sonner";
import { setCredentials } from "../../../../store/slices/authSlice";

// ==================
// COMPONENT
// ==================
function Login() {
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
      }
      // console.log(response);
      toast.success(response.data?.data?.message ||"Logged in successfully");
      // navigate("/dashboard/home", { replace: true });
    } catch (err: any) {
      setApiError(err.response?.data?.message || "An error occurred. Please try again.");
      toast.error(err.response?.data?.message ||"Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };
    useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard/home", { replace: true });
    }
  }, []);

  return (
    <div className="w-full p-8">
      <AuthFormHeader
        title="Sign in"
        subtitle="Don't have an account?"
        linkText="Register here!"
        linkTo="/register"
      />
     

      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          register={register("email", emailValidation)}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password", passwordValidation)}
          error={errors.password}
        />

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end -mt-1">
          <Link to="/forgotPassword" className="text-sm text-[#4D4D4D] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <AuthButton isLoading={isLoading} label="Sign in" loadingLabel="Signing in..." />
      </form>
    </div>
  );
}

export default Login;