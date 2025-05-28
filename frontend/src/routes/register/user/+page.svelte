<script>
  import { user } from '$lib/user';
  import { register } from '$lib/api';
  import { goto } from '$app/navigation';

  let firstname = '';
  let lastname = '';
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  async function handleRegister() {
    error = '';

    if (password !== confirmPassword) {
      error = 'Le password non coincidono.';
      return;
    }

    try {
      const data = await register({
        firstname,
        lastname,
        username,
        email,
        password,
        isAdmin: false // utente normale
      });

      user.set({
        email: data.user.email,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        role: data.user.isAdmin ? 'admin' : 'user'
      });

      localStorage.setItem('token', data.token);

      goto(data.user.isAdmin ? '/dashboard-admin' : '/dashboard-user');

    } catch (e) {
      error = e.message || 'Errore di rete';
    }
  }
</script>

<main class="container">
    <div class="content">
    <h2 class="monsieur-la-doulaise-regular">Registrazione Utente</h2>

  <form class="form" on:submit|preventDefault={handleRegister}>
    <div class="title">
    <div class="main-title">Benvenuto</div>
    <div class="subtitle">registrati come utente</div>
</div>

    <label>
    <input class="input" type="text" bind:value={firstname} name="firstname" placeholder="Nome" required />
    </label>

    <label>
    <input class="input" type="text" bind:value={lastname} name="lastname" placeholder="Cognome" required />
    </label>

    <label>
    <input class="input" type="text" bind:value={username} name="username" placeholder="Username" required />
    </label>

    <label>
      <input class="input" type="email" bind:value={email} name="email" placeholder="Email" required />
    </label>

    <label>
      <input class="input" type="password" bind:value={password} name="password" placeholder="Password" required />
    </label>

    <label>
      <input class="input" type="password" bind:value={confirmPassword} name="confirmPassword" placeholder="Conferma Password" required />
    </label>

    <div class="login-with">
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button class="button-confirm" type="submit">Registrati</button>
  </form>
</main>

<style>
  :root {
    --color-10: #e7aaec;
    --color-11: #f585b0;
    --color-12: #cb9af8;
    --color-13: #a6cbf5;
  }

  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(19deg, var(--color-10), var(--color-11), var(--color-12), var(--color-13));
    text-align: center;
    padding: 20px;
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
    font-size: 3rem;
  }

  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: beige;
    --main-color: black;
    padding: 20px;
    background: lightblue;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
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

  .login-with {
    display: flex;
    gap: 20px;
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
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

</style>