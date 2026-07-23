# Quizzical

A React quiz app built as a solo practice project. Pulls 5 random trivia questions from the Open Trivia Database API, lets you pick an answer for each, then checks your score with correct/incorrect highlighting.

Live Demo: https://quizzical80.netlify.app/

## Features

- Fetches 5 questions from the [Open Trivia DB](https://opentdb.com/) API
- Answer options shuffled on load (correct answer mixed in randomly, not always in the same position)
- HTML entities in questions/answers decoded (e.g. `&quot;` → `"`)
- Select one answer per question, then "Check answers" reveals correct (green) / incorrect (red) options and your score
- "Play again" resets and pulls a fresh set of questions
- Responsive layout (2-column options grid on smaller screens)
- Loading animation while questions are being fetched

## Tech Stack

- React (Vite)
- Vanilla CSS (custom properties for theming, light/dark mode support)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Known Issues

- The Open Trivia DB API has a rate limit — if you refresh/restart the quiz too many times in quick succession, requests may briefly fail with a 429 error and the loading screen won't resolve. Waiting a few seconds and retrying usually fixes it.

## Credits

- Trivia questions from [Open Trivia Database](https://opentdb.com/)
- Built as part of a Scrimba React learning track