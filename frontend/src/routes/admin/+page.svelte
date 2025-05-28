<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { getLibri } from '$lib/api.js';
  import { goto } from '$app/navigation';

  const libri = writable([]);

  onMount(async () => {
    try {
      const libriDalServer = await getLibri();
      libri.set(libriDalServer);
    } catch (error) {
      console.error("Errore nel caricamento dei libri:", error);
    }
  });

  function rimuoviLibro(id) {
    libri.update(l => l.filter(libro => libro._id !== id));
  }

  function modificaLibro(id) {
    goto(`/admin/modifica-libro/${id}`);
  }
</script>

<main>
  <div class="container">
    <div class="content">
      <h2 class="monsieur-la-doulaise-regular">Dashboard Amministratore</h2>
    </div>
  </div>

  <h1>Gestione Libri</h1>

  <div class="tabella-container">
  <table class="libri-table">
    <thead>
      <tr>
        <th>Titolo</th>
        <th>Autore</th>
        <th>Prezzo</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      {#each $libri as libro}
        <tr>
          <td>{libro.title}</td>
          <td>{libro.author}</td>
          <td>{libro.price} €</td>
          <td>
            <button class="modifica-btn" on:click={() => modificaLibro(libro._id)}>Modifica</button>
            <button class="elimina-btn" on:click={() => rimuoviLibro(libro._id)}>Elimina</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  </div>

  <a class="aggiungi-link" href="/admin/nuovo-libro">Aggiungi nuovo libro</a>
</main>



<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(177, 223, 250);
    text-align: center;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .tabella-container {
  max-width: 100%;
  overflow-x: auto;
  }


  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .monsieur-la-doulaise-regular {
    font-family: "Monsieur La Doulaise", cursive;
    font-weight: 400;
    font-style: normal;
    font-size: 4rem;
  }

  .libri-table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}

.libri-table th, .libri-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.libri-table th {
  background-color: #b6e6fc;
  font-weight: bold;
}

.libri-table tr:hover {
  background-color: #f1f1f1;
}

.elimina-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.elimina-btn:hover {
  background-color: #c62828;
}

.aggiungi-link {
  margin-top: 20px;
  display: inline-block;
  color: #00695c;
  text-decoration: none;
  font-weight: bold;
}

.modifica-btn {
  background-color: #ffd900;
  color: rgb(0, 0, 0);
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 8px;
}

.modifica-btn:hover {
  background-color: #ffb921;
}

</style>