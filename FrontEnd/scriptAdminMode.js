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
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: dataUpload,
  });
  if (createProject.status == 201) {
    await showWorks();
    await showWorkInModale();
    resetAddForm();
  }
}

function resetAddForm() {
  const imagePreview = document.getElementById("image_preview");
  const filledFormButton = document.getElementById("modale_add_button");

  filledFormButton.disabled = true;

  imagePreview.classList.add("hidden");

  const formAdd = document.querySelector(".add_form");
  formAdd.reset();
}

// Gestion de la suppression avec l'API
async function deleteProject(projectId) {
  const deletedProject = await fetch(`http://localhost:5678/api/works/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({ projectId }),
  });
  console.log(deletedProject);
  if (deletedProject.status == 204) {
    await showWorks();
    await showWorkInModale();
  }
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
async function showWorkInModale() {
  const worksList = await getWorks();
  const projects = document.getElementById("photos_projects");
  console.log(worksList);

  let index = 0;

  projects.innerHTML = null;

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

    iMark.classList.add("fa-solid", "fa-trash-can");
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
showWorkInModale();

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

//Création des options des catégories dans le formulaire de modale add
async function hydrateCategory() {
  const categoriesList = await getCategory();

  for (let category of categoriesList) {
    const selectCategory = document.getElementById("category");
    const option = new Option(category.name, category.id);
    selectCategory.add(option);
  }
}
hydrateCategory();

// Gestion du fonctionnement de la modale add
const addButtonModale = document.querySelector(".modale_footer button");

addButtonModale.addEventListener("click", function (buttonClose) {
  const modaleClosed = buttonClose.target;
  const activateModaleMain = document.getElementById("modale_main");
  const activateModaleAdd = document.getElementById("modale_add");

  activateModaleMain.classList.add("hidden");
  activateModaleAdd.classList.remove("hidden");

  console.log("Button push");
});

//Gestion de la preview d'image de la modale add

function modaleAddPreview() {
  console.log("fonction");
  const uploadBox = document.getElementById("add_photo");
  const imageUpload = document.getElementById("image_upload");
  const imagePreview = document.getElementById("image_preview");

  uploadBox.addEventListener("click", (e) => {
    e.preventDefault();
    imageUpload.click();
    console.log("upload");
  });

  imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log("listener change");

    reader.onload = function () {
      imagePreview.src = reader.result;
      imagePreview.classList.remove("hidden");
      console.log("Onload");
    };

    const uploadBoxIMark = document.querySelector("#add_photo > .fa-image");
    const uploadBoxButton = document.querySelector("#add_photo > button");
    const uploadBoxText = document.querySelector("#add_photo > p");

    if (file) {
      reader.readAsDataURL(file);

      console.log("If");

      uploadBoxIMark.classList.add("hidden");
      uploadBoxButton.classList.add("hidden");
      uploadBoxText.classList.add("hidden");
    } else {
      uploadBoxIMark.classList.remove("hidden");
      uploadBoxButton.classList.remove("hidden");
      uploadBoxText.classList.remove("hidden");
      imagePreview.classList.add("hidden");
      console.log("Else");

      imagePreview.src = "";
    }
  });
}
modaleAddPreview();

//fermeture de la modale
function closeModale() {
  const activateModale = document.getElementById("modale_overlay");
  const activateModaleMain = document.getElementById("modale_main");
  const activateModaleAdd = document.getElementById("modale_add");

  activateModale.classList.remove("hidden");
  activateModaleMain.classList.remove("hidden");
  activateModaleAdd.classList.remove("hidden");

  activateModale.classList.add("hidden");
  activateModaleMain.classList.add("hidden");
  activateModaleAdd.classList.add("hidden");
}

//Fermeture des modales avec click sur les boutons X
const closeMarkAdd = document.querySelector(".xmark_add");
closeMarkAdd.addEventListener("click", () => {
  closeModale();
});

const closeMarkMain = document.querySelector(".xmark_main");
closeMarkMain.addEventListener("click", () => {
  closeModale();
});

//gestion de la fermeture avec un click extérieur à la modale
const modale_overlay = document.getElementById("modale_overlay");
window.onclick = function (event) {
  if (event.target === modale_overlay) {
    modale_overlay.classList.add("hidden");
  }
};

//Précédent dans la modale
const backArrow = document.querySelector(".back_arrow");
backArrow.addEventListener("click", () => {
  const activateModaleMain = document.getElementById("modale_main");
  const activateModaleAdd = document.getElementById("modale_add");

  activateModaleMain.classList.remove("hidden");
  activateModaleAdd.classList.add("hidden");
});

// Gestion du boutton validé de la modale add
const confirmButtonModale = document.getElementById("modale_add_button");

const imageUpload = document.getElementById("image_upload");
const titleUpload = document.getElementById("title");
const categoryUpload = document.getElementById("category");

imageUpload.addEventListener("change", filledForm);
titleUpload.addEventListener("input", filledForm);
categoryUpload.addEventListener("change", filledForm);

function filledForm() {
  console.log("filledform");
  const imageUpload = document.getElementById("image_upload");
  const titleUpload = document.getElementById("title");
  const categoryUpload = document.getElementById("category");

  confirmButtonModale.disabled = !(imageUpload.files.length > 0 && titleUpload.value != "" && categoryUpload.value != "");
}

confirmButtonModale.addEventListener("click", () => {
  const activateModale = document.getElementById("modale_overlay");
  const activateModaleAdd = document.getElementById("modale_add");

  const uploadBoxIMark = document.querySelector("#add_photo > .fa-image");
  const uploadBoxButton = document.querySelector("#add_photo > button");
  const uploadBoxText = document.querySelector("#add_photo > p");

  uploadBoxIMark.classList.remove("hidden");
  uploadBoxButton.classList.remove("hidden");
  uploadBoxText.classList.remove("hidden");

  const imageUpload = document.getElementById("image_upload");
  const imageFile = imageUpload.files[0];
  console.log(imageFile);

  const titleUpload = document.getElementById("title");
  const title = titleUpload.value;
  console.log(title);

  const categoryUpload = document.getElementById("category");
  const categoryId = categoryUpload.value;
  console.log(categoryId);

  let idElement = 12;
  const userId = sessionStorage.getItem("userId");

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", title);
  formData.append("category", categoryId);

  createProject(formData);

  activateModale.classList.add("hidden");
  activateModaleAdd.classList.add("hidden");
  idElement++;

  console.log("Close");
});
