"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react";

interface LoginDialogProps {
  children?: React.ReactNode; // trigger content
}

export default function LoginDialog({ children }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const message = errData?.message || "Email ou mot de passe incorrect";
        throw new Error(Array.isArray(message) ? message.join(", ") : message);
      }

      const data = await response.json();
      const { access_token, user } = data || {};

      if (!access_token) {
        throw new Error("Réponse d'authentification invalide (token manquant)");
      }

      try {
        localStorage.setItem("auth_token", access_token);
        if (user) localStorage.setItem("auth_user", JSON.stringify(user));
      } catch (_) {}

      try {
        const maxAgeSeconds = 60 * 60 * 24 * 7; // 7 days
        const secure = typeof window !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `auth_token=${access_token}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
      } catch (_) {}

      // Close dialog then redirect
      setOpen(false);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err?.message || "Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>{children}</span>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left illustration (hidden on small screens) */}
          <div className="relative hidden lg:block bg-[#0d9488]">
            <img
              src="/images/search_job.jpg"
              alt="Illustration professionnelle"
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
            />
            <div className="relative z-10 h-full w-full p-6 text-white flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Shield className="text-white" size={18} />
                </div>
                <div>
                  <h1 className="text-xl font-bold">JobPrep</h1>
                  <p className="text-white/80 text-xs">Construisez votre carrière en confiance</p>
                </div>
              </div>
              <p className="text-white/80 text-xs">Rejoignez JobPrep pour avancer sereinement dans votre recherche d&apos;emploi.</p>
            </div>
          </div>

          {/* Right form */}
          <div className="p-6 bg-white">
            <Card className="shadow-none border-0">
              <CardContent className="p-0">
                <div className="mb-4">
                  <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>
                      Accédez à votre espace personnel
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="text-red-600" size={16} />
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@exemple.com"
                      className="mt-2 focus-visible:ring-[#0d9488]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="focus-visible:ring-[#0d9488]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0d9488] hover:bg-[#0b7f74] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>

                  <div className="mt-2 text-center text-xs text-gray-500">
                    Connexion sécurisée. Vos données sont protégées.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
