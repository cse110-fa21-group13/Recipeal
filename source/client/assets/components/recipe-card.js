class RecipeCard extends HTMLElement {
  constructor () {
    super(); // Inheret everything from HTMLElement
    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`;
  }

  set data (data) {
    // if (!data) return;
    const styles = document.createElement('style');
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
        width: 300px;
        height: 200px;
      }

      .image-box img, .image-box h1{
          margin: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px 16px 0 0;
      }

      .image-box h1 {
          width: auto;
          padding: 0px 9px;
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

      .textbox {
          border-top: solid 4px #FFC148;
          height: 80px;
          position: relative;
          vertical-align: middle;
          overflow: hidden;
      }

      .textbox p{
          position: absolute;
          top: 30px;
          transform: translateY(-50%);
          font-size: 16px;
          margin: 0;
          padding: 12px 9px;
      }
    `;

    const card = document.createElement('article');
    card.className = 'card';

    const imageBox = document.createElement('div');
    imageBox.setAttribute('class', 'image-box');
    const image = document.createElement('img');
    image.setAttribute('src', data.thumbnail);
    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');
    const title = document.createElement('h1');
    title.textContent = data.name;
    cardTitle.appendChild(title);
    imageBox.appendChild(image);
    imageBox.appendChild(cardTitle);

    const desBox = document.createElement('div');
    desBox.setAttribute('class', 'textbox');
    const description = document.createElement('p');
    description.textContent = data.description;
    desBox.appendChild(description);

    const time = document.createElement('time');

    // Hours
    if (data.time.hours === '1') {
      time.textContent += `${data.time.hours} hour `;
    } else {
      time.textContent += `${data.time.hours} hours `;
    }

    // Minutes
    if (data.time.minutes === '1') {
      time.textContent += `${data.time.minutes} minute`;
    } else {
      time.textContent += `${data.time.minutes} minutes`;
    }


    card.appendChild(imageBox);
    card.appendChild(desBox);
    //card.appendChild(time);

    this.shadowRoot.append(styles, card);
  }
}
customElements.define('recipe-card', RecipeCard);
