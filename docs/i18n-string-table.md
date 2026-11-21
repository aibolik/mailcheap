# Reader-facing strings

Draft for review. English is what MailCheap already says. Russian is a draft in formal вы. Change the Russian in `lib/locales/ru.js`.

Dates and numbers are not in this table. English keeps the en-US formats the app already uses (`Oct 7, 2026`, `April 12, 1991`, `1,250`). Russian uses `ru-RU` for the same values. Counts on the website use Russian plural forms (выпуск, читатель, просмотр).

Examples below use the name Field notes, the address https://example.com/unsubscribe, and a small count, where a string takes one.

| Key | Where it appears | English | Russian draft |
| --- | --- | --- | --- |
| `footer.reason` | Email footer, and the same line under an issue in the campaign editor | You're receiving this because you subscribed to Field notes. | Вы получаете это письмо, потому что подписаны на Field notes. |
| `footer.unsubscribe` | Email footer link, and the campaign editor's footer | Unsubscribe | Отписаться |
| `footer.unsubscribeLine` | Plain-text email footer | Unsubscribe: https://example.com/unsubscribe | Отписаться: https://example.com/unsubscribe |
| `footer.readOnline` | Link to the issue's page at the top of an email | Read online | Читать в браузере |
| `footer.readOnlineLine` | Plain-text email, above the body | Read online: https://example.com/unsubscribe | Читать в браузере: https://example.com/unsubscribe |
| `footer.by` | Author byline in an email | By Jane Doe | Автор: Jane Doe |
| `confirmation.fallbackName` | Built-in confirmation email, when the newsletter has no name | the newsletter | рассылку |
| `confirmation.subject` | Built-in confirmation email subject | Confirm your subscription to Field notes | Подтвердите подписку на Field notes |
| `confirmation.preview` | Built-in confirmation email preview text | One click and you're in. Until then, you won't get Field notes. | Одно нажатие — и вы подписаны. Пока вы не подтвердите, Field notes вам не придёт. |
| `confirmation.headline` | Built-in confirmation email, bold first line | One click and you're in. | Одно нажатие — и вы подписаны. |
| `confirmation.intro` | Built-in confirmation email, the line that names the newsletter | You asked to get Field notes. | Вы попросили присылать Field notes. |
| `confirmation.nextStep` | Built-in confirmation email, the line after the intro | Confirm your email and the next issue lands in your inbox. | Подтвердите адрес, и следующий выпуск придёт вам на почту. |
| `confirmation.button` | Built-in confirmation email button, and the confirm page button | Confirm my subscription | Подтвердить подписку |
| `confirmation.ignore` | Built-in confirmation email, last line | Didn't sign up? Ignore this email and you won't hear from us again. | Не подписывались? Просто не отвечайте на это письмо — больше мы не напишем. |
| `lastChance.fallbackName` | Built-in last-chance email, when the newsletter has no name | this newsletter | эту рассылку |
| `lastChance.subject` | Built-in last-chance email subject | Do you still want Field notes? | Вы ещё хотите получать Field notes? |
| `lastChance.preview` | Built-in last-chance email preview text | Click the button, and it keeps coming. | Нажмите кнопку — и она будет приходить дальше. |
| `lastChance.headline` | Built-in last-chance email, bold first line | Do you still want Field notes? | Вы ещё хотите получать Field notes? |
| `lastChance.body` | Built-in last-chance email body | You haven't opened it in a while, so I'm checking before I stop sending it. | Вы давно её не открывали, поэтому я спрашиваю, прежде чем перестать её присылать. |
| `lastChance.button` | Built-in last-chance email button, and the keep page button | Yes, keep sending it | Да, присылайте дальше |
| `lastChance.goodbye` | Built-in last-chance email, last line | If I don't hear from you, this is the last Field notes email you'll get. | Если вы не ответите, это последнее письмо Field notes, которое вы получите. |
| `welcome.fallbackName` | Welcome email prefill, when the newsletter has no name | the newsletter | рассылку |
| `welcome.subject` | Welcome email prefill, only while the editor is still empty | Welcome to Field notes | Добро пожаловать в Field notes |
| `welcome.thanks` | Welcome email prefill, first paragraph | Thanks for joining Field notes. | Спасибо, что подписались на Field notes. |
| `welcome.next` | Welcome email prefill, second paragraph | The next issue lands in your inbox. Hit reply to say hi. | Следующий выпуск придёт вам на почту. Ответьте на это письмо, если хотите сказать привет. |
| `unsubscribe.metaTitle` | Unsubscribe page title | Unsubscribe | Отписка |
| `unsubscribe.button` | Unsubscribe page button | Unsubscribe | Отписаться |
| `unsubscribe.invalidTitle` | Unsubscribe page, a link that doesn't verify | This link doesn't work | Эта ссылка не работает |
| `unsubscribe.invalidBody` | Unsubscribe page, a link that doesn't verify | Open the unsubscribe link from the email again, or reply to the email to ask to be removed. | Откройте ссылку из письма ещё раз или ответьте на письмо и попросите удалить вас из рассылки. |
| `unsubscribe.confirmTitle` | Unsubscribe page, before they confirm | Unsubscribe from Field notes? | Отписаться от Field notes? |
| `unsubscribe.confirmBody` | Unsubscribe page, before they confirm | You'll stop receiving its emails. | Вы больше не будете получать её письма. |
| `unsubscribe.errorTitle` | Unsubscribe page, when saving fails | Something went wrong | Что-то пошло не так |
| `unsubscribe.errorBody` | Unsubscribe page, when saving fails | You're still subscribed to Field notes. Try again in a minute. | Вы всё ещё подписаны на Field notes. Попробуйте ещё раз через минуту. |
| `unsubscribe.doneTitle` | Unsubscribe page, after they unsubscribe | You're unsubscribed | Вы отписались |
| `unsubscribe.doneBody` | Unsubscribe page, after they unsubscribe | You won't receive emails from Field notes anymore. | Письма Field notes больше не будут приходить. |
| `confirm.metaTitle` | Confirm-subscription page title | Confirm your subscription | Подтвердите подписку |
| `confirm.invalidTitle` | Confirm page, a link that doesn't verify | This link doesn't work | Эта ссылка не работает |
| `confirm.invalidBody` | Confirm page, a link that doesn't verify | It may be older than 30 days. Sign up again and use the newest confirmation email. | Ей может быть больше 30 дней. Подпишитесь снова и перейдите по ссылке из последнего письма. |
| `confirm.successBeforeName` | Confirm page, after they confirm, before the newsletter's name | The next issue of  | Следующий выпуск  |
| `confirm.successBeforeFrom` | Confirm page, after they confirm, between the name and the sender |  comes from  |  придёт от  |
| `confirm.successAfterFrom` | Confirm page, after they confirm, after the sender | . If it lands in Promotions, drag it to Primary. | . Если письмо попадёт в «Промоакции», перетащите его в «Основные». |
| `confirm.archive` | Confirm page and keep page, link to past issues | Read past issues | Читать прошлые выпуски |
| `confirm.pendingTitle` | Confirm page, before the click lands | Confirm your subscription to Field notes | Подтвердите подписку на Field notes |
| `confirm.pendingBody` | Confirm page, before the click lands | One click and the next issue lands in your inbox. | Одно нажатие — и следующий выпуск придёт вам на почту. |
| `confirm.button` | Confirm page button | Confirm my subscription | Подтвердить подписку |
| `confirm.confirming` | Confirm page button while it saves | Confirming… | Подтверждаем… |
| `confirm.successTitle` | Confirm page, after they confirm | You're in | Вы подписаны |
| `keep.metaTitle` | Keep-getting-the-newsletter page title | Keep getting the newsletter | Оставить подписку |
| `keep.invalidTitle` | Keep page, a link that doesn't verify | This link doesn't work | Эта ссылка не работает |
| `keep.invalidBody` | Keep page, before the newsletter loads | It may be older than 90 days. Sign up again to keep getting the newsletter. | Ей может быть больше 90 дней. Подпишитесь снова, чтобы и дальше получать рассылку. |
| `keep.formInvalid` | Keep page, a link that failed once the form ran | It may be older than 90 days, or you unsubscribed. Sign up again to get Field notes. | Ей может быть больше 90 дней, или вы уже отписались. Подпишитесь снова, чтобы получать Field notes. |
| `keep.signUpAgain` | Keep page button back to the website | Sign up again | Подписаться снова |
| `keep.successTitle` | Keep page, after they say yes | You'll keep getting Field notes | Вы продолжите получать Field notes |
| `keep.successBody` | Keep page, after they say yes | Thanks for letting me know. The next issue lands in your inbox. | Спасибо, что ответили. Следующий выпуск придёт вам на почту. |
| `keep.archive` | Keep page, link to past issues | Read past issues | Читать прошлые выпуски |
| `keep.promptTitle` | Keep page, before they answer | Keep getting Field notes? | Продолжить получать Field notes? |
| `keep.promptBody` | Keep page, before they answer | One click and it keeps coming. | Одно нажатие — и она будет приходить дальше. |
| `keep.busy` | Keep page, too many clicks | Too many clicks from your network. Try again in a few minutes. | Слишком много нажатий из вашей сети. Попробуйте ещё раз через несколько минут. |
| `keep.button` | Keep page button | Yes, keep sending it | Да, присылайте дальше |
| `keep.saving` | Keep page button while it saves | Saving… | Сохраняем… |
| `signup.button` | Signup form button, and the website's subscribe button, when the owner left the default | Subscribe | Подписаться |
| `signup.placeholder` | Signup form email placeholder, when the owner left the default | you@example.com | вы@example.com |
| `signup.firstName` | Signup form first-name field, including the form an owner pastes | First name | Имя |
| `signup.emailLabel` | Signup form email field, for screen readers, including the form an owner pastes | Email | Эл. почта |
| `signup.subscribeTo` | Signup form page title | Subscribe to Field notes | Подписаться на Field notes |
| `signup.subscribedTitle` | Signup form, after a signup that needs no confirmation | You're in | Вы подписаны |
| `signup.subscribedBody` | Signup form, after a signup that needs no confirmation | The next issue lands in your inbox. | Следующий выпуск придёт вам на почту. |
| `signup.checkInbox` | Signup form, while a confirmation email is waiting | Check your inbox | Проверьте почту |
| `signup.confirmBefore` | Signup form, before the address in the confirmation note | Click the link we sent to  | Нажмите ссылку, которую мы отправили на  |
| `signup.confirmAfter` | Signup form, after the address in the confirmation note |  to confirm. Until you do, you won't get a single issue. | , чтобы подтвердить. Пока вы этого не сделаете, ни одного выпуска не придёт. |
| `signup.notThere` | Signup form, under the confirmation note | Not there? Look in Promotions or Spam. | Не пришло? Загляните в «Промоакции» или «Спам». |
| `signup.archiveSuccess` | Website signup form, after they subscribe | You're in. The next issue lands in your inbox. | Вы подписаны. Следующий выпуск придёт вам на почту. |
| `signup.notYet` | Website signup form, while confirmation is waiting | You're not subscribed yet | Подписка ещё не подтверждена |
| `signup.notYetBefore` | Website signup form, before the address in that note | Click the link we just sent to  | Нажмите ссылку, которую мы только что отправили на  |
| `signup.notYetAfter` | Website signup form, after the address in that note | . Until you do, you won't get a single issue. | . Пока вы этого не сделаете, ни одного выпуска не придёт. |
| `signup.openInbox` | Button that opens the reader's inbox | Open Gmail | Открыть Gmail |
| `signup.checkSpam` | Website signup form, under the inbox button | Not in your inbox? Check Promotions or Spam. | Нет во входящих? Проверьте «Промоакции» и «Спам». |
| `signup.donePendingTitle` | Page the plain HTML form lands on, while confirmation is waiting | Check your inbox | Проверьте почту |
| `signup.donePendingText` | Page the plain HTML form lands on, while confirmation is waiting | Click the link we just sent you to confirm. Until you do, you won't get a single issue. | Нажмите ссылку из письма, чтобы подтвердить. Пока вы этого не сделаете, ни одного выпуска не придёт. |
| `signup.doneSubscribedTitle` | Page the plain HTML form lands on, after they subscribe | You're in | Вы подписаны |
| `signup.doneSubscribedText` | Page the plain HTML form lands on, after they subscribe | The next issue of Field notes lands in your inbox. | Следующий выпуск Field notes придёт вам на почту. |
| `signup.failedTitle` | Page the plain HTML form lands on, when it failed | That didn't work | Не получилось |
| `signup.expired` | Page the plain HTML form lands on, when the link expired | This page expired. Go back and sign up again. | Эта страница устарела. Вернитесь и подпишитесь снова. |
| `signup.backTo` | Page the plain HTML form lands on, link back to the site | Back to example.com | Вернуться на example.com |
| `signup.tryAgain` | Signup form, when the request fails | Something went wrong. Try again. | Что-то пошло не так. Попробуйте ещё раз. |
| `signup.openLabel` | Signup form script, the word before the inbox's name | Open  | Открыть  |
| `signup.enterEmail` | Website and embed signup errors | Enter a valid email | Введите настоящий адрес |
| `signup.couldnt` | Website signup, when the browser check refuses it | Couldn't sign you up. Try again in a minute. | Не удалось подписать вас. Попробуйте ещё раз через минуту. |
| `signup.tooMany` | Website and embed signup, too many from one network | Too many signups from your network. Try again in a few minutes. | Слишком много подписок из вашей сети. Попробуйте ещё раз через несколько минут. |
| `signup.notTaking` | Website signup, when the newsletter isn't taking them | This newsletter is not taking signups | Эта рассылка сейчас не принимает подписки |
| `signup.cantAdd` | Website and embed signup, a spam-trap address | This address can't be added | Этот адрес нельзя добавить |
| `signup.undeliverable` | Website and embed signup, an address that can't receive email | This address can't receive email | На этот адрес нельзя доставить письмо |
| `signup.noMail` | Website and embed signup, a domain with no mail server | This email's domain can't receive email | Домен этого адреса не принимает почту |
| `signup.didYouMean` | Website and embed signup, a misspelled domain | Did you mean gmail.com? | Вы имели в виду gmail.com? |
| `signup.formOff` | Embed signup, when the form is off | This form isn't taking signups | Эта форма сейчас не принимает подписки |
| `signup.notBrowser` | Embed signup, when it doesn't look like a browser | Couldn't sign you up. Try again from the form. | Не удалось подписать вас. Попробуйте ещё раз из формы. |
| `signup.otherSite` | Embed signup, from a site that isn't allowed | This form doesn't take signups on this site | Эта форма не принимает подписки с этого сайта |
| `signup.tooFast` | Embed signup, posted immediately | One second, then try again. | Подождите секунду и попробуйте ещё раз. |
| `signup.expiredForm` | Embed signup, an old form token | This form expired. Reload the page and try again. | Эта форма устарела. Обновите страницу и попробуйте ещё раз. |
| `signup.tooManyToday` | Embed signup, one address too many times | This address signed up too many times today. Try again tomorrow. | Этот адрес подписывали слишком много раз сегодня. Попробуйте завтра. |
| `signup.busy` | Embed signup, the form's own limit | This form is busy. Try again in a few minutes. | Форма занята. Попробуйте ещё раз через несколько минут. |
| `signup.alreadyUsed` | Embed signup, a form token already used | This form was already used. Reload the page to sign up another address. | Эту форму уже использовали. Обновите страницу, чтобы подписать другой адрес. |
| `signup.closedForNow` | Embed frame, when signups are off | Signups are closed for now. | Подписка пока закрыта. |
| `signup.wrongSite` | Embed frame, on a site that isn't allowed | This form doesn't work on this site. | Эта форма не работает на этом сайте. |
| `signup.tooManyVisits` | Embed frame, too many loads from one network | Too many visits from your network. Try again in a few minutes. | Слишком много визитов из вашей сети. Попробуйте ещё раз через несколько минут. |
| `signup.noticeTitle` | Embed frame title, when there's no form to show | Signup form | Форма подписки |
| `archive.featured` | Website home, pinned issues | Featured | Избранное |
| `archive.latest` | Website home, the newest issue | Latest issue | Последний выпуск |
| `archive.allIssues` | Website home, the list of issues | All issues | Все выпуски |
| `archive.keepReading` | Issue page, other issues | Keep reading | Читайте также |
| `archive.allIssuesLink` | Issue page, back to every issue | All issues → | Все выпуски → |
| `archive.subscribe` | Website header button | Subscribe | Подписаться |
| `archive.free` | Subscribe dialog, under the form | Free. Unsubscribe anytime. | Бесплатно. Отписаться можно в любой момент. |
| `archive.joinReaders` | Subscribe dialog title, and the share image, from 100 readers | Join 120 readers | Уже 120 читателей |
| `archive.joinLine` | Website home, from 100 readers | Join 120 readers. Free, unsubscribe anytime. | Уже 120 читателей. Бесплатно, отписаться можно в любой момент. |
| `archive.subscribeTo` | Subscribe dialog title, under 100 readers | Subscribe to Field notes | Подписаться на Field notes |
| `archive.writes` | Author page, before the newsletter's name | Writes | Ведёт |
| `archive.issueCount` | Author page, after the newsletter's name | 3 issues | 3 выпуска |
| `archive.issuesBy` | Author page, above their issues | Issues by Jane | Выпуски: Jane |
| `archive.byPrefix` | Issue page byline, before the author's name | By  | Автор:  |
| `archive.viewLabel` | View count, for screen readers |  views |  просмотра |
| `archive.humansRead` | View count tooltip | 1,250 humans read this | 1,250 человек прочитали это |
| `archive.shareOn` | Issue page, share links. The network's name stays as it is | Share on X | Поделиться в X |
| `appearance.label` | Website footer, the color switch | Appearance | Оформление |
| `appearance.system` | Website footer, the color switch | System | Как в системе |
| `appearance.light` | Website footer, the color switch | Light | Светлая |
| `appearance.dark` | Website footer, the color switch | Dark | Тёмная |
