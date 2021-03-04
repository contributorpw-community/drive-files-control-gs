class Service {
  constructor() {}
  /**
   *
   * @param {string} email
   * @return {GoogleAppsScript.Drive.Schema.FileList}
   */
  serarchSharedFilesForEmail(email, optionalArgs) {
    const optionalArgs_ = Object.assign(
      {
        q: `"me" in owners and ("${email}" in writers or "${email}" in readers)`,
        maxResults: 100,
      },
      optionalArgs
    );
    const files = Drive.Files.list(optionalArgs_);
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

  removeUserFromMyFilesByEmail(email) {
    const fileList = this.serarchSharedFilesForEmail(email, {
      fields: 'items(id,permissions)',
    });
    const requests = fileList.items.reduce(
      (p, item) => (
        p.push(
          ...item.permissions
            .filter((permission) => permission.emailAddress === email)
            .map((permission) => ({
              method: 'DELETE',
              endpoint: `https://www.googleapis.com/drive/v3/files/${item.id}/permissions/${permission.id}`,
            }))
        ),
        p
      ),
      []
    );
    const res = requests.length
      ? EDo({
          batchPath: 'batch/drive/v3',
          requests: requests,
        })
      : undefined;
    return res;
  }
}
