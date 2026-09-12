/**
 * Paste into Extensions → Apps Script on the HIC leads spreadsheet.
 * Deploy → New deployment → Web app
 * Execute as: Me
 * Who has access: Anyone
 * Put the web app URL in GOOGLE_SHEETS_WEBHOOK_URL.
 * Put the same secret in Script Properties (WEBHOOK_SECRET) and GOOGLE_SHEETS_WEBHOOK_SECRET.
 *
 * Row 1 headers:
 * Timestamp | Source | First name | Last name | Email | Phone | Property address | City | Best contact time | Project | Budget | Message
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET") || "";
  if (expected && data.secret !== expected) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(
      ContentService.MimeType.JSON,
    );
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Source",
      "First name",
      "Last name",
      "Email",
      "Phone",
      "Property address",
      "City",
      "Best contact time",
      "Project",
      "Budget",
      "Message",
    ]);
  }
  sheet.appendRow([
    new Date(),
    data.source || "",
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.phone || "",
    data.propertyAddress || "",
    data.city || "",
    data.bestContactTime || "",
    data.projectType || "",
    data.budget || "",
    data.message || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
