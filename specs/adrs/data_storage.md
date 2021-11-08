## Context and Problem Statement

We need to make a decision with how to store user data. How will we be doing this?

## Considered Options

* Database storage (mongoDB, firebase, etc.)
* JS LocalStorage

## Decision Outcome

Chosen option: "JS LocalStorage", because 

* It is the less risky option, given the amount of time we have
  * Only 1 person on the team familiar with database storage (BUS factor) 
* It won't have negative effects on the performance of the app 
