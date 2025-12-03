'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

function AdminRoleActionsDropdown({ editHref, onDelete }: { editHref: string; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Actions">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={editHref} className="flex items-center">
            <Pencil className="mr-2 h-4 w-4" /> Modifier
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600 focus:bg-red-50">
          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AdminPrivilegesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${baseUrl}/roles`);
      if (!res.ok) throw new Error('Erreur de chargement des rôles');
      const data = await res.json();
      setRoles(data || []);
    } catch (e: any) {
      setError(e?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    setDeleteLoading(true);
    setError('');
    try {
      const res = await fetch(`${baseUrl}/roles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Suppression échouée");
      await load();
      setDeleteId(null);
    } catch (e: any) {
      setError(e?.message || 'Erreur');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Privilèges</h1>
          <p className="text-gray-600">Gestion des rôles, permissions et modules</p>
        </div>
        <Link href="/admin/privileges/new">
          <Button>Créer un rôle</Button>
        </Link>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td className="px-6 py-4" colSpan={4}>Chargement...</td>
              </tr>
            ) : roles.length === 0 ? (
              <tr>
                <td className="px-6 py-4" colSpan={4}>Aucun rôle</td>
              </tr>
            ) : (
              roles.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{r.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{r.description || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {(r.permissions || []).length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end">
                      <AdminRoleActionsDropdown editHref={`/admin/privileges/${r.id}/edit`} onDelete={() => setDeleteId(r.id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => { if (!o) setDeleteId(null); }}
        title="Supprimer le rôle"
        description={deleteId ? `Voulez-vous vraiment supprimer ce rôle ? Cette action est irréversible.` : ''}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        loading={deleteLoading}
        icon="trash"
        onConfirm={() => deleteId ? onDelete(deleteId) : undefined}
      />
    </>
  );
}
