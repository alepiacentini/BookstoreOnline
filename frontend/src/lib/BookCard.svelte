<script>
  import { cart } from '$lib/user';
  export let book;

  function aggiungiAlCarrello() {
    cart.update(c => [...c, book]);
  }
</script>

<div class="card">
  <div class="card__content">
    <div class="card__image"></div>
    <div class="card__text">
      <p class="card__title">{book.title}</p>
      <p class="card__description">{book.author}</p>
    </div>
    <div class="card__footer">
      <span class="card__price">{book.price}€</span>
      <button class="card__button" on:click={aggiungiAlCarrello}>+</button>
    </div>
  </div>
</div>

<style>
  .card {
    background: #18181b;
    border-radius: 10px;
    overflow: hidden;
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease;
    font-family: "Arial", sans-serif;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .card__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card__image {
    height: 100px;
    background-color: #a78bfa;
    border-radius: 5px;
    margin-bottom: 0.5rem;
  }

  .card__text {
    flex-grow: 1;
  }

  .card__title {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 0.2rem;
  }

  .card__description {
    font-size: 0.85rem;
    color: #d4d4d8;
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
  }

  .card__price {
    color: #a78bfa;
    font-size: 1rem;
    font-weight: bold;
  }

  .card__button {
    background-color: #a78bfa;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .card__button:hover {
    background-color: #7c3aed;
  }
</style>
