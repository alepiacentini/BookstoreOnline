<script>
  import { onMount } from 'svelte';
  import BookCard from '$lib/BookCard.svelte';
  let books = [];
  let error = '';

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:3002/api/books');
      if (!res.ok) {
        throw new Error('Errore nel recupero dei libri');
      }
      books = await res.json();
      console.log("Libri ricevuti:", books);
    } catch (err) {
      error = err.message;
    }
  });
</script>



<main>
  <h1 class="monsieur-la-doulaise-regular">Catalogo</h1>
  {#if error}
    <p class="error">{error}</p>
  {:else if books.length === 0}
    <p>Nessun libro disponibile al momento.</p>
  {/if}
  <div class="catalogo">
    {#each books as book}
      <BookCard {book} />
    {/each}
  </div>
</main>

<style>
  :root {
    --color-10: #e7aaec;  
    --color-11: #f585b0; 
    --color-12: #cb9af8;  
    --color-13: #a6cbf5;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(19deg, var(--color-10), var(--color-11), var(--color-12), var(--color-13));
    text-align: center;
    padding: 2rem;
  }

    .monsieur-la-doulaise-regular {
    font-family: "Monsieur La Doulaise", cursive;
    font-weight: 400;
    font-style: normal;
  }


  h1 {
    font-size: clamp(3rem, 8vw, 9rem); /* Font size responsivo */
    letter-spacing: 2px;
    color: #102032;
    margin-bottom: 30px;
    text-transform: none;
    transition: transform 0.3s ease; /* Animazione hover */
  }

    h1:hover {
    transform: translateY(-5px); /* Animazione hover */
  }

  .catalogo {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
  }
</style>
