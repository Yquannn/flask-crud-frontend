'use client';

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navButton}>Home</Link>
      <Link href="/item-details" className={styles.navButton}>Items</Link>
      <Link href="/item-create" className={styles.navButton}>Create Item</Link>
    </nav>
  );
}
