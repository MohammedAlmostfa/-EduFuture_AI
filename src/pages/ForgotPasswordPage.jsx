// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';

// SVG Icons

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: verification code
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [emailError, setEmailError] = useState('');

  // محاكاة إرسال رمز التأكيد
  const sendVerificationCode = async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes('@')) {
          console.log(`تم إرسال رمز التأكيد إلى ${email}: 123456`);
          resolve({ success: true });
        } else {
          reject({ message: 'البريد الإلكتروني غير صالح' });
        }
      }, 1500);
    });
  };

  // محاكاة التحقق من الرمز
  const verifyCode = async (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({ success: true });
        } else {
          reject({ message: 'رمز التأكيد غير صحيح' });
        }
      }, 1500);
    });
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('البريد الإلكتروني مطلوب');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('البريد الإلكتروني غير صالح');
      return;
    }
    setEmailError('');
    setIsLoading(true);
    setError('');
    try {
      await sendVerificationCode(email);
      setSuccessMessage('تم إرسال رمز التأكيد إلى بريدك الإلكتروني');
      setStep(2);
      // بدء العد التنازلي 60 ثانية لإعادة الإرسال
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء إرسال الرمز');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('الرجاء إدخال رمز التأكيد');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await verifyCode(verificationCode);
      setSuccessMessage('تم التحقق بنجاح! سيتم توجيهك لتعيين كلمة مرور جديدة');
      setTimeout(() => {
        navigate('/reset-password', { state: { email, code: verificationCode } });
      }, 1500);
    } catch (err) {
      setError(err.message || 'رمز التأكيد غير صحيح');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    setError('');
    try {
      await sendVerificationCode(email);
      setSuccessMessage('تم إعادة إرسال الرمز');
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || 'فشل إعادة إرسال الرمز');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 md:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="w-full max-w-[448px] bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-200/40">
        {/* Header with icon */}
        <div className="px-8 pt-10 pb-6 text-center bg-gradient-to-b from-white to-indigo-50/20">
          <div className="flex justify-center mb-5">
             <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl mx-auto mb-4 my-20 flex items-center justify-center shadow-md shadow-indigo-200 rotate-3 transition-transform hover:rotate-0 duration-300">
         <img src="/src/assets/logo.png" alt="EduFuture AI Logo" className="w-12 h-12" />
        </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            استعادة كلمة المرور
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            {step === 1
              ? 'أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق'
              : 'أدخل رمز التأكيد المرسل إلى بريدك'}
          </p>
        </div>

        {/* Step 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className="px-8 pt-6 pb-8 space-y-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-xl text-sm border-r-4 border-red-500 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
              id="email"
              label="البريد الإلكتروني"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              disabled={isLoading}
              autoComplete="email"
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
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>جاري الإرسال...</span>
                </div>
              ) : (
                'إرسال رمز التحقق'
              )}
            </Button>
          </form>
        )}

        {/* Step 2: Verification Code Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="px-8 pt-6 pb-8 space-y-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-xl text-sm border-r-4 border-red-500 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
              id="code"
              label="رمز التأكيد"
              type="text"
              placeholder="أدخل الرقم المكون من 6 أرقام"
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
                {countdown > 0 ? `إعادة إرسال الرمز بعد ${countdown} ثانية` : 'إعادة إرسال الرمز'}
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
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>جاري التحقق...</span>
                </div>
              ) : (
                'تحقق من الرمز'
              )}
            </Button>
          </form>
        )}

        {/* Links back to login */}
        <div className="px-8 pb-8 pt-2 text-center border-t border-gray-100 mt-2">
          <p className="text-sm text-gray-600">
            تذكرت كلمة المرور؟{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;