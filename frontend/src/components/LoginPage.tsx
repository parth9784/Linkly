import { useAuthStore } from "../store/useAuthStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
const LogInPage = () => {
  const { loading, logIn } = useAuthStore();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
  });

  const onLogin = async (values: any) => {
    console.log("Submitting form with:", values);
    logIn(values);
  };

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: onLogin,
    });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 ">
                <MessageSquare />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login</h1>
              <p className="text-base-content/60">
                Welcome Back on{" "}
                <span className="font-semibold text-white">Linkly</span>
              </p>
            </div>
          </div>

          <form
            className="space-y-6 flex flex-col items-center "
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="flex flex-col gap-1 w-[300px]">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <label className="input flex items-center gap-2">
                <Mail size={17} />
                <input
                  name="email"
                  type="text"
                  placeholder="jonedoe@gmail.com"
                  className=""
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              {touched.email && errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 w-[300px]">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <label className="input flex items-center gap-2">
                <Lock size={17} />
                <input
                  name="password"
                  type="password"
                  placeholder="*********"
                  className=""
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              {touched.password && errors.password && (
                <p className="text-error text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-[300px] py-2"
              disabled={loading}
            >
              Log In{" "}
              {loading ? (
                <Loader size={15} className="animate-spin text-white" />
              ) : (
                ""
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                SignUp here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default LogInPage;
