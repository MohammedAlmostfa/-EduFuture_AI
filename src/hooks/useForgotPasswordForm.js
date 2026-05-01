import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: code
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [emailError, setEmailError] = useState("");
  const timerRef = useRef(null);

  // تنظيف المؤقت عند إلغاء تحميل المكون
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // محاكاة إرسال رمز التأكيد
  const sendVerificationCode = useCallback(async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes("@")) {
          console.log(`تم إرسال رمز التأكيد إلى ${email}: 123456`);
          resolve({ success: true });
        } else {
          reject({ message: "البريد الإلكتروني غير صالح" });
        }
      }, 1500);
    });
  }, []);

  // محاكاة التحقق من الرمز
  const verifyCode = useCallback(async (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === "123456") {
          resolve({ success: true });
        } else {
          reject({ message: "رمز التأكيد غير صحيح" });
        }
      }, 1500);
    });
  }, []);

  const startCountdown = useCallback((seconds) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(seconds);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleSendCode = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email) {
        setEmailError("البريد الإلكتروني مطلوب");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError("البريد الإلكتروني غير صالح");
        return;
      }
      setEmailError("");
      setIsLoading(true);
      setError("");
      try {
        await sendVerificationCode(email);
        setSuccessMessage("تم إرسال رمز التأكيد إلى بريدك الإلكتروني");
        setStep(2);
        startCountdown(60);
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء إرسال الرمز");
      } finally {
        setIsLoading(false);
      }
    },
    [email, sendVerificationCode, startCountdown],
  );

  const handleVerifyCode = useCallback(
    async (e) => {
      e.preventDefault();
      if (!verificationCode) {
        setError("الرجاء إدخال رمز التأكيد");
        return;
      }
      setIsLoading(true);
      setError("");
      try {
        await verifyCode(verificationCode);
        setSuccessMessage(
          "تم التحقق بنجاح! سيتم توجيهك لتعيين كلمة مرور جديدة",
        );
        setTimeout(() => {
          navigate("/reset-password", {
            state: { email, code: verificationCode },
          });
        }, 1500);
      } catch (err) {
        setError(err.message || "رمز التأكيد غير صحيح");
      } finally {
        setIsLoading(false);
      }
    },
    [verificationCode, verifyCode, navigate, email],
  );

  const handleResendCode = useCallback(async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    setError("");
    try {
      await sendVerificationCode(email);
      setSuccessMessage("تم إعادة إرسال الرمز");
      startCountdown(60);
    } catch (err) {
      setError(err.message || "فشل إعادة إرسال الرمز");
    } finally {
      setIsLoading(false);
    }
  }, [email, countdown, sendVerificationCode, startCountdown]);

  return {
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
  };
};
