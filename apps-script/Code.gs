/**
 * Prarthana & Kapil — wedding RSVP collector.
 * Paste into Extensions → Apps Script of your Google Sheet, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Copy the Web app URL (ends in /exec).
 */
const SHEET_NAME = 'RSVPs';
const HEADERS = ['Timestamp', 'Name', 'Coming?', 'Song request', 'Note', 'Page'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return json({ ok: true });          // honeypot: ignore bots
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) { sh.appendRow(HEADERS); sh.setFrozenRows(1); sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold'); }
    sh.appendRow([
      new Date(),
      clean(p.name, 80),
      p.attending === 'Yes' ? 'Yes' : 'No',
      clean(p.song, 120),
      clean(p.message, 500),
      clean(p.page, 300)
    ]);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json({ ok: true, hint: 'RSVP endpoint is live. Submit from the invitation.' }); }

// Stops values like =IMPORTXML(...) from running as formulas in the sheet.
function clean(v, max) {
  let s = String(v || '').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
