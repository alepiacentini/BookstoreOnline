<!-- BookForm.svelte -->
<script>
  export let onSubmit;

  let title = '';
  let author = '';
  let price = '';
  let stock = '';
  let genre = '';

  function handleSubmit() {
    onSubmit({ title, author, price, stock, genre });
  }
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="title">
    <div class="main-title">Nuovo Libro</div>
    <div class="subtitle">Inserisci i dati per aggiungere un libro</div>
  </div>

  <input class="input" bind:value={title} placeholder="Titolo" required />
  <input class="input" bind:value={author} placeholder="Autore" required />
  <input class="input" type="number" step="0.01" bind:value={price} placeholder="Prezzo (€)" required />
  <input class="input" type="number" bind:value={stock} placeholder="Quantità" required />
  <input class="input" bind:value={genre} placeholder="Genere" required />

  <button class="button-confirm" type="submit">Aggiungi</button>
</form>

<style>

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
