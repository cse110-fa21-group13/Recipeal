// Contains functions for navigating between pages

/** BUTTONS **/

/*
let saveButton = document.querySelector('button.save-btn')
saveButton.addEventListener('click', e => {
  saveData(e)
})
*/
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

/*
 * Function to switch pages
 */
export function changeView (e) {
  var myRecipes = document.querySelector('.recipe-cards--wrapper');
  var explore = document.querySelector('.explore');
  var createRecipe = document.querySelector('.section--create-recipe');
  var createButton = document.getElementById('create-recipe-btn');
  var returnButton = document.getElementById('return-btn');
  var deleteButton = document.getElementById('delete-btn');
  var expandRecipe = document.querySelector('.section--recipe-expand');

  const innerText = typeof e === 'string' ? e : e.target.innerText;

  if (innerText === 'My Recipes') {
    myRecipes.classList.add('shown');
    explore.classList.remove('shown');
    createRecipe.classList.remove('shown');
    createButton.className = 'btn btn-primary';
    deleteButton.className = 'btn btn-primary';
    returnButton.className = 'hidden';
    expandRecipe.classList.remove('shown');
    ;[...document.querySelectorAll('.col')].forEach(element => {
      element.innerHTML = '';
    });
  } else if (innerText === 'Explore') {
    myRecipes.classList.remove('shown');
    createRecipe.classList.remove('shown');
    expandRecipe.classList.remove('shown');
    explore.classList.add('shown');
    returnButton.className = 'hidden';
    createButton.className = 'hidden';
    deleteButton.className = 'hidden';
    fetchApiRecipes();
  } else if (
    e.target.id === 'create-recipe-btn' ||
    e.target.id === 'create-recipe-btn-plus'
  ) {
    myRecipes.classList.remove('shown');
    explore.classList.remove('shown');
    expandRecipe.classList.remove('shown');
    createRecipe.classList.add('shown');
    switchButtonView(createButton);
    switchButtonView(returnButton);
    switchButtonView(deleteButton);
  } else {
    myRecipes.classList.remove('shown');
    explore.classList.remove('shown');
    createRecipe.classList.remove('shown');
    expandRecipe.classList.add('shown');
    switchButtonView(returnButton);
    createButton.className = 'hidden';
  }
  switchHighlight(e.target);
}

function switchButtonView (but) {
  but.className = but.className === 'hidden' ? 'btn btn-primary' : 'hidden';
}

/*
 * Function to change button highlight
 */
function switchHighlight (target) {
  let nav = document.querySelector('.navbar-nav');
  let buttons = nav.getElementsByTagName('*');
  let e;
  for (var i = 0; i < buttons.length; i++) {
    e = buttons[i];
    if (e === target) {
      e.classList.remove('btn-dark');
      e.classList.add('btn-white');
    } else {
      e.classList.add('btn-dark');
      e.classList.remove('btn-white');
    }
  }
}

/*
 * Function to fecth recipes from spoonacular and populate explore page
 */
async function fetchApiRecipes () {
  const API_KEY = 'b24485ab3d4a47f696151e7134433592';
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
  );

  // Storing data in form of JSON
  let data = await response.json();
  data.recipes.forEach((element, i) => {
    const recipeData = {
      thumbnail: element.image,
      title: element.title,
      description: element.summary
    };
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipeData;

    document.querySelector(`.xs${i % 2}`).appendChild(recipeCard);
    document.querySelector(`.sm${i % 3}`).appendChild(recipeCard);
    document.querySelector(`.lg${i % 4}`).appendChild(recipeCard);
  })
}

window.returnToHomePage = function () {
  changeView('My Recipes');
};

window.showTags = function () {
  const divTag = document.getElementById('existingTags');
  divTag.innerHTML = '';
  let tags = [];
  for (let i = 0; i < localStorage.length; i++) {
    const currentTags = JSON.parse(localStorage.getItem(localStorage.key(i)))
      .tags;
    tags = tags.concat(currentTags);
  }

  tags.forEach((element, i) => {
    const newTagBut = document.createElement('button');
    newTagBut.className = `but but-secondary tag-${i}`;
    newTagBut.textContent = element;
    divTag.appendChild(newTagBut);
  })
}
