<script>
  import { user, cart } from '$lib/user';
</script>

<nav style="display: flex; justify-content: space-between; align-items: center; background-color: white; padding: 1rem; border-radius: 1rem; box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;">
  <div class="button-container">
    <a href="/" class="button" aria-label="Home">
      <svg class="icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
      </svg>
    </a>

   <a
  href={ $user ? "/catalogo" : "#" }
  class="button"
  aria-label="Catalogo"
  on:click={!$user ? () => alert("Devi effettuare l'accesso per accedere al catalogo!") : null}
>
  <svg class="icon" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 2H8a2 2 0 0 0-2 2v17a1 1 0 0 0 1.447.894L13 19.118l5.553 2.776A1 1 0 0 0 20 21V4a2 2 0 0 0-1-1.732V2z"></path>
  </svg>
</a>

<a
  href={ $user ? "/carrello" : "#" }
  class="button"
  aria-label="Carrello"
  on:click={!$user ? () => alert("Devi effettuare l'accesso per accedere al carrello!") : null}
>
  <svg class="icon" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
  <span style="position: absolute; top: 0; right: 0; font-size: 0.75em;">({$cart.length})</span>
</a>

  </div>

  {#if $user}
    <div style="display: flex; align-items: center; gap: 1rem; color: #333;">
      <span>Ciao, {$user.email}</span>
      <button on:click={() => user.set(null)}
        style="background-color: #e74c3c; color: white; border: none; padding: 0.5rem 1rem; cursor: pointer; border-radius: 1rem;">
        Logout
      </button>
    </div>
  {/if}
</nav>

<style>
  .button-container {
    display: flex;
    gap: 1rem;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }

  .button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0; /* grigio chiaro */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: "Arial", sans-serif;
  }

  .button:hover {
    background-color: #c0c0c0; /* grigio medio */
    transform: translateY(-3px);
  }

  .icon {
    font-size: 20px;
  }

  span{
    font-family: "Arial", sans-serif;
  }
</style>
