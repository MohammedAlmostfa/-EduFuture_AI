// hooks/useRegisterForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
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
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    if (id === 'password') {
      setPasswordStrength(evaluatePasswordStrength(newValue));
    }
    // Clear errors for the changed field
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
    if (generalError) setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'الاسم يجب أن يكون 3 أحرف على الأقل';

    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صالح';

    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    else if (formData.password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    else if (passwordStrength < 2) newErrors.password = 'كلمة المرور ضعيفة، استخدم حروف كبيرة وأرقام ورموز';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';

    if (!formData.acceptTerms) newErrors.acceptTerms = 'يجب الموافقة على الشروط والأحكام';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulated API call
  const registerApiCall = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email === 'existing@example.com') reject({ message: 'البريد الإلكتروني مسجل مسبقاً' });
        else resolve({ success: true });
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

  return {
    formData,
    errors,
    generalError,
    isLoading,
    passwordStrength,
    handleChange,
    handleSubmit,
    handleGoogleRegister,
  };
};