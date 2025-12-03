'use client';

import React from 'react';
import SoftSkillsTest from '@/components/tests/SoftSkillsTest';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { softSkillsData } from '@/lib/tests/softSkillsData';

export default function SoftSkillsPage() {
  return (
    <DashboardLayout>
      <SoftSkillsTest softSkillsData={softSkillsData} />
    </DashboardLayout>
  );
}
