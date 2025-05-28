import { writable } from 'svelte/store';

export const user = writable({
  email: '',
  token: '',
  id: '',
  role: ''  // 'user' o 'admin'
});

export const cart = writable([]);

export const libri = writable([]); // lascia vuoto: sarà riempito da MongoDB
