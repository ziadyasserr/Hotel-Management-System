import { Link } from "react-router-dom";

// TYPES
interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

// COMPONENT
function AuthFormHeader({ title, subtitle, linkText, linkTo }: AuthFormHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-3">{title}</h1>
      <div className="flex items-center gap-1.5">
        <p className="text-gray-500 text-sm ">
          {subtitle}
        </p>
        <Link
          to={linkTo}
          className="text-[#152C5B] font-semibold hover:underline"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default AuthFormHeader;
