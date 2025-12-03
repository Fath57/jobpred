'use client';

import React from 'react';
import VoiceFeedbackReport from '@/components/speech/VoiceFeedbackReport';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { speechTestFeedbackData } from '@/lib/speechTestFeedbackData';

export default function SpeechFeedbackPage() {
  return (
    <DashboardLayout>
      <VoiceFeedbackReport feedbackData={speechTestFeedbackData} />
    </DashboardLayout>
  );
}
