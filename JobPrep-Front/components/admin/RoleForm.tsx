"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronDown, ChevronRight } from "lucide-react";

type Permission = { id: string; name: string; description?: string | null };
type Module = { id: string; name: string; permissions: Permission[] };

export type RoleFormValues = {
  id?: string;
  name: string;
  description?: string;
  permissionIds: string[];
};

export default function RoleForm({
  initialValues,
  onSuccess,
}: {
  initialValues?: Partial<RoleFormValues>;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [permissionIds, setPermissionIds] = useState<string[]>(initialValues?.permissionIds || []);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/modules/with-permissions`);
        const data = await res.json();
        setModules(data || []);
      } catch (e: any) {
        console.error(e);
      }
    };
    load();
  }, [baseUrl]);

  useEffect(() => {
    // Sync when initialValues change (e.g. edit page loaded async)
    if (initialValues?.name !== undefined) setName(initialValues.name);
    if (initialValues?.description !== undefined) setDescription(initialValues.description || "");
    if (initialValues?.permissionIds !== undefined) setPermissionIds(initialValues.permissionIds || []);
  }, [initialValues]);

  const allPermissions = useMemo(() => modules.flatMap(m => m.permissions || []), [modules]);

  const togglePermission = (id: string) => {
    setPermissionIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const moduleIsChecked = (m: Module) => m.permissions.every(p => permissionIds.includes(p.id));
  const moduleIsIndeterminate = (m: Module) => m.permissions.some(p => permissionIds.includes(p.id)) && !moduleIsChecked(m);

  const toggleModule = (m: Module) => {
    const ids = m.permissions.map(p => p.id);
    const hasAll = ids.every(id => permissionIds.includes(id));
    if (hasAll) {
      setPermissionIds(prev => prev.filter(id => !ids.includes(id)));
    } else {
      setPermissionIds(prev => Array.from(new Set([...prev, ...ids])));
    }
  };

  const isOpen = (id: string) => openModules.has(id);
  const toggleModuleOpen = (id: string) => {
    setOpenModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const canSubmit = name.trim().length > 0 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const payload = { name: name.trim(), description: description.trim() || undefined, permissionIds };
      const isEdit = Boolean(initialValues?.id);
      const url = isEdit ? `${baseUrl}/roles/${initialValues?.id}` : `${baseUrl}/roles`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.message || "Erreur lors de l'enregistrement du rôle";
        throw new Error(Array.isArray(msg) ? msg.join(", ") : msg);
      }
      onSuccess?.();
    } catch (e: any) {
      setError(e?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Nom du rôle</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Admin" className="mt-2" required />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du rôle" className="mt-2" />
        </div>
      </div>

      <div>
        <Label>Permissions par module</Label>
        <div className="mt-3 space-y-3">
          {modules.map((m) => (
            <div key={m.id} className="border rounded-lg bg-white">
              <button
                type="button"
                onClick={() => toggleModuleOpen(m.id)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={moduleIsChecked(m)}
                    ref={(el) => {
                      if (el) el.indeterminate = moduleIsIndeterminate(m);
                    }}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleModule(m);
                    }}
                  />
                  <span className="font-medium">{m.description || m.name}</span>
                  <span className="text-xs text-gray-500">{m.permissions.length} perms</span>
                </div>
                {isOpen(m.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {isOpen(m.id) && (
                <div className="px-4 pb-4 space-y-1">
                  {m.permissions.map((p) => (
                    <label key={p.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={permissionIds.includes(p.id)} onChange={() => togglePermission(p.id)} />
                      <span>{p.description || p.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {modules.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Aucun module trouvé.</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={!canSubmit}>
          {loading ? "Enregistrement..." : initialValues?.id ? "Mettre à jour" : "Créer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
