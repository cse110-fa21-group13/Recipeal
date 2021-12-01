class RecipeCard extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement
    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    let shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
    `;
  }

  set data(data) {
    // if (!data) return;
    this.id = `${data.name}`;
    const styles = document.createElement("style");
    styles.innerHTML = `
      article {
        display: flexbox;
        position: relative;
        font-family: 'Work Sans', sans-serif;
        width: 300px;
        height: 325px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        border-radius: 16px;
        transition: all ease-out 0.3s;
      }

      article:hover {
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
        cursor: pointer;
      }

      .image-box {
        width: 298px;
        height: 200px;
      }

      .image-box > .favoriteOnCard{
        position: relative;
        width: 35px;
        height: 20px;
        left: 260px;
        bottom: 185px;
        z-index: 1;
      }

      .image-box img, .image-box h1{
          margin: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px 16px 0 0;
      }

      .image-box h1 {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 7px;
      }

      .image-box .card-title {
          position: absolute;
          margin: 0;
          top: 120px;
          font-size: 16px;
          font-weight: bolder;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.7);
      }
      
      .card-title {
        word-break: break-all;
        width: 100%;
        height: 25%;
        overflow: hidden !important;
        text-overflow: ellipsis;
      }

      .textbox {
          border-top: solid 4px #FFC148;
          height: 118px;
          position: relative;
          vertical-align: middle;
          overflow: hidden !important;
          text-overflow: ellipsis;
      }

      .textbox p{
          position: absolute;
          top: 30px;
          transform: translateY(-10%);
          font-size: 14px;
          margin: 0;
          padding: 12px 9px;
      }

      .textbox time {
        position: absolute;
        font-size: 14px;
        margin: 0;
        padding: 5px 9px; 
        color: #70757A;
      }

      .hidden {
        display: none;
      }

      .delete-modal {
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4); 
      }

      .delete-modal-content {
        margin: 15% auto; 
        padding: 20px;
      }
    `;

    const modal = document.createElement("div");
    modal.className = `${data.name} hidden delete-modal`;
    modal.innerHTML = `<div class="card delete-modal-content" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Are you sure you want to delete this recipe?</h5>
      <button id="modal-close${data.name}" class="btn btn-secondary">Close</button>
      <button id="modal-delete${data.name}" class="btn btn-primary ${data.name}">Delete</button>
    </div>
  </div>`;
    this.shadowRoot.appendChild(modal);
    const closeBut = this.shadowRoot.getElementById(`modal-close${data.name}`);
    const delBut = this.shadowRoot.getElementById(`modal-delete${data.name}`);
    closeBut.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
    delBut.addEventListener("click", (event) => {
      const curCardId = this.id;
      this.parentNode.removeChild(this);
      localStorage.removeItem(curCardId.toLowerCase());
      modal.classList.add("hidden");
    });

    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("style", "border-radius: 16px;");
    const deleteBut = document.createElement("button");
    deleteBut.className = `delbut hidden btn-primary`;
    deleteBut.setAttribute(
      "style",
      "position: absolute; top: 0; left:0; padding: 2px 6px"
    );
    deleteBut.innerHTML = "<i class='bi bi-x'></i>";
    deleteBut.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
    const imageBox = document.createElement("div");
    imageBox.setAttribute("class", "image-box");
    const image = document.createElement("img");
    image.setAttribute("src", data.thumbnail);
    
    //favorite

    let storage = JSON.parse(localStorage.getItem(data.name));
    let favoriteImage;
    let love;
    if(storage != null){
      favoriteImage = document.createElement("input");
      favoriteImage.type = 'image';
      favoriteImage.classList.add("favoriteOnCard");
      favoriteImage.classList.add("mouse-off");
      favoriteImage.id = "favoriteOnCard";

      if(storage.favorites == 0) favoriteImage.setAttribute("src", "assets/images/empty_heart.png");
      else favoriteImage.setAttribute("src", "assets/images/heart.png");
   
      favoriteImage.addEventListener('click', changeHeart);

      favoriteImage.addEventListener("mouseenter", () =>{
        favoriteImage.classList.replace("mouse-off", "mouse-on");
      })
      favoriteImage.addEventListener("mouseleave", () =>{
        favoriteImage.classList.replace("mouse-on", "mouse-off");
      })
      love = false;
    }
    
    function changeHeart(){
      if(!love){
        console.log('testing');
        favoriteImage.setAttribute("src", "assets/images/heart.png");
        storage.favorites = 1;
        love = true;
      }
      else{
        favoriteImage.setAttribute("src", "assets/images/empty_heart.png");
        storage.favorites = 0;
        love = false;
      }
      localStorage.setItem(data.name, JSON.stringify(storage));
    }
  
    const cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title");
    const title = document.createElement("h1");

    title.textContent =
      data.name.length > 34 ? data.name.substring(0, 31) + "..." : data.name;
    
    title.style = "font-family: 'Ubuntu Mono', monospace; font-size: 30px";
    cardTitle.appendChild(title);
    imageBox.appendChild(image);
    if(storage != null) imageBox.appendChild(favoriteImage);
    imageBox.appendChild(cardTitle);

    const desBox = document.createElement("div");
    desBox.setAttribute("class", "textbox");
    const description = document.createElement("p");
    description.textContent = data.description;
    desBox.appendChild(description);

    const time = document.createElement("time");

    // Hours
    if (data.time.hours === "") {
      time.textContent += `${data.time.hours}`;
    } else if (data.time.hours === "1") {
      time.textContent += `${data.time.hours} hour `;
    } else {
      time.textContent += `${data.time.hours} hours `;
    }

    // Minutes
    if (data.time.minutes === "") {
      time.textContent += `${data.time.minutes}`;
    } else if (data.time.minutes === "1") {
      time.textContent += `${data.time.minutes} minute`;
    } else {
      time.textContent += `${data.time.minutes} minutes`;
    }

    if (data.time.minutes != "" || data.time.hours != "") {
      desBox.appendChild(time);
    }

    card.appendChild(deleteBut);
    card.appendChild(imageBox);
    card.appendChild(desBox);

    this.shadowRoot.append(styles, card);
  }
}
customElements.define("recipe-card", RecipeCard);
