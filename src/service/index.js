class Service {
  constructor() {}
  /**
   *
   * @param {string} email
   * @return {GoogleAppsScript.Drive.Schema.FileList}
   */
  serarchSharedFilesForEmail(email) {
    const files = Drive.Files.list({
      q: `"me" in owners and ("${email}" in writers or "${email}" in readers)`,
      maxResults: 1000,
    });
    return files;
  }
  /**
   *
   * @param {GoogleAppsScript.Drive.Schema.FileList} fileList
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   * @returns {GoogleAppsScript.Spreadsheet.Sheet}
   */
  saveFileListToSheet(fileList, sheet, map) {
    sheet.clear();
    const data = fileList.items.map(map);
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    return sheet;
  }
}
