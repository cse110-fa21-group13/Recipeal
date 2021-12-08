// Contains the functions involved in creating, editing, and saving a recipe

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
let saveBtn = document.querySelector(".save-to-rec-btn");


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
  };
  if (image) {
    fileReader.readAsDataURL(image);
  }
}

/* TAGS */

// Keep track of number of tag inputs
let tagCounter = 0;

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

  // Adding first tag
  if (tagCounter == 0) {
    document.getElementById("tag-wrapper").innerHTML += `
    <input type="text" id="input-tags${String(
      tagCounter + 1
    )}" class="tags" name="input-tags${String(tagCounter + 1)}">
    `;
    tagCounter++;
    return;
  }

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
let ingCounter = 0;

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

  // Adding first ing
  if (ingCounter == 0) {
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
    return;
  }
  else {
  // Save prev tags in array
  for (let i = 1; i <= ingCounter; i++) {
    let value = document.getElementById(`input-ings${i}`).value;
    prevIngs.push(value);
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
}

/* DIRECTIONS */

// Keep track of number of step inputs
let stepCounter = 0;

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

  // Adding first step
  if (stepCounter == 0) {
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
    return;
  }

  // Save prev tags in array
  for (let i = 1; i <= stepCounter; i++) {
    let value = document.getElementById(`input-steps${i}`).value;
    prevSteps.push(value);
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
export function reset() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-desc").value = "";

  document.getElementById("input-calories").value = "";
  document.getElementById("input-carbs").value = "";
  document.getElementById("input-protein").value = "";
  document.getElementById("input-fat").value = "";

  document.getElementById("input-hours").value = "";
  document.getElementById("input-mins").value = "";

  document.getElementById("tag-wrapper").innerHTML = "";
  document.getElementById("ing-wrapper").innerHTML = "";
  document.getElementById("step-wrapper").innerHTML = "";

  // Set image to default
  document.getElementById("display-image").src =
    "https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png";
    
  tagCounter = 0;
  ingCounter = 0;
  stepCounter = 0;
}

/**
 * @method saveBase
 *  Saves data in input fields to local storage
 *  Resets the input field values
 *  Changes screen to expanded recipe page of saved recipe
 * 
 * @param {String} page - determines if it's updating or saving a recipe
 */
function saveBase(page, favoriteStatus) {
  var newRecipe = {
    name: "",
    description: "",
    time: { hours: "", minutes: "" },
    tags: [],
    ingredients: [],
    directions: [],
    thumbnail: "",
    favorites: 0,
    saveFrom: "Create",
    nutritionInfo: { calories: "", carbs: "", fat: "", protein: ""}
  };

  // Get name and store it in the object
  let name = document.getElementById("input-name").value;
  newRecipe.name = name;

  // Get favorite and store it in the object
  newRecipe.favorites = favoriteStatus;

  // Get description and store it in the object
  let desc = document.getElementById("input-desc").value;
  newRecipe.description = desc;

  // Get nutrition info and store it in the object
  let calories = document.getElementById("input-calories").value;
  newRecipe.nutritionInfo.calories = calories;

  let carbs = document.getElementById("input-carbs").value;
  newRecipe.nutritionInfo.carbs = carbs;

  let fat = document.getElementById("input-fat").value;
  newRecipe.nutritionInfo.fat = fat;

  let protein = document.getElementById("input-protein").value;
  newRecipe.nutritionInfo.protein = protein;

  if(calories < 0 || carbs < 0 || fat < 0 || protein < 0) {
    return alert("Please input valid nutritional information");
  }

  // Get time and store it in the object
  let hours = document.getElementById("input-hours").value;
  let mins = document.getElementById("input-mins").value;
  newRecipe.time.hours = hours;
  newRecipe.time.minutes = mins;

  if(hours < 0 || mins < 0 || hours > 24 || mins > 60) {
    return alert("Please input valid times");
  }

  let i = 1;
  let j = 1;
  let k = 1;

  // If first input exists, then loop
  if (document.getElementById(`input-tags1`)) {
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
  }
  

  if (document.getElementById(`input-ings1`)) {
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
}

if (document.getElementById(`input-steps1`)) {
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
}

  // Get image and store in in the object as a string
  let img = document.getElementById("display-image");
  newRecipe.thumbnail = img.src;

  /*
  // Put the object into storage
  localStorage.setItem(
    newRecipe.name.toLowerCase(),
    JSON.stringify(newRecipe)
  );
  */

  if (page === "create") {
    // Put the object into storage
    localStorage.setItem(
    newRecipe.name.toLowerCase(),
    JSON.stringify(newRecipe)
  );
    alert("Recipe saved!");
    reset();
    // Creates a recipe card & displays it on the "My Recipes" page
    newCard(newRecipe.name.toLowerCase());
    document.querySelector("recipe-expand").data = newRecipe;
    changeView("Recipe Expand");
  }
  else if (page === "update") {
    // Put the object into storage
    localStorage.setItem(
    newRecipe.name.toLowerCase(),
    JSON.stringify(newRecipe)
    );
    alert("Recipe overwritten!");
    reset();
    // Creates a recipe card & displays it on the "My Recipes" page
    newCard(newRecipe.name.toLowerCase());
    document.querySelector("recipe-expand").data = newRecipe;
    changeView("Recipe Expand");
  }
  else if (page === "edit") {
    // Put the object into storage
    localStorage.setItem(
    newRecipe.name.toLowerCase(),
    JSON.stringify(newRecipe)
    );
    // Creates a recipe card & displays it on the "My Recipes" page
    newCard(newRecipe.name.toLowerCase());
    document.querySelector("recipe-expand").data = newRecipe;
    changeView("Recipe Expand");
    return 1;
  }
  else {
    // Put the object into storage
    localStorage.setItem(
      newRecipe.name.toLowerCase(),
      JSON.stringify(newRecipe)
    );
    // Creates a recipe card & displays it on the "My Recipes" page
    newCard(newRecipe.name.toLowerCase());
    document.querySelector("recipe-expand").data = newRecipe;
    changeView("Recipe Expand");
  }
}

/**
 * @method saveDataCreate
 *  Check to make sure input fields are valid or if recipe already exists
 *  If it doesn't
 *  Changes screen to expanded recipe page of saved recipe
 */
function saveDataCreate() {
  let checkName = document.getElementById("input-name").value.toLowerCase();
  let page = "update";

  // Check if user has inputted name field
  if (checkName == "") {
    return alert("Please add at least a recipe name to save the recipe.");
  }
  // Check if recipe has already been made
  else if (recipeExists(checkName)) {
    if (confirm("Recipe already exists. Would you like to overwrite it?")) {
      // Delete old recipe
      let recipeCards = document.getElementById("recipe-cards").children;
      for(let i = 0; i < recipeCards.length; i++) {
        if(recipeCards[i].id.toLowerCase() === checkName) {
          recipeCards[i].parentNode.removeChild(recipeCards[i]);
        }
      } 
      localStorage.removeItem(checkName);
      page = "update";
      saveBase(page, 0);
    }
    else {
      return;
    }
  }
  // Else, create new recipe object
  else {
    page = "create";
    saveBase(page, 0);
  }
}

/**
 * @method saveDataEdit
 *  Saves edited data in input fields to local storage and deletes old recipe
 *  Resets the input field values
 *  Changes screen to expanded recipe page of saved recipe
 *
 * @param {String} originalName - original name of recipe used for deletion
 * @param {function} functionName - name of function to remove from event listener
 */
 function saveDataEdit(originalName, functionName) {
  // Delete old recipe with new name
  let isFav = JSON.parse(localStorage.getItem(originalName)).favorites;
  let page = "edit";
  if (saveBase(page) === 1) {
  // Delete old recipe with new name
  localStorage.removeItem(originalName);
  saveBase(null, isFav);
  alert("Recipe updated!");
  reset();
  let recipeCards = document.getElementById("recipe-cards").children;
  for(let i = 0; i < recipeCards.length; i++) {
    if(recipeCards[i].id.toLowerCase() === originalName) {
      recipeCards[i].parentNode.removeChild(recipeCards[i]);
    }
  }
  let saveButtonEdit = document.getElementById("save-edit-btn");
  saveButtonEdit.removeEventListener("click", functionName);
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
  let recipeExpand = document.querySelector("recipe-expand");
  let cookModeBtn = document.getElementById("cook-mode-btn");
  let refreshButton = document.getElementById("refresh-btn");
  let returnBut = document.getElementById("return-btn");

  returnBut.classList.add("edit");

  // Get name from expanded recipe page
  let name = recipeExpand.shadowRoot.getElementById("input-name").textContent.toLowerCase();

  // Get recipe data from name
  let recipe = JSON.parse(window.localStorage.getItem(name));

  const innerText = typeof e === "string" ? e : e.target.innerText;

  
  
  if (innerText === "Edit Recipe") {
    
    // Hide and show pages
    expandRecipe.classList.remove("shown");
    createRecipe.classList.add("shown");
    switchButtonView(deleteButton);
    switchButtonView(cookModeBtn);
    refreshButton.className = "hidden";

    // Hide edit button
    document.getElementById("edit-btn").style.display = "none";

    // Show save button
    document.querySelector("button.save-btn-edit").style.display = "block";

    // Set Image
    document.getElementById("display-image").src = recipe.thumbnail;

    // Set Name
    document.getElementById("input-name").value = recipe.name;

    // Set Description
    document.getElementById("input-desc").value = recipe.description;

    // Set Nutrition Info
    document.getElementById("input-calories").value = recipe.nutritionInfo.calories;
    document.getElementById("input-carbs").value = recipe.nutritionInfo.carbs;
    document.getElementById("input-fat").value = recipe.nutritionInfo.fat;
    document.getElementById("input-protein").value = recipe.nutritionInfo.protein;

    // Set Hour and Min
    document.getElementById("input-hours").value = recipe.time.hours;
    document.getElementById("input-mins").value = recipe.time.minutes;

    let i;
    let j;
    let k;

    // Create inputs for tags
    for (i = 1; i <= recipe.tags.length; i++) {
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
    for (j = 1; j <= recipe.ingredients.length; j++) {
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
      document.getElementById(`input-ings${j}`).value = recipe.ingredients[j-1];
    }

    // Create inputs for steps
    for (k=1; k<= recipe.directions.length; k++) {
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
      document.getElementById(`input-steps${k}`).value = recipe.directions[k-1];
    }
  }

  // Save Button Edit
  let saveButtonEdit = document.getElementById("save-edit-btn");
  saveButtonEdit.addEventListener("click", function save() {
    saveDataEdit(name, save);
  });
}

/**
 * @method saveToMyRecipes
 *  Saves recipes from the explore page to my recipes
 *  Allows you to edit the recipe before you save
 * 
 * @param {JSON} data 
 */
 export async function saveToMyRecipes(data, apiKey) {
  tagCounter = 0;
  ingCounter = 0;
  stepCounter = 0;
  for (let i=0; i<1; i++) {
    // Array to store ings
    let ings = [];

    // Steps
    let steps = [];

    // Description
    let summary;

    // Time
    let time;

    // Hours time
    let timeHour = "";

    // Hours min
    let timeMin = "";

    // Tags
    let tags = [];

    // Get ingredients and push to array
    for (let j=0; j<data.recipes[i].extendedIngredients.length; j++) {
      ings.push(data.recipes[i].extendedIngredients[j].original);
    }
    
    summary = data.recipes[i].summary;

    // Cleaning data
    summary = summary.replaceAll("<b>", "");
    summary = summary.replaceAll("</b>", "");

    steps = data.recipes[i].instructions;
    steps = steps.replaceAll("<ol>", "");
    steps = steps.replaceAll("</ol>", "");
    steps = steps.replaceAll("<li>", "");
    steps = steps.replaceAll("</li>", "");
    steps = steps.replaceAll("\n", "");
    steps = steps.replaceAll("<p>", "");
    steps = steps.replaceAll("</p>", "");
    steps = steps.split(".");
    steps.pop();
    

    // Converting time to hours min format
    time = data.recipes[i].readyInMinutes;
    timeMin = time % 60;
    timeHour = Math.floor(time / 60);

    // Push tags to array
    if (data.recipes[i].cheap === true) {
      tags.push("cheap");
    }
    if (data.recipes[i].cuisines) {
      tags = tags.concat(data.recipes[i].cuisines);
    }
    if (data.recipes[i].dairyFree === true) {
      tags.push("dairy-free");
    }
    if (data.recipes[i].glutenFree === true) {
      tags.push("gluten-free");
    }
    if (data.recipes[i].ketogenic === true) {
      tags.push("ketogenic");
    }
    if (data.recipes[i].vegan === true) {
      tags.push("vegan");
    }
    if (data.recipes[i].vegetarian === true) {
      tags.push("vegetarian");
    }
    if (data.recipes[i].dishTypes) {
      for(let j = 0; j < data.recipes[i].dishTypes.length; j++) {
        if(data.recipes[i].dishTypes[j] === "main course") {
          data.recipes[i].dishTypes.splice(j, 1);
        }
        else if(data.recipes[i].dishTypes[j] === "antipasti" || data.recipes[i].dishTypes[j] === "antipasto") {
          data.recipes[i].dishTypes.splice(j, 1);
        }
        else if(data.recipes[i].dishTypes[j] === "appetizer" || data.recipes[i].dishTypes[j] === "hor d'oeuvre") {
          data.recipes[i].dishTypes.splice(j, 1);
        }
        else if(data.recipes[i].dishTypes[j] === "drink") {
          data.recipes[i].dishTypes.splice(j, 1);
        }
        else if(data.recipes[i].dishTypes[j] === "morning meal") {
          data.recipes[i].dishTypes.splice(j, 1);
        }
      }
      tags = tags.concat(data.recipes[i].dishTypes);
    }

    // Get nutrition info
    let response = await fetch(
      `https://api.spoonacular.com/recipes/${data.recipes[i].id}/nutritionWidget.json?apiKey=${apiKey}`
    );

    // Storing data in form of JSON
    let nutritionInfo = await response.json();

    let calories = nutritionInfo.calories;
    calories = calories.replace(/\D/g,"");

    let carbs = nutritionInfo.carbs;
    carbs = carbs.replace(/\D/g,"");

    let fat = nutritionInfo.fat;
    fat = fat.replace(/\D/g,"");

    let protein = nutritionInfo.protein;
    protein = protein.replace(/\D/g,"");

    // Trim to fit recipe card size
    let summaryTrim = summary.length > 173 ? summary.substring(0, 150) + "..." : summary;

    const recipeData = {
      name: data.recipes[i].title,
      description: summaryTrim,
      time: { hours: String(timeHour), minutes: String(timeMin)},
      tags: tags,
      ingredients: ings,
      directions: steps,
      thumbnail: data.recipes[i].image,
      favorites: 0,
      saveFrom: "Explore",
      nutritionInfo: { calories: Number(calories), carbs: Number(carbs), fat: Number(fat), protein: Number(protein)}
    };


    // Recipe Card
    let recipeCard = document.createElement("recipe-card");
    recipeCard.data = recipeData;

    recipeCard.addEventListener("click", (e) => {
      recipeData.description = summary;
      document.querySelector("recipe-expand").data = recipeData;
      changeView("Recipe Expand");
      document.getElementById("cook-mode-btn").className = "hidden";
      const returnBut = document.getElementById("return-btn");
      if(returnBut.classList.contains("explore")){
          let editButton = document.getElementById("edit-btn");
          let deleteButton = document.getElementById("delete-btn");
          editButton.style.display = "none";
          deleteButton.className = "hidden";
      }
    });

    saveBtn = document.createElement("button");
    saveBtn.id = `save-to-rec-btn${i}`;
    saveBtn.className = `save-to-rec-btn`;
    saveBtn.innerHTML = "Save to My Recipes";

    // Card wrapper to hold recipe card and button
    const cardWrapper = document.createElement("div");
    cardWrapper.className = `card${i}`;
    cardWrapper.id = "explore-recipe-card";

    cardWrapper.appendChild(recipeCard);
    cardWrapper.appendChild(saveBtn);

    document.querySelector("#explore-wrapper").appendChild(cardWrapper);

    // Switch to create recipe page and fill in inputs
    saveBtn.onclick = function() {
      // Edit option
      if (confirm("Would you like to edit the recipe before saving?")) {
        // Hide explore recipes
        document.querySelector(".explore").classList.add("hidden");

        // Show create recipes page
        let createRecipe = document.querySelector(".section--create-recipe");
        createRecipe.classList.add("shown");

        // Show save button
        let saveButtonCreate = document.querySelector("button.save-btn-create");
        saveButtonCreate.style.display="block";

        // Set Image
        document.getElementById("display-image").src = recipeData.thumbnail;

        // Set Name
        document.getElementById("input-name").value = recipeData.name;

        // Set Description
        document.getElementById("input-desc").value = summary;

        // Set Nutrition Info
        document.getElementById("input-calories").value = recipeData.nutritionInfo.calories;
        document.getElementById("input-carbs").value = recipeData.nutritionInfo.carbs;
        document.getElementById("input-fat").value = recipeData.nutritionInfo.fat;
        document.getElementById("input-protein").value = recipeData.nutritionInfo.protein;

        // Set Time
        document.getElementById("input-mins").value = recipeData.time.minutes;

        let x;
        let y;
        let z;

        // TAGS

        // Create inputs for tags
        for (x = 1; x <= tags.length; x++) {
          document.getElementById("tag-wrapper").innerHTML += `
          <input type="text" id="input-tags${x}" class="tags" name="input-tags${x}">
          `;
          tagCounter++;
        }

        // Set values for tags
        for (x = 1; x <= tags.length; x++) {
          document.getElementById(`input-tags${x}`).value = tags[x-1] ;
        }

        // INGREDIENTS

        // Create inputs for ings
        for (y = 1; y <= ings.length; y++) {
        document.getElementById(
          "ing-wrapper"
        ).innerHTML += `<div class="input-card-ings" id=card-ing${y}>
          <label for="input-ings${y}" id=label-ings${y}>${y}.</label>
          <input type="text" id="input-ings${y}"  class="ings" name="input-ings${y}">
          </div>`;
          ingCounter++;
        }

        // Set values for ings
        for (y=1; y <= ings.length; y++) {
          document.getElementById(`input-ings${y}`).value = ings[y-1];
        }

        // INSTRUCTIONS

        // Create inputs for steps
        for (z=1; z<= steps.length; z++) {
          document.getElementById(
            "step-wrapper"
          ).innerHTML += `<div class="input-card-steps" id=card-step${z}>
          <label for="input-steps${z}" id=label-steps${z}>${z}.</label>
            <input type="text" id="input-steps${z}"  class="steps" name="input-steps${z}">
            </div>`;
            stepCounter++;
        }

        // Set values for steps
        for (z=1; z <= steps.length; z++) {
          document.getElementById(`input-steps${z}`).value = steps[z-1];
        }
        document.getElementById(recipeData.name).parentElement.remove();
      }
      else {
        document.getElementById(recipeData.name).parentElement.remove();
        // Change description to include full instead of trim
        recipeData.description = summary;
        recipeData.saveFrom = "";
        
        // Put the object into storage
        localStorage.setItem(
        recipeData.name.toLowerCase(),
        JSON.stringify(recipeData));

        newCard(recipeData.name.toLowerCase());

        alert("Recipe has been saved!");
      }
    };
  }
}

/*
 * Stores the added recipe Ids so we don't add duplicates from typing teach letter
 */
const addedRecipes = new Set(); 
// const addEachKeyup = 1; 

/**
 * @method searchRecipe
 *  Function to search for recipe cards in search bar
 *  
 */ 
export function searchRecipe() {
    let input = document.getElementById("search-bar");
    let filter = input.value.toLowerCase();
    let recipeCardsElement = document.getElementById("recipe-cards"); 
    let allRecipes = recipeCardsElement.children; 

    for (let i = 0; i < allRecipes.length; i++) {
        let currentRecipe = allRecipes[i]; 
        let name = currentRecipe.shadowRoot.querySelector("h1").textContent; 
        let lowerConverted = name.toLowerCase();
        if (lowerConverted.indexOf(filter) > -1) {
        currentRecipe.style.display = ""; 
        } else {
        currentRecipe.style.display = "none"; 
        }
    }
}

/**
 * @method filterTags 
 *  Checks the tag list of each existing recipe card. If the filter tag is not in a recipe's tag list,
 *  that recipe gets hidden. If the filter is being turned off, then check the list of tags still being
 *  filtered for against each recipe's tag list. If there is no intersection, display the recipe
 *  
 * @param {string} tag The filter to be applied
 */
export function filterTags(tag) {
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

/**
 * @method searchSpoon
 *  Function to search for recipes in Spoonacular
 */
export async function searchSpoon() {
    let input = document.getElementById("explore-search-bar");
    const filter = input.value.toLowerCase();
    let recipeCardsElement = document.getElementById("explore-wrapper");
    let allRecipes = recipeCardsElement.children; 

    if (filter === "") {
        addedRecipes.clear(); 
        currentRecipe.style.display = "";
    } else {
        for (let i = 0; i < allRecipes.length; i++) {
            allRecipes[i].style.display = "none"; 
        }
        const API_KEY = "b24485ab3d4a47f696151e7134433592";
        const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${filter}&number=3&apiKey=${API_KEY}`;
        fetch (SEARCH_URL)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.results.length; i++) {
                    let recipeID = data.results[i].id; 
                    let recipeTitle = data.results[i].title;

                    // Prevents duplicate cards from showing up
                    if (addedRecipes.has(recipeTitle)) {
                        continue; 
                    } 

                    addedRecipes.add(recipeTitle); 


                    const RECIPE_INFO = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
                    fetch(RECIPE_INFO)
                        .then(response1 => response1.json())
                        .then(info => {

                            

                            // Array to store ings
                            let ings = [];

                            // Steps
                            let steps = [];

                            // Tags
                            let tags = [];

                            // Creates recipe card
                            let recipeTime = info.readyInMinutes;
                            let recipeMin = recipeTime % 60;
                            let recipeHour = Math.floor(recipeTime / 60);
                           

                            let recipeSummary = info.summary;
                            recipeSummary = recipeSummary.replaceAll("<b>", "");
                            recipeSummary = recipeSummary.replaceAll("</b>", "");
                            recipeSummary = recipeSummary.length > 173 ? recipeSummary.substring(0, 170) + "..." : recipeSummary;

                            steps = info.instructions;
                            steps = steps.replaceAll("<ol>", "");
                            steps = steps.replaceAll("</ol>", "");
                            steps = steps.replaceAll("<li>", "");
                            steps = steps.replaceAll("</li>", "");
                            steps = steps.replaceAll("\n", "");
                            steps = steps.replaceAll("<p>", "");
                            steps = steps.replaceAll("</p>", "");
                            steps = steps.split(".");
                            steps.pop();

                            // Push tags to array
                            if (info.cheap === true) {
                                tags.push("cheap");
                            }
                            if (info.cuisines) {
                                tags = tags.concat(info.cuisines);
                            }
                            if (info.dairyFree === true) {
                                tags.push("dairy-free");
                            }
                            if (info.glutenFree === true) {
                                tags.push("gluten-free");
                            }
                            if (info.ketogenic === true) {
                                tags.push("ketogenic");
                            }
                            if (info.vegan === true) {
                                tags.push("vegan");
                            }
                            if (info.vegetarian === true) {
                                tags.push("vegetarian");
                            }
                            if (info.dishTypes) {
                                for(let j = 0; j < info.dishTypes.length; j++) {
                                if(info.dishTypes[j] === "main course") {
                                    info.dishTypes.splice(j, 1);
                                }
                                else if(info.dishTypes[j] === "antipasti" || info.dishTypes[j] === "antipasto") {
                                    info.dishTypes.splice(j, 1);
                                }
                                else if(info.dishTypes[j] === "appetizer" || info.dishTypes[j] === "hor d'oeuvre") {
                                    info.dishTypes.splice(j, 1);
                                }
                                else if(info.dishTypes[j] === "drink") {
                                    info.dishTypes.splice(j, 1);
                                }
                                else if(info.dishTypes[j] === "morning meal") {
                                    info.dishTypes.splice(j, 1);
                                }
                                }
                                tags = tags.concat(info.dishTypes);
                            }

                            
                            // Ingredients
                            for (let j=0; j<info.extendedIngredients.length; j++) {
                                ings.push(info.extendedIngredients[j].original);
                            }
                            

                            fetch(`https://api.spoonacular.com/recipes/${recipeID}/nutritionWidget.json?apiKey=${API_KEY}`)
                                .then(response=>response.json())
                                .then(nutritionInfo => {

                                tagCounter = 0;
                                ingCounter = 0;
                                stepCounter = 0;
                                let calories = nutritionInfo.calories;
                                calories = calories.replace(/\D/g,"");
                        
                                let carbs = nutritionInfo.carbs;
                                carbs = carbs.replace(/\D/g,"");
                        
                                let fat = nutritionInfo.fat;
                                fat = fat.replace(/\D/g,"");
                        
                                let protein = nutritionInfo.protein;
                                protein = protein.replace(/\D/g,"");

                                const recipeData = {
                                    name: info.title,
                                    description: recipeSummary,
                                    time: { hours: recipeHour.toString(), minutes: recipeMin.toString() },
                                    tags: tags,
                                    ingredients: ings,
                                    directions: steps,
                                    thumbnail: info.image,
                                    favorites: 0,
                                    saveFrom: "Explore",
                                    nutritionInfo: { calories: Number(calories), carbs: Number(carbs), fat: Number(fat), protein: Number(protein)}
                                };
    
                                // Add to recipe card
                                let recipeCard = document.createElement("recipe-card");
                                recipeCard.data = recipeData;
    
                                recipeCard.addEventListener("click", (e) => {
                                recipeData.description = recipeSummary;
                                document.querySelector("recipe-expand").data = recipeData;
                                changeView("Recipe Expand");
                                document.getElementById("cook-mode-btn").className = "hidden";
                                const returnBut = document.getElementById("return-btn");
                                if(returnBut.classList.contains("explore")){
                                    let editButton = document.getElementById("edit-btn");
                                    let deleteButton = document.getElementById("delete-btn");
                                    editButton.style.display = "none";
                                    deleteButton.className = "hidden";
                                }
                                });
    
                                saveBtn = document.createElement("button");
                                saveBtn.id = `save-to-rec-btn${i}`;
                                saveBtn.className = `save-to-rec-btn`;
                                saveBtn.innerHTML = "Save to My Recipes";
    
                                // Card wrapper to hold recipe card and button
                                const cardWrapper = document.createElement("div");
                                cardWrapper.className = `card${i}`;
                                cardWrapper.id = "explore-recipe-card";
    
                                cardWrapper.appendChild(recipeCard);
                                cardWrapper.appendChild(saveBtn);
    
                                document.querySelector("#explore-wrapper").appendChild(cardWrapper);
    
                                // Switch to create recipe page and fill in inputs
                                saveBtn.onclick = function() {

                                     //saveToMyRecipes(info, API_KEY )
                                    // Edit option
                                    if (confirm("Would you like to edit the recipe before saving?")) {
                                    // Hide explore recipes
                                    document.querySelector(".explore").classList.add("hidden");
                            
                                    // Show create recipes page
                                    let createRecipe = document.querySelector(".section--create-recipe");
                                    createRecipe.classList.add("shown");
                            
                                    // Show save button
                                    let saveButtonCreate = document.querySelector("button.save-btn-create");
                                    saveButtonCreate.style.display="block";
                            
                                    // Set Image
                                    document.getElementById("display-image").src = recipeData.thumbnail;
                            
                                    // Set Name
                                    document.getElementById("input-name").value = recipeData.name;
                            
                                    // Set Description
                                    document.getElementById("input-desc").value = recipeSummary;
                            
                                    // Set Nutrition Info
                                    document.getElementById("input-calories").value = recipeData.nutritionInfo.calories;
                                    document.getElementById("input-carbs").value = recipeData.nutritionInfo.carbs;
                                    document.getElementById("input-fat").value = recipeData.nutritionInfo.fat;
                                    document.getElementById("input-protein").value = recipeData.nutritionInfo.protein;
                            
                                    // Set Time
                                    document.getElementById("input-mins").value = recipeData.time.minutes;
                            
                                    let x;
                                    let y;
                                    let z;

                                    
                            
                                    // TAGS
                            
                                    // Create inputs for tags
                                    for (x = 1; x <= tags.length; x++) {
                                        document.getElementById("tag-wrapper").innerHTML += `
                                        <input type="text" id="input-tags${x}" class="tags" name="input-tags${x}">
                                        `;
                                        tagCounter++;
                                    }
                            
                                    // Set values for tags
                                    for (x = 1; x <= tags.length; x++) {
                                        document.getElementById(`input-tags${x}`).value = tags[x-1] ;
                                    }
                            
                                    // INGREDIENTS
                            
                                    // Create inputs for ings
                                    for (y = 1; y <= ings.length; y++) {
                                    document.getElementById(
                                        "ing-wrapper"
                                    ).innerHTML += `<div class="input-card-ings" id=card-ing${y}>
                                        <label for="input-ings${y}" id=label-ings${y}>${y}.</label>
                                        <input type="text" id="input-ings${y}"  class="ings" name="input-ings${y}">
                                        </div>`;
                                        ingCounter++;
                                    }
                            
                                    // Set values for ings
                                    for (y=1; y <= ings.length; y++) {
                                        document.getElementById(`input-ings${y}`).value = ings[y-1];
                                    }
                            
                                    // INSTRUCTIONS
                            
                                    // Create inputs for steps
                                    for (z=1; z<= steps.length; z++) {
                                        document.getElementById(
                                        "step-wrapper"
                                        ).innerHTML += `<div class="input-card-steps" id=card-step${z}>
                                        <label for="input-steps${z}" id=label-steps${z}>${z}.</label>
                                        <input type="text" id="input-steps${z}"  class="steps" name="input-steps${z}">
                                        </div>`;
                                        stepCounter++;
                                    }
                            
                                    // Set values for steps
                                    for (z=1; z <= steps.length; z++) {
                                        document.getElementById(`input-steps${z}`).value = steps[z-1];
                                    }
                                    document.getElementById(recipeData.name).parentElement.remove();
                                    }
                                    else {
                                    document.getElementById(recipeData.name).parentElement.remove();
                                    // Change description to include full instead of trim
                                    recipeData.description = recipeSummary;
                                    recipeData.saveFrom = "";
                                    
                                    // Put the object into storage
                                    localStorage.setItem(
                                    recipeData.name.toLowerCase(),
                                    JSON.stringify(recipeData));
                            
                                    newCard(recipeData.name.toLowerCase());
                            
                                    alert("Recipe has been saved!");
                                    }
                                };
                            });
                        });
                }
            });
    }
}