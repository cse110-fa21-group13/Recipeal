// Contains functions for navigating between pages'

import { saveToMyRecipes } from "./create-edit-recipe.js";

/** BUTTONS **/

let createRecipeButton = document.getElementById("create-recipe-btn");
createRecipeButton.addEventListener("click", (e) => {
  changeView(e);
});
let myRecipesButton = document.getElementById("my-recipes-btn");
myRecipesButton.addEventListener("click", (e) => {
  changeView(e);
});
let exploreButton = document.getElementById("explore-btn");
exploreButton.addEventListener("click", (e) => {
  changeView(e);
});

let refreshButton = document.getElementById("refresh-btn");
refreshButton.addEventListener("click", (e) => {
  refresh();
});
let showMoreButton = document.getElementById("show-more-btn");
showMoreButton.addEventListener("click", (e) => {
  fetchApiRecipes();
});


/*
let string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut porttitor orci, vel rutrum diam. Fusce dui libero, sodales nec est ut, molestie bibendum lorem. Nam mollis quam est, et elementum diam semper vitae. In vel augue elit. Ut tempus suscipit massa, at ultricies quam mollis quis. Sed placerat mattis diam, id tempus lacus malesuada sed. Suspendisse sit amet viverra lacus."
string = string.split('.')
console.log(string[0])
*/

/*
 * Function to switch pages
 */
export function changeView(e) {
  // reference for needed elements
  var myRecipes = document.querySelector(".recipe-cards--wrapper");
  var explore = document.querySelector(".explore");
  var createRecipe = document.querySelector(".section--create-recipe");
  var createButton = document.getElementById("create-recipe-btn");
  var returnButton = document.getElementById("return-btn");
  var editButton = document.getElementById("edit-btn");
  var deleteButton = document.getElementById("delete-btn");
  var expandRecipe = document.querySelector(".section--recipe-expand");
  var saveButtonCreate = document.querySelector("button.save-btn-create");
  const delbutIcon = document.getElementById("delbut-icon");
  const deleteMode = delbutIcon.className === "bi bi-arrow-return-left";

  const innerText = typeof e === "string" ? e : e.target.innerText;

  // navigating to My Recipes page
  if (innerText === "My Recipes") {
    location.reload();
    myRecipes.classList.add("shown");
    explore.classList.remove("shown");
    createRecipe.classList.remove("shown");
    createButton.className = "btn btn-light";
    deleteButton.className = "btn btn-light";
    returnButton.className = "hidden";
    expandRecipe.classList.remove("shown");
    [...document.querySelectorAll(".col")].forEach((element) => {
      element.innerHTML = "";
    });
    editButton.style.display = "none";
  }
  // navigating to explore page
  else if (innerText === "Explore" && !deleteMode) {
    myRecipes.classList.remove("shown");
    createRecipe.classList.remove("shown");
    expandRecipe.classList.remove("shown");
    explore.classList.add("shown");
    returnButton.className = "hidden";
    createButton.className = "hidden";
    deleteButton.className = "hidden";
    refresh();
  }
  // navigating to recipe expand page
  else if (innerText === "Recipe Expand") {
    myRecipes.classList.remove("shown");
    explore.classList.remove("shown");
    createRecipe.classList.remove("shown");
    expandRecipe.classList.add("shown");
    //switchButtonView(returnButton);
    returnButton.className = "btn btn-light";
    deleteButton.className = "btn btn-light";
    createButton.className = "hidden";

    // make edit button visible so user can click it
    editButton.style.display = "block";
  }
  // navigating to create recipe page
  else if (
    (e.target.id === "create-recipe-btn" ||
      e.target.id === "create-recipe-btn-plus") &&
    !deleteMode
  ) {
    myRecipes.classList.remove("shown");
    explore.classList.remove("shown");
    expandRecipe.classList.remove("shown");
    createRecipe.classList.add("shown");
    switchButtonView(createButton);
    switchButtonView(returnButton);
    switchButtonView(deleteButton);
    saveButtonCreate.style.display="block";
  }
  switchHighlight(innerText);
}

// switch between shown and hidden for button
export function switchButtonView(but) {
  but.className = but.className === "hidden" ? "btn btn-light" : "hidden";
}

/*
 * Function to change button highlight
 */
function switchHighlight(innerText) {
  let nav = document.querySelector(".navbar-nav");
  let buttons = nav.getElementsByTagName("*");
  let e;
  for (var i = 0; i < buttons.length; i++) {
    e = buttons[i];
    if (e.innerText === innerText) {
      e.classList.remove("btn-dark");
      e.classList.add("btn-white");
    } else {
      e.classList.add("btn-dark");
      e.classList.remove("btn-white");
    }
  }
}

/*
 * Function to fetch recipes from spoonacular and populate explore page
 */
async function fetchApiRecipes() {
  const API_KEY = "75d567c9173d40f69fad55f6870057fe";
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=15&apiKey=${API_KEY}`
  );
  // Storing data in form of JSON
  let data = await response.json();

  saveToMyRecipes(data)
}

/**
 * @method refresh
 *  Removes recipes and shows 15 other random recipes
 */
function refresh() {
  document.querySelector("#explore-wrapper").innerHTML = ""
  fetchApiRecipes()
}

// Function for return to home page
window.returnToHomePage = function () {
  location.reload();
  //changeView("My Recipes");
};

// Show tags when pressing filter button
window.showTags = function () {
  const divTag = document.getElementById("existingTags");
  divTag.innerHTML = "";
  let tags = [];
  for (let i = 0; i < localStorage.length; i++) {
    const currentTags = JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ).tags;
    tags = tags.concat(currentTags);
  }

  tags.forEach((element, i) => {
    const newTagBut = document.createElement("button");
    newTagBut.className = `but but-secondary tag-${i}`;
    newTagBut.textContent = element;
    divTag.appendChild(newTagBut);
  });
};

// Show delete buttons for each card when click delete on home page
window.showDeleteButtons = function () {
  const expandSection = document.querySelector(".section--recipe-expand");
  if (expandSection.classList.contains("shown")) {
    const expandModal = document.querySelector(".delete-modal-expand");
    expandModal.classList.remove("hidden");
  } else {
    const recipeCards = document.getElementsByTagName("recipe-card");
    for (let recipeCard of recipeCards) {
      const delbut = recipeCard.shadowRoot.querySelector(".delbut");
      if (delbut.classList.contains("hidden")) {
        delbut.classList.remove("hidden");
        delbut.classList.add("btn");
      } else {
        delbut.classList.add("hidden");
        delbut.classList.remove("btn");
      }
    }

    const delbutIcon = document.getElementById("delbut-icon");
    delbutIcon.className =
      delbutIcon.className === "bi bi-trash"
        ? "bi bi-arrow-return-left"
        : "bi bi-trash";
  }
};

window.cancelDelete = function () {
  const expandModal = document.querySelector(".delete-modal-expand");
  expandModal.classList.add("hidden");
};

window.confirmDelete = function () {
  const expandRecipe = document.getElementsByTagName("recipe-expand");
  const curCardId =
    expandRecipe[0].shadowRoot.getElementById("input-name").textContent;
  localStorage.removeItem(curCardId.toLowerCase());
  cancelDelete();
  const recipeCardDiv = document.getElementById("recipe-cards");
  const deletedRecipe = document.getElementById(curCardId);
  recipeCardDiv.removeChild(deletedRecipe);
  changeView("My Recipes");
};
