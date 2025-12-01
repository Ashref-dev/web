import type { Metadata } from 'next';
import './globals.css';

import { AuthProvider } from './context/AuthContext';

export const metadata: Metadata = {
  title: 'RecipeShare - Share Your Delicious Recipes',
  description: 'A brutalist recipe sharing platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
