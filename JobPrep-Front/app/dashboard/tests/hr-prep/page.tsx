'use client';

import React from 'react';
import HrInterviewPrep from '@/components/tests/HrInterviewPrep';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { speechHrInterviewPrepData } from '@/lib/speech/speechHrInterviewPrepData';

export default function HrInterviewPrepPage() {
  return (
    <DashboardLayout>
      <HrInterviewPrep speechHrInterviewPrepData={speechHrInterviewPrepData} />
    </DashboardLayout>
  );
}
