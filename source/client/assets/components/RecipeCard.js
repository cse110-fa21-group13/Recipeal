class RecipeCard extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: "open" }).innerHTML = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">`;
  }

  set data(data) {
    if (!data) return;

    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("style", "width: 18rem;");

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.setAttribute("src", data.image);

    const h1 = document.createElement("h1");
    h1.setAttribute("className", "card-title");
    h1.textContent = data.title;

    const body = document.createElement("div");
    body.setAttribute("className", "card-body");

    const text = document.createElement("p");
    text.setAttribute("className", "card-text");
    text.innerHTML = data.description;

    body.appendChild(text);

    card.appendChild(image);
    card.appendChild(h1);
    card.appendChild(body);

    this.shadowRoot.append(card);
  }
}

customElements.define("recipe-card", RecipeCard);
