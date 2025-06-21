import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Caveat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});
const caveat = Caveat({ 
  subsets: ['latin'], 
  variable: '--font-caveat'
});

export const metadata: Metadata = {
  title: 'For My Dearest Jaan 💕',
  description: 'A special message filled with love',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable}`}>
      <body className={poppins.className}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        {children}
      </body>
    </html>
  );
}