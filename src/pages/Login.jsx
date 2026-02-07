import { useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpUser } = useAuthUser();
  const navigate = useNavigate();
  const backgroundStyle = {
    backgroundImage:
      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDezIF_yMJA_W6Qc1NmoAXNTF5nkV8wHGWqzkKfdcdxwxbrSbpVZRI_FTdOwPu10kty3bSTeXAGJdOgdNWkYzQ39m9iTfLceZ_HpdbnrEnEBWGzIpqVoSo5hsVdI6Qg61tLdVn08f3YA0bAnayBa3-OKihoWfuSOrrIlPpSSoeu_WhpSMVPIzZIpRfnjs8oL0cqL4n5BPddPsMtqTyoCcE96QSE6_KpjWA4cIzR7M1XpdUi5lGpmxrm6ZjCOAddAcwxrzjSckvQfg8')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Email, contraseña o ID  son obligatorios");
      return;
    }

    setLoading(true);

    try {
      await signUpUser(email, password);
      console.log("Bienvenido");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-[#0d191b] dark:text-white">
        <div className="flex min-h-screen">
          {/*<!-- Left Side: Visual Medical Panel -->*/}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              data-alt="Clean modern pharmacy interior with organized medication shelves"
              style={backgroundStyle}
            ></div>
            <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                  <span className="material-symbols-outlined text-white text-3xl">
                    medical_services
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  PharmaRose
                </h2>
              </div>
              <p className="text-lg font-light leading-relaxed opacity-90">
                Efficient inventory management, sales tracking, and prescription
                handling for modern healthcare providers.
              </p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          </div>
          {/*<!-- Right Side: Login Form -->*/}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-background-dark">
            <div className="w-full max-w-md space-y-8">
              {/*<!-- Header Section -->*/}
              <div className="space-y-2">
                <div className="lg:hidden flex items-center gap-2 mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl font-bold">
                    medical_services
                  </span>
                  <span className="text-xl font-bold tracking-tight">
                    PharmaCore Pro
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">
                    verified_user
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Secure Access
                  </span>
                </div>
                <h1 className="text-3xl font-black tracking-tight @[480px]:text-4xl text-[#0d191b] dark:text-white">
                  Pharmacy Sign In
                </h1>
                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
                  Please enter your credentials to access the management
                  dashboard.
                </p>
              </div>
              {/*<!-- Form Section -->*/}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/*<!-- Username / Email -->*/}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0d191b] dark:text-slate-200 ml-1">
                    Username or Email
                  </label>
                  <div className="group relative flex items-center h-14 w-full">
                    <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        person
                      </span>
                    </div>
                    <input
                      className="w-full h-full pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-[#0d191b] dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white dark:focus:bg-slate-800 transition-all outline-none"
                      placeholder="e.g. johndoe@pharmacy.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {/*<!-- Password -->*/}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-semibold text-[#0d191b] dark:text-slate-200">
                      Password
                    </label>
                    <a
                      className="text-xs font-medium text-primary hover:underline"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="group relative flex items-center h-14 w-full">
                    <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        lock
                      </span>
                    </div>
                    <input
                      className="w-full h-full pl-12 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-[#0d191b] dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white dark:focus:bg-slate-800 transition-all outline-none"
                      placeholder="••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>
                {/*<!-- Action Button -->*/}
                <div className="pt-4">
                  <button
                    disabled={loading}
                    className="cursor-pointer w-full h-14 bg-primary hover:bg-primary/90 text-[#0d191b] font-bold text-lg rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Sign In</span>
                    <span className="material-symbols-outlined">login</span>
                  </button>
                </div>
              </form>
              {/*<!-- Footer Links -->*/}
              <Link to="/register" className="hover:text-primary">
                No tienes cuenta?
              </Link>
              <div className="pt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-1"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      help_center
                    </span>
                    Help &amp; Support
                  </a>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-1"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      policy
                    </span>
                    Terms of Service
                  </a>
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full">
                  Version 1.0.2-Build.24
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
