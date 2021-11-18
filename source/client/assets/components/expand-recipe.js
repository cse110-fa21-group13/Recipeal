class ExpandRecipe extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />`;

    // Create styles and root element
    const styles = document.createElement('style');
    const article = document.createElement('article');

    // Fill in styles and root element
    styles.innerHTML = `
        /** CREATE RECIPE SECTION **/

        #create-recipe--input-wrapper {
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
        }
        
        /* Cards for all inputs */
        
        .input-card:not(#img-card) {
            margin-top: 20px;
            background-color: #f6f6f6;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 4px 5px 10px 1px rgba(0, 0, 0, 0.2);
        }
        
        /* Input card for ings */
        
        .input-card-ings {
            margin-top: 20px;
        }
        
        /* Input card for steps */
        
        .input-card-steps {
            background-color: #f6f6f6;
            border-radius: 20px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 4px 5px 10px 1px rgba(0, 0, 0, 0.2);
        }
        
        /* Card for display image */
        
        #img-card {
            margin-top: 20px;
            background-color: #f6f6f6;
            border-radius: 20px;
            box-shadow: 4px 5px 10px 1px rgba(0, 0, 0, 0.2);
            padding: 50px;
        }
        
        #display-image {
            height: 170px;
            margin: auto;
            left: 200px;
            top: 128px;
        }
        
        /* Card for ingredients */
        
        #ing-card {
            height: 98%;
            width: 500px;
        }
        
        /* Card for steps */
        
        #step-card {
            height: 98%;
            width: 500px;
            background-color: transparent;
            box-shadow: none;
        }
        
        p.text {
            -webkit-transition: 0.5s;
            transition: 0.5s;
            outline: none;
            border-radius: 5px;
            font-size: 15px;
            padding: 10px;
        }  

        ol, ul {
            margin-top: 10px;
        }

        ol li:not(:first-child) {
            margin-top: 15px;
        }

        ol li::marker {
        padding-right: 5px;
        }
        
        ul li {
        padding-left: 2px;
        }

        ul li:not(:first-child) {
        margin-top: 8px;
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
                <p class="text" id="input-desc"></p>
            </div>

            <!-- Time -->
            <div class="input-card">
                <label for="input-time">Time</label><br>
                <div id="time-inputs">
                    <p class="input-hours-mins" id="input-hours">
                </div>
            </div>

            <!-- Tags -->
            <div class="input-card">
                <div id="tag-wrapper">
                    <label for="input-tags">Tags</label><br>
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
                    <label>Ingredients</label><br><br>
                    <ul id="ing-list"></ul>
                </div>
                <br>
            </div>
        </div>

        <!-- THIRD COLUMN -->
        <div class="input-wrapper--column">
            <div class="input-card" id="step-card">
                <div id="step-wrapper">
                    <label>Steps</label><br>
                    <ol id="step-list"></ol>
                </div>
                <br><br>
            </div>
        </div>
    </div>
    <button id="edit-btn" class="btn btn-primary"
        style="bottom: 10px; right: 10px; position: fixed">
            <i class="bi bi-pencil-square"></i>
    </button>      
    `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);
  }

  /**
   * Sets the data for the recipe that will be put inside the <recipe-expand> element.
   * Overwrites the previously expanded recipe.
   */
  set data (data) {
    this.json = data;

    this.shadowRoot.querySelector('article').innerHTML = `
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
                <p class="text" id="input-desc"></p>
            </div>

            <!-- Time -->
            <div class="input-card">
                <label for="input-time">Time</label><br>
                <div id="time-inputs">
                    <p class="input-hours-mins" id="input-hours">
                </div>
            </div>

            <!-- Tags -->
            <div class="input-card">
                <div id="tag-wrapper">
                    <label for="input-tags">Tags</label><br>
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
                    <label>Ingredients</label><br><br>
                    <ul id="ing-list"></ul>
                </div>
                <br>
            </div>
        </div>

        <!-- THIRD COLUMN -->
        <div class="input-wrapper--column">
            <div class="input-card" id="step-card">
                <div id="step-wrapper">
                    <label>Steps</label><br>
                    <ol id="step-list"></ol>
                </div>
                <br><br>
            </div>
        </div>
    </div>
    <button id="edit-btn" class="btn btn-primary"
        style="bottom: 10px; right: 10px; position: fixed">
            <i class="bi bi-pencil-square"></i>
    </button>
    `;

    // Set title
    this.shadowRoot.querySelector('p.text').innerHTML = data.name;

    // Set image
    const image = this.shadowRoot.getElementById('display-image');
    image.setAttribute('src', data.thumbnail);

    // Set description
    this.shadowRoot.getElementById('input-desc').innerHTML = data.description;

    // Set tags
    const tags = data.tags.join(', ');
    this.shadowRoot.getElementById('input-tags1').innerHTML = tags;

    // Detect if time or minute needs to be plural or not
    let time = '';
    if (data.time.hours === '1') {
      time += `${data.time.hours} hour `;
    } else {
      time += `${data.time.hours} hours `;
    }

    // Minutes
    if (data.time.minutes === '1') {
      time += `${data.time.minutes} minute`;
    } else {
      time += `${data.time.minutes} minutes`;
    }
    // Set time
    this.shadowRoot.querySelector('p.input-hours-mins').innerHTML = time;

    // Set ingredients
    const ingredients = data.ingredients;
    ingredients.forEach(ingredient => {
      const item = document.createElement('li');
      item.innerHTML = ingredient;
      this.shadowRoot.getElementById("ing-list").append(item);
    })
    
    // Set directions
    const directions = data.directions;
    directions.forEach(step => {
      const item = document.createElement('li');
      item.innerHTML = step;
      this.shadowRoot.getElementById("step-list").append(item);
    })
    
  }
}

customElements.define('recipe-expand', ExpandRecipe);
