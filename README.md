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
  index.html   whole page: markup, CSS, quiz + RSVP JS (RSVP_URL constant)
  assets/      SVG illustrations and tiles
  og-image.jpg link-preview image (absolute URL in og:image)
apps-script/   Google Apps Script backing the RSVP form (managed with clasp)
  Code.gs      doPost appends a row to the "RSVPs" tab
  appsscript.json  web app: executes as owner, anyone (anonymous) can submit
  .clasp.json  binds this folder to the script project above
```

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
