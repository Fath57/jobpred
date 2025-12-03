'use client';

import React from 'react';
import MotivationLetterForm from '@/components/letters/MotivationLetterForm';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motivationLetterData } from '@/lib/letters/motivationLetterData';

export default function MotivationLetterPage() {
  return (
    <DashboardLayout>
      <MotivationLetterForm motivationLetterData={motivationLetterData} />
    </DashboardLayout>
  );
}
