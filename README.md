# Prarthana & Kapil — wedding invitation

Quiz-gated invitation site with an RSVP form that writes to a Google Sheet.

| Piece | Where |
| --- | --- |
| Live site | https://dasparov.github.io/prarthana-kapil-wedding/ |
| GitHub repo | https://github.com/dasparov/prarthana-kapil-wedding (account `dasparov`) |
| RSVP sheet | https://docs.google.com/spreadsheets/d/1yTXuEFH3E1RdJg4YvUWMaegmh2O9weMP3f3lCJsSlps/edit (owner `kapil.das@gmail.com`) |
| RSVP script editor | https://script.google.com/d/1UTle5Cq2nABtTJkVWy17nsQhDNutcVxcgMw0CtGszwTV3WeE36Ppt8O2/edit |
| RSVP endpoint | https://script.google.com/macros/s/AKfycby6ZEA5AO830h3iJ8ukPdYkpCVdiB2x89jaMO07sqBAYAY7TZujsJOrbXbTV6H5y5Lp/exec |

## Layout

```
docs/          GitHub Pages site (served from main branch, /docs)
  index.html   whole page: markup, CSS, JS (quiz, ride game, live sky, brass band, RSVP_URL constant)
  assets/      SVG illustrations and tiles
    moped.svg, pack.svg, dog-*.svg  cut from parade.svg for the ride game
    ride-*.svg   ride backdrops (hills, Goan street, venue arch)
  og-image.jpg link-preview image (absolute URL in og:image)
apps-script/   Google Apps Script backing the RSVP form (managed with clasp)
  Code.gs      doPost appends a row to the "RSVPs" tab
  appsscript.json  web app: executes as owner, anyone (anonymous) can submit
  .clasp.json  binds this folder to the script project above
```

## What guests get

1. YES/NO card (NO runs away).
2. **One question**: "The DJ owes you one song. What's it gonna be?" Guests type a song (examples cycle in the placeholder) or tap "Surprise me, DJ's choice". The song pre-fills the RSVP form's song field, so it reaches the Sheet when they RSVP. Examples and reactions are `SONG_EXAMPLES` / `SONG_CHEERS` / `ROOSTER_SONG` in `index.html`.
3. Invitation + RSVP. Arrival plays the Goan **brass band** (synthesised, no audio files); it also plays via "Cue the brass band". An "RSVP NOW" button on the "You're invited!" screen and a floating "RSVP" pill (shown until the form is on screen or sent) keep the form one tap away.

**Parked:** the "Ride to Corjuem" moped mini-game (~9 s, dogs catch tossed biscuits) is still in the code but switched off. Set `const RIDE = true` in `index.html` to put it back between the song and the invitation; the course is the `COURSE` table in the `Ride` module.

The **sky follows real Goa time** (IST): sunrise, day, golden hour, sunset, night (moon, stars, festoon lights), and the top-left chip counts down to the wedding. From 6 pm on 9 Jan 2027 until 4 am it switches to "We're getting married right now" with fireworks.

Preview any moment with `?at=YYYY-MM-DDTHH:MM` (Goa time), e.g. `…/?at=2027-01-09T18:30` or `…/?at=2026-12-01T21:00`.

## Site changes

Edit files in `docs/`, then:

```sh
git commit -am "Describe change" && git push
```

Pages rebuilds in about a minute.

## RSVP script changes

Uses `npx @google/clasp` (already logged in as `kapil.das@gmail.com`).

```sh
cd apps-script
npx @google/clasp push -f
npx @google/clasp create-deployment -i AKfycby6ZEA5AO830h3iJ8ukPdYkpCVdiB2x89jaMO07sqBAYAY7TZujsJOrbXbTV6H5y5Lp -d "RSVP web app"
```

Always redeploy with `-i <deployment id>` so the endpoint URL stays the same; a new deployment gets a new URL that would have to be copied into `RSVP_URL` in `docs/index.html`. If a code change needs new OAuth scopes, run any function once in the script editor and approve the prompt before redeploying.

Check the endpoint: `curl -sL <endpoint>` should return `{"ok":true,...}`.
