'use client';

import React from 'react';
import ResumeConfection from '@/components/resume/ResumeConfection';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { resumeConfectionData } from '@/lib/resume/resumeConfectionData';

export default function ResumeConfectionPage() {
  return (
    <DashboardLayout>
      <ResumeConfection resumeConfectionData={resumeConfectionData} />
    </DashboardLayout>
  );
}
