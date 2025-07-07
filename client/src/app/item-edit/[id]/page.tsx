'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/EditItem.module.css'; // Adjust path as needed

interface Item {
  id: number;
  name: string;
  description: string;
  price: number | string;
}

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState<Item>({
    id: 0,
    name: '',
    description: '',
    price: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/items/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => {
        alert('Item not found.');
        router.push('/item');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const validateField = (name: string, value: string | number): string => {
    if (name === 'name') {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return 'Name is required';
      }
    }
    if (name === 'price') {
      if (value === '' || value === null) return 'Price is required';
      if (typeof value === 'number' && value <= 0) return 'Price must be a positive number';
    }
    return '';
  };

  const handleInputChange = (field: keyof Item, value: string | number) => {
    setItem((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {
      name: validateField('name', item.name),
      price: validateField('price', item.price),
    };

    const filteredErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v));
    setErrors(filteredErrors);

    if (Object.keys(filteredErrors).length === 0) {
      try {
        await axios.put(`${baseUrl}/api/items/${id}`, {
          ...item,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        });
        alert('Item updated successfully.');
        router.push('/item');

      } catch (err) {
        console.error(err);
        alert('Failed to update item.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.modalContainer}>
      <h2 className={styles.modalTitle}>Edit Item</h2>

      <label className={styles.formLabel}>
        Name:
        <input
          type="text"
          className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
          value={item.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </label>

      <label className={styles.formLabel}>
        Description:
        <textarea
          className={styles.formTextarea}
          value={item.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </label>

      <label className={styles.formLabel}>
        Price:
        <input
          type="number"
          step="0.01"
          min="0.01"
          className={`${styles.formInput} ${errors.price ? styles.formInputError : ''}`}
          value={item.price}
          onChange={(e) =>
            handleInputChange(
              'price',
              e.target.value === '' ? '' : parseFloat(e.target.value)
            )
          }
        />
        {errors.price && <span className={styles.errorText}>{errors.price}</span>}
      </label>

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.btn} ${styles.btnCancel}`}
          onClick={() => router.push('/item')}
        >
          Cancel
        </button>
        <button className={`${styles.btn} ${styles.btnSave}`} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}


