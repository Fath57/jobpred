'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Target, Sparkles } from 'lucide-react';

interface ActionPlanProps {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

const ActionPlan: React.FC<ActionPlanProps> = ({
  immediate,
  shortTerm,
  longTerm,
}) => {
  return (
    <Tabs defaultValue="immediate" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="immediate" className="text-xs">
          Immédiat
        </TabsTrigger>
        <TabsTrigger value="short" className="text-xs">
          Court terme
        </TabsTrigger>
        <TabsTrigger value="long" className="text-xs">
          Long terme
        </TabsTrigger>
      </TabsList>

      <TabsContent value="immediate" className="space-y-2">
        {immediate.map((action, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <CheckCircle
              size={14}
              className="mt-0.5 text-emerald-500 flex-shrink-0"
            />
            <span className="text-gray-700">{action}</span>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="short" className="space-y-2">
        {shortTerm.map((action, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <Target size={14} className="mt-0.5 text-amber-500 flex-shrink-0" />
            <span className="text-gray-700">{action}</span>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="long" className="space-y-2">
        {longTerm.map((action, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <Sparkles
              size={14}
              className="mt-0.5 text-purple-500 flex-shrink-0"
            />
            <span className="text-gray-700">{action}</span>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default ActionPlan;
