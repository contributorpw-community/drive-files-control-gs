/**
 *
 * @param {GoogleAppsScript.Events.DoGet} e
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile(
    'ui/standalone/index.html'
  ).evaluate();
}
