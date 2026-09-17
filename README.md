# PlanoraAI

One-Platform to Explore, Learn, plan, Grow your career

Planora is a React single-page app for student career planning: guided onboarding,
personalised roadmaps, course/mentor exploration, progress tracking and an AI career
assistant. The UI is available in English, Telugu, Hindi and Urdu.

## Tech stack

- React 18 + Vite (TypeScript)
- Tailwind CSS for styling
- Netlify Functions for the AI assistant
- Netlify AI Gateway for Gemini inference (no API key to manage)

## Local development

```bash
npm install
netlify dev --port 8889
```

`netlify dev` serves the Vite app and the `/api/chat` function together, so the AI
assistant works locally exactly as it does in production.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | HTML entry point |
| `main.tsx` | Mounts the React app |
| `index.tsx` | The entire Planora app (screens, data, translations) |
| `styles.css` | Tailwind entry + base styles |
| `netlify/functions/chat.mts` | Server-side Gemini call for the AI assistant |
| `netlify.toml` | Build, functions and SPA routing config |

## The AI assistant

`AIChatScreen` posts the user's question plus their profile to `/api/chat`. That function
calls Gemini through Netlify AI Gateway, which injects credentials at runtime — no API key
is stored in the repo or shipped to the browser. If the request fails, the chat falls back
to built-in rule-based guidance so the screen keeps working.

To use your own Google AI key instead of AI Gateway credits, set `GEMINI_API_KEY` in the
Netlify site environment variables; Netlify will not override a key you set yourself.

## Deployment

Netlify builds with `npm run build` and publishes `dist`. Functions deploy from
`netlify/functions` automatically.
