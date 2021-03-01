class Assets_class {
  constructor() {
    const fileIterator = DriveApp.searchFiles(
      'mimeType="application/vnd.google-apps.spreadsheet" and "me" in owners and title="drive-files-control-gs [settings]"'
    );
    if (!fileIterator.hasNext())
      return new Error('Вы должны создать Таблицу настроек! См. документацию');

    this.bookSettingsId = fileIterator.next().getId();
    this.updateSettings();
  }

  updateSettings() {
    const data = SpreadsheetApp.openById(this.bookSettingsId)
      .getDataRange()
      .getValues()
      .reduce((p, c, i) => (c[0] !== '' ? (p[c[0]] = c[1]) : '', p), {});
    this.settings = data;
  }
}

const Assets = new Assets_class();
Object.freeze(Assets);
