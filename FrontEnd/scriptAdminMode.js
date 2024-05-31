// Gestion de la connexion
function isConnected() {
  if (sessionStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

async function createProject(dataUpload) {
  const createProject = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(dataUpload),
  });
}

// Gestion de la suppression avec l'API
async function deleteProject(project) {
  const deletedProject = await fetch(`http://localhost:5678/api/works/${project}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({ project }),
  });
}

// Gestion du mode éditeur après connexion
function handleAdminElements() {
  if (isConnected()) {
    console.log("Sessions storage OK");
    const adminElements = document.querySelectorAll(".admin_mode");
    const loginElement = document.getElementById("login");
    for (let element of adminElements) {
      element.classList.remove("hidden");
      loginElement.classList.add("hidden");
      console.log("En cours");
    }
  }
}

handleAdminElements();

// Gestion de la déconnexion
const logoutElement = document.getElementById("logout");

logoutElement.addEventListener("click", () => {
  sessionStorage.clear();
});

// Gestion de l'affichage des photos dans la modale
async function showProjects() {
  const worksList = await getWorks();
  const projects = document.getElementById("photos_projects");
  console.log(worksList);

  let index = 0;
  for (let work of worksList) {
    const cards = document.createElement("section");
    const img = document.createElement("img");
    const aMark = document.createElement("a");
    const iMark = document.createElement("i");

    cards.classList.add("card_image");

    img.setAttribute("alt", work.title);
    img.setAttribute("src", work.imageUrl);

    aMark.setAttribute("href", "#");
    aMark.classList.add(`card${work.id}`);

    iMark.classList.add("fa-solid");
    iMark.classList.add("fa-trash-can");
    iMark.id = work.id;

    aMark.appendChild(iMark);

    cards.appendChild(img);
    cards.appendChild(aMark);

    projects.appendChild(cards);
    console.log(iMark.id);

    //Gestion de la suppression dans la modale main
    iMark.addEventListener("click", function (iMarkClicked) {
      const iMarkSelected = iMarkClicked.target;
      const iMarkId = iMarkSelected.id;
      console.log(`Imark${iMarkId}`);
      deleteProject(iMarkId);
      console.log(`Projet ${iMarkId} supprimé`);
    });
  }
}
showProjects();

// Gestion du fonctionnement de la modale main
const modifier = document.querySelector(".boutton_modifier");

modifier.addEventListener("click", () => {
  console.log("modifier");
  const activateModale = document.getElementById("modale_overlay");
  const activateModaleMain = document.getElementById("modale_main");

  activateModale.classList.remove("hidden");
  console.log("Modale Overlay not hidden");
  activateModaleMain.classList.remove("hidden");
  console.log("Modale Main not hidden");
});

// Gestion du fonctionnement de la modale add
const addButtonModale = document.querySelector(".modale_footer button");

addButtonModale.addEventListener("click", () => {
  const activateModaleMain = document.getElementById("modale_main");
  const activateModaleAdd = document.getElementById("modale_add");

  activateModaleMain.classList.add("hidden");
  activateModaleAdd.classList.remove("hidden");

  console.log("Button push");
});

// Gestion du boutton validé de la modale add
const confirmButtonModale = document.querySelector(".modale_add_footer button");

confirmButtonModale.addEventListener("click", () => {
  const activateModale = document.getElementById("modale_overlay");
  const activateModaleAdd = document.getElementById("modale_add");

  const imageUpload = document.getElementById("image_upload");
  const imageUrl = imageUpload.value;
  console.log(imageUrl);

  const titleUpload = document.getElementById("title");
  const title = titleUpload.value;
  console.log(title);

  const categoryUpload = document.getElementById("category");
  const categoryId = categoryUpload.value;
  console.log(categoryId);
  let idElement = 12;
  const userIdSession = sessionStorage.getItem("userId");

  const dataUpload = { id: idElement, title: title, imageUrl: imageUrl, categoryId: categoryId, userId: userIdSession };

  createProject(dataUpload);

  activateModale.classList.add("hidden");
  activateModaleAdd.classList.add("hidden");
  idElement++;

  console.log("Close");
});
