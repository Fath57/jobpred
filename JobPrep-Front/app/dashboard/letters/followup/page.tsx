'use client';

import React from 'react';
import FollowUpLetterForm from '@/components/letters/FollowUpLetterForm';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { followUpLetterData } from '@/lib/letters/followUpLetterData';

export default function FollowUpLetterPage() {
  return (
    <DashboardLayout>
      <FollowUpLetterForm followUpLetterData={followUpLetterData} />
    </DashboardLayout>
  );
}
