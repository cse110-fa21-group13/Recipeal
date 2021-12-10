class ExpandRecipe extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />`;

    // Create styles and root element
    const styles = document.createElement("style");
    const article = document.createElement("article");

    // Fill in styles and root element
    styles.innerHTML = `
        /** CREATE RECIPE SECTION **/

        .input-card {
            overflow-wrap: break-word
        }

        #create-recipe--input-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
            padding-right: 50px;
            width: 85%;
            margin: auto;
            margin-top: 35px;
            margin-bottom: 50px;
          }
          .input-wrapper--column {
            width: 80%;
            margin: 0px auto;
          }
        
        /* Cards for all inputs */
        
        .input-card:not(#img-card) {
            margin-top: 5%;
            /*background-color: #f6f6f6;*/
            border-radius: 12px;
            font-size: 1.8vw;
            padding: 5%;
            box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.2);
            
        }
        
        /* Favorites icon */
        #create-recipe--input-wrapper > .favorite{
            position: absolute;
            margin-top: 2vh;
            right: 2%;
            height: 4vw;
            width: 4vw;
        }

        /* Card for display image */
        
        #img-card {
            margin-top: 20px;
            /*background-color: #f6f6f6;*/
            border-radius: 12px;
            box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.2);
            padding: 10%;
        }
        
        #display-image {
            width: 100%;
            margin: auto;
        }

        #nutrition-facts {
            margin: auto;
            width: 250px;
        }
        
        /* Card for ingredients */
        
        #ing-card {
            height: 100%;
            width: 100%%;
        }
        
        /* Card for steps */
        
        #step-card {
            background-color: transparent;
            box-shadow: none;
        }

        .card-label {
            font-family: var(--header-font);
            font-size: 24px;
            font-weight: 600;
          }
          
          .nut-info-label {
            font-family: var(--body-font);
            font-size: 18px;
            font-weight: 700;
          }
          
          .time-label {
            font-family: var(--body-font);
            font-size: 16px;
            font-weight: 700;
          }

        p {
            margin-bottom: 0;
            font-family: var(--body-font);
            font-size: 17px;
            font-weight: 400;
        }
        
        p.text:not(#input-name) {
            -webkit-transition: 0.5s;
            transition: 0.5s;
            outline: none;
            border-radius: 5px;
            font-size: 3vw;
        }  

        #input-name {
            font-family: var(--header-font);
            font-size: 48px;
            font-weight: 700;
        }

        ol, ul {
            margin-top: 10px;
            padding-left: 2vw;
            font-size: 20px;
        }

        ol li:not(:first-child) {
            margin-top: 15px;
        }

        ol li::marker {
            padding-right: 5px;
        }
        
        ul li:not(:first-child) {
            margin-top: 8px;
        }
        
        @media screen and (min-width: 800px) {
            #input-name {
                font-size: 40px;
            }
            .input-card:not(#img-card) {
                font-size: 20px;
            }
            p.text:not(#input-name) {
                font-size: 15px;
            }
        }

        @media screen and (max-width: 800px) {
            #create-recipe--input-wrapper {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .input-card {
                width: 120%;
            }
            #input-name {
                font-size: 7vw;
            }
            ol, ul {
                font-size: 3vw;
            }
            #create-recipe--input-wrapper > .favorite{
                right: 1%;
                top: 23%;
                height: 7vw;
                width: 7vw;
            }
        }

        @media screen and (max-width: 425px) {
            #create-recipe--input-wrapper > .favorite{
                right: 1%;
                top: 30%;
                height: 10vw;
                width: 10vw;
            }
        }
    `;
    article.innerHTML = `
    <div id="create-recipe--input-wrapper">
    <!-- FIRST COLUMN -->
    <div class="input-wrapper--column">
        <div class="input-card" id="img-card">
            <img id="display-image"
            src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" />  
        </div>

        <!-- Name -->
        <div class="input-card">
            <p class="text" id="input-name"></p>
        </div>

        <!-- Description -->
        <div class="input-card">
            <label for="input-desc" class="card-label">Description</label><br>
            <p class="text" id="input-desc"></p>
        </div>

        <!-- Nutrition -->
        <div class= "input-card">
            <label for="nutrition-facts" class="card-label">Nutrition Information</label><br>
            <label for="input-calories" class="nut-info-label">Calories</label>
            <p id="input-calories"></p><br>
            <label for="input-carbs" class="nut-info-label">Carbohydrates(g)</label>
            <p id="input-carbs"></p><br>
            <label for="input-fat" class="nut-info-label">Fat(g)</label>
            <p id="input-fat"></p><br>
            <label for="input-protein" class="nut-info-label">Protein(g)</label>
            <p id="input-protein"></p>
        </div>

        <!-- Time -->
        <div class="input-card">
            <label for="input-time" class="card-label">Time</label><br>
            <div id="time-inputs">
                <p class="input-hours-mins" id="input-hours">
            </div>
        </div>

        <!-- Tags -->
        <div class="input-card">
            <div id="tag-wrapper">
                <label for="input-tags" class="card-label">Tags</label><br>
                <p class="text" id="input-tags1" class="tags"></p>
            </div>
            <br>
        </div>
    </div>

    <!-- SECOND COLUMN -->
    <div class="input-wrapper--column">
        <!-- Ingredients -->
        <div class="input-card" id="ing-card">
            <div id="ing-wrapper">
            <label class="card-label">Ingredients</label><br>
                <p id="ing-none"></p>
                <ul id="ing-list"></ul>
            </div>
            <br>
        </div>
    </div>

    <!-- THIRD COLUMN -->
    <div class="input-wrapper--column">
        <div class="input-card" id="step-card">
            <div id="step-wrapper">
            <label class="card-label">Steps</label><br>
                <p id="step-none"></p>
                <ol id="step-list"></ol>
            </div>
            <br><br>
        </div>
    </div>
</div>
    `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);
  }

  /**
   * @method data 
   *  Sets the data for the recipe that will be put inside the <recipe-expand> element.
   *  Overwrites the previously expanded recipe.
   * 
   * @param {JSON} data - JSON data
   */
  set data (data) {
    this.json = data;
    const returnBut = document.getElementById("return-btn");
    if(data.saveFrom==="Explore"){
        returnBut.classList.add("explore");
    }

    this.shadowRoot.querySelector("article").innerHTML = `
    <div id="create-recipe--input-wrapper">
        <!-- FIRST COLUMN -->
        <div class="input-wrapper--column">
            <div class="input-card" id="img-card">
                <img id="display-image"
                src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" />  
            </div>

            <!-- Name -->
            <div class="input-card">
                <p class="text" id="input-name"></p>
            </div>

            <!-- Description -->
            <div class="input-card">
                <label for="input-desc" class="card-label">Description</label><br>
                <p class="text" id="input-desc"></p>
            </div>

            <!-- Nutrition -->
            <div class= "input-card">
                <label for="nutrition-facts" class="card-label">Nutrition Information</label><br>
                <label for="input-calories" class="nut-info-label">Calories</label>
                <p id="input-calories"></p><br>
                <label for="input-carbs" class="nut-info-label">Carbohydrates(g)</label>
                <p id="input-carbs"></p><br>
                <label for="input-fat" class="nut-info-label">Fat(g)</label>
                <p id="input-fat"></p><br>
                <label for="input-protein" class="nut-info-label">Protein(g)</label>
                <p id="input-protein"></p>
            </div>

            <!-- Time -->
            <div class="input-card">
                <label for="input-time" class="card-label">Time</label><br>
                <div id="time-inputs">
                    <p class="text" id="input-hours">
                </div>
            </div>

            <!-- Tags -->
            <div class="input-card">
                <div id="tag-wrapper">
                    <label for="input-tags" class="card-label">Tags</label><br>
                    <p class="text" id="input-tags1" class="tags"></p>
                </div>
                <br>
            </div>
        </div>

        <!-- SECOND COLUMN -->
        <div class="input-wrapper--column">
            <!-- Ingredients -->
            <div class="input-card" id="ing-card">
                <div id="ing-wrapper">
                <label class="card-label">Ingredients</label><br>
                    <p id="ing-none"></p>
                    <ul id="ing-list"></ul>
                </div>
                <br>
            </div>
        </div>

        <!-- THIRD COLUMN -->
        <div class="input-wrapper--column">
            <div class="input-card" id="step-card">
                <div id="step-wrapper">
                <label class="card-label">Steps</label><br>
                    <p id="step-none"></p>
                    <ol id="step-list"></ol>
                </div>
                <br><br>
            </div>
        </div>
    </div>
    `;

    // Set title
    this.shadowRoot.querySelector("p.text").innerHTML = data.name;

    // Set image
    const image = this.shadowRoot.getElementById("display-image");
    image.setAttribute("src", data.thumbnail);

    // Set Favorite
    const expandView = this.shadowRoot.getElementById("create-recipe--input-wrapper");
    let storage = JSON.parse(localStorage.getItem(data.name.toLowerCase()));
    let love;
    let favoriteIcon;
    let favOnExpand;

    if(storage != null){
    //this should never be created if there is no favorite to add
        favOnExpand = document.createElement("input");
        favOnExpand.type = "image";
        favOnExpand.classList.add("favorite");

        love = storage.favorites;
    
        //again this should never be set if we don't know if it actually exists.
        favoriteIcon = love == 1 ? "assets/images/heart.png" : "assets/images/empty_heart.png";
        favOnExpand.setAttribute("src", favoriteIcon);
        expandView.appendChild(favOnExpand);
        favOnExpand.addEventListener("click", changeHeart);
    }    
    
    function changeHeart(){
      let storage = JSON.parse(localStorage.getItem(data.name.toLowerCase()));
      let imageOnCard = document.getElementById(data.name);
      const img = imageOnCard.shadowRoot.getElementById("favoriteOnCard");

      if(!love){
        favOnExpand.setAttribute("src", "assets/images/heart.png");
        img.setAttribute("src", "assets/images/heart.png");
        storage.favorites = 1;
        love = true;
      }
      else{
        favOnExpand.setAttribute("src", "assets/images/empty_heart.png");
        img.setAttribute("src", "assets/images/empty_heart.png");
        storage.favorites = 0;
        love = false;
      }
      localStorage.setItem(data.name.toLowerCase(), JSON.stringify(storage));
    }

    // Set description
    if (!data.description) {
        this.shadowRoot.getElementById("input-desc").innerHTML = "None";
    }
    else {
        this.shadowRoot.getElementById("input-desc").innerHTML = data.description;
    }

    // Calories
    if (!data.nutritionInfo.calories || data.nutritionInfo.calories < 0 ) {
        this.shadowRoot.getElementById("input-calories").innerHTML = "None";
    }
    else {
        this.shadowRoot.getElementById("input-calories").innerHTML = data.nutritionInfo.calories;
    }

    // Carbs
    if (!data.nutritionInfo.carbs || data.nutritionInfo.carbs < 0) {
        this.shadowRoot.getElementById("input-carbs").innerHTML = "None";
    }
    else {
        this.shadowRoot.getElementById("input-carbs").innerHTML = data.nutritionInfo.carbs;
    }

    // Fat
    if (!data.nutritionInfo.fat || data.nutritionInfo.fat < 0) {
        this.shadowRoot.getElementById("input-fat").innerHTML = "None";
    }
    else {
        this.shadowRoot.getElementById("input-fat").innerHTML = data.nutritionInfo.fat;
    }

    // Protein
    if (!data.nutritionInfo.protein || data.nutritionInfo.protein < 0) {
        this.shadowRoot.getElementById("input-protein").innerHTML = "None";
    }
    else {
        this.shadowRoot.getElementById("input-protein").innerHTML = data.nutritionInfo.protein;
    }

    // Set tags
    let tags = data.tags;
    if (tags.length === 0) {
        tags.push("None");
    }
    else {
        tags = tags.join(", ");
    }
    this.shadowRoot.getElementById("input-tags1").innerHTML = tags;

    // Detect if time or minute needs to be plural or not
    let time = "";
    if (!data.time.hours && !data.time.minutes) {
        time += `None`;
    } else {
        // Hours
        if (data.time.hours === "1") {
            time += `${data.time.hours} hour `;
        } else if (!data.time.hours) {

        } else {
            time += `${data.time.hours} hours `;
        }
        // Minutes
        if (data.time.minutes === "1") {
            time += `${data.time.minutes} minute`;
        } else if (!data.time.minutes) {

        } else {
            time += `${data.time.minutes} minutes`;
        }
    }

    // Set time
    this.shadowRoot.getElementById("input-hours").innerHTML = time;

    // Set ingredients
    const ingredients = data.ingredients;
    if (ingredients.length === 0) {
        this.shadowRoot.getElementById("ing-none").innerHTML = "None";
    } else {
        ingredients.forEach(ingredient => {
            const item = document.createElement("li");
            item.innerHTML = ingredient;
            this.shadowRoot.getElementById("ing-list").append(item);
        });
    }
    
    // Set directions
    const directions = data.directions;
    if (directions.length === 0) {
        this.shadowRoot.getElementById("step-none").innerHTML = "None";
    } else {
        directions.forEach(step => {
            const item = document.createElement("li");
            item.innerHTML = step;
            this.shadowRoot.getElementById("step-list").append(item);
        });
    }
  }
}

customElements.define("recipe-expand", ExpandRecipe);
