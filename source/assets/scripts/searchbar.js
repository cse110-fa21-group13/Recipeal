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

function filterTags(tag) {
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