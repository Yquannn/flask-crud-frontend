'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ItemListPage.module.css'; 
import { useRouter } from 'next/navigation';
import EditItem from '../item-edit/[id]/page';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ItemListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/items`);
        setItems(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`${baseUrl}/api/items/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleSave = async (updatedItem: Item) => {
    try {
      const res = await axios.put(`${baseUrl}/api/items/${updatedItem.id}`, updatedItem);
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? res.data : item))
      );
      
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items</h1>

      {items.length === 0 ? (
        <p className={styles.noItems}>No items found.</p>
      ) : (
        <ul className={styles.itemList}>
          {items.map(item => (
            <li key={item.id} className={styles.itemCard}>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemDescription}>{item.description}</p>
              <p className={styles.itemPrice}>₱{item.price.toLocaleString()}</p>

              <div className={styles.buttonContainer}>
              <button
                className={styles.updateButton}
                onClick={() => router.push(`/item-edit/${item.id}`)}
              >
                Update
            </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    handleDelete(item.id);
                    router.push(`/item/${item.id}`);
                    
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
