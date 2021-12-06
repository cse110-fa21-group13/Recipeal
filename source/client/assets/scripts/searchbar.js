/*
 * Stores the added recipe Ids so we don't add duplicates from typing teach letter
 */
const addedRecipes = new Set(); 
// const addEachKeyup = 1; 
/* 
 * Function to search for recipe cards in search bar
 */
function searchRecipe() {
    let input = document.getElementById("search-bar");
    let filter = input.value.toLowerCase();
    let recipeCardsElement = document.getElementById('recipe-cards'); 
    let allRecipes = recipeCardsElement.children; 

    for (let i = 0; i < allRecipes.length; i++) {
        let currentRecipe = allRecipes[i]; 
        let name = currentRecipe.shadowRoot.querySelector('h1').textContent; 
        let lowerConverted = name.toLowerCase();
        if (lowerConverted.indexOf(filter) > -1) {
        currentRecipe.style.display = ""; 
        } else {
        currentRecipe.style.display = "none"; 
        }
    }
}
/* 
 * TODO: 
 * Function to search for recipes in Spoonacular
 */
export async function searchSpoon() {
    let input = document.getElementById("explore-search-bar");
    const filter = input.value.toLowerCase();
    let recipeCardsElement = document.getElementById('explore-wrapper');
    let allRecipes = recipeCardsElement.children; 

    if (filter === "") {
        addedRecipes.clear(); 
        let goingToBeRemoved = []; 
        for (let i = 0; i < allRecipes.length; i++) {
            let currentRecipe = allRecipes[i];
            if (currentRecipe.classList.contains("new-recipe")) {
                goingToBeRemoved.push(currentRecipe); 
            }
            else {
                currentRecipe.style.display = "";
            }
        }
        for (let i = 0; i < goingToBeRemoved.length; i++) {
            goingToBeRemoved[i].remove();
        }
    }
    else {
        const API_KEY = "6b76530c7782467a8b83f2ad7ab1e35f";
        if (addedRecipes.size == 0) {
            for (let i = 0; i < allRecipes.length; i++) {
                let currentRecipe = allRecipes[i]; 
                currentRecipe.style.display = "none"; 
            }
        } else {
            addedRecipes.delete(allRecipes[allRecipes.length - 1].id); 
            allRecipes[allRecipes.length - 1].remove(); 
        }
        const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${filter}&number=2&apiKey=${API_KEY}`;
        await fetch (SEARCH_URL)
            .then(response => response.json())
            .then(data => {
                // alert(data.results.length); 
                for (let i = 0; i < data.results.length; i++) {
                    let recipeID = data.results[i].id; 
                    let recipeTitle = data.results[i].title;
                    if (addedRecipes.has(recipeTitle)) {
                        continue; 
                    } 
                    addedRecipes.add(recipeTitle); 
                    const RECIPE_INFO = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
                    fetch(RECIPE_INFO)
                        .then(response1 => response1.json())
                        .then(info => {
                            let recipeTime = info.readyInMinutes;
                            let recipeMin = recipeTime % 60;
                            let recipeHour = recipeTime / 60;

                            let recipeSummary = info.summary;
                            recipeSummary = recipeSummary.replaceAll('<b>', '');
                            recipeSummary = recipeSummary.replaceAll('</b>', '');
                            recipeSummary = recipeSummary.length > 173 ? recipeSummary.substring(0, 170) + "..." : recipeSummary;

                            const recipeData = {
                                thumbnail: info.image,
                                name: info.title,
                                description: recipeSummary,
                                time: { hours: recipeHour.toString(), minutes: recipeMin.toString() },
                            };
                            const recipeCard = document.createElement("recipe-card");
                            recipeCard.data = recipeData;
                            recipeCard.classList.add("new-recipe");

                            document.querySelector("#explore-wrapper").appendChild(recipeCard);
                        });
                }
            });

    }
}
