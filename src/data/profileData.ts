// src/data/profileData.ts

export const profileData = {
  // Default avatar
  defaultAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76E3OcQ7aJfJjxpRtKrg1QbVJy-ltaq5sIbWrzL8zrxkq1kM8vEdO-Pu78oTybnEzbOX6aPEh0a4LpU6e6to7Ba3O_n9nAn59XTq8azYGQmcbvUopVi4TtmPtrzDe3zufFdCyMMhjAw1gR-YUXdj0tPy96B1cagIbPSqJNdd1upXsYc7gvPH1XmD2DVwhk2DAlsPgmXwxoXzOJLazCbJd0iT8CcX1Eoxtzkt-oQxM5rePGo-lYTy9uQobn2GWaUZx0LN-QNjvtE20",

  // Profile header
  profileHeader: {
    editAvatarLabel: "تغيير الصورة",
    defaultRole: "طالب متميز",
    defaultTags: ["علوم الحاسب", "سنة ثالثة"],
  },

  // Stat cards
  statCards: {
    analytics: {
      iconName: "analytics",
      label: "الملفات المحللة",
      value: "42", // example static value (could come from API)
      color: "primary",
    },
    balance: {
      iconName: "account_balance_wallet",
      label: "الرصيد المتبقي",
      value: "150",
      color: "secondary",
    },
    memberSince: {
      iconName: "calendar_today",
      label: "عضو منذ",
      value: "أكتوبر 2023",
      color: "tertiary",
    },
  },

  // Preferences card
  preferences: {
    title: "التبديلات",
    languageLabel: "اللغة",
    languageOptions: {
      ar: "عربي",
      en: "English",
    },
    themeLabel: "المظهر",
    themeOptions: {
      light: "فاتح",
      dark: "داكن",
    },
    notificationsLabel: "الإشعارات",
  },

  // Personal info form
  personalInfo: {
    title: "المعلومات الشخصية",
    fields: {
      fullName: {
        label: "الاسم الكامل",
        id: "fullName",
        type: "text",
      },
      email: {
        label: "البريد الإلكتروني",
        id: "email",
        type: "email",
      },
      phone: {
        label: "رقم الهاتف",
        id: "phone",
        type: "tel",
      },
      bio: {
        label: "نبذة عني",
        id: "bio",
        rows: 3,
      },
    },
  },

  // Security form (change password)
  security: {
    title: "تغيير كلمة المرور",
    fields: {
      currentPassword: {
        label: "كلمة المرور الحالية",
        id: "currentPassword",
        type: "password",
      },
      newPassword: {
        label: "كلمة المرور الجديدة",
        id: "newPassword",
        type: "password",
      },
      confirmPassword: {
        label: "تأكيد كلمة المرور الجديدة",
        id: "confirmPassword",
        type: "password",
      },
    },
  },

  // Save button
  saveButton: {
    text: "حفظ التغييرات",
  },

  // Icons (SVGs as strings)
  icons: {
    editAvatarSvg: `<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>`,
    analyticsSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>`,
    walletSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10H21M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>`,
    calendarSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`,
    preferencesSvg: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
    personalInfoSvg: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>`,
    securitySvg: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>`,
    saveIconSvg: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>`,
  },
};