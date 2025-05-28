// lib/stores/cart.js
import { writable } from 'svelte/store';

function createCartStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    add: (book) => {
      update(items => {
        const existingItem = items.find(item => item._id === book._id);
        if (existingItem) {
          existingItem.quantity += 1;
          return items;
        } else {
          return [...items, { ...book, quantity: 1 }];
        }
      });
    },
    remove: (bookId) => {
      update(items => items.filter(item => item._id !== bookId));
    },
    updateQuantity: (bookId, quantity) => {
      update(items => {
        const item = items.find(item => item._id === bookId);
        if (item) {
          item.quantity = quantity;
        }
        return items;
      });
    },
    clear: () => set([]),
    getTotal: (items) => {
      return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getItemCount: (items) => {
      return items.reduce((count, item) => count + item.quantity, 0);
    }
  };
}

export const cart = createCartStore();