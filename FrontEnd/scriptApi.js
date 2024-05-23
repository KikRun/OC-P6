//WORKS

//Partie works : Récupération du JSON work via l'API
async function getWorks() {
  //async await
  const works = await fetch("http://localhost:5678/api/works");
  const worksJson = await works.json();
  return worksJson;
}

//Partie works : Récupère le JSON et création des éléments dans le DOM
async function showWorks() {
  const worksList = await getWorks();
  const gallery = document.querySelector(".gallery");
  console.log(worksList);

  for (let work of worksList) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.setAttribute("alt", work.title);
    img.setAttribute("src", work.imageUrl);

    figure.classList.add(`category-id__${work.categoryId}`);

    figCaption.innerHTML = work.title;

    figure.appendChild(img);
    figure.appendChild(figCaption);

    gallery.appendChild(figure);
  }
}
showWorks();

//CATEGORY

//Fonction pour catégorie

//Function pour la création du bouton
function createButton(id, name) {
  const button = document.createElement("button");

  button.classList.add("filters_button");

  button.id = id;

  button.innerHTML = name;

  return button;
}

//Function pour l'ajout du bouton
function addButton(button) {
  const buttons = document.querySelector(".filters");
  buttons.appendChild(button);
}

//Function retire class hidden
function removeHidden(work) {
  work.classList.remove("hidden");
}

//Function ajoute class hidden
function addHidden(work) {
  work.classList.add("hidden");
}

//Partie catégorie : Récupération du JSON category via l'API

async function getCategory() {
  const categories = await fetch("http://localhost:5678/api/categories");
  const categoriesJson = await categories.json();
  console.log(categoriesJson);
  return categoriesJson;
}

//Partie catégorie :Récupère le JSON et création des éléments dans le DOM
async function showCategory() {
  const categoriesList = await getCategory();
  categoriesList.unshift({ id: 0, name: "Tous" });

  //Création boutons des catégories
  for (let category of categoriesList) {
    const button = createButton(category.id, category.name);
    addButton(button);

    //Filtrages aux clicks des éléments works
    button.addEventListener("click", function (buttonSelected) {
      const buttonClicked = buttonSelected.target;
      console.log(buttonSelected);
      console.log(buttonClicked);
      console.log(buttonClicked.id);

      //gestion des balises figure caché
      const allWorks = document.querySelectorAll(".gallery figure");
      for (let work of allWorks) {
        removeHidden(work);
        addHidden(work);

        //gestion des balises figure montré
        if (work.classList.contains(`category-id__${buttonClicked.id}`) || buttonClicked.id === "0") {
          removeHidden(work);
        }
        console.log(work);
      }
    });

    console.log(category.name);
    console.log(category.id);
  }
}

showCategory();
