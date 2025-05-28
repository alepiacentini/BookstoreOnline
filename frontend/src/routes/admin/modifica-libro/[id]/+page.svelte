<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getLibroById, updateBook } from '$lib/api.js';
  import { goto } from '$app/navigation';

  let id = '';
  let title = '';
  let author = '';
  let price = '';
  let stock = '';
  let genre = '';


  onMount(async () => {
    id = $page.params.id;
    console.log('ID del libro:', id);
    try {
      const libro = await getLibroById(id);
      console.log('Libro caricato:', libro);
      title = libro.title;
      author = libro.author;
      price = libro.price;
      stock = libro.stock;
      genre = libro.genre;
    } catch (error) {
      console.error('Errore nel caricamento del libro:', error);
    }
  });

  async function salvaModifiche() {
    try {
      await updateBook(id, {
        title,
        author,
        price: Number(price),
        stock: Number(stock),
        genre
      });
        alert("Modifiche salvate con successo!");
        goto('/admin');
    } catch (error) {
        console.error('Errore nel salvataggio:', error);
        alert("Errore nel salvataggio!");
    }
  }

  function salva(){
    alert("Modifiche salvate con successo!");
  }
</script>

<main class="modifica-libro-container">
  <div class="form-wrapper">
    <form class = "form" on:submit|preventDefault={salvaModifiche}>
      <div class="title">
        <div class="main-title">Modifica Libro</div>
        <div class="subtitle">Aggiorna i dati del libro</div> 
      </div>
          <input class="input" type="text" bind:value={title} placeholder="Titolo" required />
          <input class="input" type="text" bind:value={author} placeholder="Autore" required />
          <input class="input" type="number" bind:value={price} placeholder="Prezzo" required />
          <input class="input" type="number" bind:value={stock} placeholder="Quantità" required />
          <input class="input" type="text" bind:value={genre} placeholder="Genere" required />

          <button class="button-confirm" type="submit">Salva</button>
    </form>
        <button class="button-dashboard" on:click={() => goto('/admin')}>
          Torna indietro
        </button>
  </div>
</main>

<style>

  :root {
    --main-color: black;
    --bg-color: beige;
    --font-color: #323232;
  }

  main.modifica-libro-container {
    height: 100vh;
    background: linear-gradient(to right, #e0f7fa, #71c1f7);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-dashboard {
    margin-top: 20px;
    width: 180px;
    height: 45px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .button-dashboard:active {
    box-shadow: 0 0 var(--main-color);
    transform: translate(3px, 3px);
  }

  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: beige;
    --main-color: black;

    padding: 30px;
    background: lightblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  }


  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
  }

  .main-title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
    font-family: 'Arial', sans-serif;
  }

  .subtitle {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
    font-family: 'Arial', sans-serif;
    margin-top: 5px;
  }


  .input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .input:focus {
    border: 2px solid var(--input-focus);
  }


  .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .button-confirm {
    margin: 5px auto 0 auto;
    width: 120px;
    height: 45px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

</style>
