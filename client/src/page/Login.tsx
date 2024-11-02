import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AxiosError } from "axios";
import { LoginUserSchema } from "../validations/staffValidators";
import { useLoginStaff } from "../hooks/useStaff";
import { TextHoverEffect } from "../components/ui/text-hover-effect";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const mutateLoginStaff = useLoginStaff();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(LoginUserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await mutateLoginStaff.mutateAsync(data);
    } catch (error) {
      // Error handling is done in the JSX
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen antialiased">
      <div className="flex items-center justify-center text-white h-80">
        <TextHoverEffect text="NEXUS" />
      </div>

      <div className="rounded-xl shadow-2xl w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white flex flex-col gap-6"
        >
          <div>
            <input
              id="username"
              placeholder="Username"
              {...register("username")}
              type="text"
              className="px-6 py-3 rounded-lg w-full bg-gray-800 bg-opacity-70 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                id="password"
                placeholder="Password"
                {...register("password")}
                type={togglePassword ? "text" : "password"}
                className="px-6 py-3 rounded-lg w-full bg-gray-800 bg-opacity-70 border border-gray-600 focus:border-blue-400 focus:outline-none"
              />
              <MdOutlineRemoveRedEye
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition text-white font-semibold shadow-lg ${
              !isValid || isSubmitting || mutateLoginStaff.isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!isValid || isSubmitting || mutateLoginStaff.isLoading}
          >
            {isSubmitting || mutateLoginStaff.isLoading
              ? "Logging in..."
              : "Submit"}
          </button>

          {mutateLoginStaff.isLoading && (
            <p className="text-yellow-400">Logging in...</p>
          )}

          {mutateLoginStaff.isError &&
            mutateLoginStaff.error instanceof AxiosError && (
              <p className="text-red-500">
                Login failed:{" "}
                {mutateLoginStaff.error.response?.data?.message ||
                  "An error occurred"}
              </p>
            )}

          {mutateLoginStaff.isError &&
            mutateLoginStaff.error instanceof AxiosError &&
            mutateLoginStaff.error.response?.status === 426 && (
              <div className="text-red-500">
                <p>
                  You need to change your password before continuing. Please
                  click below:
                </p>
                <Link
                  to="/change-password"
                  className="block mt-4 w-full py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-lg text-center"
                >
                  Change Password
                </Link>
              </div>
            )}

          {mutateLoginStaff.isSuccess && (
            <p className="text-green-500">Login successful!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
