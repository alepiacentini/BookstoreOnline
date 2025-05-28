import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Inizializza lo store con i valori dal localStorage se disponibili
const storedUser = browser ? localStorage.getItem('user') : null;
const storedToken = browser ? localStorage.getItem('token') : null;

// Crea gli store
export const user = writable(storedUser ? JSON.parse(storedUser) : null);
export const token = writable(storedToken || null);
export const isAuthenticated = writable(!!storedToken);

// Funzione per gestire il login
export const login = (userData, authToken) => {
    user.set(userData);
    token.set(authToken);
    isAuthenticated.set(true);
    
    if (browser) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    }
};

// Funzione per gestire il logout
export const logout = () => {
    user.set(null);
    token.set(null);
    isAuthenticated.set(false);
    
    if (browser) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
};

// Funzione per verificare se l'utente è admin
export const isAdmin = () => {
    let currentUser;
    user.subscribe(value => {
        currentUser = value;
    })();
    
    return currentUser?.isAdmin || false;
};