'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Package, 
  Euro, 
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';
import type { Pack } from '@/lib/api';

interface PackDetailsProps {
  pack: Pack;
  onClose: () => void;
}

export default function PackDetails({ pack, onClose }: PackDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotalOptionsAmount = () => {
    return pack.packOptions.reduce((total, po) => {
      return total + (po.option.amount * po.quantity);
    }, 0);
  };

  const savings = pack.amount - calculateTotalOptionsAmount();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Détails du Pack</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="text-blue-600" size={24} />
                {pack.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">{pack.code}</Badge>
                <Badge variant={pack.isActive ? "default" : "secondary"}>
                  {pack.isActive ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{pack.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Prix du pack</h3>
                  <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <Euro size={24} />
                    {pack.amount.toFixed(2)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Valeur des options</h3>
                  <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                    <Euro size={20} />
                    {calculateTotalOptionsAmount().toFixed(2)}
                  </div>
                </div>
              </div>

              {savings > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle size={20} />
                    <span className="font-medium">Économie: €{savings.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Les clients économisent {(savings / calculateTotalOptionsAmount() * 100).toFixed(1)}% 
                    en choisissant ce pack plutôt que les options séparément.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Créé le {formatDate(pack.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Modifié le {formatDate(pack.updatedAt)}</span>
                </div>
              </div>

              {(pack as any).stripeProductId || (pack as any).stripePriceId ? (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Stripe</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">Product ID</div>
                      <code className="block bg-gray-50 border rounded px-2 py-1 font-mono text-gray-700 break-all">
                        {(pack as any).stripeProductId || '-'}
                      </code>
                    </div>
                    <div>
                      <div className="text-gray-500">Price ID</div>
                      <code className="block bg-gray-50 border rounded px-2 py-1 font-mono text-gray-700 break-all">
                        {(pack as any).stripePriceId || '-'}
                      </code>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Options incluses */}
          <Card>
            <CardHeader>
              <CardTitle>Options Incluses ({pack.packOptions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {pack.packOptions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aucune option incluse dans ce pack.
                </p>
              ) : (
                <div className="space-y-3">
                  {pack.packOptions.map((po, index) => (
                    <div key={po.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{po.option.name}</h4>
                          <p className="text-sm text-gray-600">{po.option.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{po.option.code}</Badge>
                            <span className="text-xs text-gray-500">
                              €{po.option.amount.toFixed(2)} × {po.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          €{(po.option.amount * po.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {po.quantity} × €{po.option.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Résumé */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nombre d'options:</span>
                  <span className="font-medium">{pack.packOptions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Valeur totale:</span>
                  <span className="font-medium">€{calculateTotalOptionsAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Prix du pack:</span>
                  <span className="font-medium text-blue-600">€{pack.amount.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Économie:</span>
                    <span className="font-medium">€{savings.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {pack.isActive ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <X className="text-red-600" size={20} />
                )}
                <span className={pack.isActive ? "text-green-600" : "text-red-600"}>
                  {pack.isActive ? 'Pack actif' : 'Pack inactif'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
