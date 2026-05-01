// hooks/useLoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    // Clear field-specific error if exists
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
    if (generalError) setGeneralError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock API call
  const loginApiCall = async (email, password, rememberMe) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "123456") {
          resolve({ success: true });
        } else {
          reject({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setGeneralError("");
    try {
      await loginApiCall(formData.email, formData.password, formData.rememberMe);
      console.log("بيانات تسجيل الدخول:", formData);
      alert("تم تسجيل الدخول بنجاح (محاكاة)");
      // يمكن توجيه المستخدم إلى لوحة التحكم بعد تسجيل الدخول
      // navigate("/dashboard");
    } catch (error) {
      setGeneralError(error.message || "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("تسجيل الدخول عبر Google");
    // يمكن إضافة منطق Google OAuth هنا
  };

  return {
    formData,
    errors,
    generalError,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
};