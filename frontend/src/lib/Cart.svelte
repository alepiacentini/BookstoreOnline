<script>
    import { cart } from '$lib/user';
  </script>
  
  <h2>Carrello</h2>
  <ul>
    {#each $cart as libro}
      <li>{libro.titolo} - {libro.prezzo}€</li>
    {/each}
  </ul>
  <button on:click={() => alert('Procedi al pagamento...')}>Compra ora</button>
  