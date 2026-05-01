import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import PasswordInput from "../components/ui/PasswordInput";
import Divider from "../components/ui/Divider";
import SocialButton from "../components/ui/SocialButton";
import { useLoginForm } from "../hooks/useLoginForm";
import { loginData } from "../data/loginData";

const LoginPage = () => {
  const {
    formData,
    errors,
    generalError,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center p-5 md:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="w-full max-w-[448px] bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-200/40">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center bg-gradient-to-b from-white to-indigo-50/20">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl mx-auto mb-4 my-20 flex items-center justify-center shadow-md shadow-indigo-200 rotate-3 transition-transform hover:rotate-0 duration-300">
              <img src={loginData.logo.src} alt={loginData.logo.alt} className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {loginData.title}
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            {loginData.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-2 space-y-6">
          {generalError && (
            <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-xl text-sm border-r-4 border-red-500 shadow-sm">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{generalError}</span>
            </div>
          )}

          <InputField
            id={loginData.fields.email.id}
            label={loginData.fields.email.label}
            type={loginData.fields.email.type}
            placeholder={loginData.fields.email.placeholder}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            required
            autoComplete={loginData.fields.email.autoComplete}
            className="transition-all duration-200 focus:scale-[1.01]"
          />

          <div className="space-y-2">
            <PasswordInput
              id={loginData.fields.password.id}
              label={loginData.fields.password.label}
              placeholder={loginData.fields.password.placeholder}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
              autoComplete={loginData.fields.password.autoComplete}
            />
            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 transition-all"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                  {loginData.fields.rememberMe.label}
                </span>
              </label>
              <Link
                to={loginData.links.forgotPassword}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              >
                هل نسيت كلمة المرور؟
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="relative h-12 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 transform active:scale-95 font-semibold text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{loginData.buttons.submitting}</span>
              </div>
            ) : (
              loginData.buttons.submit
            )}
          </Button>
        </form>

        <div className="px-8 my-2">
          <Divider text={loginData.dividerText} className="text-gray-400" />
        </div>

        <div className="px-8 pb-4">
          <SocialButton
            icon={
              <div
                dangerouslySetInnerHTML={{ __html: loginData.googleIconSvg }}
                className="w-5 h-5"
              />
            }
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-11 rounded-xl border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-100 transition-all duration-200 text-gray-700 font-medium"
          >
            {loginData.buttons.google}
          </SocialButton>
        </div>

        <div className="px-8 pb-8 pt-4 text-center border-t border-gray-100 mt-2">
          <p className="text-sm text-gray-600">
            {loginData.footer.noAccount}{" "}
            <Link
              to={loginData.links.register}
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              {loginData.footer.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;