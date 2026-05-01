import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import PasswordInput from '../components/ui/PasswordInput';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import SocialButton from '../components/ui/SocialButton';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0: weak, 1: medium, 2: strong

  // حساب قوة كلمة المرور
  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 3);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));

    // تحديث قوة كلمة المرور عند كتابة كلمة المرور
    if (id === 'password') {
      setPasswordStrength(evaluatePasswordStrength(newValue));
    }

    // مسح الخطأ عند الكتابة
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
    if (generalError) setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    } else if (passwordStrength < 2) {
      newErrors.password = 'كلمة المرور ضعيفة، استخدم حروف كبيرة وأرقام ورموز';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'يجب الموافقة على الشروط والأحكام';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // محاكاة API للتسجيل
  const registerApiCall = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email === 'existing@example.com') {
          reject({ message: 'البريد الإلكتروني مسجل مسبقاً' });
        } else {
          resolve({ success: true });
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      await registerApiCall(formData);
      console.log('بيانات التسجيل:', formData);
      alert('تم إنشاء الحساب بنجاح (محاكاة)');
      navigate('/login');
    } catch (error) {
      setGeneralError(error.message || 'حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log('التسجيل عبر Google');
  };

  // ألوان شريط قوة كلمة المرور
  const strengthColors = {
    0: 'bg-error',
    1: 'bg-warning',
    2: 'bg-info',
    3: 'bg-success',
  };
  const strengthText = {
    0: 'ضعيفة',
    1: 'متوسطة',
    2: 'قوية',
    3: 'قوية جداً',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-background via-surface to-background">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header with icon */}
        <div className="px-8 pt-8 pb-4 text-center border-b border-outline-variant">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center shadow-md">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
          </div>
          <span className="font-headline-md text-headline-md text-primary mb-1 block">EduFuture AI</span>
          <h1 className="font-title-sm text-title-sm text-on-surface">إنشاء حساب جديد</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">انضم إلينا وابدأ رحلة التعلم الذكي</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* رسالة خطأ عامة */}
          {generalError && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center border-r-4 border-error">
              {generalError}
            </div>
          )}

          <InputField
            id="fullName"
            label="الاسم الكامل"
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            disabled={isLoading}
            autoComplete="name"
            className="transition-all duration-200 focus:scale-[1.02]"
          />

          <InputField
            id="email"
            label="البريد الإلكتروني"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            autoComplete="email"
            className="ltr transition-all duration-200 focus:scale-[1.02]"
          />

          <div className="space-y-1">
            <PasswordInput
              id="password"
              label="كلمة المرور"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
              autoComplete="new-password"
              startIcon={<span className="material-symbols-outlined text-outline">lock</span>}
              showToggle={true}
            />
            {/* شريط قوة كلمة المرور (يظهر فقط إذا كانت الكلمة غير فارغة) */}
            {formData.password && (
              <div className="mt-1">
                <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                  <span>قوة كلمة المرور:</span>
                  <span className={`font-medium ${
                    passwordStrength === 0 ? 'text-error' :
                    passwordStrength === 1 ? 'text-warning' : 'text-success'
                  }`}>{strengthText[passwordStrength]}</span>
                </div>
                <div className="w-full h-1.5 bg-outline-variant rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColors[passwordStrength]} transition-all duration-300 rounded-full`}
                    style={{ width: `${(passwordStrength / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <PasswordInput
            id="confirmPassword"
            label="تأكيد كلمة المرور"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isLoading}
            autoComplete="new-password"
            startIcon={<span className="material-symbols-outlined text-outline">lock</span>}
            showToggle={true}
          />

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 w-4 h-4 rounded border-outline bg-surface text-primary focus:ring-2 focus:ring-primary transition-all"
            />
            <label htmlFor="acceptTerms" className="text-sm text-on-surface-variant">
              أوافق على{' '}
              <Link to="/terms" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                الشروط والأحكام
              </Link>{' '}
              و{' '}
              <Link to="/privacy" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                سياسة الخصوصية
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-error text-sm mt-1">{errors.acceptTerms}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="relative transition-all duration-200 transform active:scale-95"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>جاري إنشاء الحساب...</span>
              </div>
            ) : (
              'إنشاء حساب'
            )}
          </Button>
        </form>

        <Divider text="أو" className="mx-8 text-outline" />

        <div className="px-8 pb-4">
          <SocialButton
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            }
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full transition-all duration-200 hover:shadow-md hover:scale-[1.01] active:scale-100"
          >
            التسجيل باستخدام Google
          </SocialButton>
        </div>

        {/* Login Link */}
        <div className="px-8 pb-8 pt-2 text-center border-t border-outline-variant mt-2">
          <p className="font-body-md text-body-md text-on-surface-variant">
            لديك حساب بالفعل؟{' '}
            <Link
              to="/login"
              className="text-primary font-label-sm text-label-sm hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;