# Recipeal

[![GitHub Super-Linter](https://github.com/cse110-fa21-group13/cse110-fa21-group13/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ddd9f01a4a1f4e26bba3aa7c2b5bcce8)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cse110-fa21-group13/cse110-fa21-group13&amp;utm_campaign=Badge_Grade)

![image](https://user-images.githubusercontent.com/76819117/146281734-8f2e1ee6-1c27-49d4-8e3d-37d8774c7d0f.png)

## Table of Contents
1. [Overview](#overview)
2. [How it's made](#how-its-made)
3. [Demo](#demo)
4. [Challenges](#challenges)
5. [Contributing](#contributing)
6. [Meet the Team](#meet-the-team)

## Overview
Recipeal is a recipe manager that allows you to store and organize your favorite recipes, and find new ones. This project was made for CSE 110: Software Engineering.

## Features
- **Create and edit your own recipes!**
![image](https://user-images.githubusercontent.com/76819117/146282940-62490863-81d8-4a25-9a16-489035f25457.png)

- **Find new recipes on the explore page!**
![image](https://user-images.githubusercontent.com/76819117/146283080-a10d0703-60bd-442d-85ee-a40861c42d1f.png)

- **Use Cook Mode to help you focus on cooking!**
![image](https://user-images.githubusercontent.com/76819117/146283245-093e5575-da48-4d11-b34e-f29490cc6d07.png)


## How it's made
We first performed research to ideate on our project features and problem statement. This involved a competitive analysis for other recipes managers and creating personas for our user base. We used Miro for this process.

Persona 1
![persona1](https://user-images.githubusercontent.com/76819117/146270394-e8476c66-f94a-4165-9e92-b4f841282579.png)

Persona 2
![persona2](https://user-images.githubusercontent.com/76819117/146270474-7077994f-746e-4ac0-ab15-08eec687f498.png)

Competitive Analysis
![companalysis](https://user-images.githubusercontent.com/76819117/146270610-e9b0e7fc-767f-4c8d-a01d-e5b8aba07571.png)

We separated our features into 2 groups: core and extra. Core are the features that are essential to a recipe manager, such as recipe creation and organization. Extra are features that would be implemented after the core features are finished completely.
![features](https://user-images.githubusercontent.com/76819117/146271162-57619181-43d0-41e4-9696-d34e3955ccd2.png)

After we solidified the features we wanted, we laid out a roadmap detailing what we would work on in the next couple of weeks.
![roadmap](https://user-images.githubusercontent.com/76819117/146270792-eb82ef6f-8d56-4d2a-b049-c135bb0397b5.png)

We were now ready to start working on the project. To start, our designers worked on creating wireframes and prototypes on Figma to give us a feel of how the app would be organized and designed.

Design 1
<br>
![design1](https://user-images.githubusercontent.com/76819117/146271957-bfd677fb-7dca-4e38-95b1-e89200dba00d.png)

Design 2
![design2](https://user-images.githubusercontent.com/76819117/146272072-439b676d-cfeb-4709-8f22-974a72681fdc.png)

Design 3
![styleguide3](https://user-images.githubusercontent.com/76819117/146275218-13ded2d6-d13b-45d8-a02f-95050acf6944.png)
![design3](https://user-images.githubusercontent.com/76819117/146272146-e6c43836-fdeb-4d80-967e-315af9bb5219.png)

After we created a rough layout of the app, the developers were now ready to 
start implementing features. We used HTML/CSS for the structure and styling, and 
JavaScript for the functionalities. Following our roadmap, we first worked on implementing 
the CRUD (Create - Read - Update - Delete) functions. After those have been fully 
fleshed out, we started working on our extra features like exploring new recipes, cook mode, 
timer, and text-to-speech. To get new recipes, we used the [Spoonacular API](https://spoonacular.com/food-api). 
Upon completing our extra features, we polished the styling and made our app responsive to 
smaller screens. During this whole process, our QA Testers implemented code quality checks and 
coverage using Codacy, Linter, and Cypress so that everytime we pushed to main, tests would be 
run to ensure the quality of our code.

![tech stack](https://user-images.githubusercontent.com/76819117/146280503-568bae59-4c65-4456-a31d-f32d277ae014.png)

For an in-depth overview of the code, please check out our [documentation](https://cse110-fa21-group13.github.io/cse110-fa21-group13-docs/).

## Demo
[Site](https://recipeal.netlify.app/)
<br>
[Video](https://www.youtube.com/watch?v=IdlL57Bmyfw&t=40s)

## Challenges
Debugging was one of the main challenges. Since everyone was working out of a different branch, 
when it came time to merge to main, many things would break due to the differences in everyone's 
code. Resolving these issues involved going through the code line by line to make sure the new code 
wouldn't interfere with the old ones. Another challenge was the short amount of time we had to work 
on the project. Given more time, we would've implemented more features, polished the styling, 
and added more testing coverage.

## Contributing
If you would like to further contribute to this project:
1. Clone the repository to your local environment.
2. To open the development server, you can use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VSCode.
3. Make the changes you want.
4. After you're finished, create a pull request with a descriptive title and description of what you did.

## Meet the Team
[Team Page](https://github.com/cse110-fa21-group13/cse110-fa21-group13/blob/main/admin/team.md)
