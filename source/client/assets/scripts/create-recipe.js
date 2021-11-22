// Contains the functions involved in creating and editing a new recipe

import { newCard } from "/assets/scripts/recipe-card-create.js";
import { changeView, switchButtonView } from "/assets/scripts/navigate.js";

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

// Save Button
let saveButton = document.querySelector("button.save-btn");
saveButton.addEventListener("click", () => {
  saveData();
});

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
 * @method saveData
 *  Saves data in input fields to local storage
 *  Resets the input field values
 *  Changes screen to expanded recipe page of saved recipe
 *
 * @param {e} pageChange - current page the user is on(?)
 * @returns none
 */
function saveData() {
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
  
      var i = 1;
      var j = 1;
      var k = 1;
  
      // Loop through all tag inputs and push them to array
      while (i <= tagCounter) {
        let tagsValue = document.getElementById("input-tags" + i).value;
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
        let ingsValue = document.getElementById("input-ings" + j).value;
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
        let stepsValue = document.getElementById("input-steps" + k).value;
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
      alert("Recipe saved!");
      changeView("Recipe Expand");
      reset();
    }
    else {
      return
    }
  }
  // Else, create new recipe object
  else {
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
      return alert("Please input correct times");
    }

    var i = 1;
    var j = 1;
    var k = 1;

    // Loop through all tag inputs and push them to array
    while (i <= tagCounter) {
      let tagsValue = document.getElementById("input-tags" + i).value;
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
      let ingsValue = document.getElementById("input-ings" + j).value;
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
      let stepsValue = document.getElementById("input-steps" + k).value;
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
    alert("Recipe saved!");
    changeView("Recipe Expand");

    reset();
  }
}

/**
 * Creates edit recipe page that contains data for a recipe in the inputs
 * @param {e} -  event
 * @returns none 
 */
 export function navEdit (e) {

  let createRecipe = document.querySelector(".section--create-recipe");
  let deleteButton = document.getElementById("delete-btn");
  let expandRecipe = document.querySelector(".section--recipe-expand");
  let recipeExpand = document.querySelector('recipe-expand');
  let name = recipeExpand.shadowRoot.getElementById('input-name').textContent.toLowerCase()
  let recipe = JSON.parse(window.localStorage.getItem(name));

  const innerText = typeof e === "string" ? e : e.target.innerText;
  
  if (innerText === "Edit Recipe") {
    
    // Hide and show pages
    expandRecipe.classList.remove("shown");
    createRecipe.classList.add("shown");
    switchButtonView(deleteButton);

    // Hide edit button
    document.getElementById("edit-btn").style.display = 'none'

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
}



