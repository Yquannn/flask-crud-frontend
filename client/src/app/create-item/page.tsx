'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ItemForm.module.css';


export default function CreateItemPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || price <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/items`, {
        name,
        description,
        price,
      });
      alert('Item created!');
      router.push('/'); // redirect to item list
    } catch (err) {
      console.error(err);
      alert('Failed to create item.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Item</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Price:
          <input
            className={styles.input}
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            min={0}
          />
        </label>

        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>
            Create
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
