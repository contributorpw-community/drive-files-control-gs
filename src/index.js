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

function removeUser() {
  const service = new Service();
  const f = service.removeUserFromMyFilesByEmail(Assets.settings.email);
}

/**
 *
 * @param {*} param0
 */

function createTrigger() {
  ScriptApp.newTrigger('removeUserTrigger_').timeBased().after(1).create();
}
/**
 *
 * @param {*} param0
 */
function removeUserTrigger_(e) {
  console.log(e);
  return;
  occurrences = 0;
  spent = 0;
  const email = Assets.settings.email;
  const now = new Date().getTime();
  occurrences++;
  const rest = 6 * 60 * 1000 - spent - 100;
  const speed = spent / occurrences;
  console.log(rest, speed, occurrences);
  if (rest <= speed) {
    ScriptApp.getProjectTriggers().forEach((trigger) =>
      trigger.getHandlerFunction() === ''
        ? ScriptApp.deleteTrigger(trigger)
        : null
    );
    return ScriptApp.newTrigger('removeUserTrigger_')
      .timeBased()
      .after(1)
      .create();
  }
  const service = new Service();
  const res = service.removeUserFromMyFilesByEmail(email);
  return res
    ? (console.log(res.length),
      removeUserTrigger_(new Date().getTime() - now, occurrences))
    : undefined;
}
