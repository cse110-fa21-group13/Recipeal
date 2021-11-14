import { changeView } from './navigate.js';

// Given a recipe name, creates a recipe card from that recipe in localStorage. 
export function newCard(name) {
    if(localStorage.getItem(name)) {
        let recipe = JSON.parse(localStorage.getItem(name));
        let newCard = document.createElement('recipe-card');
        let mainSec = document.getElementById('recipe-cards');
        newCard.data = recipe;
        bindRecipeCard(newCard, recipe);
        mainSec.appendChild(newCard);
    }
}

// Listener that triggers when the page is reloaded/refreshed
window.addEventListener('DOMContentLoaded', initCards);

// Iterates through localStorage, creating a new recipe card and appending it to the 'My Recipes' page
// for each recipe card. Only called when the page is reloaded/refreshed
function initCards () {
  for(let i = 0; i < localStorage.length; i++) {
    let storedRecipe = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let newCard = document.createElement('recipe-card');
    let mainSec = document.getElementById('recipe-cards');
    newCard.data = storedRecipe;
    bindRecipeCard(newCard, storedRecipe);
    mainSec.appendChild(newCard);
  }
}

// Sets the recipe-expand element to have the data of whatever recipe card was clicked
function bindRecipeCard(recipeCard, recipeData) {
    recipeCard.addEventListener('click', e => {
        document.querySelector('recipe-expand').data = recipeData;
        changeView(e);
    })
}