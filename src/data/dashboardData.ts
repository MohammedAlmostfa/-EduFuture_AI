// src/data/dashboardData.ts

export const dashboardData = {
  // Page title
  pageTitle: "لوحة التحكم",

  // Empty state
  emptyState: {
    iconSvg: `<svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>`,
    title: "لا توجد ملفات مرفوعة بعد",
    subtitle: "قم برفع أول ملف لك للبدء",
    buttonText: "ارفع أول ملف لك",
  },

  // File section
  fileSectionTitle: "أحدث الملفات",
  uploadButtonText: "رفع ملف جديد",

  // Confirm dialog
  confirmDialog: {
    title: "تأكيد الحذف",
    message: "هل أنت متأكد من حذف هذا الملف؟ لا يمكن التراجع عن هذا الإجراء.",
  },

  // Icons
  icons: {
    userAvatarSvg: `<svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>`,
    plusIconSvg: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>`,
  },

  // Loading spinner (can be reused)
  loadingSpinner: `<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>`,
};