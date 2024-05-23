const form = document.getElementById("form");
const submit = document.getElementById("submit");

submit.addEventListener("click", (event) => {
  event.preventDefault;
  const baliseEmail = document.getElementById("email");
  const email = baliseEmail.value;
  console.log(email);

  const baliseMdp = document.getElementById("mdp");
  const password = baliseMdp.value;
  console.log(password);

  async function LoginCheck() {
    const loginFetch = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer Sophie",
      },
      body: JSON.stringify({ email, password }),
    });
    const loginResponse = await loginFetch;
    console.log(loginResponse.ok);
    if (loginResponse.ok == true) {
      console.log("Authentification réussi");
      //window.location.href correspond à l'URL de la page actuelle,
      //window.location.href = "index.html" permet d'être redigiré vers la page disgnée
      window.location.href = "index.html";
    } else {
      console.log("L'authenfication a échoué");
    }
  }

  LoginCheck();
});
