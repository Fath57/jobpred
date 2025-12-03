'use client';

import React from 'react';
import ResumeAnalysis from '@/components/resume/ResumeAnalysis';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { resumeAnalysisData } from '@/lib/resume/resumeAnalysisData';

export default function ResumeAnalysisPage() {
  return (
    <DashboardLayout>
      <ResumeAnalysis resumeAnalysisData={resumeAnalysisData} />
    </DashboardLayout>
  );
}
