# Battleships Game

## Requirements

- [Node.js](https://nodejs.org/)@22
- [npm](https://www.npmjs.com/)@10 (_installed with Node.js_)

To install the dependencies, run:

```
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

To develop components in Storybook, run:

```bash
npm run storybook
```

### Settings

Game settings are stored in `src/settings.json`.

> **Important:**
> After any change, development / Storybook server needs to be restarted to apply styles changes.

---

## Game requirements

### MVP

- [x] a grid of cells (10x10)
  - [x] displayed on the grid: hits, misses, sunk ships
- [x] the app places ships randomly
  - [x] ships are of different sizes (1x 5-cells, 2x 4-cells)
- [x] player can select a cell to attack
  - [x] by text input (e.g. "C3")
  - [x] by clicking on a cell in the grid
  - [x] the cell can be selected only once
- [x] the game ends when all ships are sunk
  - [x] there should be some message when the game ends
  - [x] button to restart the game
- [x] game instructions

### Possible enhancements

- [ ] display game stats
  - [ ] number of shots
  - [ ] info about left ships
  - [ ] store and display the top score
- [ ] difficulty levels with different ship count and sizes
- [ ] computer opponent
  - [ ] computer places the ships randomly
  - [ ] computer selects cells to attack randomly or with some strategy
  - [ ] AI opponent
- [ ] online multiplayer

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
