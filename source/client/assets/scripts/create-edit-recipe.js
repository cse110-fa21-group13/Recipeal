// Contains the functions involved in creating and editing a new recipe

import { newCard } from "./recipe-card-create.js";
import { changeView, switchButtonView } from "./navigate.js";

/** ELEMENTS **/

// Image
let imageUpload = document.querySelector("input#input-img");
imageUpload.addEventListener("change", (e) => {
  handleImageUpload(e);
});

// Tags
let addTags = document.querySelector("button.tag-btn");
addTags.addEventListener("click", (e) => {
  addNewTag(e);
});

// Ingredients
let addIngs = document.querySelector("button.ing-btn");
addIngs.addEventListener("click", (e) => {
  addNewIngredient(e);
});

// Directions
let addSteps = document.querySelector("button.step-btn");
addSteps.addEventListener("click", (e) => {
  addNewStep(e);
});

// Save Button Create
let saveButtonCreate = document.querySelector("button.save-btn-create");
saveButtonCreate.addEventListener("click", () => {
  saveDataCreate();
});

// Save to my recipes button
let saveBtn = document.querySelector('.save-to-rec-btn');


/** FUNCTIONS **/

/* IMAGE */

/**
 * @method handleImageUpload
 *  Converts image to dataUrl to preview it
 *
 * @param none
 * @returns none
 */
function handleImageUpload() {
  let image = document.getElementById("input-img").files[0];
  let fileReader = new FileReader();
  fileReader.onload = function (e) {
    document.getElementById("display-image").src = e.target.result;
    console.log(e.target.result);
  };
  if (image) {
    fileReader.readAsDataURL(image);
  }
}

/* TAGS */

// Keep track of number of tag inputs
let tagCounter = 1;

// Array to store tags to repopulate tags later
let prevTags = [];

/**
 * @method addNewTag
 *  Adds new input for tags
 *
 * @param none
 * @returns none
 */
function addNewTag() {
  // Save prev tags in array
  for (let i = 1; i <= tagCounter; i++) {
    let value = document.getElementById(`input-tags${i}`).value;
    prevTags.push(value);
  }

  document.getElementById("tag-wrapper").innerHTML += `
      <input type="text" id="input-tags${String(
        tagCounter + 1
      )}" class="tags" name="input-tags${String(tagCounter + 1)}">
      `;
  tagCounter++;
  // After new tag has been created, repopulate previous tags
  for (let i = 1; i < tagCounter; i++) {
    document.getElementById(`input-tags${i}`).value = prevTags[i - 1];
  }

  // Empty array
  while (prevTags.length > 0) {
    prevTags.pop();
  }
}

/* INGREDIENTS */

// Keep track of number of ingredient inputs
let ingCounter = 1;

// Array to store tags to repopulate tags later
let prevIngs = [];

/**
 * @method addNewIngredient
 *  Adds label and new input field for ingredients
 *
 * @param none
 * @returns none
 */
function addNewIngredient() {
  // Save prev tags in array
  for (let i = 1; i <= ingCounter; i++) {
    let value = document.getElementById(`input-ings${i}`).value;
    prevIngs.push(value);
    console.log(prevIngs);
  }

  document.getElementById(
    "ing-wrapper"
  ).innerHTML += `<div class="input-card-ings" id=card-ing${String(
    ingCounter + 1
  )}>
    <label for="input-ings${String(ingCounter + 1)}" id=label-ings${String(
    ingCounter + 1
  )}>${String(ingCounter + 1)}.</label>
    <input type="text" id="input-ings${String(
      ingCounter + 1
    )}"  class="ings" name="input-ings${String(ingCounter + 1)}">
 </div>`;

  ingCounter++;

  // After new tag has been created, repopulate previous tags
  for (let i = 1; i < ingCounter; i++) {
    document.getElementById(`input-ings${i}`).value = prevIngs[i - 1];
  }

  // Empty array
  while (prevIngs.length > 0) {
    prevIngs.pop();
  }
}

/* DIRECTIONS */

// Keep track of number of step inputs
let stepCounter = 1;

// Array to store tags to repopulate tags later
let prevSteps = [];

/**
 * @method addNewStep
 *  Adds label and new input field for steps
 *
 * @param none
 * @returns none
 */
function addNewStep() {
  // Save prev tags in array
  for (let i = 1; i <= stepCounter; i++) {
    let value = document.getElementById(`input-steps${i}`).value;
    prevSteps.push(value);
    console.log(prevSteps);
  }

  document.getElementById(
    "step-wrapper"
  ).innerHTML += `<div class="input-card-steps" id=card-step${String(
    stepCounter + 1
  )}>
  <label for="input-steps${String(stepCounter + 1)}" id=label-steps${String(
    stepCounter + 1
  )}>${String(stepCounter + 1)}.</label>
    <input type="text" id="input-steps${String(
      stepCounter + 1
    )}"  class="steps" name="input-steps${String(stepCounter + 1)}">
    </div>`;

  stepCounter++;
  // After new tag has been created, repopulate previous tags
  for (let i = 1; i < stepCounter; i++) {
    document.getElementById(`input-steps${i}`).value = prevSteps[i - 1];
  }

  // Empty array
  while (prevSteps.length > 0) {
    prevSteps.pop();
  }
}

/* SAVE DATA */

/**
 * @method recipeExists
 *  Checks to see if a recipe exists in local storage
 *  by checking the name
 *
 * @param {string} recipeName - name of recipe to check
 * @returns {boolean} - true if exists, false if doesn't exist
 */
function recipeExists(recipeName) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == recipeName) {
      return true;
    }
  }
  return false;
}

/**
 * @method reset
 *  Clears input fields after saving
 *
 * @param none
 * @returns none
 */
function reset() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-desc").value = "";
  document.getElementById("input-hours").value = "";
  document.getElementById("input-mins").value = "";

  var i = 1;
  var j = 1;
  var k = 1;

  document.getElementById("input-tags" + i).value = "";
  document.getElementById("input-ings" + j).value = "";
  document.getElementById("input-steps" + k).value = "";

  i++;
  j++;
  k++;

  // Loop through all tag inputs and remove them
  while (i <= tagCounter) {
    document.getElementById("input-tags" + i).remove();
    i++;
  }

  // Loop through all ings inputs and remove them
  while (j <= ingCounter) {
    document.getElementById("card-ing" + j).remove();
    j++;
  }

  // Loop through all dir inputs and remove them
  while (k <= stepCounter) {
    document.getElementById("card-step" + k).remove();
    k++;
  }

  // Set image to default
  document.getElementById("display-image").src =
    "https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png";
}

/**
 * @method saveBase
 *  Saves data in input fields to local storage
 *  Resets the input field values
 *  Changes screen to expanded recipe page of saved recipe
 */
function saveBase() {
  var newRecipe = {
    name: "",
    description: "",
    time: { hours: "", minutes: "" },
    tags: [],
    ingredients: [],
    directions: [],
    thumbnail: "",
    favorites: 0,
  };

  // Get name and store it in the object
  let name = document.getElementById("input-name").value;
  newRecipe.name = name;

  // Get description and store it in the object
  let desc = document.getElementById("input-desc").value;
  newRecipe.description = desc;

  // Get time and store it in the object
  let hours = document.getElementById("input-hours").value;
  let mins = document.getElementById("input-mins").value;
  newRecipe.time.hours = hours;
  newRecipe.time.minutes = mins;

  if(hours < 0 || mins < 0 || hours > 24 || mins > 60) {
    return alert("Please input valid times");
  }

  var i = 1;
  var j = 1;
  var k = 1;

  // Loop through all tag inputs and push them to array
  while (i <= tagCounter) {
    let tagsValue = document.getElementById(`input-tags${i}`).value;
    if(tagsValue == "") {
      i++;
      continue;
    } else {
      newRecipe.tags.push(tagsValue);
      i++;
    }
  }

  // Loop through all ings inputs and push them to array
  while (j <= ingCounter) {
    let ingsValue = document.getElementById(`input-ings${j}`).value;
    if(ingsValue == "") {
      j++;
      continue;
    } else {
      newRecipe.ingredients.push(ingsValue);
      j++;
    }
  }

  // Loop through all dir inputs and push them to array
  while (k <= stepCounter) {
    let stepsValue = document.getElementById(`input-steps${k}`).value;
    if(stepsValue == "") {
      k++;
      continue;
    } else {
      newRecipe.directions.push(stepsValue);
      k++;
    }
  }

  // Get image and store in in the object as a string
  let img = document.getElementById("display-image");
  newRecipe.thumbnail = img.src;

  // Put the object into storage
  localStorage.setItem(
    newRecipe.name.toLowerCase(),
    JSON.stringify(newRecipe)
  );

  // Creates a recipe card & displays it on the 'My Recipes' page
  newCard(newRecipe.name.toLowerCase());
  document.querySelector("recipe-expand").data = newRecipe;
  changeView("Recipe Expand");
}

/**
 * @method saveDataCreate
 *  Check to make sure input fields are valid or if recipe already exists
 *  If it doesn't
 *  Changes screen to expanded recipe page of saved recipe
 */
function saveDataCreate() {
  let checkName = document.getElementById("input-name").value.toLowerCase();

  // Check if user has inputted name field
  if (checkName == "") {
    return alert("Please add at least a recipe name to save the recipe.");
  }
  // Check if recipe has already been made
  else if (recipeExists(checkName)) {
    if (confirm("Recipe already exists. Would you like to update it?")) {
      // Delete old recipe 
      localStorage.removeItem(checkName)
      saveBase();
      alert("Recipe updated!");
      reset();
    }
    else {
      return
    }
  }
  // Else, create new recipe object
  else {
    saveBase();
    alert("Recipe saved!");
    reset();
  }
}

/**
 * @method saveDataEdit
 *  Saves edited data in input fields to local storage and deletes old recipe
 *  Resets the input field values
 *  Changes screen to expanded recipe page of saved recipe
 *
 * @param {String} originalName - original name of recipe used for deletion
 */
 function saveDataEdit(originalName) {
  let checkName = document.getElementById("input-name").value.toLowerCase();

  // Check if user has inputted name field
  if (checkName == "") {
    return alert("Please add at least a recipe name to save the recipe.");
  }
  // Check if recipe has already been made
  else if (recipeExists(checkName)) {
    if (confirm("Recipe already exists. Would you like to update it?")) {
      // Delete old recipe with original name 
      localStorage.removeItem(originalName)
      // Delete old recipe with new name
      localStorage.removeItem(checkName)
      saveBase();
      alert("Recipe updated!");
      reset();
    }
    else {
      return
    }
  }
  // Else, create new recipe object and delete old one
  else {
    // Delete old recipe
    localStorage.removeItem(originalName)
    saveBase();
    alert("Recipe updated!");
    reset();
  }
}

/**
 * @method navEdit
 *  Creates edit recipe page that contains data for a recipe in the inputs
 * 
 * @param {e} -  event
 */
 export function navEdit (e) {

  let createRecipe = document.querySelector(".section--create-recipe");
  let deleteButton = document.getElementById("delete-btn");
  let expandRecipe = document.querySelector(".section--recipe-expand");
  let recipeExpand = document.querySelector('recipe-expand');

  // Get name from expanded recipe page
  let name = recipeExpand.shadowRoot.getElementById('input-name').textContent.toLowerCase()

  // Get recipe data from name
  let recipe = JSON.parse(window.localStorage.getItem(name));

  const innerText = typeof e === "string" ? e : e.target.innerText;
  
  if (innerText === "Edit Recipe") {
    
    // Hide and show pages
    expandRecipe.classList.remove("shown");
    createRecipe.classList.add("shown");
    switchButtonView(deleteButton);

    // Hide edit button
    document.getElementById("edit-btn").style.display = 'none'

    // Show save button
    document.querySelector('button.save-btn-edit').style.display = "block"

    // Set Image
    document.getElementById('display-image').src = recipe.thumbnail;

    // Set Name
    document.getElementById('input-name').value = recipe.name;

    // Set Description
    document.getElementById('input-desc').value = recipe.description

    // Set Hour and Min
    document.getElementById('input-hours').value = recipe.time.hours
    document.getElementById('input-mins').value = recipe.time.minutes

    let i;
    let j;
    let k;

    // Create inputs for tags
    for (i = 2; i <= recipe.tags.length; i++) {
      document.getElementById("tag-wrapper").innerHTML += `
      <input type="text" id="input-tags${i}" class="tags" name="input-tags${i}">
      `;
      tagCounter++;
      
    }
    
    // Set values for tags
    for (i = 1; i <= recipe.tags.length; i++) {
      document.getElementById(`input-tags${i}`).value = recipe.tags[i-1] ;
    }

    // Create inputs for ings
    for (j = 2; j <= recipe.ingredients.length; j++) {
      document.getElementById(
        "ing-wrapper"
      ).innerHTML += `<div class="input-card-ings" id=card-ing${j}>
        <label for="input-ings${j}" id=label-ings${j}>${j}.</label>
        <input type="text" id="input-ings${j}"  class="ings" name="input-ings${j}">
     </div>`;
     ingCounter++;
    }

    // Set values for ings
    for (j=1; j <= recipe.ingredients.length; j++) {
      document.getElementById(`input-ings${j}`).value = recipe.ingredients[j-1]
    }

    // Create inputs for steps
    for (k=2; k<= recipe.directions.length; k++) {
      document.getElementById(
        "step-wrapper"
      ).innerHTML += `<div class="input-card-steps" id=card-step${k}>
      <label for="input-steps${k}" id=label-steps${k}>${k}.</label>
        <input type="text" id="input-steps${k}"  class="steps" name="input-steps${k}">
        </div>`;
        stepCounter++;
    }

    // Set values for steps
    for (k=1; k <= recipe.directions.length; k++) {
      document.getElementById(`input-steps${k}`).value = recipe.directions[k-1]
    }
  }

  // Save Button Edit
  let saveButtonEdit = document.querySelector("button.save-btn-edit");
  saveButtonEdit.addEventListener("click", () => {
  saveDataEdit(name);
});
}


export function saveToMyRecipes(data) {
  // Array to store ings
  let ings = [];

  // Steps
  let steps;

  // Description
  let summary;

  // Time
  let time;

  // Hours time
  let timeHour;

  // Tags
  let tags = [];

  for (let i=0; i<3; i++) {
    // Get ingredients and push to array
    for (let j=0; j<data.recipes[i].extendedIngredients.length; j++) {
      ings.push(data.recipes[i].extendedIngredients[j].name)
    }

    summary = data.recipes[i].summary;
    steps = data.recipes[i].analyzedInstructions

    // Cleaning data
    summary = summary.replaceAll('<b>', '');
    summary = summary.replaceAll('</b>', '');

    /*
    steps = data.recipes[i].instructions;
    steps = steps.replaceAll('<ol>', '');
    steps = steps.replaceAll('</ol>', '');
    steps = steps.replaceAll('<li>', '');
    steps = steps.replaceAll('</li>', '');
    steps = steps.replaceAll('\n', '');
    steps = steps.replaceAll('<p>', '');
    steps = steps.replaceAll('</p>', '');
    steps = steps.split('.');
    steps.pop();
    */

    // Converting time
    time = data.recipes[i].readyInMinutes
    if (time > 60) {
      timeHour = Math.floor(time / 60)
      time -= timeHour * 60;
    }
    else if (time == 60) {
      timeHour = 1;
      time = 0;
    }
    else {
      timeHour = 0;
    }

    // Push tags to array
    if (data.recipes[i].cheap === "true") {
      tags.push("cheap")
    }
    if (data.recipes[i].cuisines) {
      tags.concat(data.recipes[i].cuisines)
    }
    if (data.recipes[i].dairyFree === "true") {
      tags.push("dairyFree")
    }
    if (data.recipes[i].glutenFree === "true") {
      tags.push("glutenFree")
    }
    if (data.recipes[i].ketogenic === "true") {
      tags.push("ketogenic")
    }
    if (data.recipes[i].vegan === "true") {
      tags.push("ketogenic")
    }
    if (data.recipes[i].vegetarian === "true") {
      tags.push("ketogenic")
    }
    if (data.recipes[i].dishTypes) {
      tags.concat(data.recipes[i].dishTypes)
    }
    
    // Trim to fit recipe card size
    let summaryTrim = summary.length > 173 ? summary.substring(0, 170) + "..." : summary

    const recipeData = {
      name: data.recipes[i].title,
      description: summaryTrim,
      time: { hours: timeHour, minutes: time},
      tags: tags,
      ingredients: [],
      directions: [],
      thumbnail: data.recipes[i].image,
      favorites: 0,
    };

    // Recipe Card
    let recipeCard = document.createElement("recipe-card");
    recipeCard.data = recipeData;

    saveBtn = document.createElement("button")
    saveBtn.id = `save-to-rec-btn${i}`
    saveBtn.className = `save-to-rec-btn`;
    saveBtn.innerHTML = "Save to My Recipes";

    // Card wrapper to hold recipe card and button
    const cardWrapper = document.createElement("div")
    cardWrapper.className = `card${i}`;
    cardWrapper.id = 'explore-recipe-card';

    cardWrapper.appendChild(recipeCard);
    cardWrapper.appendChild(saveBtn);

    document.querySelector("#explore-wrapper").appendChild(cardWrapper);

    // Switch to create recipe page and fill in inputs
    saveBtn.onclick = function() {
      // Edit option
      if (confirm("Would you like to edit the recipe before saving?")) {
        // Hide explore recipes
        document.querySelector(".explore").classList.add('hidden');

        // Show create recipes page
        let createRecipe = document.querySelector(".section--create-recipe");
        createRecipe.classList.add("shown");

        // Show return button
        document.getElementById("return-btn").className = "btn btn-light";

        // Set Image
        document.getElementById('display-image').src = recipeData.thumbnail;

        // Set Name
        document.getElementById('input-name').value = recipeData.name;

        // Set Description
        document.getElementById('input-desc').value = summary;

        // Set Time
        document.getElementById('input-mins').value = recipeData.time.minutes;

        let x;
        let y;

        // INGREDIENTS

        // Clear first input
        document.getElementById('label-ings1').remove();
        document.getElementById('input-ings1').remove();

        // Create inputs for ings
        for (x = 1; x <= ings.length; x++) {
        document.getElementById(
          "ing-wrapper"
        ).innerHTML += `<div class="input-card-ings" id=card-ing${x}>
          <label for="input-ings${x}" id=label-ings${x}>${x}.</label>
          <input type="text" id="input-ings${x}"  class="ings" name="input-ings${x}">
          </div>`;
          ingCounter++;
        }

        // Set values for ings
        for (x=1; x <= ings.length; x++) {
          document.getElementById(`input-ings${x}`).value = ings[x-1];
        }

          // INSTRUCTIONS

          // Clear first input
          document.getElementById('card-step-1').remove();
        
          // Create inputs for steps
        for (y=1; y<= steps.length; y++) {
          document.getElementById(
            "step-wrapper"
          ).innerHTML += `<div class="input-card-steps" id=card-step${y}>
          <label for="input-steps${y}" id=label-steps${y}>${y}.</label>
            <input type="text" id="input-steps${y}"  class="steps" name="input-steps${y}">
            </div>`;
            stepCounter++;
        }

        // Set values for steps
        for (y=1; y <= steps.length; y++) {
          document.getElementById(`input-steps${y}`).value = steps[y-1]
        }

          // Show save button
          let saveButtonCreate = document.querySelector("button.save-btn-create");
          saveButtonCreate.style.display="block";
        }
      else {
        // Put the object into storage
        localStorage.setItem(
        recipeData.name.toLowerCase(),
        JSON.stringify(recipeData));

        alert('Recipe has been saved!')
      }
    }
  }
}


