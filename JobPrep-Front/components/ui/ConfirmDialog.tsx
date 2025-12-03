"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
  icon?: "alert" | "trash" | React.ReactNode;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title = "Confirmation",
  description = "Êtes-vous sûr ?",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  loading = false,
  onConfirm,
  icon = "alert",
}: ConfirmDialogProps) {
  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon;
    if (icon === "trash") return <Trash2 size={18} />;
    return <AlertTriangle size={18} />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {renderIcon()} {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onConfirm()}
            disabled={loading}
          >
            {loading ? "Veuillez patienter..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
