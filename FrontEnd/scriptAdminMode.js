function isConnected() {
  if (sessionStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

function handleAdminElements() {
  if (isConnected()) {
    console.log("Sessions storage OK");
    const adminElements = document.querySelectorAll(".admin_mode");
    for (let element of adminElements) {
      element.classList.remove("hidden");
      console.log("En cours");
    }
  }
}

handleAdminElements();

const modifier = document.querySelector(".boutton_modifier");

modifier.addEventListener("click", () => {
  console.log("modifier");
  const activateModale = document.getElementById("modale_overlay");
  const activateModaleMain = document.getElementById("modale_main");
  const activateModaleAdd = document.getElementById("modale_add");

  activateModale.classList.remove("hidden");
  console.log("Modale Overlay not hidden");
  activateModaleMain.classList.remove("hidden");
  console.log("Modale Main not hidden");
});

const addButtonModale = document.querySelector(".modale-footer button");

addButtonModale.addEventListener("click", () => {
  console.log("Button push");
});
