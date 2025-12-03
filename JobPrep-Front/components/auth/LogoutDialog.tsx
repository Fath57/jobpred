"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  children?: React.ReactNode; // trigger content
  onLoggedOutRedirect?: string; // optional redirection path
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function LogoutDialog({
  children,
  onLoggedOutRedirect = "/login",
  title = "Se déconnecter",
  description = "Voulez-vous vraiment vous déconnecter ?",
  confirmLabel = "Se déconnecter",
  cancelLabel = "Annuler",
}: LogoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      // Clear local storage
      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      } catch (_) {}

      // Expire the auth cookie
      try {
        const secure =
          typeof window !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `auth_token=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
      } catch (_) {}

      // Close dialog then redirect
      setOpen(false);
      if (typeof window !== "undefined") {
        window.location.href = onLoggedOutRedirect;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>{children}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut size={18} /> {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Déconnexion..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
