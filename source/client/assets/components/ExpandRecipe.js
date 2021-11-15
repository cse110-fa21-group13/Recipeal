class ExpandRecipe extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // Create styles and root element
    const styles = document.createElement('style')
    const article = document.createElement('article')

    // Fill in styles and root element
    styles.innerHTML = `
            article {
                background-color: white;
                box-shadow: 0 0 10px rgb(0 0 0 / 15%);
                margin: 30px auto;
                max-width: 720px;
                padding: 25px;
                transition: all 0.2s ease;
                width: 80%;
            }

            div.rating--wrapper {
                align-items: center;
                column-gap: 5px;
                display: flex;
                justify-items: center;
                margin-top: 10px;
            }
            
            div.rating--wrapper > img {
                height: auto;
                display: inline-block;
                object-fit: scale-down;
                width: 78px;
            }

            header {
                align-items: flex-start;
                column-gap: 10px;
                display: grid;
                grid-template-areas:
                'title title img'
                'meta meta img'
                'desc desc img';
            }

            header p {
                margin: 0;
            }

            header > h1 {
                font-size: 2rem;
                font-weight: 500;
                grid-area: title;
                margin: -10px 0 0 0;
                padding: 0;
            }

            h2 {
                font-size: 1.5rem;
                font-weight: 500;
                margin: 35px 0 0 0;
            }

            header > div.meta--wrapper {
                display: grid;
                grid-area: meta;
                margin: 10px 0;
                row-gap: 4px;
            }

            header > div.meta--wrapper p,
            main > div.rating--wrapper {
                color: gray;
                font-style: italic;
            }

            header > div.meta--wrapper 
            :is(.meta--yield, .meta--total-time, .meta--categories) {
                color: black;
                font-style: normal;
                font-weight: 600;
            }

            header img.thumbnail {
                aspect-ratio: 1;
                grid-area: img;
                object-fit: cover;
                overflow: hidden;
                width: 230px;
            }

            header p.description {
                height: 62px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            main > .section--ingredients,
            main > .section--instructions {
                font-size: 1.1rem;
            }

            span.rating-total {
                margin-left: -2px;
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
        `
    article.innerHTML = `
            <header>
                <h1></h1>
                <div class="meta--wrapper">
                <p>total time: <time class="meta--total-time"></time></p>
                <p>tags: <span class="meta--tags"></span></p>
                </div>
                <p class="description"></p>
                <img src="" alt="" class="thumbnail" />
            </header>
            <main>
                <div class="rating--wrapper">
                <span class="rating--value"></span>
                <img src="" alt="" class="rating--star-img" />
                <span class="rating--total"></span>
                </div>
                <section class="section--ingredients">
                <h2>INGREDIENTS</h2>
                <ul></ul>
                </section>
                <section class="section--instructions">
                <h2>INSTRUCTIONS</h2>
                <ol></ol>
                </section>
            </main>
        `

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article)
  }

  /**
   * Sets the data for the recipe that will be put inside the <recipe-expand> element.
   * Overwrites the previously expanded recipe.
   */
  set data (data) {
    this.json = data

    this.shadowRoot.querySelector('article').innerHTML = `
        <header>
        <h1></h1>
        <div class="meta--wrapper">
        <p>total time: <time class="meta--total-time"></time></p>
        <p>tags: <span class="meta--tags"></span></p>
        </div>
        <p class="description"></p>
        <img src="" alt="" class="thumbnail" />
    </header>
    <main>
        <div class="rating--wrapper">
        <span class="rating--value"></span>
        <img src="" alt="" class="rating--star-img" />
        <span class="rating--total"></span>
        </div>
        <section class="section--ingredients">
        <h2>INGREDIENTS</h2>
        <ul></ul>
        </section>
        <section class="section--instructions">
        <h2>INSTRUCTIONS</h2>
        <ol></ol>
        </section>
    </main>
        `

    // Set title
    this.shadowRoot.querySelector('header > h1').innerHTML = data.name

    // Set image
    const image = this.shadowRoot.querySelector('img.thumbnail')
    image.setAttribute('src', data.thumbnail)

    // Set description
    this.shadowRoot.querySelector('p.description').innerHTML = data.description

    // Set tags
    const tags = data.tags.join(', ')
    this.shadowRoot.querySelector('.meta--tags').innerHTML = tags

    // Set time
    this.shadowRoot.querySelector('.meta--total-time').innerHTML = data.time

    // Set ingredients
    const ingredients = data.ingredients
    ingredients.forEach(ingredient => {
      const item = document.createElement('li')
      item.innerHTML = ingredient
      this.shadowRoot.querySelector('.section--ingredients > ul').append(item)
    })

    // Set directions
    const directions = data.directions
    directions.forEach(step => {
      const item = document.createElement('li')
      item.innerHTML = step
      this.shadowRoot.querySelector('.section--instructions > ol').append(item)
    })
  }
}

customElements.define('recipe-expand', ExpandRecipe)
