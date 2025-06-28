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

## Game requirements

- [x] a grid of cells (10x10)
- [ ] the app places ships randomly
  - [ ] ships are of different sizes (1x 5-cells, 2x 4-cells)
- [ ] player can select a cell to attack
  - [ ] by text input (e.g. "C3")
  - [ ] by clicking on a cell in the grid
  - [ ] the cell can be selected only once
- [ ] results
  - [ ] displayed on the grid: hits, misses, sunk ships
  - [ ] info about left ships
- [ ] the game ends when all ships are sunk
  - [ ] there should be some message when the game ends
  - [ ] button to restart the game
- [ ] game instructions

### Possible enhancements

- [ ] difficulty levels with different ship count and sizes
- [ ] computer opponent
  - [ ] computer places the ships randomly
  - [ ] computer selects cells to attack randomly
    - [ ] some logic to select the next cell to attack
- [ ] count and display the number of hits and misses
  - [ ] store the top score
  - [ ] display the top score
- [ ] online multiplayer

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
