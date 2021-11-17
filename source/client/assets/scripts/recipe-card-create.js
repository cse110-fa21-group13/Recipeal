import { changeView } from "./navigate.js";

/**
 * @method newCard
 *  If passed recipe exists in localStorage, creates a new recipe
 *  card with the expanded recipe page bound to it.
 *
 * @param {string} name - name of the recipe
 */
export function newCard(name) {
  if (localStorage.getItem(name)) {
    let recipe = JSON.parse(localStorage.getItem(name));
    let newCard = document.createElement("recipe-card");
    let mainSec = document.getElementById("recipe-cards");
    newCard.data = recipe;
    bindRecipeCard(newCard, recipe);
    mainSec.appendChild(newCard);
  }
}

// Listener that triggers when the page is reloaded/refreshed
window.addEventListener("DOMContentLoaded", initCards);

/**
 * @method initCards
 *  When page is reloaded/refreshed, creates a new recipe card
 *  for each recipe in localStorage and binds the expanded
 *  recipe page to it
 */
function initCards() {
  for (let i = 0; i < localStorage.length; i++) {
    let storedRecipe = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let newCard = document.createElement("recipe-card");
    let mainSec = document.getElementById("recipe-cards");
    newCard.data = storedRecipe;
    bindRecipeCard(newCard, storedRecipe);
    mainSec.appendChild(newCard);
  }
}

/**
 * @method bindRecipeCard
 *  Adds an event listener to each recipe card which, when
 *  clicked, sets the expand recipe page to the recipe card's
 *  data and navigates to said recipe page.
 *
 * @param {HTMLElement} recipeCard
 * @param {object} recipeData
 */
function bindRecipeCard(recipeCard, recipeData) {
  recipeCard.addEventListener("click", (e) => {
    document.querySelector("recipe-expand").data = recipeData;
    changeView(e);
  });
}
