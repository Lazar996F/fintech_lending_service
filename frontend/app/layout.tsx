import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from './Provider';
import AppBar from './AppBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lend & Borrow',
  description:
    'financial app that enables users to lend and borrow money. Lenders will benefit from a fixed annual yield, whereas borrowers will be subject to a fixed annual fee.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AppBar />
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
