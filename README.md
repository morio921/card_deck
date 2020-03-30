# deck-of-cards

This is deck of cards project


## Project Overview

Card suits and values have a sequence that must be preserved. 
Suits: Hearts (H), Diamonds (D), Clubs (C), and Spades (S)
Values: 2, A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3
Card suits take precedence over card values.
The Rotation Card specified by the user defines the strongest card in the deck. 

If the Rotation Card is 6C:
The strongest to weakest card values become: 6, 5, 4, 3, 2, A, K, Q, J, 10, 9, 8, 7
The strongest to weakest card suits become: Clubs, Spades, Hearts and Diamonds
In both cases, the sequence of both card values and card suits remain preserved.

Given a rotation card of 6C, the following is true:
6S > 10S
6S < 10C

#### Route #1 - /deck/new
This page displays a form that accepts up to 10 valid cards and a Rotation Card.
When the user submits the form, a new deck should be created API references[1], the cards submitted by the user should be added to one or more piles API references[2] and the user should be redirected to 
 #2.

#### Route #2 - /deck/<<deck_id>>
Using the <<deck_id>> given by “A Brand New Deck” endpoint API references[1], this page should load the pile created at Route #1, displaying:
The pile’s cards in order
The Rotation Card
The High Card
All Full House combinations

#### API references
[1] https://deckofcardsapi.com/api/deck/new/
[2] https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S


## Project structure

This project is based on Vue boilerpate Starter 
- [vue-boilerplate-template](https://github.com/nicejade/vue-boilerplate-template)

- `/src`: [Vue](https://vuejs.org/) for UI (frontend functionalities and views)
- `/build`: [Webpack](https://webpack.js.org/) for views & assets bundling
- `/test`: [Test](https://webpack.js.org/) for unit test and e2e test

## Get Started

**Requires Node.js 10+**

### Run project

#### With [Docker Compose](https://docs.docker.com/compose/)

``` bash
# install dependencies
docker-compose run app npm install

# serve in dev mode, with hot reload at localhost:8181
docker-compose up
```
#### Without Docker Compose

``` bash
# install dependencies
npm install

npm start
```

## Development guidelines

### Code style guideline

Code style should follow Vue style guide https://vuejs.org/v2/style-guide. We use ESLint with the official Vue plugin to help with code linting during development. When in doubt, check the style guide.
