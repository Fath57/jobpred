'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // API base URL (align with other pages)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

  type ApiUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    location?: string;
    isActive?: boolean;
    role?: { id: string; name: string } | null;
    createdAt?: string;
  };

  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listUnsupported, setListUnsupported] = useState(false);

  // Roles list for selection
  type Role = { id: string; name: string };
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);

  const [createForm, setCreateForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    isActive: true,
    roleId: ''
  });

  const [editForm, setEditForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    isActive: true,
    roleId: ''
  });

  const authHeaders = useMemo(() => {
    try {
      // 1) Try localStorage
      let token: string | null = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      // 2) Fallback to cookie
      if (!token && typeof document !== 'undefined') {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const authCookie = cookies.find(c => c.startsWith('auth_token='));
        if (authCookie) token = decodeURIComponent(authCookie.split('=')[1]);
      }
      return token ? { Authorization: `Bearer ${token}` } : {};
    } catch {
      return {};
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/users`, { headers: { 'Content-Type': 'application/json', ...authHeaders } });
      const data = await res.json();
      // If backend returns a list in future, expect array
      if (Array.isArray(data)) {
        setUsers(data as ApiUser[]);
      } else if (Array.isArray(data?.data)) {
        setUsers(data.data as ApiUser[]);
      } else {
        // Current backend returns { message: '...' }
        setListUnsupported(true);
        setUsers([]);
      }
    } catch (e: any) {
      setError(e?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Load roles list
  const fetchRoles = async () => {
    setRolesLoading(true);
    try {
      const res = await fetch(`${baseUrl}/roles`, {
        headers: { 'Content-Type': 'application/json', ...authHeaders },
      });
      const data = await res.json();
      const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      setRoles(arr.map((r: any) => ({ id: r.id, name: r.name })));
    } catch (_) {
      setRoles([]);
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onCreate = async () => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({
          email: createForm.email,
          password: createForm.password,
          firstName: createForm.firstName,
          lastName: createForm.lastName,
          phone: createForm.phone || undefined,
          location: createForm.location || undefined,
          isActive: createForm.isActive,
          roleId: createForm.roleId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Création échouée');
      const created: ApiUser = data?.data || data; // support both shapes
      setUsers((prev) => [created, ...prev]);
      setCreateOpen(false);
      setCreateForm({ email: '', password: '', firstName: '', lastName: '', phone: '', location: '', isActive: true, roleId: '' });
    } catch (e: any) {
      setError(e?.message || 'Erreur lors de la création');
    }
  };

  const openEdit = (u: ApiUser) => {
    setSelectedUser(u);
    setEditForm({
      email: u.email || '',
      password: '',
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      phone: u.phone || '',
      location: u.location || '',
      isActive: u.isActive !== false,
      roleId: u.role?.id || ''
    });
    setEditOpen(true);
  };

  const onUpdate = async () => {
    if (!selectedUser) return;
    setError(null);
    try {
      const payload: any = {
        email: editForm.email,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone || undefined,
        location: editForm.location || undefined,
        isActive: editForm.isActive,
      };
      if (editForm.password) payload.password = editForm.password;
      if (editForm.roleId) payload.roleId = editForm.roleId;

      const res = await fetch(`${baseUrl}/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Mise à jour échouée");
      const updated: ApiUser = data?.data || data;
      setUsers((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
      setEditOpen(false);
      setSelectedUser(null);
    } catch (e: any) {
      setError(e?.message || 'Erreur lors de la mise à jour');
    }
  };

  const onDelete = async () => {
    if (!selectedUser) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Suppression échouée');
      setUsers((prev) => prev.filter((it) => it.id !== selectedUser.id));
      setConfirmOpen(false);
      setSelectedUser(null);
    } catch (e: any) {
      setError(e?.message || 'Erreur lors de la suppression');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-emerald-200 text-emerald-700 bg-emerald-50';
      case 'suspended': return 'border-red-200 text-red-700 bg-red-50';
      case 'pending': return 'border-amber-200 text-amber-700 bg-amber-50';
      default: return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };


  const filteredUsers = users.filter(u => {
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim();
    const matchesSearch = `${fullName} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const status = u.isActive === false ? 'suspended' : 'active';
    const matchesFilter = selectedFilter === 'all' || status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-2">Supervision des comptes et informations de base</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exporter
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <UserPlus size={16} className="mr-2" />
            Nouvel Utilisateur
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="text-blue-600" size={20} />
            Liste des Utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Rechercher par nom, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filtres
              </Button>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="suspended">Suspendus</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
              const status = user.isActive === false ? 'suspended' : 'active';
              const initials = (fullName || user.email).split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase();
              return (
                <div key={user.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">{initials}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{fullName || user.email}</h3>
                          <Badge variant="outline" className={getStatusColor(status)}>
                            {status === 'active' ? 'Actif' : 'Suspendu'}
                          </Badge>
                          {user.role?.name && (
                            <Badge variant="outline" className="border-gray-200 text-gray-700 bg-gray-50">
                              {user.role.name}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>{user.phone}</span>
                          </div>
                          )}
                          {user.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{user.location}</span>
                          </div>
                          )}
                          {user.createdAt && (
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(user)}>
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { setSelectedUser(user); setConfirmOpen(true); }}>
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}
            {listUnsupported && !loading && users.length === 0 && (
              <div className="text-sm text-amber-600">L’API ne fournit pas encore la liste des utilisateurs. Vous pouvez toutefois créer/modifier des utilisateurs.</div>
            )}
            {loading && (
              <div className="text-center text-gray-500 py-6">Chargement...</div>
            )}
            {filteredUsers.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-10">Aucun utilisateur à afficher.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau Utilisateur</DialogTitle>
            <DialogDescription>Créer un nouvel utilisateur</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Prénom</label>
              <Input value={createForm.firstName} onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Nom</label>
              <Input value={createForm.lastName} onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Email</label>
              <Input type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Mot de passe</label>
              <Input type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Téléphone (optionnel)</label>
              <Input value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Localisation (optionnel)</label>
              <Input value={createForm.location} onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Rôle (optionnel)</label>
              <select
                value={createForm.roleId}
                onChange={(e) => setCreateForm({ ...createForm, roleId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                disabled={rolesLoading}
              >
                <option value="">Sélectionner un rôle</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input id="create-active" type="checkbox" checked={createForm.isActive} onChange={(e) => setCreateForm({ ...createForm, isActive: e.target.checked })} />
              <label htmlFor="create-active" className="text-sm text-gray-700">Actif</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Annuler</Button>
            <Button onClick={onCreate}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l’utilisateur</DialogTitle>
            <DialogDescription>Mettre à jour les informations</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Prénom</label>
              <Input value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Nom</label>
              <Input value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Email</label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Mot de passe (laisser vide pour ne pas changer)</label>
              <Input type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Téléphone (optionnel)</label>
              <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Localisation (optionnel)</label>
              <Input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Rôle (optionnel)</label>
              <select
                value={editForm.roleId}
                onChange={(e) => setEditForm({ ...editForm, roleId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                disabled={rolesLoading}
              >
                <option value="">Sélectionner un rôle</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input id="edit-active" type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })} />
              <label htmlFor="edit-active" className="text-sm text-gray-700">Actif</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button>
            <Button onClick={onUpdate}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Suspend */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer l’utilisateur ?"
        description={selectedUser ? `Confirmez la suppression de ${selectedUser.firstName || ''} ${selectedUser.lastName || selectedUser.email}` : ''}
        onConfirm={onDelete}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
    </DashboardLayout>
  );
}
