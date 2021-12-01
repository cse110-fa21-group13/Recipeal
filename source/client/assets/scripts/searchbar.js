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
        const API_KEY = "b24485ab3d4a47f696151e7134433592";
        for (let i = 0; i < allRecipes.length; i++) {
            let currentRecipe = allRecipes[i]; 
            currentRecipe.style.display = "none"; 
        }
        const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=${API_KEY}`;
        fetch (SEARCH_URL)
            .then(response => response.json())
            .then(data => {
                // alert(data.results.length); 
                for (let i = 0; i < data.results.length; i++) {
                    let recipeID = data.results[i].id;
                    const RECIPE_INFO = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
                    fetch(RECIPE_INFO)
                        .then(response1 => response1.json())
                        .then(info => {
                            console.log(info);
                            let recipeImage = info.image;
                            let recipeTitle = info.title;
                            let recipeTime = info.readyInMinutes;
                            let recipeSummary = info.summary;
                            let recipeMin = recipeTime % 60;
                            let recipeHour = recipeTime / 60;
                            const recipeData = {
                                thumbnail: recipeImage,
                                name: recipeTitle,
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