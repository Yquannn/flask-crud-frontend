'use client';

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
}

export default function Navbar() {
  const [items, setItems] = useState<Item[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/api/items`)
      .then(res => setItems(res.data))
      .catch(err => console.error('Failed to fetch items:', err));
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navButton}>Home</Link>
      <Link href="/item" className={styles.navButton}>Items</Link>
      <Link href="/create-item" className={styles.navButton}>Create Item</Link>
    </nav>
  );
}
