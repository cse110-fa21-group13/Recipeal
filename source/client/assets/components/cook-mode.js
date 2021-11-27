import { changeView } from "../scripts/navigate.js";

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
            display: flex;
            flex-direction: row;
            justify-content: start;
            gap: 10px;
        }
        
        /* Cards for all inputs */
        
        .input-card {
            overflow-wrap: break-word;
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
            height: 100vh;
            width: 500px;
        }
        
        /* Card for steps */
        
        #step-card {
            height: 98%;
            width: 100vh;
            background-color: transparent;
            box-shadow: none;
            margin-top: 40px;
        }
        
        p.text {
            -webkit-transition: 0.5s;
            transition: 0.5s;
            outline: none;
            border-radius: 5px;
            font-size: 15px;
        }  

        #ing-label {
            font-size: 35px;
            margin-top: 50px;
        }

        ul {
            margin-top: 10px;
        }
        
        ul li {
        padding-left: 2px;
        }

        ul li:not(:first-child) {
        margin-top: 8px;
        }

        button.back-btn {
            position: absolute;
            display: block;
            margin: 0px auto;
            width: 100px;
            height: 50px;
            cursor: pointer;
            border: none;
            border-radius: 20px;
            box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.18);
            transition: 0.2s;
            outline: none;
        }

        #time-inputs {
            top: 20px;
            right: 20px;
            height: 50px;
            border: 1px solid #000;
        }

        .input-hrs-mins {
            width: 40px;
            height: 45px;
            display: inline-block;  
        }

        input[type="text"] {
            -webkit-transition: 0.5s;
            transition: 0.5s;
            outline: none;
            border: none;
            font-size: 30px;
            text-align: right;
        }

        .semicolon {
            display: inline-block;
            font-size: 30px;
        }
        `;
        article.innerHTML = `
        <div id="cook-mode--input-wrapper">
            <!-- SECOND COLUMN -->
            <div class="input-wrapper--column">
                <!-- Ingredients -->
                <div class="input-card" id="ing-card">
                    <div id="ing-wrapper">
                        <label id="ing-label">Ingredients</label><br>
                        <p id="ing-none"></p>
                        <ul id="ing-list"></ul>
                    </div>
                    <br>
                </div>
            </div>

            <!-- THIRD COLUMN -->
            <div class="input-wrapper--column">
                <button class="back-btn btn btn-light">
                    <i class="bi bi-arrow-return-left"></i> Return
                </button>
                <div class="input-card" id="step-card">
                    <div id="step-wrapper">
                        <p id="step-none"></p>
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
                        <label id="ing-label">Ingredients</label><br>
                        <p id="ing-none"></p>
                        <ul id="ing-list"></ul>
                    </div>
                    <br>
                </div>
            </div>

            <!-- THIRD COLUMN -->
            <div class="input-wrapper--column">
                <button class="back-btn btn btn-light">
                    <i class="bi bi-arrow-return-left"></i> Return
                </button>
                <div class="input-card" id="step-card">
                    <div id="step-wrapper">
                        <p id="step-none"></p>
                    </div>
                    <br><br>
                </div>
            </div>
            <div id="time-inputs">
                <input type="text" class="input-hrs-mins" id="input-hrs" maxlength = "2" value="00">h
                <p class="semicolon">:</p>
                <input type="text" class="input-hrs-mins" id="input-minutes" maxlength = "2" value="00">m 
                <p class="semicolon">:</p>
                <input type="text" class="input-hrs-mins" id="input-seconds" maxlength = "2" value="00">s
            </div>
            <button id="timer-btn" class="btn btn-light" style="top: 20px; right: 225px; position: absolute; border-radius: 20px;">
                <i id="timer-icon" class="bi bi-play"></i>
            </button>
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
        console.log(directions);
        if (directions.length === 0) {
            this.shadowRoot.getElementById("step-none").innerHTML = "None";
        } else {
            for(let i = 0; i < directions.length; i++) {
                this.shadowRoot.getElementById("step-wrapper").innerHTML += 
                `<div class="input-card-steps" id=card-step${String(i + 1)}>
                    <p id="input-steps${String(i + 1)}"  class="steps">${String(i + 1)+'. '+directions[i]}</p>
                </div>`;
            }
        }
        this.shadowRoot.querySelector(".back-btn").addEventListener("click", () => {
            changeView("Recipe Expand");
        });
        let timerIcon = this.shadowRoot.getElementById("timer-icon");
        let seconds = this.shadowRoot.getElementById("input-seconds");
        let minutes = this.shadowRoot.getElementById("input-minutes");
        this.shadowRoot.getElementById("timer-btn").addEventListener("click", () => {
            if(timerIcon.className == "bi bi-play") {
                timerIcon.className = "bi bi-pause";
                timer(this.shadowRoot);
            } else {
                timerIcon.className = "bi bi-play";
            }
        });
    }
}

function timer(shadowRoot) {
    setInterval(() => {
        let hVal = parseInt(shadowRoot.getElementById("input-hrs").value, 0);
        let mVal = parseInt(shadowRoot.getElementById("input-minutes").value, 0);
        let sVal = parseInt(shadowRoot.getElementById("input-seconds").value, 0);

        let current = ((hVal * 3600) + (mVal * 60) + sVal);  //the current time left in seconds
        if (current > 0) {
            current = current - 1;
            shadowRoot.getElementById("input-hrs").value = parseInt((current / 3600) % 24, 10);
            shadowRoot.getElementById("input-minutes").value = parseInt((current / 60) % 60, 10);
            shadowRoot.getElementById("input-seconds").value = parseInt(current % 60, 10);
            //take one second away, and rerender the seconds split into d, h, m, and s in the html, which you will reuse next time timer() runs
        } else {
            hours = "";
            minutes = "";
            seconds = "";
        }
    }, 1000);
}

customElements.define('cook-mode', CookMode);