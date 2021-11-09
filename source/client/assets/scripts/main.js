import { Router } from "./Router.js";

const recipes = [];
const recipeData = {};

const router = new Router(function () {
  document
    .querySelector("section.section--recipe-cards")
    .classList.add("shown");
  document
    .querySelector("section.section--recipe-expand")
    .classList.remove("shown");
});

window.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    await fetchRecipes();
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
    return;
  }

  createRecipeCards();
  bindPopstate();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    recipes.forEach((recipe) => {
      fetch(recipe)
        .then((response) => response.json())
        .then((data) => {
          // This grabs the page name from the URL in the array above
          data["page-name"] = recipe.split("/").pop().split(".")[0];
          recipeData[recipe] = data;
          if (Object.keys(recipeData).length == recipes.length) {
            resolve();
          }
        })
        .catch((err) => {
          console.log(`Error loading the ${recipe} recipe`);
          reject(err);
        });
    });
  });
}

function createRecipeCards() {
  recipes.forEach((element, i) => {
    const recipeCard = document.createElement("recipe-card");

    recipeCard.data = recipeData[element];

    const page = recipeData[element]["page-name"];
    router.addPage(page, function () {
      document
        .querySelector(".section--recipe-cards")
        .classList.remove("shown");
      document.querySelector(".section--recipe-expand").classList.add("shown");
      document.querySelector("recipe-expand").data = recipeData[element];
    });
    console.log(recipeCard);
    bindRecipeCard(recipeCard, page);

    document.querySelector(".recipe-cards--wrapper").appendChild(recipeCard);
  });
}

function bindRecipeCard(recipeCard, pageName) {
  recipeCard.addEventListener("click", (e) => {
    if (e.path[0].nodeName == "A") return;
    router.navigate(pageName);
  });
}

function bindPopstate() {
  window.addEventListener("popstate", (e) => {
    console.log(e.state);
    if (e.state) {
      router.navigate(e.state.page, true);
    } else {
      router.navigate("home", true);
    }
  });
}
