'use client';

import React from 'react';
import RoleForm from '@/components/admin/RoleForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateRolePage() {
  return (
    <div className="space-y-6">
      <Card className="border">
        <CardHeader>
          <CardTitle>Créer un rôle</CardTitle>
        </CardHeader>
        <CardContent>
          <RoleForm onSuccess={() => (window.location.href = '/admin/privileges')} />
        </CardContent>
      </Card>
    </div>
  );
}
