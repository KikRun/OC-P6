const submit = document.getElementById("submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const baliseEmail = document.getElementById("email");
  const email = baliseEmail.value;
  console.log(email);

  const baliseMdp = document.getElementById("mdp");
  const password = baliseMdp.value;
  console.log(password);

  async function loginCheck() {
    const loginFetch = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginJson = await loginFetch.json();
    console.log(loginJson);
    console.log(loginJson.token);
    if (loginFetch.ok == true) {
      console.log("Authentification réussi");

      //sessionStorage.setItem('adminMode', 'true'); permet de garder de la data tant que l'onglet ou la fenêtre n'est pas fermé
      sessionStorage.setItem("token", loginJson.token);
      sessionStorage.setItem("userId", loginJson.userId);

      //window.location.href correspond à l'URL de la page actuelle,
      //window.location.href = "index.html" permet d'être redigiré vers la page disgnée
      window.location.href = "index.html";
    } else {
      console.log("L'authenfication a échoué");
    }
  }

  loginCheck();
});
