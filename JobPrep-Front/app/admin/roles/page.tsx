"use client";

import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Shield, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RoleForm, { RoleFormValues } from "@/components/admin/RoleForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

function RoleActionsDropdown({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Actions">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" /> Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600 focus:bg-red-50">
          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function RolesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [openCreate, setOpenCreate] = useState(false);
  const [openEditId, setOpenEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const currentEditInitial: Partial<RoleFormValues> | undefined = useMemo(() => {
    if (!openEditId) return undefined;
    const r = roles.find((x) => x.id === openEditId);
    if (!r) return undefined;
    return {
      id: r.id,
      name: r.name,
      description: r.description || '',
      permissionIds: (r.permissions || []).map((p: any) => p.id),
    };
  }, [openEditId, roles]);

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
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gestion de rôles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="text-emerald-600" size={24} />
              Gestion de rôles
            </h1>
            <p className="text-gray-600 mt-1">Gérez les rôles des utilisateurs et leurs permissions.</p>
          </div>
          <Button onClick={() => setOpenCreate(true)}>Créer un rôle</Button>
        </div>

        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Rôles</CardTitle>
          </CardHeader>
          <CardContent>
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
                            <RoleActionsDropdown onEdit={() => setOpenEditId(r.id)} onDelete={() => setDeleteId(r.id)} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Create dialog */}
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un rôle</DialogTitle>
            </DialogHeader>
            <RoleForm onSuccess={async () => { await load(); setOpenCreate(false); }} />
          </DialogContent>
        </Dialog>

        {/* Edit dialog */}
        <Dialog open={!!openEditId} onOpenChange={(o) => { if (!o) setOpenEditId(null); }}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier le rôle</DialogTitle>
            </DialogHeader>
            {currentEditInitial ? (
              <RoleForm initialValues={currentEditInitial} onSuccess={async () => { await load(); setOpenEditId(null); }} />
            ) : (
              <p>Chargement...</p>
            )}
          </DialogContent>
        </Dialog>
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
    </DashboardLayout>
  );
}
