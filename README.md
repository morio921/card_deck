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
# install dependencies by using npm
docker-compose run app npm install

# install dependencies by using yarn
docker-compose run app yarn

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

### File/directory naming

#### `src/`

Currently there's a mix in file naming, but the following general rules should apply to anything under `src/`:

- `camelCase` for files that export a function. For example

    // New.vue
    export default function createListView (type) {}

- `PascalCase` for components / view classes (as per Vue style guide). For example `CardView.vue`

    // commonRoutes.js (function)
    export default [
      {
    ...

- `snake_case` for files under `src/assets/`. For legacy reasons some files have `kebab-case` but we should stick to `snake_case` when we can.

#### Anything under the project root

No naming convention, it depends on the file's usage, for example `docker-compose.yml`, `README.md`...


### Guideline for updating packages
Use ``` docker-compose run app npm install package-name ```. Do NOT use ```npm install``` directly because that might add our local-specific stuffs in *package-lock.json*. If you do, then don't commit *package-lock.json*


### functionalities in project perspective
**Router 1** (`/deck/new`)
  - action: *$addNewDeck* 
      call api ([1]https://deckofcardsapi.com/api/deck/new/) and create new deck
  - action: *$addToPile* 
      call api (https://deckofcardsapi.com/api/deck/:deck_id/draw/?count=52) to prepare all cards working
      call api ([2]https://deckofcardsapi.com/api/deck/:deck_id/pile/:pile_name/add/?cards=AS,2S) to prepare all cards working

**Router 2** (`/deck/:id`)
  - action: *$getPile*
      call api (https://deckofcardsapi.com/api/deck/:deck_id/pile/:pile_name/list/) to load cards to be saved in router 1

### Order cards and fetch Full House combinations
  - function to order cards according to rotation card and playing rule (Strongest to Weakest)
    [https://github.com/kevin-dev725/deck-of-cards/blob/master/src/store/actions.js#L29]

    Simplely compare two codes in terms of their values and suits and swap(sort) each other
    1. calculate the relative integers of value and suit based on rotation value and suit
    2. Queue the cards based on the suit first because card suits take precedence over card values
    3. Queue the cards based on the value next in the case that suits are same.

  - function to fetch Full House combinations with card codes array ['2H', '2D', '2C', '2S', '3H', '3D', '3C']
    [https://github.com/kevin-dev725/deck-of-cards/blob/master/src/store/actions.js#L53]

    1. calculated possible combination arraies by using deep dive/recursive function
    2. fetch only arraies matched with Full House rule
