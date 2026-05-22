import { Outlet, useLocation } from "react-router-dom";

import loginImg from "../../assets/images/login.jpg";
import registerImg from "../../assets/images/register.jpg";
import forgotImg from "../../assets/images/resetPassword.jpg";

// TYPES
interface PageMeta {
  image: string;
  title: string;
  description: string;
}

// PAGE META MAP
const AUTH_PAGES: Record<string, PageMeta> = {
  "/": {
    image: loginImg,
    title: "Sign in to Roamhome",
    description: "Homes as unique as you.",
  },
  "/login": {
    image: loginImg,
    title: "Sign in to Roamhome",
    description: "Homes as unique as you.",
  },
  "/register": {
    image: registerImg,
    title: "Sign up to Roamhome",
    description: "Sign up now and get exclusive access to our services.",
  },
  "/forgotPassword": {
    image: forgotImg,
    title: "Forgot your password?",
    description: "We'll help you recover your account in seconds.",
  },
  "/resetPassword": {
    image: forgotImg,
    title: "Reset your password",
    description: "Set a new password and regain access to your account.",
  },
  "/changePassword": {
    image: forgotImg,
    title: "Change your password",
    description: "Keep your account secure with a strong password.",
  },
};

// COMPONENT
function AuthLayout() {
  const { pathname } = useLocation();
  const page = AUTH_PAGES[pathname] ?? AUTH_PAGES["/login"];

  return (
    <div className="flex min-h-screen">

      {/* LEFT — form panel */}
      <div className="md:w-1/2 w-full flex items-start md:items-center justify-center bg-white overflow-y-auto min-h-screen py-8 px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* RIGHT — decorative image panel (hidden on mobile) */}
      <div
        className="hidden md:flex md:w-1/2 relative items-end justify-start text-white bg-cover bg-center px-16"
        style={{ backgroundImage: `url(${page.image})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        {/* Text content */}
        <div className="relative z-10 text-left max-w-md py-16">
          <h2 className="text-4xl font-bold mb-3 leading-snug">{page.title}</h2>
          <p className="text-gray-200 text-lg">{page.description}</p>
        </div>
      </div>

    </div>
  );
}

export default AuthLayout;