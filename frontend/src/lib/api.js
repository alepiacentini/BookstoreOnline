// src/lib/api.js
export const BASE_URL = 'http://localhost:3002/api';

// =====================
// Autenticazione
// =====================

export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Errore di rete');
  }

  return await res.json();
}

export async function register({ username, email, password, isAdmin = false }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, isAdmin }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Errore durante la registrazione');
  return data;
}

// =====================
// Libri
// =====================

// RECUPERA TUTTI I LIBRI
export async function getLibri() {
  try {
    const res = await fetch('http://localhost:3002/api/books');
    if (!res.ok) {
      throw new Error(`Errore nel fetch: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Errore in getLibri:", err);
    throw err;
  }
}


// Solo Admin - AGGIUNTA NUOVO LIBRO
export async function addLibro(libro) {
  const res = await fetch('http://localhost:3002/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libro)
  });

  if (!res.ok) {
    throw new Error('Errore durante la creazione del libro');
  }

  return await res.json(); // ritorna il libro appena creato dal server
}


// Solo Admin - RIMOZIONE LIBRO
export async function deleteBook(bookId, token) {
  const res = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Errore durante la rimozione del libro');
  return data;
}

// Solo Admin - RECUPERA LIBRO PER ID
export async function getLibroById(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error('Non autorizzato');
  }

  if (!res.ok) {
    throw new Error('Errore nel recupero del libro');
  }

  return await res.json();
}


// Solo Admin - AGGIORNAMENTO LIBRO
export async function updateBook(id, libroAggiornato) {
  const token = localStorage.getItem('token'); 
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(libroAggiornato),
  });
  if (!res.ok) throw new Error('Errore aggiornamento libro');
  return await res.json();
}


// =====================
// Carrello (solo User)
// =====================

export async function getCart(token) {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Errore nel recupero del carrello');
  return data;
}

export async function addToCart(bookId, token) {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Errore durante l\'aggiunta al carrello');
  return data;
}

export async function removeFromCart(bookId, token) {
  const res = await fetch(`${BASE_URL}/cart/${bookId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Errore durante la rimozione dal carrello');
  return data;
}

export async function checkout(token) {
  const res = await fetch(`${BASE_URL}/cart/checkout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Errore durante il checkout');
  return data;
}
