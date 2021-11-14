import { newCard } from './RecipeCardCreate.js';

// BUTTONS
let saveButton = document.querySelector('button.save-btn');
saveButton.addEventListener('click', e => {
    saveData(e);
});
let createRecipeButton = document.getElementById('create-recipe-btn');
createRecipeButton.addEventListener('click', e => {
    changeView(e);
});
let myRecipesButton = document.getElementById('my-recipes-btn');
myRecipesButton.addEventListener('click', e => {
    changeView(e);
});
let exploreButton = document.getElementById('explore-btn');
exploreButton.addEventListener('click', e => {
    changeView(e);
});

export function changeView(e) {
    var myRecipes = document.querySelector(".recipe-cards--wrapper");
    var explore = document.querySelector(".explore");
    var createRecipe = document.querySelector(".section--create-recipe");
    var button = document.getElementById("create-recipe-btn");
    var expandRecipe = document.querySelector(".section--recipe-expand");

    if (e.target.innerText === "My Recipes" || e.target.innerText === "Save Recipe") {
      myRecipes.classList.add("shown");
      explore.classList.remove("shown");
      createRecipe.classList.remove("shown");
      button.classList.remove("hidden");
      button.classList.add("btn");
      expandRecipe.classList.remove("shown");
      [...document.querySelectorAll(".col")].forEach((element) => {
        element.innerHTML = "";
      });
    } else if (e.target.innerText === "Explore") {
      myRecipes.classList.remove("shown");
      createRecipe.classList.remove("shown");
      expandRecipe.classList.remove("shown");
      explore.classList.add("shown");
      button.classList.add("hidden");
      button.classList.remove("btn");
      fetchApiRecipes();
    } else if(e.target.id === "create-recipe-btn") {
      console.log(button);
      myRecipes.classList.remove("shown");
      explore.classList.remove("shown");
      expandRecipe.classList.remove("shown");
      createRecipe.classList.add("shown");
      button.classList.add("hidden");
      button.classList.remove("btn");
    }
    else {
        myRecipes.classList.remove("shown");
        explore.classList.remove("shown");
        createRecipe.classList.remove("shown");
        expandRecipe.classList.add("shown");
        button.classList.add("hidden");
        button.classList.remove("btn");
    }
    switchHighlight(e.target);
}

function switchHighlight(target) {
    var nav = document.querySelector(".navbar-nav");
    var buttons = nav.getElementsByTagName("*");
    var e;
    for (var i = 0; i < buttons.length; i++) {
        e = buttons[i];
        if (e === target) {
        e.classList.remove("btn-dark");
        e.classList.add("btn-white");
        } else {
        e.classList.add("btn-dark");
        e.classList.remove("btn-white");
        }
    }
}

async function fetchApiRecipes() {
    const API_KEY = "b24485ab3d4a47f696151e7134433592";
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
    );

    // Storing data in form of JSON
    var data = await response.json();
    data.recipes.forEach((element, i) => {
        console.log(element);
        const recipeData = {
        image: element.image,
        title: element.title,
        description: element.summary,
        };
        const recipeCard = document.createElement("recipe-card");
        recipeCard.data = recipeData;

        document.querySelector(`.xs${i % 2}`).appendChild(recipeCard);
        document.querySelector(`.sm${i % 3}`).appendChild(recipeCard);
        document.querySelector(`.lg${i % 4}`).appendChild(recipeCard);
        console.log(
        String(`.xs${i % 2}`),
        document.querySelector(`.xs${i % 2}`),
        document.querySelector(`.explore`)
        );
    });
}



/*
* Function to see if a recipe exists
* Returns true if exists, false if it doesn't
*/
function recipeExists(recipeName) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == recipeName) {
        return true
        }
    }
    return false
}

/***** CREATE *****/

/*
* Function to save the data from the input fields
* and store them in local storage when check button
* is clicked
*/
function saveData(pageChange) {
    let checkName = document.getElementById('input-name').value.toLowerCase()
    // Check if recipe has already been made
    if (recipeExists(checkName)) {
        return alert('Recipe already exists');
    }
    // Else, create new recipe object
    else {
        var newRecipe = {
        name: '',
        description: '',
        time: '',
        tags: [],
        ingredients: [],
        directions: [],
        thumbnail: '',
        favorites: 0
        }

        // Create new recipe out of the recipeTemplate
        //let newRecipe = Object.create(recipeTemplate)

        // Get name and store it in the object
        let name = document.getElementById('input-name').value
        newRecipe.name = name

        // Get description and store it in the object
        let desc = document.getElementById('input-desc').value
        newRecipe.description = desc

        // Get time and store it in the object
        let time = document.getElementById('input-time').value
        newRecipe.time = time

        var i = 1;
        var j = 1;
        var k = 1;

        // Loop through all tag inputs and push them to array
        while (i <= tagCounter) {
        let tagsValue = document.getElementById('input-tags' + i).value
        newRecipe.tags.push(tagsValue)
        i++;
        }

        // Loop through all ings inputs and push them to array
        while (j <= ingCounter) {
        let ingsValue = document.getElementById('input-ings' + j).value
        newRecipe.ingredients.push(ingsValue)
        j++;
        }

        // Loop through all dir inputs and push them to array
        while (k <= stepCounter) {
        let stepsValue = document.getElementById('input-steps' + k).value
        newRecipe.directions.push(stepsValue)
        k++;
        }

        // Get image and store in in the object as a string
        let img = document.getElementById('display-image')
        newRecipe.thumbnail = img.src

        // Put the object into storage
        localStorage.setItem(
        newRecipe.name.toLowerCase(),
        JSON.stringify(newRecipe)
        )
        // Creates a recipe card & displays it on the 'My Recipes' page
        newCard(newRecipe.name.toLowerCase());
        alert('Recipe saved!')
        changeView(pageChange);
    }
}