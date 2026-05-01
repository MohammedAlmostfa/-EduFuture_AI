// src/pages/AnalysisPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';

// ============================================================
// Sub-components (defined inline for consistency)
// ============================================================

// Analysis Header Component
const AnalysisHeader = ({ fileName, analysisDate, status }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-6 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{fileName}</h1>
            <p className="text-sm text-gray-500 mt-1">تاريخ التحليل: {analysisDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

// Section Card Component
const SectionCard = ({ icon, iconBgClass, iconColorClass, title, children, className = '' }) => {
  // Use SVG icons based on the provided icon name (we'll map common ones)
  const getIconSvg = (iconName) => {
    const icons = {
      lightbulb: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      format_list_bulleted: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      timeline: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      work: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      engineering: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.lightbulb;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBgClass || 'bg-indigo-50'} ${iconColorClass || 'text-indigo-600'}`}>
            {getIconSvg(icon)}
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

// KeyIdeasList Component
const KeyIdeasList = ({ ideas }) => {
  return (
    <ul className="space-y-3">
      {ideas.map((idea, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 flex-shrink-0">
            <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-gray-700 leading-relaxed">{idea}</span>
        </li>
      ))}
    </ul>
  );
};

// JobTags Component
const JobTags = ({ jobs }) => {
  const getJobIcon = (iconName) => {
    const icons = {
      school: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      data_object: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      psychology: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      record_voice_over: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4-4h8m-4-8a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.school;
  };

  return (
    <div className="flex flex-wrap gap-3">
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all duration-200"
        >
          <span className="text-indigo-500">{getJobIcon(job.icon)}</span>
          <span>{job.title}</span>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// Main AnalysisPage Component
// ============================================================
const AnalysisPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');
  const handleUpload = () => console.log('رفع ملف جديد');

  const analysisData = {
    fileName: 'تقرير_الذكاء_الاصطناعي_في_التعليم.pdf',
    analysisDate: '15 مايو 2024',
    simplifiedExplanation: `يناقش هذا المستند كيف يقوم الذكاء الاصطناعي بتغيير مشهد التعليم الحديث. بدلاً من استبدال المعلمين، تعمل أنظمة الذكاء الاصطناعي كمساعدين أذكياء يوفرون مسارات تعلم مخصصة لكل طالب. يركز النص على أن التكنولوجيا تسمح بتحليل أداء الطلاب في الوقت الفعلي، مما يساعد في تحديد نقاط الضعف وتقديم محتوى علاجي فوري. باختصار، الذكاء الاصطناعي يجعل التعليم أكثر تخصيصاً وفعالية.`,
    keyIdeas: [
      'تخصيص مسارات التعلم لتناسب قدرات كل طالب.',
      'أتمتة المهام الإدارية للمعلمين لتوفير الوقت للتدريس.',
      'توفير تقييمات فورية ومستمرة لمستوى الاستيعاب.',
      'تعزيز التعلم المستقل والوصول للمعلومات على مدار الساعة.',
    ],
    evolutionOverTime: `بدأ استخدام التكنولوجيا في التعليم بأدوات بسيطة مثل الحواسيب المكتبية في المعامل، ثم انتقل إلى أنظمة إدارة التعلم (LMS) التي نظمت المحتوى. اليوم، نشهد الحقبة الثالثة حيث أصبح الذكاء الاصطناعي قادراً على فهم سياق أسئلة الطلاب وتقديم إجابات توليدية. في المستقبل، من المتوقع أن نرى بيئات تعلم افتراضية متكاملة مدعومة بالذكاء الاصطناعي تتكيف لحظياً مع الحالة العاطفية والمعرفية للمتعلم.`,
    marketApplications: `تُستخدم هذه التقنيات حالياً بكثافة في برامج التدريب المؤسسي (Corporate Training) لتسريع إعداد الموظفين الجدد (Onboarding). كما تعتمد منصات التعليم الإلكتروني التجارية على خوارزميات التوصية لاقتراح دورات تدريبية بناءً على الفجوات المهارية للمستخدم. الشركات التعليمية تستخدم أدوات الذكاء الاصطناعي لتحليل تفاعل الطلاب مع المحتوى لتحسين جودة المقررات التعليمية باستمرار.`,
    relatedJobs: [
      { title: 'مصمم تعليمي ذكي', icon: 'school' },
      { title: 'مهندس بيانات تعليمية', icon: 'data_object' },
      { title: 'مطور أنظمة تعلم تكيفي', icon: 'psychology' },
      { title: 'مستشار تكنولوجيا التعليم', icon: 'record_voice_over' },
    ],
  };

  return (
    <div dir="rtl" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen flex flex-col">
      <TopNavbar onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onUploadClick={handleUpload} />
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <div className="max-w-[1280px] mx-auto">
            <AnalysisHeader
              fileName={analysisData.fileName}
              analysisDate={analysisData.analysisDate}
              status="تم التحليل بنجاح"
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* شرح مبسط - 8 أعمدة */}
              <SectionCard
                icon="lightbulb"
                iconBgClass="bg-blue-100"
                iconColorClass="text-blue-600"
                title="شرح مبسط"
                className="md:col-span-8"
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {analysisData.simplifiedExplanation}
                </p>
              </SectionCard>

              {/* تلخيص الأفكار الرئيسية - 4 أعمدة */}
              <SectionCard
                icon="format_list_bulleted"
                iconBgClass="bg-green-100"
                iconColorClass="text-green-600"
                title="تلخيص الأفكار الرئيسية"
                className="md:col-span-4"
              >
                <KeyIdeasList ideas={analysisData.keyIdeas} />
              </SectionCard>

              {/* التطور عبر الزمن - 6 أعمدة */}
              <SectionCard
                icon="timeline"
                iconBgClass="bg-amber-100"
                iconColorClass="text-amber-600"
                title="التطور عبر الزمن"
                className="md:col-span-6"
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {analysisData.evolutionOverTime}
                </p>
              </SectionCard>

              {/* استخدامات في سوق العمل - 6 أعمدة */}
              <SectionCard
                icon="work"
                iconBgClass="bg-purple-100"
                iconColorClass="text-purple-600"
                title="استخدامات في سوق العمل"
                className="md:col-span-6"
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {analysisData.marketApplications}
                </p>
              </SectionCard>

              {/* أمثلة وظائف مرتبطة - 12 عمود */}
              <SectionCard
                icon="engineering"
                iconBgClass="bg-gray-100"
                iconColorClass="text-gray-700"
                title="أمثلة وظائف مرتبطة"
                className="md:col-span-12"
              >
                <JobTags jobs={analysisData.relatedJobs} />
              </SectionCard>
            </div>
          </div>
        </main>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default AnalysisPage;