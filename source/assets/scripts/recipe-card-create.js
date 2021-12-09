// Contains functions to create a new recipe card

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
    let summary = recipe.description;
    let summaryTrim = summary.length > 173 ? summary.substring(0, 170) + "..." : summary;
    recipe.description = summaryTrim;
    newCard.data = recipe;
    recipe.description = summary;
    document.querySelector("cook-mode").data = recipe;
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
export function initCards() {
  for (let i = 0; i < localStorage.length; i++) {
    let storedRecipe = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let newCard = document.createElement("recipe-card");
    let mainSec = document.getElementById("recipe-cards");
    let summary = storedRecipe.description;
    let summaryTrim = summary.length > 173 ? summary.substring(0, 170) + "..." : summary;
    storedRecipe.description = summaryTrim;
    storedRecipe.saveFrom = "Create";
    newCard.data = storedRecipe;
    storedRecipe.description = summary;
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
    if (recipeCard.shadowRoot.getElementById("cardDelete").classList.contains("hidden") && recipeCard.shadowRoot.getElementById("favoriteOnCard").classList.contains("mouse-off")) {
      document.querySelector("cook-mode").data = recipeData;
      document.querySelector("recipe-expand").data = recipeData;
      changeView("Recipe Expand");
    }
  });

 
}
