import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';
import { forgotPasswordData } from '../data/forgotPasswordData';

// مكونات SVG الصغيرة - يمكن جعلها دالة ترجع JSX باستخدام dangerouslySetInnerHTML
// لكن الأفضل إنشاء مكونات صغيرة JSX لسهولة الاستخدام ونظافة الكود
const CheckIcon = () => (
  <div dangerouslySetInnerHTML={{ __html: forgotPasswordData.checkIconSvg }} />
);

const ErrorIcon = () => (
  <div dangerouslySetInnerHTML={{ __html: forgotPasswordData.errorIconSvg }} />
);

const Spinner = () => (
  <div dangerouslySetInnerHTML={{ __html: forgotPasswordData.spinnerSvg }} />
);

const ForgotPasswordPage = () => {
  const {
    step,
    email,
    setEmail,
    verificationCode,
    setVerificationCode,
    isLoading,
    error,
    successMessage,
    countdown,
    emailError,
    handleSendCode,
    handleVerifyCode,
    handleResendCode,
  } = useForgotPasswordForm();

  return (
    <div className="min-h-screen flex items-center justify-center p-5 md:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="w-full max-w-[448px] bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-200/40">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center bg-gradient-to-b from-white to-indigo-50/20">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl mx-auto mb-4 my-20 flex items-center justify-center shadow-md shadow-indigo-200 rotate-3 transition-transform hover:rotate-0 duration-300">
              <img src={forgotPasswordData.logo.src} alt={forgotPasswordData.logo.alt} className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {forgotPasswordData.title}
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            {step === 1 ? forgotPasswordData.step1Subtitle : forgotPasswordData.step2Subtitle}
          </p>
        </div>

        {/* Step 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className="px-8 pt-6 pb-8 space-y-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-xl text-sm border-r-4 border-red-500 shadow-sm">
                <ErrorIcon />
                <span>{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="flex items-center gap-3 bg-green-50 text-green-700 p-3 rounded-xl text-sm border-r-4 border-green-500 shadow-sm">
                <CheckIcon />
                <span>{successMessage}</span>
              </div>
            )}
            <InputField
              id={forgotPasswordData.step1.emailField.id}
              label={forgotPasswordData.step1.emailField.label}
              type={forgotPasswordData.step1.emailField.type}
              placeholder={forgotPasswordData.step1.emailField.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              disabled={isLoading}
              autoComplete={forgotPasswordData.step1.emailField.autoComplete}
              className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className="h-12 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 transform active:scale-95 font-semibold text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  <span>{forgotPasswordData.step1.submittingButton}</span>
                </div>
              ) : (
                forgotPasswordData.step1.submitButton
              )}
            </Button>
          </form>
        )}

        {/* Step 2: Verification Code Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="px-8 pt-6 pb-8 space-y-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-xl text-sm border-r-4 border-red-500 shadow-sm">
                <ErrorIcon />
                <span>{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="flex items-center gap-3 bg-green-50 text-green-700 p-3 rounded-xl text-sm border-r-4 border-green-500 shadow-sm">
                <CheckIcon />
                <span>{successMessage}</span>
              </div>
            )}
            <InputField
              id={forgotPasswordData.step2.codeField.id}
              label={forgotPasswordData.step2.codeField.label}
              type={forgotPasswordData.step2.codeField.type}
              placeholder={forgotPasswordData.step2.codeField.placeholder}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isLoading}
              className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-center text-2xl tracking-widest"
            />
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || isLoading}
                className={`text-sm font-medium transition-colors ${
                  countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-800'
                }`}
              >
                {countdown > 0
                  ? forgotPasswordData.step2.resendButtonWait(countdown)
                  : forgotPasswordData.step2.resendButton}
              </button>
            </div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className="h-12 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 transform active:scale-95 font-semibold text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  <span>{forgotPasswordData.step2.verifyingButton}</span>
                </div>
              ) : (
                forgotPasswordData.step2.verifyButton
              )}
            </Button>
          </form>
        )}

        {/* Links back to login */}
        <div className="px-8 pb-8 pt-2 text-center border-t border-gray-100 mt-2">
          <p className="text-sm text-gray-600">
            {forgotPasswordData.footer.rememberPassword}{' '}
            <Link
              to={forgotPasswordData.footer.loginLink}
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              {forgotPasswordData.footer.loginText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;