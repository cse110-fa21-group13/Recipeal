/*
 * Stores the added recipe Ids so we don't add duplicates from typing teach letter
 */
const addedRecipes = new Set(); 
// const addEachKeyup = 1; 
/* 
 * Function to search for recipe cards in search bar
 */
export function searchRecipe() {
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

/**
 * @method filterTags 
 *  Checks the tag list of each existing recipe card. If the filter tag is not in a recipe's tag list,
 *  that recipe gets hidden. If the filter is being turned off, then check the list of tags still being
 *  filtered for against each recipe's tag list. If there is no intersection, display the recipe
 *  
 * @param {string} tag The filter to be applied
 */
export function filterTags(tag) {
    let recipeCards = document.getElementById("recipe-cards");
    let allRecipes = recipeCards.children;
    let tagBut = document.getElementById(`${tag}`);
    if(tagBut.classList.contains("filter-on")) {
        for(let i = 0; i < allRecipes.length; i++) {
            let currentRecipe = allRecipes[i];
            console.log(currentRecipe);
            let currentRecipeName = currentRecipe.id.toLowerCase();
            console.log(currentRecipeName);
            let currentRecipeJSON = JSON.parse(localStorage.getItem(currentRecipeName));
            console.log(currentRecipeJSON);
            console.log(currentRecipeJSON.tags);
            let tags = currentRecipeJSON.tags;
            for(let i = 0; i < tags.length; i++) {
                tags[i] = tags[i].toLowerCase();
            }
            if(!tags.includes(tag)) {
                currentRecipe.style.display = "none";
            }
        }
    } else {
        let filteredTags = document.getElementsByClassName("but but-secondary filter-on");
        let filtTagsArray = Array.from(filteredTags);
        for(let i = 0; i < allRecipes.length; i++) {
            let currentRecipe = allRecipes[i];
            let currentRecipeName = currentRecipe.id.toLowerCase();
            let currentRecipeJSON = JSON.parse(localStorage.getItem(currentRecipeName));
            let tags = currentRecipeJSON.tags;
            if(filtTagsArray.every(val => tags.includes(val.id))) {
                currentRecipe.style.display = "";
            }
        } 
    }
}

/* 
 * Function to search for recipes in Spoonacular
 */
export function searchSpoon() {
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
        fetch (SEARCH_URL)
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