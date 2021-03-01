function run() {
  const service = new Service();
  const fileList = service.serarchSharedFilesForEmail(Assets.settings.email);
  const exportSheet = SpreadsheetApp.openById(
    Assets.settings.exportBookId
  ).getSheetByName(Assets.settings.exportSheetName);
  service.saveFileListToSheet(fileList, exportSheet, (item) => {
    return [item.id, item.title];
  });
}
