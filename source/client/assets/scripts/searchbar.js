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
 * Function to search for recipes in Spoonacular
 */
export async function searchSpoon() {
    let input = document.getElementById("explore-search-bar");
    const filter = input.value.toLowerCase();
    let recipeCardsElement = document.getElementById('explore-wrapper');
    let allRecipes = recipeCardsElement.children; 

    if (filter === "") {
        addedRecipes.clear(); 
        currentRecipe.style.display = "";
    } else {
        for (let i = 0; i < allRecipes.length; i++) {
            allRecipes[i].style.display = "none"; 
        }
        const API_KEY = "6b76530c7782467a8b83f2ad7ab1e35f";
        const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${filter}&number=3&apiKey=${API_KEY}`;
        await fetch (SEARCH_URL)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.results.length; i++) {
                    let recipeID = data.results[i].id; 
                    let recipeTitle = data.results[i].title;

                    // Prevents duplicate cards from showing up
                    if (addedRecipes.has(recipeTitle)) {
                        continue; 
                    } 

                    addedRecipes.add(recipeTitle); 
                    const RECIPE_INFO = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
                    fetch(RECIPE_INFO)
                        .then(response1 => response1.json())
                        .then(info => {
                            // Creates recipe card
                            let recipeTime = info.readyInMinutes;
                            let recipeMin = recipeTime % 60;
                            let recipeHour = (recipeTime / 60);

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
                            document.querySelector("#explore-wrapper").appendChild(recipeCard);
                        });
                }
            });

    }
}
