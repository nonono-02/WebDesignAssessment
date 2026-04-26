/* =====================================================
   RGB COLOUR LAB — index.js
   Handles all game logic: round generation, scoring,
   life management, feedback, and overlay transitions.
   ===================================================== */

/* ---- GAME CONFIG ---- */
const CONFIG = {
  totalLives:     3,   // How many lives a player starts with
  swatchCount:    3,   // How many colour options to show per round
  feedbackDelay:  900, // Milliseconds before the next round loads
};

/* ---- GAME STATE ---- */
// All mutable state lives in one object for clarity.
let state = {
  lives:          CONFIG.totalLives,
  score:          0,
  targetColor:    null,   // { r, g, b } of the correct answer
  guessLocked:    false,  // True after a guess until next round loads
};

/* ---- DOM REFERENCES ---- */
const livesContainer  = document.getElementById('livesContainer');
const scoreValue      = document.getElementById('scoreValue');
const rgbDisplay      = document.getElementById('rgbDisplay');
const swatchesSection = document.getElementById('swatchesSection');
const feedback        = document.getElementById('feedback');
const overlay         = document.getElementById('overlay');
const overlayScore    = document.getElementById('overlayScore');
const replayBtn       = document.getElementById('replayBtn');

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

/**
 * Returns a random integer between 0 and 255 inclusive.
 * Used to build random RGB values.
 */
function randomChannel() {
  return Math.floor(Math.random() * 256);
}

/**
 * Builds a colour object with three random channels.
 * @returns {{ r: number, g: number, b: number }}
 */
function randomColor() {
  return {
    r: randomChannel(),
    g: randomChannel(),
    b: randomChannel(),
  };
}

/**
 * Converts a colour object to a CSS rgb() string.
 * @param {{ r: number, g: number, b: number }} color
 * @returns {string}  e.g. "rgb(210, 45, 130)"
 */
function toRgbString(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

/**
 * Generates an array of N distractor colours that differ
 * enough from the target to avoid being confusingly similar.
 * Each channel differs by at least 30 from the target.
 * @param {{ r: number, g: number, b: number }} target
 * @param {number} count
 * @returns {Array<{ r: number, g: number, b: number }>}
 */
function generateDistractors(target, count) {
  const distractors = [];

  while (distractors.length < count) {
    const candidate = randomColor();

    // Reject colours that are too close to the target
    const rDiff = Math.abs(candidate.r - target.r);
    const gDiff = Math.abs(candidate.g - target.g);
    const bDiff = Math.abs(candidate.b - target.b);
    const totalDiff = rDiff + gDiff + bDiff;

    if (totalDiff < 90) continue; // Too close — try again

    distractors.push(candidate);
  }

  return distractors;
}

/**
 * Shuffles an array in place using Fisher-Yates.
 * @param {Array} array
 * @returns {Array}
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* =====================================================
   LIVES DISPLAY
   ===================================================== */

/**
 * Builds the initial set of life pip elements in the header.
 * Called once at game start and on replay.
 */
function renderLives() {
  livesContainer.innerHTML = '';

  for (let i = 0; i < CONFIG.totalLives; i++) {
    const pip = document.createElement('div');
    pip.classList.add('life-pip');
    pip.dataset.index = i;
    livesContainer.appendChild(pip);
  }
}

/**
 * Marks one life pip as lost with a brief CSS animation.
 * Removes the leftmost filled pip first.
 */
function removeLife() {
  // Find the first pip that is still alive
  const pips = livesContainer.querySelectorAll('.life-pip:not(.lost)');
  if (pips.length === 0) return;

  const pip = pips[pips.length - 1]; // Remove from the right
  pip.classList.add('losing');

  // After the animation finishes, mark it as permanently lost
  pip.addEventListener('animationend', () => {
    pip.classList.remove('losing');
    pip.classList.add('lost');
  }, { once: true });
}

/* =====================================================
   SCORE DISPLAY
   ===================================================== */

/**
 * Updates the score counter in the UI with a small bump animation.
 */
function updateScore() {
  scoreValue.textContent = state.score;
  scoreValue.classList.remove('bump');
  // Force reflow so the animation re-triggers
  void scoreValue.offsetWidth;
  scoreValue.classList.add('bump');
}

/* =====================================================
   ROUND LOGIC
   ===================================================== */

/**
 * Starts a new round:
 *  1. Picks a new target colour.
 *  2. Generates distractors.
 *  3. Renders the RGB prompt and colour swatches.
 */
function startRound() {
  state.guessLocked = false;
  feedback.textContent = '';
  feedback.className = 'feedback';

  // Generate the target and distractor colours
  state.targetColor = randomColor();
  const distractors = generateDistractors(state.targetColor, CONFIG.swatchCount - 1);

  // Combine target + distractors and shuffle so position is random
  const allColors = [state.targetColor, ...distractors];
  shuffle(allColors);

  // Update the RGB prompt text
  rgbDisplay.textContent = toRgbString(state.targetColor);

  // Render the swatches
  renderSwatches(allColors);
}

/**
 * Creates and injects swatch elements for the given colour array.
 * Each swatch is a coloured square that registers a click handler.
 * @param {Array<{ r: number, g: number, b: number }>} colors
 */
function renderSwatches(colors) {
  swatchesSection.innerHTML = '';
  swatchesSection.classList.remove('locked');

  colors.forEach((color) => {
    const swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = toRgbString(color);

    // Attach the guess handler, passing whether this is the correct answer
    const isCorrect = (
      color.r === state.targetColor.r &&
      color.g === state.targetColor.g &&
      color.b === state.targetColor.b
    );

    swatch.addEventListener('click', () => handleGuess(swatch, isCorrect));

    swatchesSection.appendChild(swatch);
  });
}

/* =====================================================
   GUESS HANDLING
   ===================================================== */

/**
 * Processes a player's guess.
 * Applies visual feedback, updates score or lives,
 * then either loads the next round or ends the game.
 * @param {HTMLElement} swatchEl  The clicked swatch element
 * @param {boolean}     isCorrect Whether this swatch is the target
 */
function handleGuess(swatchEl, isCorrect) {
  // Prevent double-clicks or clicks after a guess is already registered
  if (state.guessLocked) return;
  state.guessLocked = true;

  // Lock all swatches so no other swatch can be clicked
  swatchesSection.classList.add('locked');

  if (isCorrect) {
    // Correct guess: award a point and show success feedback
    state.score += 1;
    updateScore();

    swatchEl.classList.add('correct');
    feedback.textContent = 'Correct!';
    feedback.className = 'feedback correct-msg';

  } else {
    // Wrong guess: lose a life and show failure feedback
    state.lives -= 1;
    removeLife();

    swatchEl.classList.add('wrong');
    feedback.textContent = 'Wrong!';
    feedback.className = 'feedback wrong-msg';

    // Also highlight the correct swatch so the player can see it
    highlightCorrectSwatch();
  }

  // Decide what happens next after the feedback delay
  setTimeout(() => {
    if (state.lives <= 0) {
      showGameOver();
    } else {
      startRound();
    }
  }, CONFIG.feedbackDelay);
}

/**
 * Finds the correct swatch and applies the 'correct' class to it,
 * so the player can see what the right answer was after a wrong guess.
 */
function highlightCorrectSwatch() {
  const swatches = swatchesSection.querySelectorAll('.swatch');

  swatches.forEach((swatch) => {
    // Parse the background-color inline style to find the target
    const bg = swatch.style.backgroundColor; // "rgb(r, g, b)"
    if (bg === toRgbString(state.targetColor)) {
      swatch.classList.add('correct');
    }
  });
}

/* =====================================================
   GAME OVER
   ===================================================== */

/**
 * Displays the game-over overlay with the player's final score.
 */
function showGameOver() {
  overlayScore.textContent = state.score;
  overlay.classList.remove('hidden');
}

/* =====================================================
   GAME INITIALISATION & REPLAY
   ===================================================== */

/**
 * Resets all state and starts a fresh game.
 * Called on first load and on replay.
 */
function initGame() {
  // Reset state
  state.lives    = CONFIG.totalLives;
  state.score    = 0;
  state.guessLocked = false;

  // Reset UI elements
  overlay.classList.add('hidden');
  scoreValue.textContent = '0';
  feedback.textContent = '';
  feedback.className = 'feedback';

  // Rebuild the life pips
  renderLives();

  // Begin the first round
  startRound();
}

/* ---- EVENT LISTENERS ---- */

// Replay button resets and starts a new game
replayBtn.addEventListener('click', initGame);

/* ---- START ---- */
// Kick off the game as soon as the script loads
initGame();