// Contains the functions involved in creating a new recipe

import { newCard } from './RecipeCardCreate.js'
import { changeView } from './navigate.js'

/** ELEMENTS **/

// Image
let imageUpload = document.querySelector('input#input-img')
imageUpload.addEventListener('change', e => {
  handleImageUpload(e)
})

// Tags
let addTags = document.querySelector('button.tag-btn')
addTags.addEventListener('click', e => {
  addNewTag(e)
})

// Ingredients
let addIngs = document.querySelector('button.ing-btn')
addIngs.addEventListener('click', e => {
  addNewIngredient(e)
})

// Directions
let addSteps = document.querySelector('button.step-btn')
addSteps.addEventListener('click', e => {
  addNewStep(e)
})

// Save Button
let saveButton = document.querySelector('button.save-btn')
saveButton.addEventListener('click', e => {
  saveData(e)
})

/** FUNCTIONS **/

/* IMAGE */

// Get image to preview it
function handleImageUpload () {
  let image = document.getElementById('input-img').files[0]
  let fileReader = new FileReader()
  fileReader.onload = function (e) {
    document.getElementById('display-image').src = e.target.result
    console.log(e.target.result)
  }
  if (image) {
    fileReader.readAsDataURL(image)
  }
}

/* TAGS */

// Keep track of number of tag inputs
let tagCounter = 1

// Array to store tags to repopulate tags later
let prevTags = []

// Add label and new input
function addNewTag () {
  // Save prev tags in array
  for (let i = 1; i <= tagCounter; i++) {
    let value = document.getElementById(`input-tags${i}`).value
    prevTags.push(value)
  }

  document.getElementById('tag-wrapper').innerHTML += `
      <input type="text" id="input-tags${String(
        tagCounter + 1
      )}" class="tags" name="input-tags${String(tagCounter + 1)}">
      `
  tagCounter++
  // After new tag has been created, repopulate previous tags
  for (let i = 1; i <= tagCounter - 1; i++) {
    document.getElementById(`input-tags${i}`).value = prevTags[i - 1]
  }

  // Empty array
  while (prevTags.length > 0) {
    prevTags.pop()
  }
}

/* INGREDIENTS */

// Keep track of number of ingredient inputs
let ingCounter = 1

// Array to store tags to repopulate tags later
let prevIngs = []

// Add label and new input
function addNewIngredient () {
  // Save prev tags in array
  for (let i = 1; i <= ingCounter; i++) {
    let value = document.getElementById(`input-ings${i}`).value
    prevIngs.push(value)
    console.log(prevIngs)
  }

  document.getElementById(
    'ing-wrapper'
  ).innerHTML += `<div class="input-card-ings" id=card-ing${String(
    ingCounter + 1
  )}>
    <label for="input-ings${String(ingCounter + 1)}" id=label-ings${String(
    ingCounter + 1
  )}>${String(ingCounter + 1)}.</label>
    <input type="text" id="input-ings${String(
      ingCounter + 1
    )}"  class="ings" name="input-ings${String(ingCounter + 1)}">
 </div>`

  ingCounter++

  // After new tag has been created, repopulate previous tags
  for (let i = 1; i <= ingCounter - 1; i++) {
    document.getElementById(`input-ings${i}`).value = prevIngs[i - 1]
  }

  // Empty array
  while (prevIngs.length > 0) {
    prevIngs.pop()
  }
}

/* DIRECTIONS */

// Keep track of number of step inputs
let stepCounter = 1

// Array to store tags to repopulate tags later
let prevSteps = []

// Add label and new input
function addNewStep () {
  // Save prev tags in array
  for (let i = 1; i <= stepCounter; i++) {
    let value = document.getElementById(`input-steps${i}`).value
    prevSteps.push(value)
    console.log(prevSteps)
  }

  document.getElementById(
    'step-wrapper'
  ).innerHTML += `<div class="input-card-steps" id=card-step${String(
    stepCounter + 1
  )}>
  <label for="input-steps${String(stepCounter + 1)}" id=label-steps${String(
    stepCounter + 1
  )}>${String(stepCounter + 1)}.</label>
    <input type="text" id="input-steps${String(
      stepCounter + 1
    )}"  class="steps" name="input-steps${String(stepCounter + 1)}">
    </div>`

  stepCounter++
  // After new tag has been created, repopulate previous tags
  for (let i = 1; i <= stepCounter - 1; i++) {
    document.getElementById(`input-steps${i}`).value = prevSteps[i - 1]
  }

  // Empty array
  while (prevSteps.length > 0) {
    prevSteps.pop()
  }
}

/* SAVE DATA */

/*
 * Function for to see if a recipe exists
 * Returns true if exists, false if it doesn't
 * @param {string} recipeName - name of recipe that function will check
 */
function recipeExists (recipeName) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == recipeName) {
      return true
    }
  }
  return false
}

/*
 * Function to clear input fields after saving
 */
function reset () {
  document.getElementById('input-name').value = ''
  document.getElementById('input-desc').value = ''
  document.getElementById('input-time').value = ''

  var i = 1
  var j = 1
  var k = 1

  document.getElementById('input-tags' + i).value = ''
  document.getElementById('input-ings' + j).value = ''
  document.getElementById('input-steps' + k).value = ''

  i++
  j++
  k++

  // Loop through all tag inputs and remove them
  while (i <= tagCounter) {
    document.getElementById('input-tags' + i).remove()
    i++
  }

  // Loop through all ings inputs and remove them
  while (j <= ingCounter) {
    document.getElementById('card-ing' + j).remove()
    j++
  }

  // Loop through all dir inputs and remove them
  while (k <= stepCounter) {
    document.getElementById('card-step' + k).remove()
    k++
  }

  // Set image to default
  document.getElementById('display-image').src =
    'https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png'
}

/*
 * Function to save the data from the input fields
 * and store them in local storage when check button
 * is clicked
 * @param pageChange - current page the user is on(?)
 */
function saveData (pageChange) {
  let checkName = document.getElementById('input-name').value.toLowerCase()

  // Check if user has inputted name field
  if (checkName == '') {
    return alert('Please add at least a recipe name to save the recipe.')
  }
  // Check if recipe has already been made
  else if (recipeExists(checkName)) {
    return alert('Recipe already exists')
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
    desc = ' '

    // Get time and store it in the object
    let time = document.getElementById('input-time').value
    newRecipe.time = time
    time = ' '

    var i = 1
    var j = 1
    var k = 1

    // Loop through all tag inputs and push them to array
    while (i <= tagCounter) {
      let tagsValue = document.getElementById('input-tags' + i).value
      newRecipe.tags.push(tagsValue)
      tagsValue = ' '
      i++
    }

    // Loop through all ings inputs and push them to array
    while (j <= ingCounter) {
      let ingsValue = document.getElementById('input-ings' + j).value
      newRecipe.ingredients.push(ingsValue)
      ingsValue = ' '
      j++
    }

    // Loop through all dir inputs and push them to array
    while (k <= stepCounter) {
      let stepsValue = document.getElementById('input-steps' + k).value
      newRecipe.directions.push(stepsValue)
      stepsValue = ' '
      k++
    }

    // Get image and store in in the object as a string
    let img = document.getElementById('display-image')
    newRecipe.thumbnail = img.src
    img.src =
      'https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png'

    // Put the object into storage
    localStorage.setItem(
      newRecipe.name.toLowerCase(),
      JSON.stringify(newRecipe)
    )

    // Creates a recipe card & displays it on the 'My Recipes' page
    newCard(newRecipe.name.toLowerCase())
    alert('Recipe saved!')
    changeView(pageChange)

    reset()
  }
}
