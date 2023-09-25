import './globals.scss'
import type { Metadata } from 'next'
import { Nav } from '@/layout/Nav'
import { Footer } from '@/layout/Footer'

import styles from './layout.module.scss';
import { UserProvider } from '@/utils/userContext';

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={styles.wrapper}>
          {children}
        </body>
      </html>
    </UserProvider>
  )
}
