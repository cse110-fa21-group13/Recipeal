import { changeView } from "../scripts/navigate.js";

class CookMode extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = `
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />`;

        // Create styles and root element
        const styles = document.createElement("style");
        const article = document.createElement("article");

        // Fill in styles and root element
        styles.innerHTML = `
        #cook-mode--input-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
        }
        
        /* Cards for all inputs */
        
        .input-card {
            overflow-wrap: break-word;
            background-color: rgba(229,242,216,255);
            border-radius: 20px;
            box-shadow: 4px 5px 10px 1px rgba(0, 0, 0, 0.2);
        }
        
        /* Input card for steps */
        
        .input-card-steps {
            background-color: rgba(229,242,216,255);
            border-radius: 20px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 4px 5px 10px 1px rgba(0, 0, 0, 0.2);
        }
        
        /* Card for ingredients */
        
        #ing-card {
            height: 100%;
            width: 30vw;
            margin: 2vw;
            padding-right: 1vw;
        }

        #ing-wrapper {
            text-align:center;
        }
        
        /* Card for steps */
        
        #step-card {
            height: 98%;
            width: 50vw;
            background-color: transparent;
            box-shadow: none;
            margin-top: 13vw;
        }

        .steps {
            font-size: 2.6vw;
            margin-bottom: 0;
        }
        
        p.text {
            -webkit-transition: 0.5s;
            transition: 0.5s;
            outline: none;
            border-radius: 5px;
            font-size: 3vw;
        }  

        #ing-label {
            font-family: var(--header-font);
            font-size: 24px;
            font-weight: 600;
            margin-top: 2vw;
            /*font-size: 3vw;*/
        }

        #step-label {
            font-family: var(--header-font);
            font-size: 24px;
            font-weight: 600;
            margin-top: 2vw;
            /*font-size: 3vw;*/
        }

        ul {
            margin-top: 10px;
            padding-left: 15%;
            text-align: left;
            display: flex;
            flex-direction: column;
        }
        
        ul li {
            float: left;
            font-size: 2.25vw;
            padding-left: 5px;
        }

        ul li:not(:first-child) {
            margin-top: 10px;
        }

        button.back-btn {
            position: absolute;
            border-radius: 20px;
            background-color: transparent;
            border: none;
            margin-top: 15px;
            left: 2%;
            font-size: 2vw;
            cursor: pointer;
        }

        button.back-btn:hover {
            background-color: transparent;
        }

        .back-btn:focus {
            outline: none;
          }

        #timer-wrapper {
            position: fixed;
            align-items: center;
            top: 0px;
            right: 10px;
        }

        #time-inputs {
            position: absolute;
            margin-top: 10px;
            border-radius: 20px;
            right: 10px;
            width: 200px;
            height: 50px;
            border: 2px solid #000;
            background: #fff;
        }

        .input-hrs-mins {
            border-radius: 20px;
            width: 22%;
            height: 100%;
            display: inline-block;
            background-color: transparent;  
        }

        input[type="text"] {
            outline: none;
            border: none;
            font-size: 30px;
            text-align: right;
        }

        .semicolon {
            display: inline-block;
            font-size: 30px;
        }

        #timer-btn {
            background-color: white;
            border: 2px solid #000;
            font-size: 25px;
            margin-top: 10px; 
            right: 211px; 
            position: absolute; 
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }

        #timer-btn:focus {
            outline: black;
        }

        .tts-btn {
            width: 45px;
            height: 25px;
            outline: transparent;
            border: none;
            background-color: transparent;
            float: right;
        }
        .tts-btn:focus {
            outline: transparent;
        }
        #tts-icon {
            width: 100%;
        }

        @media screen and (min-width: 800px) {
            button.back-btn {
                width: 100px;
                font-size: inherit;
            }
            #ing-label {
                font-size: 35px;
            }
            #step-card {
                margin-top: 35px;
            }
            .steps {
                font-size: 25px;
            }
            ul li {
                font-size: 20px;
            }
        }

        @media screen and (max-width: 800px) {
            ul li {
                font-size: 3vw;
            }
            #step-label, #ing-label {
                font-size: 4vw;
            }
            .steps {
                font-size: 3.5vw;
            }
            button.back-btn {
                left: 43%;
            }
            #arrow-left {
                width: 4vw;
            }
        }

        @media screen and (max-width: 420px) {
            #cook-mode--input-wrapper {
                flex-direction: column;
                align-items: center;
            }

            #ing-card {
                width: 80vw;
                margin-top: 70px;
            }

            ul li {
                font-size: 4.25vw;
            }

            #step-card {
                width: 80vw;
                margin-top: 0px;
            }

            #timer-wrapper {
                position: fixed;
                bottom: 50px;
                right: 0px;
                width: 50px;
            }

            #timer-btn {
                bottom: -40px
            }

            #time-inputs {
                bottom: -40px;
            }

            button.back-btn {
                top: 10px;
                font-size: 4vw;
                left: 10px;
            }

            #arrow-left {
                width: 7vw;
            }
            .tts-btn {
                width: 8vw;
                height: 4vw;
            }
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
                <button class="back-btn">
                <img src="assets/images/arrow-left.png" id="arrow-left"> <b>Return</b>
                </button>
                
                <div id="time-inputs">
                    <button id="timer-btn">
                        <i id="timer-icon" class="bi bi-play-fill"></i>
                    </button>
                    <div>
                    <input type="text" class="input-hrs-mins" id="input-hrs" maxlength = "2" value="0">h
                    <p class="semicolon">:</p>
                    <input type="text" class="input-hrs-mins" id="input-minutes" maxlength = "2" value="0">m 
                    <p class="semicolon">:</p>
                    <input type="text" class="input-hrs-mins" id="input-seconds" maxlength = "2" value="0">s
                    </div>
                </div>
                <div class="input-card" id="step-card">
                    <label id="step-label">Steps</label><br>
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

    /**
     * @method data
     *  Set's the content for the cook-mode page using the input data
     * 
     * @param {JSON} data - JSON data 
     */
    set data(data) {
        this.json = data;
        this.shadowRoot.querySelector("article").innerHTML = `
        <div id="cook-mode--input-wrapper">
            <button class="back-btn">
                <img src="assets/images/arrow-left.png" id="arrow-left"> <b>Return</b>
            </button>
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
                
                <div class="input-card" id="step-card">
                    <label id="step-label">Steps</label><br>
                    <div id="step-wrapper">
                        <p id="step-none"></p>
                    </div>
                    <br><br>
                </div>
            </div>
            <div id="timer-wrapper">
                <button id="timer-btn">
                        <i id="timer-icon" class="bi bi-play-fill"></i>
                </button>
                <div id="time-inputs">
                    <input type="text" class="input-hrs-mins" id="input-hrs" maxlength = "2" value="0">h
                    <p class="semicolon">:</p>
                    <input type="text" class="input-hrs-mins" id="input-minutes" maxlength = "2" value="0">m 
                    <p class="semicolon">:</p>
                    <input type="text" class="input-hrs-mins" id="input-seconds" maxlength = "2" value="0">s
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
            let synth = window.speechSynthesis;
            let utterText = new SpeechSynthesisUtterance();
            setVoice(false, this.shadowRoot);
            /**
             * @method setVoice
             *  Attaches a TTS button to each step card that, when clicked, will read out the
             *  text for that step.
             * 
             * @param {boolean} flag - Used to indicate when the TTS voice has been set
             * @param {*} shadowRoot - Allows the function to access the shadowRoot elements
             */
            function setVoice(flag, shadowRoot) {
                if(flag === false) {
                    setTimeout(() => {
                        let voices = synth.getVoices();
                        for(let i = 0; i < voices.length; i++) {
                            if(voices[i].name === "Google US English") {
                                utterText.voice = voices[i];
                            }
                        }
                        setVoice(true, shadowRoot);
                    }, 50);
                    return;
                } else {
                    for(let i = 0; i < directions.length; i++) {
                        shadowRoot.getElementById("step-wrapper").innerHTML += 
                        `<div class="input-card-steps" id=card-step${String(i + 1)}>
                            <button class="tts-btn" id="${String(i + 1)}" name="${directions[i]}">
                                <img src="./assets/images/tts.png" id="tts-icon">
                            </button>
                            <p id="input-steps${String(i + 1)}"  class="steps">${String(i + 1)+". "+directions[i]}</p>
                        </div>`;
                        setTimeout(() => {
                            shadowRoot.getElementById(`${String(i + 1)}`).addEventListener("click", () => {
                                utterText.text = shadowRoot.getElementById(`${String(i + 1)}`).name;
                                synth.speak(utterText);
                            });
                        }, 10);
                    }
                }
            }
        }

        // Set back button to navigate to expand recipe page
        this.shadowRoot.querySelector(".back-btn").addEventListener("click", () => {
            changeView("Recipe Expand");
        });

        // Timer
        let timerIcon = this.shadowRoot.getElementById("timer-icon");

        this.shadowRoot.getElementById("timer-btn").addEventListener("click", () => {
            if(timerIcon.className == "bi bi-play-fill") {
                timerIcon.className = "bi bi-pause";
                timer(this.shadowRoot, true);
            } else {
                timerIcon.className = "bi bi-play-fill";
                timer(this.shadowRoot, false);
            }
        });
    }
}

// Needed to declare this globally to be able to pause/play correctly
let interval = null;

/**
 * @method timer 
 *  Starts a countdown timer with user input. It does this by, for each interval, converting all 
 *  time fields to seconds, subtracting one, and then converting back into hours/minutes/seconds
 * 
 * @param {*} shadowRoot - Allows function to access shadowRoot elements
 * @param {boolean} flag - Flags whether the timer should be started or stopped
 */
function timer(shadowRoot, flag) {
    if(flag === false) {
        clearInterval(interval);
    }
    else {
        interval = setInterval(() => {
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
                shadowRoot.getElementById("input-hrs").value = "0";
                shadowRoot.getElementById("input-minutes").value = "0";
                shadowRoot.getElementById("input-seconds").value = "0";
                shadowRoot.getElementById("timer-icon").className = "bi bi-play-fill";
                clearInterval(interval);
            }
        }, 1000);
    }
}

customElements.define("cook-mode", CookMode);
