import React from 'react';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';
import { useAnalysis } from '../hooks/useAnalysis';
import { analysisData } from '../data/analysisData';

// Helper component for rendering icon from SVG string
const Icon = ({ svg, className = "w-5 h-5" }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

// ============================================================
// Sub-components (pure presentation)
// ============================================================

// Analysis Header Component
const AnalysisHeader = ({ fileName, analysisDate, status }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-6 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Icon svg={analysisData.icons.documentSvg} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{fileName}</h1>
            <p className="text-sm text-gray-500 mt-1">{analysisData.analysisHeader.dateLabel} {analysisDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium">
          <Icon svg={analysisData.icons.checkSvg} className="w-4 h-4 text-green-600" />
          <span>{status || analysisData.analysisHeader.statusText}</span>
        </div>
      </div>
    </div>
  );
};

// Section Card Component
const SectionCard = ({ icon, iconBgClass, iconColorClass, title, children, className = '' }) => {
  const getIconSvg = (iconName) => {
    switch (iconName) {
      case 'lightbulb':
        return analysisData.icons.lightbulbSvg;
      case 'format_list_bulleted':
        return analysisData.icons.listSvg;
      case 'timeline':
        return analysisData.icons.timelineSvg;
      case 'work':
        return analysisData.icons.workSvg;
      case 'engineering':
        return analysisData.icons.engineeringSvg;
      default:
        return analysisData.icons.lightbulbSvg;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBgClass || 'bg-indigo-50'} ${iconColorClass || 'text-indigo-600'}`}>
            <Icon svg={getIconSvg(icon)} />
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
            <Icon svg={analysisData.icons.checkSvgSmall} />
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
    switch (iconName) {
      case 'school':
        return analysisData.icons.jobIcons.school;
      case 'data_object':
        return analysisData.icons.jobIcons.data_object;
      case 'psychology':
        return analysisData.icons.jobIcons.psychology;
      case 'record_voice_over':
        return analysisData.icons.jobIcons.record_voice_over;
      default:
        return analysisData.icons.jobIcons.school;
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all duration-200"
        >
          <span className="text-indigo-500">
            <Icon svg={getJobIcon(job.icon)} className="w-4 h-4" />
          </span>
          <span>{job.title}</span>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// Main AnalysisPage Component (consumes the hook)
// ============================================================
const AnalysisPage = () => {
  const { analysisData: hookData, isLoading, error, handleLogout, handleUpload } = useAnalysis();

  if (isLoading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{analysisData.loading.message}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-md text-center max-w-md">
          <Icon svg={analysisData.icons.errorSvg} className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{analysisData.error.title}</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            {analysisData.error.retryButton}
          </button>
        </div>
      </div>
    );
  }

  if (!hookData) return null;

  return (
    <div dir="rtl" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen flex flex-col">
      <TopNavbar onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onUploadClick={handleUpload} />
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <div className="max-w-[1280px] mx-auto">
            <AnalysisHeader
              fileName={hookData.fileName}
              analysisDate={hookData.analysisDate}
              status={analysisData.analysisHeader.statusText}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <SectionCard
                icon={analysisData.sections.simplifiedExplanation.icon}
                iconBgClass={analysisData.sections.simplifiedExplanation.iconBgClass}
                iconColorClass={analysisData.sections.simplifiedExplanation.iconColorClass}
                title={analysisData.sections.simplifiedExplanation.title}
                className="md:col-span-8"
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {hookData.simplifiedExplanation}
                </p>
              </SectionCard>

              <SectionCard
                icon={analysisData.sections.keyIdeas.icon}
                iconBgClass={analysisData.sections.keyIdeas.iconBgClass}
                iconColorClass={analysisData.sections.keyIdeas.iconColorClass}
                title={analysisData.sections.keyIdeas.title}
                className="md:col-span-4"
              >
                <KeyIdeasList ideas={hookData.keyIdeas} />
              </SectionCard>

              <SectionCard
                icon={analysisData.sections.evolutionOverTime.icon}
                iconBgClass={analysisData.sections.evolutionOverTime.iconBgClass}
                iconColorClass={analysisData.sections.evolutionOverTime.iconColorClass}
                title={analysisData.sections.evolutionOverTime.title}
                className="md:col-span-6"
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {hookData.evolutionOverTime}
                </p>
              </SectionCard>

              <SectionCard
                icon={analysisData.sections.marketApplications.icon}
                iconBgClass={analysisData.sections.marketApplications.iconBgClass}
                iconColorClass={analysisData.sections.marketApplications.iconColorClass}
                title={analysisData.sections.marketApplications.title}
                className="md:col-span-6"
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {hookData.marketApplications}
                </p>
              </SectionCard>

              <SectionCard
                icon={analysisData.sections.relatedJobs.icon}
                iconBgClass={analysisData.sections.relatedJobs.iconBgClass}
                iconColorClass={analysisData.sections.relatedJobs.iconColorClass}
                title={analysisData.sections.relatedJobs.title}
                className="md:col-span-12"
              >
                <JobTags jobs={hookData.relatedJobs} />
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