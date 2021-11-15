// Contains functions for navigating between pages

/** BUTTONS **/

/*
let saveButton = document.querySelector('button.save-btn')
saveButton.addEventListener('click', e => {
  saveData(e)
})
*/
let createRecipeButton = document.getElementById('create-recipe-btn')
createRecipeButton.addEventListener('click', e => {
  changeView(e)
})
let myRecipesButton = document.getElementById('my-recipes-btn')
myRecipesButton.addEventListener('click', e => {
  changeView(e)
})
let exploreButton = document.getElementById('explore-btn')
exploreButton.addEventListener('click', e => {
  changeView(e)
})

/*
 * Function to switch pages
 */
export function changeView (e) {
  var myRecipes = document.querySelector('.recipe-cards--wrapper')
  var explore = document.querySelector('.explore')
  var createRecipe = document.querySelector('.section--create-recipe')
  var button = document.getElementById('create-recipe-btn')
  var expandRecipe = document.querySelector('.section--recipe-expand')

  if (
    e.target.innerText === 'My Recipes' ||
    e.target.innerText === 'Save Recipe'
  ) {
    myRecipes.classList.add('shown')
    explore.classList.remove('shown')
    createRecipe.classList.remove('shown')
    button.classList.remove('hidden')
    button.classList.add('btn')
    expandRecipe.classList.remove('shown')
    ;[...document.querySelectorAll('.col')].forEach(element => {
      element.innerHTML = ''
    })
  } else if (e.target.innerText === 'Explore') {
    myRecipes.classList.remove('shown')
    createRecipe.classList.remove('shown')
    expandRecipe.classList.remove('shown')
    explore.classList.add('shown')
    button.classList.add('hidden')
    //button.classList.remove('btn')
    fetchApiRecipes()
  } else if (
    e.target.id === 'create-recipe-btn' ||
    e.target.id === 'create-recipe-btn-plus'
  ) {
    console.log(button)
    myRecipes.classList.remove('shown')
    explore.classList.remove('shown')
    //expandRecipe.classList.remove('shown')
    createRecipe.classList.add('shown')
    button.classList.add('hidden')
    //button.classList.remove('btn')
  } else {
    myRecipes.classList.remove('shown')
    explore.classList.remove('shown')
    createRecipe.classList.remove('shown')
    expandRecipe.classList.add('shown')
    button.classList.add('hidden')
    //button.classList.remove('btn')
  }
  switchHighlight(e.target)
}

/*
 * Function to change button highlight
 */
function switchHighlight (target) {
  var nav = document.querySelector('.navbar-nav')
  var buttons = nav.getElementsByTagName('*')
  var e
  for (var i = 0; i < buttons.length; i++) {
    e = buttons[i]
    if (e === target) {
      e.classList.remove('btn-dark')
      e.classList.add('btn-white')
    } else {
      e.classList.add('btn-dark')
      e.classList.remove('btn-white')
    }
  }
}

/*
 * Function to fecth recipes from spoonacular and populate explore page
 */
async function fetchApiRecipes () {
  const API_KEY = 'b24485ab3d4a47f696151e7134433592'
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
  )

  // Storing data in form of JSON
  var data = await response.json()
  data.recipes.forEach((element, i) => {
    console.log(element)
    const recipeData = {
      thumbnail: element.image,
      title: element.title,
      description: element.summary
    }
    const recipeCard = document.createElement('recipe-card')
    recipeCard.data = recipeData

    document.querySelector(`.xs${i % 2}`).appendChild(recipeCard)
    document.querySelector(`.sm${i % 3}`).appendChild(recipeCard)
    document.querySelector(`.lg${i % 4}`).appendChild(recipeCard)
    console.log(
      String(`.xs${i % 2}`),
      document.querySelector(`.xs${i % 2}`),
      document.querySelector(`.explore`)
    )
  })
}
