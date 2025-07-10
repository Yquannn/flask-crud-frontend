'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/ItemListPage.module.css'; 
import { useRouter } from 'next/navigation';
import EditItem from '../item-edit/[id]/page';
import { apiClient, handleApiError } from '../utils/api';

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await apiClient.get('/api/items');
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
  // validate if the user wants to delete
  const confirmed = window.confirm("Are you sure you want to delete this item?");
  if (!confirmed) {
    console.log('Delete cancelled');
    return;
  }

  try {
    const response = await apiClient.delete(`/api/items/${id}`);
    
    if (response.status === 200 || response.status === 204) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("Item deleted successfully.");
    } else {
      alert("Item not found or already deleted.");
    }
  } catch (err: any) {
    console.error("Delete error:", err);
    
    // If the item was actually deleted but we got an error response
    if (err.response?.status === 404) {
      // Remove the item from the list anyway since it's likely already deleted
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("Item has been deleted.");
    } else if (err.response?.status === 500) {
      // Server error - check if item still exists
      try {
        await apiClient.get(`/api/items/${id}`);
        // If we get here, item still exists
        alert("Delete failed. Please try again later.");
      } catch (getErr: any) {
        if (getErr.response?.status === 404) {
          // Item was actually deleted
          setItems((prev) => prev.filter((item) => item.id !== id));
          alert("Item has been deleted.");
        } else {
          alert("Delete failed. Please try again later.");
        }
      }
    } else {
      alert("Delete failed. Please try again later.");
    }
  }
};


  const handleSave = async (updatedItem: Item) => {
    try {
      const res = await apiClient.put(`/api/items/${updatedItem.id}`, updatedItem);
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
      <h1>Items</h1>

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
                    // router.push(`/item/${item.id}`);
                    
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
