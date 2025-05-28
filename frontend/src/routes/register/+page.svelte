<main>
  <div class="container">
  <h1 class="monsieur-la-doulaise-regular">Vuoi registrarti come utente o amministratore?</h1>
  <div class="buttons">
    <a href="/register/user" class="btn login-btn">Utente</a>
    <a href="/register/admin" class="btn register-btn">Amministratore</a>
  </div>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(19deg, var(--color-10), var(--color-11), var(--color-12), var(--color-13));
    text-align: center;
    padding: 20px;
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


  .buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap; /* Responsive design */
    justify-content: center;
  }

  .btn {
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9); /* Effetto glassmorphism */
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px); /* Effetto glassmorphism */
    transition: all 0.3s ease 0s; /* Animazioni hover */
    cursor: pointer;
    outline: none;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    font-family: sans-serif;
  }

  .login-btn:hover {
    background-color: rgba(0, 191, 255, 0.9); /* Effetto glassmorphism + Animazioni hover */
    box-shadow: 0px 15px 20px rgba(0, 191, 255, 0.4);
    color: #fff;
    transform: translateY(-7px); /* Animazioni hover */
  }

  .register-btn:hover {
    background-color: rgba(255, 107, 0, 0.9); /* Effetto glassmorphism + Animazioni hover */
    box-shadow: 0px 15px 20px rgba(255, 107, 0, 0.4);
    color: #fff;
    transform: translateY(-7px); /* Animazioni hover */
  }

  .btn:active {
    transform: translateY(-1px); /* Animazioni hover */
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .btn {
      width: 200px;
    }
  }
</style>
