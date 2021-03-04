/* exported include_ */

/**
 *
 * @param {string} filename
 */
function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function longFunction(data) {
  Utilities.sleep(1 * 500);
  const rnd = getRandomInt(0, 10);
  if (rnd > 8) throw new Error(`Ups! ${rnd}`);
  return rnd;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
