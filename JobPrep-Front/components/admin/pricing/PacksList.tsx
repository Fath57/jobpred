'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Euro,
  Package,
  Eye
} from 'lucide-react';
import { usePricingStore } from '@/lib/stores/pricingStore';
import type { Pack } from '@/lib/api';
import PackForm from './PackForm';
import PackDetails from './PackDetails';

export default function PacksList() {
  const { 
    packs, 
    packsLoading, 
    packsError, 
    fetchPacks, 
    deletePack, 
    togglePackStatus 
  } = usePricingStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [viewingPack, setViewingPack] = useState<Pack | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPacks();
  }, [fetchPacks]);

  const filteredPacks = packs.filter(pack =>
    pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pack.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pack.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (pack: Pack) => {
    setEditingPack(pack);
    setShowForm(true);
  };

  const handleView = (pack: Pack) => {
    setViewingPack(pack);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce pack ?')) return;
    
    setDeletingId(id);
    try {
      await deletePack(id);
    } catch (error) {
      console.error('Error deleting pack:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await togglePackStatus(id);
    } catch (error) {
      console.error('Error toggling pack status:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPack(null);
    fetchPacks();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPack(null);
  };

  const handleDetailsClose = () => {
    setViewingPack(null);
  };

  if (showForm) {
    return (
      <PackForm
        pack={editingPack}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  if (viewingPack) {
    return (
      <PackDetails
        pack={viewingPack}
        onClose={handleDetailsClose}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Packs</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus size={20} />
          Nouveau Pack
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Packs</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Rechercher un pack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {packsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Chargement des packs...</p>
            </div>
          ) : packsError ? (
            <div className="text-center py-8">
              <p className="text-red-600">Erreur: {packsError}</p>
              <Button onClick={() => fetchPacks()} className="mt-4">
                Réessayer
              </Button>
            </div>
          ) : filteredPacks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {searchTerm ? 'Aucun pack trouvé pour votre recherche.' : 'Aucun pack disponible.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPacks.map((pack) => (
                    <TableRow key={pack.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Package size={16} className="text-blue-600" />
                        {pack.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{pack.code}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {pack.description}
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Euro size={16} className="text-gray-500" />
                        {pack.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {pack.packOptions.length} option{pack.packOptions.length > 1 ? 's' : ''}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={pack.isActive ? "default" : "secondary"}>
                          {pack.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(pack)}
                            title="Voir les détails"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(pack.id)}
                            title={pack.isActive ? 'Désactiver' : 'Activer'}
                          >
                            {pack.isActive ? (
                              <ToggleRight className="text-green-600" size={16} />
                            ) : (
                              <ToggleLeft className="text-gray-400" size={16} />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(pack)}
                            title="Modifier"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(pack.id)}
                            disabled={deletingId === pack.id}
                            className="text-red-600 hover:text-red-700"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
