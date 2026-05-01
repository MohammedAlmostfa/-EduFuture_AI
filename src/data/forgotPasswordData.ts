// src/data/forgotPasswordData.ts

export const forgotPasswordData = {
  // Logo & branding
  logo: {
    src: "/src/assets/logo.png",
    alt: "EduFuture AI Logo",
  },
  title: "استعادة كلمة المرور",
  step1Subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق",
  step2Subtitle: "أدخل رمز التأكيد المرسل إلى بريدك",

  // Step 1 (email)
  step1: {
    emailField: {
      id: "email",
      label: "البريد الإلكتروني",
      type: "email",
      placeholder: "name@example.com",
      autoComplete: "email",
    },
    submitButton: "إرسال رمز التحقق",
    submittingButton: "جاري الإرسال...",
  },

  // Step 2 (verification code)
  step2: {
    codeField: {
      id: "code",
      label: "رمز التأكيد",
      type: "text",
      placeholder: "أدخل الرقم المكون من 6 أرقام",
    },
    resendButton: "إعادة إرسال الرمز",
    resendButtonWait: (seconds: number) => `إعادة إرسال الرمز بعد ${seconds} ثانية`,
    verifyButton: "تحقق من الرمز",
    verifyingButton: "جاري التحقق...",
  },

  // Footer
  footer: {
    rememberPassword: "تذكرت كلمة المرور؟",
    loginLink: "/login",
    loginText: "تسجيل الدخول",
  },

  // Icons (SVGs as strings)
  checkIconSvg: `<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>`,
  
  errorIconSvg: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
  
  spinnerSvg: `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>`,
};