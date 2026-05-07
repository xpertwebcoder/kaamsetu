import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KaamSetu | Rural Local Worker Connection Platform',
  description: 'Find nearby trusted local workers like labour, electrician, plumber, mason, painter, driver, tractor, and farm worker.',
  icons: {
    icon: '/fav.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
