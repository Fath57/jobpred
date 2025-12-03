'use client';

import React from 'react';
import TestFeedbackReport from '@/components/tests/TestFeedbackReport';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { testFeedbackData } from '@/lib/tests/testFeedbackData';

export default function TestFeedbackPage() {
  return (
    <DashboardLayout>
      <TestFeedbackReport feedbackData={testFeedbackData} />
    </DashboardLayout>
  );
}
