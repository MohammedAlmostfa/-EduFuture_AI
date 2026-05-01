// src/pages/AnalysisPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';
import AnalysisHeader from '../components/analysis/AnalysisHeader';
import SectionCard from '../components/analysis/SectionCard';
import KeyIdeasList from '../components/analysis/KeyIdeasList';
import JobTags from '../components/analysis/JobTags';

// بيانات تجريبية (يمكن جلبها من API)
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

const AnalysisPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');
  const handleUpload = () => console.log('رفع ملف جديد');

  return (
    <div dir="rtl" className="bg-background min-h-screen flex flex-col">
      <TopNavbar onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onUploadClick={handleUpload} activePath="/analysis/new" />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-[1200px] mx-auto">
            <AnalysisHeader
              fileName={analysisData.fileName}
              analysisDate={analysisData.analysisDate}
              status="تم التحليل بنجاح"
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* شرح مبسط - 8 أعمدة */}
              <SectionCard
                icon="lightbulb"
                iconBgClass="bg-primary-container/10"
                iconColorClass="text-primary"
                title="شرح مبسط"
                className="md:col-span-8"
              >
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  {analysisData.simplifiedExplanation}
                </p>
              </SectionCard>

              {/* تلخيص الأفكار الرئيسية - 4 أعمدة */}
              <SectionCard
                icon="format_list_bulleted"
                iconBgClass="bg-secondary-container/20"
                iconColorClass="text-secondary"
                title="تلخيص الأفكار الرئيسية"
                className="md:col-span-4"
              >
                <KeyIdeasList ideas={analysisData.keyIdeas} />
              </SectionCard>

              {/* التطور عبر الزمن - 6 أعمدة */}
              <SectionCard
                icon="timeline"
                iconBgClass="bg-tertiary-container/20"
                iconColorClass="text-tertiary"
                title="التطور عبر الزمن"
                className="md:col-span-6"
              >
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  {analysisData.evolutionOverTime}
                </p>
              </SectionCard>

              {/* استخدامات في سوق العمل - 6 أعمدة */}
              <SectionCard
                icon="work"
                iconBgClass="bg-primary-container/10"
                iconColorClass="text-primary"
                title="استخدامات في سوق العمل"
                className="md:col-span-6"
              >
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  {analysisData.marketApplications}
                </p>
              </SectionCard>

              {/* أمثلة وظائف مرتبطة - 12 عمود */}
              <SectionCard
                icon="engineering"
                iconBgClass="bg-surface-variant"
                iconColorClass="text-on-surface-variant"
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