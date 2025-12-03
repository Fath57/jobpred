'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePricingStore } from '@/lib/stores/pricingStore';
import type { Option, CreateOptionDto, UpdateOptionDto } from '@/lib/api';

interface OptionFormProps {
  option?: Option | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function OptionForm({ option, onSuccess, onCancel }: OptionFormProps) {
  const { createOption, updateOption } = usePricingStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateOptionDto>({
    name: '',
    description: '',
    amount: 0,
    code: '',
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (option) {
      setFormData({
        name: option.name,
        description: option.description,
        amount: option.amount,
        code: option.code,
      });
      setIsActive(option.isActive);
    }
  }, [option]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (option) {
        const updateData: UpdateOptionDto = {
          ...formData,
          isActive,
        };
        await updateOption(option.id, updateData);
      } else {
        await createOption(formData);
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving option:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateOptionDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {option ? 'Modifier l\'option' : 'Créer une nouvelle option'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'option *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Refonte de CV"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Code unique *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                placeholder="Ex: CV_REDESIGN"
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
              placeholder="Description détaillée de l'option"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Prix (€) *</Label>
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
          </div>

          {option && (
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Option active</Label>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : option ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
