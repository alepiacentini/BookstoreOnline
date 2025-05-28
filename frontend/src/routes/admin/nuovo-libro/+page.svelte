<script>
    import { goto } from '$app/navigation';
  import { addLibro } from '$lib/api.js';
  import BookForm from '$lib/BookForm.svelte';

  async function aggiungiLibro(libro) {
    try {
      const nuovoLibro = await addLibro(libro); // salvalo nel DB
      libri.update(l => [...l, nuovoLibro]);    // aggiorna lo store locale
      window.location.href = '/admin';          // torna alla dashboard
    } catch (error) {
      console.error("Errore nell'aggiunta del libro:", error);
    }
  }
</script>

<main class="aggiungi-libro-container">
  <div class="form-wrapper">
    <BookForm onSubmit={aggiungiLibro} />

    <!-- Bottone Dashboard dentro al contenitore -->
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

  main.aggiungi-libro-container {
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
</style>
