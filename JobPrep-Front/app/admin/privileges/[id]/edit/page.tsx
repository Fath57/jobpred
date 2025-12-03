'use client';

import React, { useEffect, useState } from 'react';
import RoleForm, { RoleFormValues } from '@/components/admin/RoleForm';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
  const [initial, setInitial] = useState<Partial<RoleFormValues>>();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await fetch(`${baseUrl}/roles/${id}`);
        const data = await res.json();
        setInitial({ id: data.id, name: data.name, description: data.description || '', permissionIds: (data.permissions || []).map((p: any) => p.id) });
      } catch (_) {}
    };
    load();
  }, [id]);

  return (
    <div className="space-y-6">
      <Card className="border">
        <CardHeader>
          <CardTitle>Modifier le rôle</CardTitle>
        </CardHeader>
        <CardContent>
          {initial ? (
            <RoleForm initialValues={initial} onSuccess={() => (window.location.href = '/admin/privileges')} />
          ) : (
            <p>Chargement...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
