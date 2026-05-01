import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// بيانات تحليل ثابتة للعرض، يمكن جلبها من API لاحقاً
const STATIC_ANALYSIS_DATA = {
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

// محاكاة جلب البيانات من API
const fetchAnalysisFromAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STATIC_ANALYSIS_DATA);
    }, 500); // محاكاة زمن الاستجابة
  });
};

export const useAnalysis = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAnalysisFromAPI();
        setAnalysisData(data);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات التحليل');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAnalysis();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleUpload = () => {
    console.log('رفع ملف جديد');
    // هنا يمكن إضافة منطق فتح المودال أو التنقل لصفحة الرفع
  };

  return {
    analysisData,
    isLoading,
    error,
    handleLogout,
    handleUpload,
  };
};