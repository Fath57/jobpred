'use client';

import React from 'react';
import OptionsList from '@/components/admin/pricing/OptionsList';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminPricingOptionsPage() {
  return <DashboardLayout> <OptionsList /> </DashboardLayout>;
}
