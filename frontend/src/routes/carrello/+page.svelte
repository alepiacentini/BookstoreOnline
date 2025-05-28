<script>
  import { cart } from '$lib/user';

  function acquista() {
    alert('Acquisto completato!');
    cart.set([]);
  }

  $: totale = $cart.reduce((acc, libro) => acc + libro.price, 0).toFixed(2);

</script>


<style>
  :root {
    --color-10: #e7aaec;
    --color-11: #f585b0;
    --color-12: #cb9af8;
    --color-13: #a6cbf5;
    --text-dark: #102032;
    --primary: #6c63ff;
    --primary-dark: #5548c8;
    --card-bg: #ffffffcc;
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

  main {
  font-family: Arial, sans-serif;
}


  .monsieur-la-doulaise-regular {
    font-family: "Monsieur La Doulaise", cursive;
    font-weight: 400;
    font-style: normal;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 9rem);
    letter-spacing: 2px;
    color: var(--text-dark);
    margin-bottom: 30px;
    transition: transform 0.3s ease;
  }

  h1:hover {
    transform: translateY(-5px);
  }

  .master-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    width: 100%;
    align-items: center;
  }

  .card {
    background: var(--card-bg);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 300px;
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease;
  }

  .cart .title {
  margin-bottom: 25px;
  }


  .card:hover {
    transform: translateY(-5px);
  }

  .title {
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--text-dark);
  }

  .cart {
    flex: 1 1 100%;
    max-width: 1000px;
  }

  .products-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }

  .products-table th,
  .products-table td {
    padding: 12px 16px;
    border: 1px solid #ccc;
    text-align: left;
  }

  .products-table th {
    background-color: #f5f5f5;
    color: var(--text-dark);
    font-weight: bold;
  }

  .products-table td.price {
    text-align: right;
    font-weight: bold;
  }


  .price {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    min-width: 70px;
    text-align: right;
  }

  .details {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    margin: 15px 0;
    font-weight: 500;
    color: var(--text-dark);
  }

  .checkout--footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }

  .checkout-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 12px 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    transition: background 0.3s ease;
  }

  .checkout-btn:hover {
    background-color: var(--primary-dark);
  }

    .elimina-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .elimina-btn:hover {
    background-color: #e60000;
  }

</style>


<main>
  <h1 class="monsieur-la-doulaise-regular">Il tuo Carrello</h1>

  {#if $cart.length > 0}
    <div class="master-container">
      <div class="card cart">
        <span class="title">Carrello</span>
        <table class="products-table">
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Quantità</th>
              <th>Prezzo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {#each $cart as libro, index (index)}
              <tr>
                <td>{libro.title}</td>
                <td>1</td>
                <td class="price">{libro.price.toFixed(2)}€</td>
                <td>
                  <button class="elimina-btn" on:click={() => cart.update(items => items.filter((_, i) => i !== index))}>
                    Elimina
                  </button>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="card checkout">
        <span class="title">Checkout</span>
        <div class="details">
          <span>Your cart subtotal:</span>
          <span>{totale} €</span>
        </div>
        <div class="checkout--footer">
          <span class="price">{totale}€</span>
          <button class="checkout-btn" on:click={acquista}>Procedi all’acquisto</button>
        </div>
      </div>
    </div>
  {:else}
    <p>Il carrello è vuoto.</p>
  {/if}
</main>



