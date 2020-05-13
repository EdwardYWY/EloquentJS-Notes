//https://eloquentjavascript.net/09_regexp.html
// Chapter 9 - Regular Expressions.

/**
 * 2 Ways of creating Regular Expression
 * 
 * 1. let re1 = new RegExp("abc") == abc
 * 2. let re2 = /abc/;            == abc
 *     -special character need to add \ before it
 *     -eg: eighteenPlus == /eighteen\+/
 * 
 * 
 * ---------------------------------------------------
 * Set of Character 
 * /[0123456789]/ is equal to /[0-9]/ 
 * Both matches the strings that contain a digit.
 * 
 * --------
 * Examples
 * --------
 * console.log(/[0123456789]/.test("in 1992"));
 *  // → true
 *  console.log(/[0-9]/.test("in 1992"));
 *  // → true
 * ---------------------------------------------------
 * Common Character Groups
 * 
 * \d	Any digit character
 * \w	An alphanumeric character (“word character”)
 * \s	Any whitespace character (space, tab, newline, and similar)
 * \D	A character that is not a digit
 * \W	A nonalphanumeric character
 * \S	A nonwhitespace character
 * .	Any character except for newline
 * 
 * [\d.] means any digit or a period character. But the period itself, 
 * between square brackets, loses its special meaning. The same goes for
 * other special characters, such as +.
 * 
 * --------
 * Examples
 * --------
 * let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
 * console.log(dateTime.test("01-30-2003 15:20"));
 * // → true
 * console.log(dateTime.test("30-jan-2003 15:20"));
 * // → false
 * ----------------------------------------------------
 * Caret Sign ^ 
 * 
 * Match any character except the ones in the set.
 * 
 * --------
 * Examples
 * --------
 * let notBinary = /[^01]/;
 * console.log(notBinary.test("1100100010100110"));
 * // → false
 * console.log(notBinary.test("1100100010200110"));
 * // → true
 * ----------------------------------------------------
 * Plus Sign +
 * 
 * The expression will repeat
 * 
 * --------
 * Examples
 * --------
 * console.log(/'\d+'/.test("'123'"));
 * // → true
 * console.log(/'\d+'/.test("''"));
 * // → false
 * console.log(/'\d*'/.test("'123'"));
 * // → true
 * console.log(/'\d*'/.test("''"));
 * // → true
 * ----------------------------------------------------
 * Star Sign *
 * 
 * Same with plus but 0 matches is true.
 * 
 * --------
 * Examples
 * --------
 * let neighbor = /neighbou?r/;
 * console.log(neighbor.test("neighbour"));
 * // → true
 * console.log(neighbor.test("neighbor"));
 * // → true
 * -----------------------------------------------------
 * Braces {}
 * To express a patter repeat a precise amount of time
 * use braces. {}
 * {4}   means repeat exactly 4 times.
 * {2,4} means repeat at least twice and at most 4 times.
 * 
 * --------
 * Examples
 * -------
 * let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
 * console.log(dateTime.test("1-30-2003 8:45"));
 * // → true 
 * ------------------------------------------------------
 * Grouping Subexpressions using parentheses
 * 
 * --------
 * Example
 * --------
 * let cartoonCrying = /boo+(hoo+)+/i;
 * console.log(cartoonCrying.test("Boohoooohoohooo"));
 * // → true
 * ------------------------------------------------------
 * Exec, Matches and Group
 * 
 * Exec method will return null if no match is found.
 * Exec method will return an array of strings if matches are found.
 * Elements in array are arrange, bigger(oyter) first then smaller inner matches. 
 * 
 * --------
 * Examples
 * --------
 * console.log(/bad(ly)?/.exec("badly"));
 * // → ["bad", undefined]
 * console.log(/(\d)+/.exec("123"));
 * // → ["123", "3"]
 * ------------------------------------------------------
 * Date
 * 
 * Unix Time = number of milliseconds since the start of 1970. 
 * Month numbers start at Zero and Day numbers start at one !!!!
 * 
 * console.log(new Date()); //Get current date and time.
 * // → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)
 * console.log(new Date(2009, 11, 9)); //Create a specific time.
 * // → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
 * console.log(new Date(2009, 11, 9, 12, 59, 59, 999)); //Create a specific time.
 * // → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
 * console.log(new Date(2013, 11, 19).getTime()); //Get Unix Time for a specific time.
 * // → 1387407600000
 * console.log(new Date(-111387407600000)); //Create a specific time using Unix Time
 * // → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)
 * --------------------------------------------------------
 * Some combination of Regex + Date
 * 
 * function getDate(string) {
 * let [_, month, day, year] =
 *     /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
 *   return new Date(year, month - 1, day);
 * }
 * console.log(getDate("1-30-2003"));
 * console.log(/(\d{1,2})-(\d{1,2})-(\d{4})/.exec("1-30-2003"));
 * // → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)
 * ---------------------------------------------------------
 * String Boundaries
 * 
 * Caret Sign(2) ^ - Marks the start of the whole string.
 * Dollar Sign     - Marks the end of the whole string. 
 * e.g: /^\d+$/ = A string consist entirely of one or more digits.
 *      /^/     = Any string that starts with an exclamation mark. 
 *      /x^/    = Match no string, no string has x before start of the string. 
 * 
 * Word Boundary \b - Start or end of the string or any point in the string
 *                    that has a word character. 
 * 
 * e.g: 
 * console.log(/cat/.test("concatenate"));
 * // → true
 * console.log(/\bcat\b/.test("con-cat-enate"));
 * // → true
 * console.log(/\bcat\b/.test("concatenate"));
 * // → false
 * ----------------------------------------------------------
 * Choice Pattern |
 * 
 * | = Or
 * 
 * e.g:
 * let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
 * console.log(animalCount.test("15 pigs"));
 * // → true
 * console.log(animalCount.test("15 pigchickens"));
 * // → false
 * -----------------------------------------------------------
 * 
 * How regex works
 * 
 * Refer to https://eloquentjavascript.net/09_regexp.html#h_AzxCBCKdvY
 * ------------------------------------------------------------
 * Replace 
 * 
 *  "A string".repace("text to be replace", "text use to replace")
 * Text to be replace can be Regex. 
 * 
 * e.g: 
 * console.log(
 *   "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
 *     .replace(/(\w+), (\w+)/g, "$2 $1"));
 * // → Barbara Liskov
 * //   John McCarthy
 * //   Philip Wadler
 * 
 * 
 * $1 and $2 in the replacement string refer to the parenthesized
 * groups in the pattern. $1 = the text that matched first group,
 * $2 = text that matched second group, up to $9. Whole match = $&
 * 
 * console.log(
 *   "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
 *     .replace(/(\w+), (\w+)/g, "$2 $1 $&"));
 * // → Barbara Liskov Liskov, Barbara
 * // → John McCarthy McCarthy, John
 * // → Philip Wadler Wadler, Philip
 * $1 = Barbara $2 = Liskov $3 =Liskov, Barbara
 * 
 * Function can be pass to the second argument.
 * The matched groups is pass to the function as arguments and
 * the function's return value will be inserted into the new string.
 * 
 * let s = "the cia and fbi";
 * console.log(s.replace(/\b(fbi|cia)\b/g,
 *             str => str.toUpperCase()));
 * // → the CIA and FBI
 * 
 * let stock = "1 lemon, 2 cabbages, and 101 eggs";
 * function minusOne(match, amount, unit) {
 *   amount = Number(amount) - 1;
 *   if (amount == 1) { // only one left, remove the 's'
 *     unit = unit.slice(0, unit.length - 1);
 *   } else if (amount == 0) {
 *     amount = "no";
 *   }
 *   return amount + " " + unit;
 * }
 * console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
 * // → no lemon, 1 cabbage, and 100 eggs
 * 
 * match = "1 lemen", amount = "1", unit = "lemon"
 * -----------------------------------------------------------
 * Greedy (See How regex works for more details)
 * 
 * In short, Regex will try to first match as much as it can then
 * start to back tracing after the next part of the strings fail
 * to match the pattern, because this we say the repetition operators
 * (+,*,?,{})are greedy.
 * 
 * From here, the third console.log does not work the way we want,
 * it should be 1+1, we want to clean out the comments.
 * 
 * function stripComments(code) {
 *   return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
 * }
 */ 
// console.log(stripComments("1 + /* 2 */3"));
/* // → 1 + 3
 * console.log(stripComments("x = 10;// ten!"));
*/ // → x = 10;
// console.log(stripComments("1 /* a */+/* b */ 1"));
/* // → 1  1
 * 
 * When a question mark ? is put after them, they become non-greedy,
 * and start by matching as litle as possible, matching more only when
 * the remaining pattern does not fit the smaller match.
 * 
 * function stripComments(code) {
 * return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
 * }
*/ 
// console.log(stripComments("1 /* a */+/* b */ 1"));
/* / → 1 + 1
 * 
 * ---------------------------------------------------------
 * Dynamically Craeting Regex Objects
 * 
 * let name = "harry";
 * let text = "Harry is a suspicious character.";
 * let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
 * console.log(text.replace(regexp, "_$1_"));
 * // → _Harry_ is a suspicious character.
 * 
 * Use 2 \ in creation of regexp because we are passing a string
 * not a typical \\ regex. "gi" stands for Global and CaseInsensitive
 * For special character, we can add backslashes before any special
 * character.
 * 
 * let name = "dea+hl[]rd";
 * let text = "This dea+hl[]rd guy is super annoying.";
 * let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");
 * let regexp = new RegExp("\\b" + escaped + "\\b", "gi");
 * console.log(text.replace(regexp, "_$&_"));
 * // → This _dea+hl[]rd_ guy is super annoying.
 * 
 * escaped = dea\+hl\[]rd
 * ---------------------------------------------------------
 * The Search Method 
 * 
 * indexOf cant be called with regular expression, to get 
 * the index of a specifix regular expression, we can use search
 * method which can acceppt a regular expression as argument
 * and return the first indexx on which the expression was found,
 * or -1 when i wasn't found. 
 * 
 * console.log("  word".search(/\S/));
 * // → 2
 * console.log("    ".search(/\S/));
 * // → -1
 * ---------------------------------------------------------
 * The LastIndex Property
 * 
 * To get the last index property of a match, need to do in
 * in a complicated way in JavaScript.
 * One important note is that the regular expression must have
 * global (g) or sticky (y) enabled. The mactch must happen through
 * the exec method. See below for example.
 * 
 * let pattern = /y/g;
 * pattern.lastIndex = 3;
 * let match = pattern.exec("xyzzy");
 * console.log(match.index);
 * // → 4
 * console.log(pattern.lastIndex);
 * // → 5
 * 
 * The lastIndex property will be sent back to zero if not match
 * or to the last match after the call to exec. 
 * 
 * When sticky is enabled, the match will succedd only if it starts
 * directly at lastIndex. Whereas with global, it will search ahead
 * for a position where a match can start
 * 
 * let global = /abc/g;
 * console.log(global.exec("xyz abc"));
 * // → ["abc"]
 * let sticky = /abc/y;
 * console.log(sticky.exec("xyz abc"));
 * // → null
 * 
 * !!Important node, a share regular expression for multiple exec
 * calls, the regular expressions might be accidentally starting at
 * an index that was left over from a previous call.!!
 * 
 * let digit = /\d/g;
 * console.log(digit.exec("here it is: 1"));
 * // → ["1"]
 * console.log(digit.exec("and now: 1"));
 * // → null
 * 
 * When call as global, .match will return an array of all match result,
 * same like that .exec. 
 * See this for more detail:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
 * -----------------------------------------------------------
 * Some usage of .index 
 * 
 * let input = "A string with 3 numbers in it... 42 and 88.";
 * let number = /\b\d+\b/g;
 * let match;
 * while (match = number.exec(input)) {
 *   console.log("Found", match[0], "at", match.index);
 * }
 * // → Found 3 at 14
 * //   Found 42 at 33
 * //   Found 88 at 40
 * 
 * In here the match is assign again each iteration, thanks to =
 * and what line 337 says. 
 * -----------------------------------------------------------
 * 
 * 
 */



