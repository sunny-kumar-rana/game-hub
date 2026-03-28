# Game Hub

A browser-based collection of classic mini-games accessible from a single interface. Each game runs independently inside an isolated frame, ensuring stability and preventing script conflicts.

## Features

* Multiple games in one place
* Clean and simple navigation using visual thumbnails
* Games run in isolation using iframes
* No external libraries or frameworks required
* Fully client-side (no backend)

## Included Games

* Snake
* Sudoku
* Tic Tac Toe
* Puzzle

## Project Structure

```
game-hub/
│
├── index.html          # Main hub interface
├── script.js           # Game loader logic (iframe-based)
├── style.css           # Global styling
├── README.md
│
├── images/             # Game thumbnail images
│
├── snake/
│   ├── index.html
│   ├── game.js
│   └── style.css
│
├── sudoku/
│   ├── index.html
│   ├── script.js
│   ├── generator.js
│   ├── solver.js
│   └── style.css
│
├── tic-tac-toe/
│   ├── index.html
│   ├── game.js
│   └── style.css
│
├── puzzle/
│   ├── puzzle.html
│   ├── puzzle.js
│   └── style.css
```

## How It Works

* The main page displays game thumbnails.
* Clicking a game loads it inside an iframe.
* Each game runs independently within its own environment.
* This avoids conflicts between global variables and scripts.

## How to Run

1. Clone the repository:

   ```
   git clone https://github.com/your-username/game-hub.git
   ```

2. Open the project folder.

3. Run using a local server (recommended):

   * VS Code Live Server
   * or any static server

4. Open `index.html` in your browser.

## Notes

* Directly opening via file system may cause issues with loading resources.
* Use a local server for proper functionality.
* Each game is currently independent and not interconnected.

## Future Improvements

* Shared score tracking (localStorage or backend)
* UI transitions between games
* Mobile responsiveness improvements
* Sound effects and animations
* Game difficulty settings
