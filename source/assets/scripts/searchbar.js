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