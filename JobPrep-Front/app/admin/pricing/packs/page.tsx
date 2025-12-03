'use client';

import React from 'react';
import PacksList from '@/components/admin/pricing/PacksList';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminPricingPacksPage() {
  return <DashboardLayout> <PacksList /> </DashboardLayout>;
}
