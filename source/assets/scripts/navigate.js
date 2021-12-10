// Contains functions for navigating between pages
import { saveToMyRecipes, searchSpoon, searchRecipe, filterTags, reset } from "./create-edit-recipe.js";

/** BUTTONS **/

let createRecipeButton = document.getElementById("create-recipe-btn");
createRecipeButton.addEventListener("click", () => {
  changeView("Create Recipe");
});

let myRecipesButton = document.getElementById("my-recipes-btn");
myRecipesButton.addEventListener("click", (e) => {
  changeView(e);
});
let favoriteButton = document.getElementById("my-fav-btn");
favoriteButton.addEventListener("click", (e) =>{
  changeView(e);
});

let exploreButton = document.getElementById("explore-btn");
exploreButton.addEventListener("click", (e) => {
  changeView(e);
});
let cookModeBtn = document.getElementById("cook-mode-btn");
cookModeBtn.addEventListener("click", (e) => {
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

let exploreSearch = document.getElementById("explore-search-bar");
exploreSearch.addEventListener("keyup", (e) => {
  if(e.key === "Enter") {
    searchSpoon();
  }
});

let recipeSearch = document.getElementById("search-bar");
recipeSearch.addEventListener("keyup", () => {
  searchRecipe();
});

// Keeps track of the first time the explore page is visited
let exploreCheck = false;

/**
 * @method changeView
 *  Function that handles most of the navigation through the app. Given
 *  the page to be navigated to, shows only the elements that are supposed
 *  to appear on that page.
 * 
 * @param {string} e - The page to be navigated to
 */
export function changeView(e) {
  // reference for needed elements
  const myRecipes = document.querySelector(".recipe-cards--wrapper");
  const explore = document.querySelector(".explore");
  const createRecipe = document.querySelector(".section--create-recipe");
  const createButton = document.getElementById("create-recipe-btn");
  const returnButton = document.getElementById("return-btn");
  const editButton = document.getElementById("edit-btn");
  const deleteButton = document.getElementById("delete-btn");
  const expandRecipe = document.querySelector(".section--recipe-expand");
  const saveButtonCreate = document.querySelector("button.save-btn-create");
  const saveButtonEdit = document.querySelector("button.save-btn-edit");
  const delbutIcon = document.getElementById("delbut-icon");
  const deleteMode = delbutIcon.className === "arrow-left";
  const cookModeBut = document.getElementById("cook-mode-btn");
  const cookMode = document.querySelector(".section--cook-mode");
  const navBar = document.querySelector("nav");
  const refreshButton = document.getElementById("refresh-btn");
  const sleepBtn = document.getElementById("sleep-btn");
  let noRecipes = document.getElementById("no-recipes");

  const innerText = typeof e === "string" ? e : e.target.innerText;

  // navigating to My Recipes page
  if (innerText === "My Recipes") {
    if(window.localStorage.length === 0) {
      noRecipes.className = "shown";
    } else {
      noRecipes.className = "hidden";
    }
    myRecipes.classList.add("shown");
    explore.classList.remove("shown");
    createRecipe.classList.remove("shown");
    createButton.className = "ok";
    deleteButton.className = "ok";
    returnButton.className = "hidden";
    cookModeBut.className = "hidden";
    refreshButton.className = "hidden";
    expandRecipe.classList.remove("shown");
    [...document.querySelectorAll(".col")].forEach((element) => {
      element.innerHTML = "";
    });
    editButton.style.display = "none";
    for (let i = 0; i < localStorage.length; i++) {
      let storedRecipe = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let reappearRecipe = document.getElementById(storedRecipe.name);
      if(reappearRecipe) {
        reappearRecipe.classList.remove("hidden");
      }
    }
  }
  // navigating to favorites page
  else if(innerText === "Favorites" && !deleteMode){
    myRecipes.classList.add("shown");
    explore.classList.remove("shown");

    for (let i = 0; i < localStorage.length; i++) {
      let storedRecipe = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if(storedRecipe.favorites === 0){
        let unfavoriteRecipe = document.getElementById(storedRecipe.name);
        unfavoriteRecipe.classList.add("hidden");
      }
    }

    noRecipes.className = "hidden";
    createButton.className = "hidden";
    deleteButton.className = "hidden";
    createRecipe.classList.remove("shown");
    returnButton.className = "hidden";
    returnButton.classList.add('favorite');
    expandRecipe.classList.remove("shown");
    refreshButton.className = "hidden";
    cookModeBut.className = "hidden";
    editButton.style.display = "none";

  }
  // navigating to explore page
  else if (innerText === "Explore" && !deleteMode) {
    myRecipes.classList.remove("shown");
    createRecipe.classList.remove("shown");
    expandRecipe.classList.remove("shown");
    explore.classList.remove("hidden");
    explore.classList.add("shown");
    noRecipes.className = "hidden";
    createButton.className = "hidden";
    deleteButton.className = "hidden";
    editButton.style.display = "none";
    cookModeBut.className = "hidden";
    refreshButton.className = "";
    if(exploreCheck === false) {
      refresh();
      exploreCheck = true;
    }
    returnButton.className = "hidden";
  }
  // navigating to recipe expand page
  else if (innerText === "Recipe Expand") {
    myRecipes.classList.remove("shown");
    explore.classList.remove("shown");
    createRecipe.classList.remove("shown");
    cookMode.classList.remove("shown");
    expandRecipe.classList.add("shown");
    navBar.className = "navbarv2 navbar-light";
    returnButton.classList.add("ok");
    returnButton.classList.remove("hidden");
    noRecipes.className = "hidden";
    deleteButton.className = "ok";
    cookModeBut.className = "ok";
    createButton.className = "hidden";
    refreshButton.className = "hidden";
    sleepBtn.className = "hidden";

    // make edit button visible so user can click it
    editButton.style.display = "block";
  }
  // navigating to create recipe page
  else if (innerText === "Create Recipe" && !deleteMode) {
    reset();
    myRecipes.classList.remove("shown");
    explore.classList.remove("shown");
    expandRecipe.classList.remove("shown");
    createRecipe.classList.add("shown");
    switchButtonView(createButton);
    switchButtonView(returnButton);
    switchButtonView(deleteButton);
    saveButtonEdit.style.display = "none";
    saveButtonCreate.style.display="block";
    refreshButton.className = "hidden";
    noRecipes.className = "hidden";
  }
  // navigating to cook mode page
  else if (e.target.id === "cook-mode-btn" || e.target.id === "knife-fork") {
    cookMode.classList.add("shown");
    expandRecipe.classList.remove("shown");
    navBar.className = "hidden";
    returnButton.className = "hidden";
    deleteButton.className = "hidden";
    cookModeBut.className = "hidden";
    editButton.style.display = "none";
    sleepBtn.className = "";
  }
  switchHighlight(innerText);
}

// switch between shown and hidden for button
export function switchButtonView(but) {
  but.className = but.className === "hidden" ? "ok" : "hidden";
}


/**
 * @method switchHighlight
 *  Switches the underline indicator to whatever page was navigated to
 * 
 * @param {string} innerText - The page being navigated to
 */
function switchHighlight(innerText) {
  let nav = document.querySelector(".navbar-nav");
  let buttons = nav.getElementsByTagName("*");
  let e;
  for (let i = 0; i < buttons.length; i++) {
    e = buttons[i];
    if (e.innerText === innerText) {
      e.style.textDecoration = "underline";
      e.style.textDecorationThickness = "3px";
    } else {
      e.style.textDecoration = "";
    }
  }
  let exploreBtn = document.getElementById("explore-btn");
  if(exploreBtn.innerText === innerText) {
    exploreBtn.style.textDecoration = "underline";
    exploreBtn.style.textDecorationThickness = "3px";
  } else {
    exploreBtn.style.textDecoration = "";
  }
}

/*
 * Function to fetch recipes from spoonacular and populate explore page
 */
async function fetchApiRecipes() {
  const API_KEY = "b7855be92a904131a1fc088d0e40c138";
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=15&apiKey=${API_KEY}`
  );

  // Storing data in form of JSON
  let data = await response.json();

  saveToMyRecipes(data, API_KEY);
}

/**
 * @method refresh
 *  Removes recipes and shows 15 other random recipes
 */
function refresh() {
  document.querySelector("#explore-wrapper").innerHTML = "";
  fetchApiRecipes();
}

/**
 * @method returnToHomePage
 *  Helper function that will navigate the user to the correct page
 *  when the back button is pressed 
 */
window.returnToHomePage = function () {
  const returnBut = document.getElementById("return-btn");
  if(returnBut.classList.contains("explore")){
    changeView("Explore");
    returnBut.classList.remove("explore");
  } else if(returnBut.classList.contains("edit")) {
    reset();
    changeView("Recipe Expand");
    returnBut.classList.remove("edit");
  } else if(returnBut.classList.contains("favorite")){
    changeView("Favorites");
  }else {
    reset();
    changeView("My Recipes");
  }
};

/**
 * @method showTags
 *  Triggers when the filter button next to the search bar is clicked.
 *  Shows all existing tags that, when clicked, will filter recipes based
 *  on that tag.
 */
window.showTags = function () {
  let filterBtn = document.getElementById("filter-btn");
  // If the filter button is active, turn it green. If it's not, turn it white
  if(filterBtn.classList.contains("flag")) {
    filterBtn.style.backgroundColor = "rgba(148, 193, 30, 1)";
    filterBtn.classList.remove("flag");
  } else {
    filterBtn.style.backgroundColor = "white";
    filterBtn.classList.add("flag");
  }
  // Gets a list of all tags
  let tags = [];
  for (let i = 0; i < localStorage.length; i++) {
    const currentTags = JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ).tags;
    currentTags.forEach(singleTag => {
      singleTag = singleTag.toLowerCase(); 
      if(!tags.includes(singleTag)) {
        tags.push(singleTag);
      }
    });
  }
  let divTag = document.getElementById("tag-wrapper-filter");
  // If it's not empty, make it empty
  if (!(divTag.innerHTML == "")) {
    divTag.innerHTML = ""; 
    filterBtn.classList.remove("filter-on");
    filterBtn.classList.add("filter-off");
  }
  // Creates a new button for each tag, that when clicked will filter recipes 
  // based on that tag
  else {
  tags.forEach((element, i) => {
    filterBtn.classList.remove("filter-off");
    filterBtn.classList.add("filter-on");
    const newTagBut = document.createElement("button");
    newTagBut.className = "tags-btn filter-off";
    newTagBut.id = `${element}`;
    newTagBut.textContent = element;
    newTagBut.style.outline = "rgba(148, 193, 30, 1)";
    newTagBut.addEventListener("click", () => {
      if(newTagBut.classList.contains("filter-off")) {
        newTagBut.classList.replace("filter-off", "filter-on");
        newTagBut.style.backgroundColor = "rgba(148, 193, 30, 1)";
        filterTags(element);
      } else {
        newTagBut.classList.replace("filter-on", "filter-off");
        newTagBut.style.backgroundColor = "white";
        filterTags(element);
      }
    });
    divTag.appendChild(newTagBut);
  });
  }  
};

/**
 * @method showDeleteButtons 
 *  Helper function that shows the recipe card delete buttons
 *  when the My Recipes trash button is clicked
 */
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

    let delIcon = document.getElementById("delbut-icon"); 
    if(delIcon.className === "trash") {
      delIcon.className = "return";
      delIcon.src = "assets/images/icon-park_return.png";
    } else {
      delIcon.className = "trash";
      delIcon.src = "assets/images/trash.png";
    }
  }
};

/**
 * @method cancelDelete
 *  Helper function that cancels the deletion of a recipe from it's expand page
 */
window.cancelDelete = function () {
  const expandModal = document.querySelector(".delete-modal-expand");
  expandModal.classList.add("hidden");
};

/**
 * @method confirmDelete 
 *  Helper function that deletes a recipe from it's expand page
 */
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
