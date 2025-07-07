// 'use client';

// import React, { useState } from 'react';
// import styles from '../styles/EditItemModal.module.css';

// interface Item {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

// interface EditItemModalProps {
//   item: Item;
//   onClose: () => void;
//   onSave: (item: Item) => void;
//   setItem: React.Dispatch<React.SetStateAction<Item | null>>;
// }

// const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave, setItem }) => {
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const validateField = (name: string, value: string | number): string => {
//     switch (name) {
//       case 'name':
//         if (!value || (typeof value === 'string' && value.trim() === '')) {
//           return 'Name is required';
//         }
//         return '';
//       case 'price':
//         if (!value && value !== 0) {
//           return 'Price is required';
//         }
//         if (typeof value === 'number' && value <= 0) {
//           return 'Price must be a positive number';
//         }
//         return '';
//       default:
//         return '';
//     }
//   };

//   const handleInputChange = (field: keyof Item, value: string | number) => {
//     setItem((prev) => prev ? { ...prev, [field]: value } : null);
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleSave = () => {
//     const newErrors: { [key: string]: string } = {};
    
//     // Validate all fields
//     newErrors.name = validateField('name', item.name);
//     newErrors.price = validateField('price', item.price);
    
//     // Filter out empty errors
//     const filteredErrors = Object.entries(newErrors).reduce((acc, [key, value]) => {
//       if (value) acc[key] = value;
//       return acc;
//     }, {} as { [key: string]: string });
    
//     setErrors(filteredErrors);
    
//     // If no errors, proceed with save
//     if (Object.keys(filteredErrors).length === 0) {
//       onSave(item);
//     }
//   };
//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContainer}>
//         <h2 className={styles.modalTitle}>Edit Item</h2>

//         <label className={styles.formLabel}>
//           Name:
//           <input
//             type="text"
//             className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
//             value={item.name}
//             onChange={(e) => handleInputChange('name', e.target.value)}
//             required
//           />
//           {errors.name && <span className={styles.errorText}>{errors.name}</span>}
//         </label>

//         <label className={styles.formLabel}>
//           Description:
//           <textarea
//             className={styles.formTextarea}
//             value={item.description}
//             onChange={(e) => handleInputChange('description', e.target.value)}
//           />
//         </label>

//         <label className={styles.formLabel}>
//           Price:
//           <input
//             type="number"
//             step="0.01"
//             min="0.01"
//             className={`${styles.formInput} ${errors.price ? styles.formInputError : ''}`}
//             value={item.price}
//             onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
//             required
//           />
//           {errors.price && <span className={styles.errorText}>{errors.price}</span>}
//         </label>

//         <div className={styles.buttonGroup}>
//           <button
//             className={`${styles.btn} ${styles.btnCancel}`}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className={`${styles.btn} ${styles.btnSave}`}
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditItemModal;