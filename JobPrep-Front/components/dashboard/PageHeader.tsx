'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  breadcrumbItems: {
    href?: string;
    label: string;
    isCurrentPage?: boolean;
  }[];
  actions?: {
    label: string;
    icon: LucideIcon;
    variant?:
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link';
    onClick?: () => void;
  }[];
  isGenerating?: boolean;
  onGenerate?: () => void;
  generateButtonText?: string;
  generateLoadingText?: string;
  generateButtonGradient?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'text-blue-600',
  breadcrumbItems,
  actions = [],
  isGenerating = false,
  onGenerate,
  generateButtonText = 'Générer',
  generateLoadingText = 'Génération...',
  generateButtonGradient = 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
}) => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.isCurrentPage ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href || '#'}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Icon className={iconColor} size={32} />
            {title}
          </h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-0">
          {actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                className="flex items-center gap-2"
                onClick={action.onClick}
              >
                <ActionIcon size={16} />
                {action.label}
              </Button>
            );
          })}

          {onGenerate && (
            <Button
              onClick={onGenerate}
              disabled={isGenerating}
              className={`flex items-center gap-2 ${generateButtonGradient}`}
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⟳</span>
                  {generateLoadingText}
                </>
              ) : (
                <>
                  <span className="text-lg">✨</span>
                  {generateButtonText}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
