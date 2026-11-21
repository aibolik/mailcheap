import en from "../lib/locales/en.js";
import ru from "../lib/locales/ru.js";

const WHERE = {
	"footer.reason": "Email footer, and the same line under an issue in the campaign editor",
	"footer.unsubscribe": "Email footer link, and the campaign editor's footer",
	"footer.unsubscribeLine": "Plain-text email footer",
	"footer.readOnline": "Link to the issue's page at the top of an email",
	"footer.readOnlineLine": "Plain-text email, above the body",
	"footer.by": "Author byline in an email",
	"confirmation.fallbackName": "Built-in confirmation email, when the newsletter has no name",
	"confirmation.subject": "Built-in confirmation email subject",
	"confirmation.preview": "Built-in confirmation email preview text",
	"confirmation.headline": "Built-in confirmation email, bold first line",
	"confirmation.intro": "Built-in confirmation email, the line that names the newsletter",
	"confirmation.nextStep": "Built-in confirmation email, the line after the intro",
	"confirmation.button": "Built-in confirmation email button, and the confirm page button",
	"confirmation.ignore": "Built-in confirmation email, last line",
	"lastChance.fallbackName": "Built-in last-chance email, when the newsletter has no name",
	"lastChance.subject": "Built-in last-chance email subject",
	"lastChance.preview": "Built-in last-chance email preview text",
	"lastChance.headline": "Built-in last-chance email, bold first line",
	"lastChance.body": "Built-in last-chance email body",
	"lastChance.button": "Built-in last-chance email button, and the keep page button",
	"lastChance.goodbye": "Built-in last-chance email, last line",
	"welcome.fallbackName": "Welcome email prefill, when the newsletter has no name",
	"welcome.subject": "Welcome email prefill, only while the editor is still empty",
	"welcome.thanks": "Welcome email prefill, first paragraph",
	"welcome.next": "Welcome email prefill, second paragraph",
	"unsubscribe.metaTitle": "Unsubscribe page title",
	"unsubscribe.button": "Unsubscribe page button",
	"unsubscribe.invalidTitle": "Unsubscribe page, a link that doesn't verify",
	"unsubscribe.invalidBody": "Unsubscribe page, a link that doesn't verify",
	"unsubscribe.confirmTitle": "Unsubscribe page, before they confirm",
	"unsubscribe.confirmBody": "Unsubscribe page, before they confirm",
	"unsubscribe.errorTitle": "Unsubscribe page, when saving fails",
	"unsubscribe.errorBody": "Unsubscribe page, when saving fails",
	"unsubscribe.doneTitle": "Unsubscribe page, after they unsubscribe",
	"unsubscribe.doneBody": "Unsubscribe page, after they unsubscribe",
	"confirm.metaTitle": "Confirm-subscription page title",
	"confirm.invalidTitle": "Confirm page, a link that doesn't verify",
	"confirm.invalidBody": "Confirm page, a link that doesn't verify",
	"confirm.successBeforeName": "Confirm page, after they confirm, before the newsletter's name",
	"confirm.successBeforeFrom": "Confirm page, after they confirm, between the name and the sender",
	"confirm.successAfterFrom": "Confirm page, after they confirm, after the sender",
	"confirm.archive": "Confirm page and keep page, link to past issues",
	"confirm.pendingTitle": "Confirm page, before the click lands",
	"confirm.pendingBody": "Confirm page, before the click lands",
	"confirm.button": "Confirm page button",
	"confirm.confirming": "Confirm page button while it saves",
	"confirm.successTitle": "Confirm page, after they confirm",
	"keep.metaTitle": "Keep-getting-the-newsletter page title",
	"keep.invalidTitle": "Keep page, a link that doesn't verify",
	"keep.invalidBody": "Keep page, before the newsletter loads",
	"keep.formInvalid": "Keep page, a link that failed once the form ran",
	"keep.signUpAgain": "Keep page button back to the website",
	"keep.successTitle": "Keep page, after they say yes",
	"keep.successBody": "Keep page, after they say yes",
	"keep.archive": "Keep page, link to past issues",
	"keep.promptTitle": "Keep page, before they answer",
	"keep.promptBody": "Keep page, before they answer",
	"keep.busy": "Keep page, too many clicks",
	"keep.button": "Keep page button",
	"keep.saving": "Keep page button while it saves",
	"signup.button": "Signup form button, and the website's subscribe button, when the owner left the default",
	"signup.placeholder": "Signup form email placeholder, when the owner left the default",
	"signup.firstName": "Signup form first-name field, including the form an owner pastes",
	"signup.emailLabel": "Signup form email field, for screen readers, including the form an owner pastes",
	"signup.subscribeTo": "Signup form page title",
	"signup.subscribedTitle": "Signup form, after a signup that needs no confirmation",
	"signup.subscribedBody": "Signup form, after a signup that needs no confirmation",
	"signup.checkInbox": "Signup form, while a confirmation email is waiting",
	"signup.confirmBefore": "Signup form, before the address in the confirmation note",
	"signup.confirmAfter": "Signup form, after the address in the confirmation note",
	"signup.notThere": "Signup form, under the confirmation note",
	"signup.archiveSuccess": "Website signup form, after they subscribe",
	"signup.notYet": "Website signup form, while confirmation is waiting",
	"signup.notYetBefore": "Website signup form, before the address in that note",
	"signup.notYetAfter": "Website signup form, after the address in that note",
	"signup.openInbox": "Button that opens the reader's inbox",
	"signup.checkSpam": "Website signup form, under the inbox button",
	"signup.donePendingTitle": "Page the plain HTML form lands on, while confirmation is waiting",
	"signup.donePendingText": "Page the plain HTML form lands on, while confirmation is waiting",
	"signup.doneSubscribedTitle": "Page the plain HTML form lands on, after they subscribe",
	"signup.doneSubscribedText": "Page the plain HTML form lands on, after they subscribe",
	"signup.failedTitle": "Page the plain HTML form lands on, when it failed",
	"signup.expired": "Page the plain HTML form lands on, when the link expired",
	"signup.backTo": "Page the plain HTML form lands on, link back to the site",
	"signup.tryAgain": "Signup form, when the request fails",
	"signup.openLabel": "Signup form script, the word before the inbox's name",
	"signup.enterEmail": "Website and embed signup errors",
	"signup.couldnt": "Website signup, when the browser check refuses it",
	"signup.tooMany": "Website and embed signup, too many from one network",
	"signup.notTaking": "Website signup, when the newsletter isn't taking them",
	"signup.cantAdd": "Website and embed signup, a spam-trap address",
	"signup.undeliverable": "Website and embed signup, an address that can't receive email",
	"signup.noMail": "Website and embed signup, a domain with no mail server",
	"signup.didYouMean": "Website and embed signup, a misspelled domain",
	"signup.formOff": "Embed signup, when the form is off",
	"signup.notBrowser": "Embed signup, when it doesn't look like a browser",
	"signup.otherSite": "Embed signup, from a site that isn't allowed",
	"signup.tooFast": "Embed signup, posted immediately",
	"signup.expiredForm": "Embed signup, an old form token",
	"signup.tooManyToday": "Embed signup, one address too many times",
	"signup.busy": "Embed signup, the form's own limit",
	"signup.alreadyUsed": "Embed signup, a form token already used",
	"signup.closedForNow": "Embed frame, when signups are off",
	"signup.wrongSite": "Embed frame, on a site that isn't allowed",
	"signup.tooManyVisits": "Embed frame, too many loads from one network",
	"signup.noticeTitle": "Embed frame title, when there's no form to show",
	"archive.featured": "Website home, pinned issues",
	"archive.latest": "Website home, the newest issue",
	"archive.allIssues": "Website home, the list of issues",
	"archive.keepReading": "Issue page, other issues",
	"archive.allIssuesLink": "Issue page, back to every issue",
	"archive.subscribe": "Website header button",
	"archive.free": "Subscribe dialog, under the form",
	"archive.joinReaders": "Subscribe dialog title, and the share image, from 100 readers",
	"archive.joinLine": "Website home, from 100 readers",
	"archive.subscribeTo": "Subscribe dialog title, under 100 readers",
	"archive.writes": "Author page, before the newsletter's name",
	"archive.issueCount": "Author page, after the newsletter's name",
	"archive.issuesBy": "Author page, above their issues",
	"archive.byPrefix": "Issue page byline, before the author's name",
	"archive.viewLabel": "View count, for screen readers",
	"archive.humansRead": "View count tooltip",
	"archive.shareOn": "Issue page, share links. The network's name stays as it is",
	"appearance.label": "Website footer, the color switch",
	"appearance.system": "Website footer, the color switch",
	"appearance.light": "Website footer, the color switch",
	"appearance.dark": "Website footer, the color switch",
};

function leaves(value, prefix = "", out = []) {
	if (typeof value === "function" || typeof value === "string") out.push([prefix, value]);
	else for (const [key, child] of Object.entries(value)) leaves(child, prefix ? `${prefix}.${key}` : key, out);
	return out;
}

function show(key, value) {
	if (typeof value !== "function") return value;
	if (key.endsWith("viewLabel")) return value(2);
	if (key.endsWith("humansRead")) return value("1,250", 1250);
	if (key.endsWith("joinReaders") || key.endsWith("joinLine")) return value(120);
	if (key.endsWith("issueCount")) return value(3);
	if (key.endsWith("didYouMean")) return value("gmail.com");
	if (key.endsWith("openInbox")) return value("Gmail");
	if (key.endsWith("backTo")) return value("example.com");
	if (key.endsWith("shareOn")) return value("X");
	if (key.endsWith("issuesBy")) return value("Jane");
	if (key.endsWith("Line") || key.endsWith("unsubscribeLine") || key.endsWith("readOnlineLine")) return value("https://example.com/unsubscribe");
	if (key === "footer.by") return value("Jane Doe");
	return value("Field notes");
}

const rows = leaves(en);
const missing = rows.filter(([key]) => !WHERE[key]).map(([key]) => key);
if (missing.length) {
	console.error(missing.join("\n"));
	process.exit(1);
}

function cell(value) {
	return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

const lines = [
	"# Reader-facing strings",
	"",
	"Draft for review. English is what MailCheap already says. Russian is a draft in formal вы. Change the Russian in `lib/locales/ru.js`.",
	"",
	"Dates and numbers are not in this table. English keeps the en-US formats the app already uses (`Oct 7, 2026`, `April 12, 1991`, `1,250`). Russian uses `ru-RU` for the same values. Counts on the website use Russian plural forms (выпуск, читатель, просмотр).",
	"",
	"Examples below use the name Field notes, the address https://example.com/unsubscribe, and a small count, where a string takes one.",
	"",
	"| Key | Where it appears | English | Russian draft |",
	"| --- | --- | --- | --- |",
];

const ruLeaves = new Map(leaves(ru));
for (const [key, value] of rows) {
	lines.push(`| \`${key}\` | ${cell(WHERE[key])} | ${cell(show(key, value))} | ${cell(show(key, ruLeaves.get(key)))} |`);
}

console.log(lines.join("\n"));
