# Meeting Minutes
## Meeting Information
**Meeting Date/Time:** November 6 2021 / 2-3pm  <br>
**Meeting Purpose:** How to go about the coding process, asynchronous stand-ups, and more!  <br>
**Meeting Location:** Zoom <br>
**Note Taker:** Brett  <br>

## Attendees
People who attended:
- Brett
- Michael
- Jason
- Sirisha
- Darren
- Gurpreet
- Khiem
- Lu


## Agenda Items

Item | Description
---- | ----
Local vs Database storage | • Pro's and Con's of each <br> • Need to make final decision <br> 
Asynchronous Standups | • Will be extremely important to participate as we start coding <br> • Looking at options to incorporate into slack <br>
Coding style | • Google has a coding style guide for JS, CSS, & HTML <br>
The Coding Process | • Decompose wireframes into implementable features <br>• Reusable compononets <br>• Working on parallel tasks <br>
GitHub | • We are going to start making much more frequent use of GitHub <br> • Projects: Main way for us to keep track of tasks <br> • Actions: Our CI/CD pipeline <br>
Wireframes | • Designers add home icon button, and focus mode button <br>



## Discussion Items
- Local vs Database
  - Local: No expiration time, but dependant on the browser/browser data
  - Cloud: Safer option for user data, users can access data from anywhere, might be slower (not noticable?), harder to implement
  - DECISION: LOCAL STORAGE 
- Asynchronous standups
  - Slack
  - Very important that everyone participates so that we are all on the same page & kept accountable for our task assignments 
- Style Guide
  - Important to have a standard so our code is readable by anyone
  - Decided to use Google JS/HTML/CSS style guides, links below
  - Google JS style guide: https://google.github.io/styleguide/jsguide.html#formatting
  - Google CSS/HTML style guide: https://google.github.io/styleguide/htmlcssguide.html#General_Formatting_Rules
- Coding process (priority list)
  - Decompose Wireframes
    - Priorities
      - CRUD
        - Home page 
          - Create button & page and how they show up on the home page
            - Create recipe page
              - Name
              - Description
              - ingredients
              - steps
              - media
              - delete
          - Having the recipes correctly on the home page
            - Individual Recipe page
              - Edit
              - delete
            - Edit recipe page
              - ability to edit everything listed under create page   
        - Delete button functionality
      - Additional Features
        - Nav Bar
          - Explore page
          - Favorites page
        - Home page
          - Favorites button on recipe cards
          - Favorites button on Create & Edit recipe pages
          - Search bar
          - Filtering
        - Create & Edit Recipe Pages
          - Time to cook
          - Tags
        - Individual Recipe page
          - Cook Mode
            - Timer
            - Text to speech for steps
          - Focus mode    
        - Favorites page
          - search bar
          - Filtering
          - Create recipe 
        - Explore
    - Reusable Componenets
      - Trash can 
      - Favorites Button
      - Structure of Create, edit, and individual recipe page
      - Search bar & filtering for 'my recipe' and 'favorites' pages

- ToDo:
  - Designers
    - Finalizing Design/Theme of app
    - Yibo add in icon (doubles as home button)
  - Front-end
    - HTML files
      - Start on home page
      - Create recipe page
  - Back-end
    - Start implementing CRUD Features 
  - QA
    - Work on CI/CD pipeline 


## Action Items
| Done? | Item | Responsible | Due Date |
| ---- | ---- | ---- | ---- |
| | item | who | due_date |

## Other Notes & Information
N/A
