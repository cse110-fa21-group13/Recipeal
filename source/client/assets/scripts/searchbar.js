/* 
 * Function to search for recipe cards in search bar
 */
function searchRecipe() {
    var input = document.getElementById("search-bar");
    var filter = input.value.toLowerCase();
    var recipeCardsElement = document.getElementById('recipe-cards'); 
    var allRecipes = recipeCardsElement.children; 

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
function searchSpoon() {
    var input = document.getElementById("explore-search-bar");
    const filter = input.value.toLowerCase();
    var recipeCardsElement = document.getElementById('explore-wrapper');
    var allRecipes = recipeCardsElement.children; 
    if (filter === "") {
        for (let i = 0; i < allRecipes.length; i++) {
            let currentRecipe = allRecipes[i];
            currentRecipe.style.display = "";
        }
    }
    else {
        for (let i = 0; i < allRecipes.length; i++) {
            let currentRecipe = allRecipes[i]; 
            currentRecipe.style.display = "none"; 
        }
        const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?query=titleMatch=${filter}`;
        fetch (SEARCH_URL)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.results.length; i++) {
                    
                }
            });

    }
}