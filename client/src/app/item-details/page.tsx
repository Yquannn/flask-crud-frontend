'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import EditItemModal from '../components/EditItemModal';
import styles from '../styles/ItemListPage.module.css'; // ✅ Make sure file exists

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ItemListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/items');
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
      await axios.delete(`http://127.0.0.1:5000/api/items/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleSave = async (updatedItem: Item) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/items/${updatedItem.id}`, updatedItem);
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? res.data : item))
      );
      setShowModal(false);
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
                  onClick={() => {
                    setEditingItem(item);
                    setShowModal(true);
                  }}
                >
                  Update
                </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && editingItem && (
        <EditItemModal
          item={editingItem}
          setItem={setEditingItem}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
