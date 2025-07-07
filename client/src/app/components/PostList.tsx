'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/PostList.module.css';

interface Post {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/items`);
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className={styles.loading}>Loading items...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.postListContainer}>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <h3 className={styles.postTitle}>{post.name}</h3>
            <p className={styles.postDescription}>{post.description}</p>
            <p className={styles.postPrice}>
              ₱{post.price.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}