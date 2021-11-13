class RecipeCard extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    let shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    // if (!data) return;
    const styleElem = document.createElement('style');
    const styles = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }

      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }
      
      article > img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }

      p.card-description {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }

      p.card-title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p:not(.title), span, time {
        color: #70757A;
        font-size: 12px;
      }
    `;
    styleElem.innerHTML = styles;

    const card = document.createElement("article");
    card.className = "card";


    const image = document.createElement("img");
    image.setAttribute("class", "card-img-top");
    image.setAttribute("src", data.image);

    const title = document.createElement("p");
    title.setAttribute("class", "card-title");
    title.textContent = data.name;

    const description = document.createElement("p");
    description.setAttribute("class", "card-description");
    description.textContent = data.description;

    const time = document.createElement('time');
    time.textContent += data.time;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(time);

    this.shadowRoot.appendChild(card);
    this.shadowRoot.appendChild(styleElem);
  }
}
customElements.define("recipe-card", RecipeCard);
