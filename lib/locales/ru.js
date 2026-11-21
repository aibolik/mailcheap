import { pluralRu, withNewsletterName } from "../reader-language.js";

const numberFormat = new Intl.NumberFormat("ru-RU");

function readers(count) {
	return pluralRu(count, "читатель", "читателя", "читателей");
}

function issues(count) {
	return pluralRu(count, "выпуск", "выпуска", "выпусков");
}

function views(count) {
	return pluralRu(count, "просмотр", "просмотра", "просмотров");
}

// The count is people; the thing they read is this one issue, so the noun stays singular and the verb follows the count.
function humansRead(count) {
	const verb = pluralRu(count, "человек прочитал", "человека прочитали", "человек прочитали");
	return `${numberFormat.format(count || 0)} ${verb} этот выпуск`;
}

function count(value) {
	return numberFormat.format(value || 0);
}

// Draft Russian for a human to review. Formal вы. Change the wording here.
const ru = {
	footer: {
		reason: (name) => withNewsletterName(name, (n) => `Вы получаете это письмо, потому что подписаны на ${n}.`, "Вы получаете это письмо, потому что подписаны на эту рассылку."),
		unsubscribe: "Отписаться",
		unsubscribeLine: (url) => `Отписаться: ${url}`,
		readOnline: "Читать в браузере",
		readOnlineLine: (url) => `Читать в браузере: ${url}`,
		by: (name) => `Автор: ${name}`,
	},
	confirmation: {
		subject: (name) => withNewsletterName(name, (n) => `Подтвердите подписку на ${n}`, "Подтвердите подписку на рассылку"),
		preview: (name) =>
			withNewsletterName(
				name,
				(n) => `Одно нажатие — и вы подписаны. Пока вы не подтвердите, ${n} вам не придёт.`,
				"Одно нажатие — и вы подписаны. Пока вы не подтвердите, рассылка вам не придёт."
			),
		headline: "Одно нажатие — и вы подписаны.",
		intro: (name) => withNewsletterName(name, (n) => `Вы подписались на ${n}.`, "Вы подписались на рассылку."),
		nextStep: "Подтвердите адрес, и следующий выпуск придёт вам на почту.",
		button: "Подтвердить подписку",
		ignore: "Не подписывались? Просто проигнорируйте это письмо — больше мы не напишем.",
	},
	lastChance: {
		subject: (name) => withNewsletterName(name, (n) => `Продолжать присылать ${n}?`, "Продолжать присылать рассылку?"),
		preview: "Нажмите кнопку — и письма будут приходить дальше.",
		headline: (name) => withNewsletterName(name, (n) => `Продолжать присылать ${n}?`, "Продолжать присылать рассылку?"),
		body: "Вы давно не открывали наши письма, поэтому уточняем, прежде чем перестать их присылать.",
		button: "Да, присылайте дальше",
		goodbye: (name) =>
			withNewsletterName(name, (n) => `Если вы не нажмёте кнопку, это письмо ${n} будет последним.`, "Если вы не нажмёте кнопку, это письмо будет последним."),
	},
	welcome: {
		subject: (name) => withNewsletterName(name, (n) => `Добро пожаловать в ${n}`, "Добро пожаловать в рассылку"),
		thanks: (name) => withNewsletterName(name, (n) => `Спасибо, что подписались на ${n}.`, "Спасибо, что подписались на рассылку."),
		next: "Следующий выпуск придёт вам на почту. А если хотите поздороваться, просто ответьте на это письмо.",
	},
	unsubscribe: {
		metaTitle: "Отписка",
		button: "Отписаться",
		invalidTitle: "Эта ссылка не работает",
		invalidBody: "Откройте ссылку из письма ещё раз или ответьте на письмо и попросите удалить вас из рассылки.",
		confirmTitle: (name) => withNewsletterName(name, (n) => `Отписаться от ${n}?`, "Отписаться от этой рассылки?"),
		confirmBody: "Вы больше не будете получать эти письма.",
		errorTitle: "Что-то пошло не так",
		errorBody: (name) => withNewsletterName(name, (n) => `Вы всё ещё подписаны на ${n}. Попробуйте ещё раз через минуту.`, "Вы всё ещё подписаны на эту рассылку. Попробуйте ещё раз через минуту."),
		doneTitle: "Вы отписались",
		doneBody: (name) => withNewsletterName(name, (n) => `Письма ${n} больше не будут приходить.`, "Письма этой рассылки больше не будут приходить."),
	},
	confirm: {
		metaTitle: "Подтвердите подписку",
		invalidTitle: "Эта ссылка не работает",
		invalidBody: "Возможно, ссылке больше 30 дней. Подпишитесь снова и перейдите по ссылке из последнего письма.",
		successBeforeName: "Следующий выпуск ",
		successBeforeFrom: " придёт от ",
		successAfterFrom: ". Если письмо попадёт в «Промоакции», перетащите его в «Основные».",
		archive: "Читать прошлые выпуски",
		pendingTitle: (name) => `Подтвердите подписку на ${name}`,
		pendingBody: "Одно нажатие — и следующий выпуск придёт вам на почту.",
		button: "Подтвердить подписку",
		confirming: "Подтверждаем…",
		successTitle: "Вы подписаны",
	},
	keep: {
		metaTitle: "Оставить подписку",
		invalidTitle: "Эта ссылка не работает",
		invalidBody: "Возможно, ссылке больше 90 дней. Подпишитесь снова, чтобы и дальше получать рассылку.",
		formInvalid: (name) =>
			withNewsletterName(
				name,
				(n) => `Возможно, ссылке больше 90 дней или вы уже отписались. Подпишитесь снова, чтобы получать ${n}.`,
				"Возможно, ссылке больше 90 дней или вы уже отписались. Подпишитесь снова, чтобы получать рассылку."
			),
		signUpAgain: "Подписаться снова",
		successTitle: (name) => `Вы продолжите получать ${name}`,
		successBody: "Спасибо, что ответили. Следующий выпуск придёт вам на почту.",
		archive: "Читать прошлые выпуски",
		promptTitle: (name) => `Продолжить получать ${name}?`,
		promptBody: "Одно нажатие — и письма будут приходить дальше.",
		busy: "Слишком много нажатий из вашей сети. Попробуйте ещё раз через несколько минут.",
		button: "Да, присылайте дальше",
		saving: "Сохраняем…",
	},
	signup: {
		button: "Подписаться",
		placeholder: "name@example.com",
		firstName: "Имя",
		emailLabel: "Эл. почта",
		subscribeTo: (name) => `Подписаться на ${name}`,
		subscribedTitle: "Вы подписаны",
		subscribedBody: "Следующий выпуск придёт вам на почту.",
		checkInbox: "Проверьте почту",
		confirmBefore: "Нажмите ссылку, которую мы отправили на ",
		confirmAfter: ", чтобы подтвердить. Пока вы этого не сделаете, ни одного выпуска не придёт.",
		notThere: "Не пришло? Загляните в «Промоакции» или «Спам».",
		archiveSuccess: "Вы подписаны. Следующий выпуск придёт вам на почту.",
		notYet: "Подписка ещё не подтверждена",
		notYetBefore: "Нажмите ссылку, которую мы только что отправили на ",
		notYetAfter: ". Пока вы этого не сделаете, ни одного выпуска не придёт.",
		openInbox: (name) => `Открыть ${name}`,
		checkSpam: "Нет во входящих? Проверьте «Промоакции» и «Спам».",
		donePendingTitle: "Проверьте почту",
		donePendingText: "Нажмите ссылку из письма, чтобы подтвердить. Пока вы этого не сделаете, ни одного выпуска не придёт.",
		doneSubscribedTitle: "Вы подписаны",
		doneSubscribedText: (name) => `Следующий выпуск ${name} придёт вам на почту.`,
		failedTitle: "Не получилось",
		expired: "Эта страница устарела. Вернитесь и подпишитесь снова.",
		backTo: (host) => `Вернуться на ${host}`,
		tryAgain: "Что-то пошло не так. Попробуйте ещё раз.",
		openLabel: "Открыть ",
		enterEmail: "Введите корректный адрес",
		couldnt: "Не удалось подписать вас. Попробуйте ещё раз через минуту.",
		tooMany: "Слишком много подписок из вашей сети. Попробуйте ещё раз через несколько минут.",
		notTaking: "Эта рассылка сейчас не принимает подписки",
		cantAdd: "Этот адрес нельзя добавить",
		undeliverable: "На этот адрес нельзя доставить письмо",
		noMail: "Домен этого адреса не принимает почту",
		didYouMean: (suggestion) => `Вы имели в виду ${suggestion}?`,
		formOff: "Эта форма сейчас не принимает подписки",
		notBrowser: "Не удалось подписать вас. Попробуйте ещё раз из формы.",
		otherSite: "Эта форма не принимает подписки с этого сайта",
		tooFast: "Подождите секунду и попробуйте ещё раз.",
		expiredForm: "Эта форма устарела. Обновите страницу и попробуйте ещё раз.",
		tooManyToday: "Этот адрес подписывали слишком много раз сегодня. Попробуйте завтра.",
		busy: "Форма сейчас перегружена. Попробуйте ещё раз через несколько минут.",
		alreadyUsed: "Эту форму уже использовали. Обновите страницу, чтобы подписать другой адрес.",
		closedForNow: "Подписка пока закрыта.",
		wrongSite: "Эта форма не работает на этом сайте.",
		tooManyVisits: "Слишком много запросов из вашей сети. Попробуйте ещё раз через несколько минут.",
		noticeTitle: "Форма подписки",
	},
	archive: {
		featured: "Избранное",
		latest: "Последний выпуск",
		allIssues: "Все выпуски",
		keepReading: "Читайте также",
		allIssuesLink: "Все выпуски →",
		subscribe: "Подписаться",
		free: "Бесплатно. Отписаться можно в любой момент.",
		joinReaders: (n) => `Уже ${count(n)} ${readers(n)}`,
		joinLine: (n) => `Уже ${count(n)} ${readers(n)}. Бесплатно, отписаться можно в любой момент.`,
		subscribeTo: (name) => `Подписаться на ${name}`,
		writes: "Ведёт",
		issueCount: (n) => `${count(n)} ${issues(n)}`,
		issuesBy: (name) => `Выпуски: ${name}`,
		byPrefix: "Автор: ",
		viewLabel: (n) => ` ${views(n)}`,
		humansRead: (_exact, n) => humansRead(n),
		shareOn: (name) => `Поделиться в ${name}`,
	},
	appearance: {
		label: "Оформление",
		system: "Как в системе",
		light: "Светлая",
		dark: "Тёмная",
	},
};

export default ru;
