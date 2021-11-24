class CookMode extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />`;

        // Create styles and root element
        const styles = document.createElement('style');
        const article = document.createElement('article');

        // Fill in styles and root element
        styles.innerHTML = `
        #cook-mode--input-wrapper {
            margin-top: 30px;
            margin-bottom: 30px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
        }
        
        /* Cards for all inputs */
        
        .input-card {
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
        <div id="cook-mode--input-wrapper">
          <!-- SECOND COLUMN -->
          <div class="input-wrapper--column">
            <!-- Ingredients -->
            <div class="input-card" id="ing-card">
              <div id="ing-wrapper">
                <label>Ingredients</label><br><br>
                <label for="input-ings1">1.</label>
                <input type="text" id="input-ings1" class="ings" name="input-ings1">
              </div>

              <br>
            </div>
          </div>

          <!-- THIRD COLUMN -->
          <div class="input-wrapper--column">
            <div class="input-card" id="step-card">

              <div id="step-wrapper">
                <label>Steps</label><br>
                <div class="input-card-steps">
                  <label for="input-steps1">1.</label>
                  <input type="text" id="input-steps1" class="steps" name="input-steps1">
                </div>
              </div>
              <br><br>
            </div>

          </div>
        </div>
        `;
        this.shadowRoot.append(styles, article);
    }

    set data(data) {
        this.json = data;
        console.log(data);
        this.shadowRoot.querySelector("article").innerHTML = `
        <div id="cook-mode--input-wrapper">
          <!-- SECOND COLUMN -->
            <div class="input-wrapper--column">
                <!-- Ingredients -->
                <div class="input-card" id="ing-card">
                    <div id="ing-wrapper">
                        <label>Ingredients</label><br>
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
                        <label>Steps</label><br>
                        <p id="step-none"></p>
                        <ol id="step-list"></ol>
                    </div>
                    <br><br>
                </div>
            </div>
        </div> 
        `;
        // Set ingredients
        const ingredients = data.ingredients;
        if (ingredients.length === 0) {
            this.shadowRoot.getElementById("ing-none").innerHTML = "None";
        } else {
            ingredients.forEach(ingredient => {
                const item = document.createElement('li');
                item.innerHTML = ingredient;
                this.shadowRoot.getElementById("ing-list").append(item);
            })
        }
        
        // Set directions
        const directions = data.directions;
        if (directions.length === 0) {
            this.shadowRoot.getElementById("step-none").innerHTML = "None";
        } else {
            directions.forEach(step => {
                const item = document.createElement('li');
                item.innerHTML = step;
                this.shadowRoot.getElementById("step-list").append(item);
            })
        }
    }
}

customElements.define('cook-mode', CookMode);