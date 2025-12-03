'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePricingStore } from '@/lib/stores/pricingStore';
import type { Pack, CreatePackDto, UpdatePackDto, Option } from '@/lib/api';

interface PackFormProps {
  pack?: Pack | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface PackOption {
  optionId: string;
  quantity: number;
}

export default function PackForm({ pack, onSuccess, onCancel }: PackFormProps) {
  const { createPack, updatePack, fetchOptions, options } = usePricingStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreatePackDto>({
    name: '',
    description: '',
    amount: 0,
    code: '',
    options: [],
  });
  const [isActive, setIsActive] = useState(true);
  const [packOptions, setPackOptions] = useState<PackOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    if (pack) {
      setFormData({
        name: pack.name,
        description: pack.description,
        amount: pack.amount,
        code: pack.code,
        options: [],
      });
      setIsActive(pack.isActive);
      setPackOptions(
        pack.packOptions.map(po => ({
          optionId: po.optionId,
          quantity: po.quantity,
        }))
      );
    }
  }, [pack]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        options: packOptions,
      };

      if (pack) {
        const updateData: UpdatePackDto = {
          ...submitData,
          isActive,
        };
        await updatePack(pack.id, updateData);
      } else {
        await createPack(submitData);
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving pack:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreatePackDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addOption = () => {
    if (!selectedOptionId) return;
    
    const existingIndex = packOptions.findIndex(po => po.optionId === selectedOptionId);
    if (existingIndex >= 0) {
      setPackOptions(prev => 
        prev.map((po, index) => 
          index === existingIndex 
            ? { ...po, quantity: po.quantity + selectedQuantity }
            : po
        )
      );
    } else {
      setPackOptions(prev => [
        ...prev,
        { optionId: selectedOptionId, quantity: selectedQuantity }
      ]);
    }
    
    setSelectedOptionId('');
    setSelectedQuantity(1);
  };

  const removeOption = (optionId: string) => {
    setPackOptions(prev => prev.filter(po => po.optionId !== optionId));
  };

  const updateOptionQuantity = (optionId: string, quantity: number) => {
    setPackOptions(prev =>
      prev.map(po => po.optionId === optionId ? { ...po, quantity } : po)
    );
  };

  const getSelectedOption = (optionId: string) => {
    return options.find(opt => opt.id === optionId);
  };

  const calculateTotalAmount = () => {
    return packOptions.reduce((total, po) => {
      const option = getSelectedOption(po.optionId);
      return total + (option ? option.amount * po.quantity : 0);
    }, 0);
  };

  const availableOptions = options.filter(opt => opt.isActive);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {pack ? 'Modifier le pack' : 'Créer un nouveau pack'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du pack *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Pack Basique"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Code unique *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                placeholder="Ex: BASIC_PACK"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description détaillée du pack"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Prix du pack (€) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              required
            />
            {packOptions.length > 0 && (
              <p className="text-sm text-gray-600">
                Prix total des options sélectionnées: €{calculateTotalAmount().toFixed(2)}
              </p>
            )}
          </div>

          {/* Gestion des options */}
          <div className="space-y-4">
            <Label>Options incluses</Label>
            
            <div className="flex gap-2">
              <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une option" />
                </SelectTrigger>
                <SelectContent>
                  {availableOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name} - €{option.amount.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(parseInt(e.target.value) || 1)}
                className="w-20"
                placeholder="Qté"
              />
              
              <Button type="button" onClick={addOption} disabled={!selectedOptionId}>
                Ajouter
              </Button>
            </div>

            {packOptions.length > 0 && (
              <div className="space-y-2">
                <Label>Options sélectionnées</Label>
                <div className="space-y-2">
                  {packOptions.map((po) => {
                    const option = getSelectedOption(po.optionId);
                    if (!option) return null;
                    
                    return (
                      <div key={po.optionId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{option.code}</Badge>
                          <span className="font-medium">{option.name}</span>
                          <span className="text-gray-600">€{option.amount.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            value={po.quantity}
                            onChange={(e) => updateOptionQuantity(po.optionId, parseInt(e.target.value) || 1)}
                            className="w-16"
                          />
                          <span className="text-sm text-gray-600">
                            = €{(option.amount * po.quantity).toFixed(2)}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(po.optionId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {pack && (
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Pack actif</Label>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : pack ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
