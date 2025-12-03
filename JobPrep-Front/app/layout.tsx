import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobPrep - Plateforme IA de préparation aux entretiens',
  description:
    "Décrochez le poste de vos rêves avec notre IA révolutionnaire qui vous accompagne dans chaque étape de votre recherche d'emploi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
