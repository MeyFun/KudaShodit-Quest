// =========================================================
// Задачи страницы «Расчёты» — Алёна Фендель
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    function debtCard(group, who, sum) {
        return '<article class="card debt">\n    <p class="small">' + group + '</p>\n    <h3>' + who + '</h3>\n' +
            '    <p class="debt-sum">' + sum + '</p>\n    <button class="chip-button" type="button">Отметить перевод</button>\n</article>';
    }
    const card1 = debtCard('Поездка на Алтай', 'Максим → Вы', '680 ₽');
    const card2 = debtCard('Бар в пятницу', 'Вы → Лена', '850 ₽');
    const collectionsLink = '<a class="link" href="../collections/collections.html">К сборам →</a>';
    const listHtml = '<div class="settlements">\n' + indent(card1) + '\n\n' + indent(card2) + '\n</div>\n\n' + collectionsLink;

    const sectionHtml =
        '<main class="container main">\n    <div class="section-head">\n        <div>\n' +
        '            <h2>Взаиморасчёты</h2>\n            <p>Список подсказывает, кто кому должен. Отметьте перевод после оплаты.</p>\n        </div>\n' +
        '        <button class="chip-button chip-button-big open-reminder" type="button"><img src="../img/send.svg" alt="" width="13" height="11"> Текст напоминания</button>\n' +
        '    </div>\n\n    <p class="empty-text">Все группы рассчитались.</p>\n</main>';

    const gridCss = '.settlements {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n}\n\n' + T.css.card;
    const sumCss = '.debt-sum {\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 22px;\n    font-weight: 700;\n}\n\n' +
        '.debt .chip-button {\n    align-self: flex-start;\n}\n';
    const hideCss = '.hide {\n    display: none;\n}\n';

    function paymentModal(open, buttons) {
        return '<dialog class="modal payment-modal"' + (open ? ' open' : '') + '>\n    <form class="modal-form payment-form">\n' +
            '        <h2>Отметить перевод</h2>\n        <p class="payment-note">Поездка на Алтай · Максим → Вы · 680 ₽</p>\n' +
            '        <p class="small">Подтвердите только уже сделанный перевод.</p>\n' + buttons + '    </form>\n</dialog>';
    }
    const paymentButtons =
        '        <div class="modal-buttons">\n            <button class="button" type="submit">Подтвердить</button>\n' +
        '            <button class="chip-button close-modal" type="button">Отмена</button>\n        </div>\n';

    function reminderModal(open, field) {
        return '<dialog class="modal reminder-modal"' + (open ? ' open' : '') + '>\n    <div class="modal-form">\n        <h2>Текст напоминания</h2>\n' + field +
            '        <p class="small copy-status"></p>\n        <div class="modal-buttons">\n' +
            '            <button class="button copy-button" type="button">Скопировать</button>\n' +
            '            <button class="chip-button close-modal" type="button">Закрыть</button>\n        </div>\n    </div>\n</dialog>';
    }
    const reminderField = '        <label class="modal-field">Скопируйте текст и отправьте участникам <textarea rows="5" readonly></textarea></label>\n';
    const textareaCss = '.modal-field textarea {\n    width: 100%;\n    padding: 8px 12px;\n    background: #f6f3f4;\n    border: 1px solid #eae7e8;\n    border-radius: 12px;\n}\n\n' +
        '.modal textarea {\n    resize: vertical;\n}\n\n';

    const jsReady = T.js.data + '\n' + T.js.debts + '\n' + T.js.close;

    const showDebtsJs =
        "function createDebtCard(debt) {\n    const card = document.createElement('article');\n    card.classList.add('card', 'debt');\n" +
        "    const who = document.createElement('h3');\n    who.textContent = debt.from + ' → ' + debt.to;\n" +
        "    const sum = document.createElement('p');\n    sum.classList.add('debt-sum');\n    sum.textContent = money(debt.sum);\n" +
        "    const button = document.createElement('button');\n    button.classList.add('chip-button');\n    button.type = 'button';\n" +
        "    button.textContent = 'Отметить перевод';\n    button.addEventListener('click', function () {\n        currentDebt = debt;\n" +
        "        paymentModal.showModal();\n    });\n    card.append(who, sum, button);\n    settlementsList.append(card);\n}\n\n" +
        "function showDebts() {\n    settlementsList.textContent = '';\n    getDebts(data).forEach(createDebtCard);\n}\n\nshowDebts();\n";

    function savedPayments() {
        const saved = JSON.parse(localStorage.getItem('split') || 'null');
        return saved ? saved.payments : [];
    }

    QUEST_TASKS.settlements = [
        // 1
        T.base(),

        // 2
        T.header('settlements'),

        // 3
        T.sectionHead(sectionHtml, {
            text: '<li><code>.empty-text</code> (надпись, когда долгов нет): отступы <code>10px 16px</code>, текст <code>14px</code>, ' +
                'фон <code>#f6f3f4</code>, скругление <code>16px</code></li>',
            css: '.empty-text {\n    \n}\n\n',
            answer: '.empty-text {\n    padding: 10px 16px;\n    font-size: 14px;\n    background: #f6f3f4;\n    border-radius: 16px;\n}\n\n',
            checks: [
                ['.empty-text: фон #f6f3f4, скругление 16px', function (t) {
                    return t.color('.empty-text', 'background-color') === '#f6f3f4' && t.px('.empty-text', 'border-top-left-radius') === 16;
                }],
                ['.empty-text: отступы 10px 16px, текст 14px', function (t) {
                    return t.px('.empty-text', 'padding-top') === 10 && t.px('.empty-text', 'padding-left') === 16 && t.px('.empty-text', 'font-size') === 14;
                }],
            ],
        }),

        // 4
        {
            title: 'Карточка долга: разметка',
            kind: 'HTML',
            text: '<p>Карточки долгов на сайте создаёт JS, но сначала разметим их вручную, чтобы понять устройство. Первая готова, ' +
                'сделай вторую — «Бар в пятницу»: <b>Вы → Лена</b>, <b>850 ₽</b>:</p><ul>' +
                '<li><code>&lt;article class="card debt"&gt;</code></li>' +
                '<li>внутри: <code>&lt;p class="small"&gt;</code> с названием группы, <code>&lt;h3&gt;</code> «кто → кому», ' +
                '<code>&lt;p class="debt-sum"&gt;</code> с суммой и кнопка <code>&lt;button class="chip-button" type="button"&gt;Отметить перевод&lt;/button&gt;</code></li></ul>' +
                '<p>Под сеткой добавь ссылку <code>&lt;a class="link" href="../collections/collections.html"&gt;К сборам →&lt;/a&gt;</code></p>',
            hint: ['<article class="...">', '<p class="...">', '<h3>', '<button type="button">', '<a class="link" href="...">'],
            start: {
                html: '<div class="settlements">\n' + indent(card1) + '\n\n    <!-- сюда вторую карточку -->\n\n</div>\n\n<!-- сюда ссылку -->\n',
                css: gridCss + '\n' + sumCss + '\n' + T.css.common,
            },
            answer: { html: listHtml },
            checks: [
                ['Две карточки .debt', function (t) { return t.all('.settlements .debt').length === 2; }],
                ['У второй классы card и debt', function (t) { return t.all('.debt')[1].classList.contains('card'); }],
                ['Группа «Бар в пятницу» в p.small', function (t) { return t.text(t.all('.debt')[1].querySelector('p.small')) === 'Бар в пятницу'; }],
                ['Заголовок «Вы → Лена»', function (t) { return t.text(t.all('.debt')[1].querySelector('h3')) === 'Вы → Лена'; }],
                ['Сумма 850 ₽ в .debt-sum', function (t) { return t.text(t.all('.debt')[1].querySelector('.debt-sum')).replace(/\s/g, '') === '850₽'; }],
                ['Кнопка «Отметить перевод»', function (t) {
                    const b = t.all('.debt')[1].querySelector('button.chip-button');
                    return !!b && b.textContent.trim() === 'Отметить перевод';
                }],
                ['Ссылка «К сборам →» на сборы', function (t) { return t.attr('a.link', 'href') === '../collections/collections.html'; }],
            ],
        },

        // 5
        {
            title: 'Сетка и карточки',
            kind: 'CSS',
            text: '<p>Разложим долги по двум колонкам и оформим карточки:</p><ul>' +
                '<li><code>.settlements</code>: сетка из колонок <code>1fr 1fr</code>, промежуток <code>16px</code></li>' +
                '<li><code>.card</code>: столбиком, промежуток <code>16px</code>, отступы <code>24px</code>, белый фон <code>#ffffff</code>, ' +
                'скругление <code>48px</code>, лёгкая тень <code>box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)</code></li>' +
                '<li><code>.card h3</code>: размер <code>18px</code></li></ul>',
            hint: ['display: grid', 'grid-template-columns: 1fr 1fr', 'flex-direction: column', 'box-shadow', 'rgba(...)'],
            start: {
                html: listHtml,
                css: '.settlements {\n    \n}\n\n.card {\n    \n}\n\n.card h3 {\n    \n}\n\n/* Уже готово */\n' + sumCss + '\n' + T.css.common,
            },
            answer: { css: gridCss },
            checks: [
                ['.settlements — сетка из 2 колонок', function (t) {
                    return t.css('.settlements', 'display') === 'grid' && t.css('.settlements', 'grid-template-columns').split(' ').length === 2;
                }],
                ['.settlements: промежуток 16px', function (t) { return t.css('.settlements', 'column-gap') === '16px'; }],
                ['.card: столбиком, промежуток 16px', function (t) {
                    return t.css('.card', 'display') === 'flex' && t.css('.card', 'flex-direction') === 'column' && t.css('.card', 'row-gap') === '16px';
                }],
                ['.card: белая, скругление 48px, отступы 24px', function (t) {
                    return t.color('.card', 'background-color') === '#ffffff' && t.px('.card', 'border-top-left-radius') === 48 &&
                        t.px('.card', 'padding-top') === 24;
                }],
                ['.card: есть тень', function (t) { return t.css('.card', 'box-shadow') !== 'none'; }],
                ['Заголовок карточки 18px', function (t) { return t.px('.card h3', 'font-size') === 18; }],
            ],
        },

        // 6
        {
            title: 'Сумма и кнопка',
            kind: 'CSS',
            text: '<p>Доделаем карточку долга:</p><ul>' +
                '<li><code>.debt-sum</code>: шрифт <code>"Manrope", Arial, sans-serif</code>, размер <code>22px</code>, жирность <code>700</code></li>' +
                '<li><code>.debt .chip-button</code>: кнопка не растягивается на всю ширину — <code>align-self: flex-start</code></li>' +
                '<li><code>.hide</code>: прячет элемент (<code>display: none</code>) — им JS прячет надпись «Все группы рассчитались»</li></ul>',
            hint: ['align-self: flex-start', 'display: none'],
            start: {
                html: '<p class="empty-text hide">Все группы рассчитались.</p>\n' + listHtml,
                css: '.debt-sum {\n    \n}\n\n.debt .chip-button {\n    \n}\n\n.hide {\n    \n}\n\n/* Уже готово */\n' + gridCss + '\n' + T.css.common,
            },
            answer: { css: sumCss + '\n' + hideCss },
            checks: [
                ['.debt-sum: Manrope', function (t) { return t.css('.debt-sum', 'font-family').indexOf('Manrope') >= 0; }],
                ['.debt-sum: 22px, жирность 700', function (t) {
                    return t.px('.debt-sum', 'font-size') === 22 && t.css('.debt-sum', 'font-weight') === '700';
                }],
                ['Кнопка не растянута (align-self: flex-start)', function (t) { return t.css('.debt .chip-button', 'align-self') === 'flex-start'; }],
                ['.hide прячет надпись', function (t) { return !t.visible('.empty-text'); }],
            ],
        },

        // 7
        T.modalTask('Окно «Отметить перевод»',
            '<p>Окно подтверждения перевода. Разметка почти готова — добавь в конец формы ' +
            '<code>&lt;div class="modal-buttons"&gt;</code> с двумя кнопками: ' +
            '<code>&lt;button class="button" type="submit"&gt;Подтвердить&lt;/button&gt;</code> (отправляет форму) и ' +
            '<code>&lt;button class="chip-button close-modal" type="button"&gt;Отмена&lt;/button&gt;</code></p>',
            paymentModal(true, '        <!-- сюда блок с двумя кнопками -->\n\n'), paymentModal(true, paymentButtons),
            [
                ['В форме блок .modal-buttons', function (t) { return !!t.q('.payment-form .modal-buttons'); }],
                ['Кнопка «Подтвердить» type="submit"', function (t) {
                    const b = t.q('.modal-buttons .button');
                    return !!b && b.getAttribute('type') === 'submit' && b.textContent.trim() === 'Подтвердить';
                }],
                ['Кнопка «Отмена» с классом close-modal', function (t) {
                    const b = t.q('.modal-buttons .close-modal');
                    return !!b && b.getAttribute('type') === 'button';
                }],
            ],
            ['<div class="modal-buttons">', 'type="submit"']),

        // 8
        {
            title: 'Окно «Текст напоминания»',
            kind: 'HTML + CSS',
            text: '<p>В этом окне будет готовый текст для должников. После заголовка добавь поле для многострочного текста:</p><ul>' +
                '<li><code>&lt;label class="modal-field"&gt;Скопируйте текст и отправьте участникам &lt;textarea rows="5" readonly&gt;&lt;/textarea&gt;&lt;/label&gt;</code> — ' +
                '<code>rows</code> это высота в строках, <code>readonly</code> запрещает правку</li></ul>' +
                '<p>И оформи:</p><ul>' +
                '<li><code>.modal-field</code>: подпись и поле столбиком, промежуток <code>4px</code>, текст <code>14px</code> жирный</li>' +
                '<li><code>.modal-field textarea</code>: на всю ширину, отступы <code>8px 12px</code>, фон <code>#f6f3f4</code>, ' +
                'рамка <code>1px solid #eae7e8</code>, скругление <code>12px</code></li>' +
                '<li><code>.modal textarea</code>: менять размер можно только по высоте — <code>resize: vertical</code></li></ul>',
            hint: ['<textarea rows="5" readonly>', '<label class="modal-field">', 'border: 1px solid ...', 'resize: vertical'],
            start: {
                html: reminderModal(true, '        <!-- сюда поле с текстом -->\n\n'),
                css: '.modal-field {\n    \n}\n\n.modal-field textarea {\n    \n}\n\n.modal textarea {\n    \n}\n\n/* Уже готово */\n' +
                    T.css.modal + '\n.modal-buttons {\n    display: flex;\n    gap: 12px;\n}\n\n' + T.css.common,
            },
            answer: {
                html: reminderModal(true, reminderField),
                css: '.modal-field {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    font-size: 14px;\n    font-weight: 700;\n}\n\n' +
                    textareaCss + T.css.modal + '\n.modal-buttons {\n    display: flex;\n    gap: 12px;\n}\n\n' + T.css.common,
            },
            checks: [
                ['Есть textarea в .modal-field', function (t) { return !!t.q('.reminder-modal .modal-field textarea'); }],
                ['У textarea rows="5" и readonly', function (t) {
                    const a = t.q('textarea');
                    return !!a && a.getAttribute('rows') === '5' && a.hasAttribute('readonly');
                }],
                ['.modal-field: столбиком, промежуток 4px, 14px жирный', function (t) {
                    return t.css('.modal-field', 'flex-direction') === 'column' && t.css('.modal-field', 'row-gap') === '4px' &&
                        t.px('.modal-field', 'font-size') === 14 && t.css('.modal-field', 'font-weight') === '700';
                }],
                ['textarea: на всю ширину, фон #f6f3f4', function (t) {
                    return t.rule('.modal-field textarea', 'width') === '100%' && t.color('textarea', 'background-color') === '#f6f3f4';
                }],
                ['textarea: рамка 1px #eae7e8, скругление 12px', function (t) {
                    return Math.abs(t.px('textarea', 'border-top-width') - 1) <= 0.5 && t.color('textarea', 'border-top-color') === '#eae7e8' &&
                        t.px('textarea', 'border-top-left-radius') === 12;
                }],
                ['Меняется только высота (resize: vertical)', function (t) { return t.css('textarea', 'resize') === 'vertical'; }],
            ],
        },

        // 9
        T.footer('settlements'),

        // 10
        {
            title: 'JS: бургер и карточки долгов',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>карточки долгов: для каждого долга из <code>getDebts(data)</code> создай карточку ' +
                '<code>document.createElement(\'article\')</code> с классами <code>card</code> и <code>debt</code>. В неё положи ' +
                '<code>&lt;h3&gt;</code> с текстом <code>debt.from + \' → \' + debt.to</code> и <code>&lt;p class="debt-sum"&gt;</code> ' +
                'с <code>money(debt.sum)</code> (<code>card.append(...)</code>), а саму карточку добавь в <code>.settlements</code></li></ul>' +
                '<p><code>createElement</code> создаёт новый тег, <code>append</code> кладёт его внутрь другого.</p>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", 'textContent', 'classList.add / remove', 'if / else', "classList.toggle('open')", 'getDebts(data).forEach', "document.createElement('article')", "classList.add('card', 'debt')", '.append(...)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n<div class="settlements"></div>',
                css: T.burgerCss + '\n' + gridCss + '\n' + sumCss,
                js: jsReady + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const settlementsList = document.querySelector('.settlements');\n\n// 1) бургер\n\n\n// 2) карточки долгов\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const settlementsList = document.querySelector('.settlements');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "getDebts(data).forEach(function (debt) {\n    const card = document.createElement('article');\n    card.classList.add('card', 'debt');\n" +
                    "    const who = document.createElement('h3');\n    who.textContent = debt.from + ' → ' + debt.to;\n" +
                    "    const sum = document.createElement('p');\n    sum.classList.add('debt-sum');\n    sum.textContent = money(debt.sum);\n" +
                    "    card.append(who, sum);\n    settlementsList.append(card);\n});",
            },
            checks: T.burgerChecks.concat([
                ['В .settlements 8 карточек долгов', function (t) { return t.all('.settlements .card.debt').length === 8; }],
                ['Первая карточка: «Максим → Вы»', function (t) { return t.text('.debt h3') === 'Максим → Вы'; }],
                ['Сумма первой: 680 ₽ в .debt-sum', function (t) { return t.text('.debt .debt-sum').replace(/\s/g, '') === '680₽'; }],
                ['Есть ваш долг «Вы → Лена»', function (t) {
                    return t.all('.debt h3').some(function (h) { return h.textContent.trim() === 'Вы → Лена'; });
                }],
            ]),
        },

        // 11
        {
            title: 'JS: отметить перевод',
            kind: 'JS',
            text: '<p>Карточки уже рисуются, а кнопка «Отметить перевод» запоминает долг в <code>currentDebt</code> и открывает окно. ' +
                'Допиши отправку формы окна:</p><ul>' +
                '<li>отмени перезагрузку</li>' +
                '<li>добавь в <code>data.payments</code> перевод <code>{ group: currentDebt.group, from: currentDebt.from, to: currentDebt.to, sum: currentDebt.sum }</code></li>' +
                '<li>сохрани <code>saveData(data)</code>, перерисуй карточки <code>showDebts()</code> и закрой окно</li></ul>' +
                '<p>Перевод «гасит» долг, поэтому его карточка пропадёт.</p>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', 'data.payments.push(...)', 'saveData(data)', 'showDebts()', 'close()'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<div class="settlements"></div>\n\n' + paymentModal(false, paymentButtons),
                css: gridCss + '\n' + sumCss + '\n' + T.css.modal,
                js: jsReady + "\nconst data = loadData();\nlet currentDebt = null;\nconst settlementsList = document.querySelector('.settlements');\n" +
                    "const paymentModal = document.querySelector('.payment-modal');\nconst paymentForm = document.querySelector('.payment-form');\n\n" +
                    showDebtsJs + "\npaymentForm.addEventListener('submit', function (event) {\n    // сохрани перевод\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nlet currentDebt = null;\nconst settlementsList = document.querySelector('.settlements');\n" +
                    "const paymentModal = document.querySelector('.payment-modal');\nconst paymentForm = document.querySelector('.payment-form');\n\n" +
                    showDebtsJs + "\npaymentForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    data.payments.push({ group: currentDebt.group, from: currentDebt.from, to: currentDebt.to, sum: currentDebt.sum });\n" +
                    "    saveData(data);\n    showDebts();\n    paymentModal.close();\n});",
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.debt .chip-button');
                    return t.q('.payment-modal').open === true;
                }],
                ['Форма не перезагружает страницу', function (t) { return t.submit('.payment-form'); }],
                ['Перевод сохранён в localStorage', function (t) {
                    const list = savedPayments();
                    return list.length === 1 && list[0].from === 'Максим' && list[0].to === 'Вы' && list[0].sum === 680;
                }],
                ['Карточек стало на одну меньше (7)', function (t) { return t.all('.settlements .debt').length === 7; }],
                ['Окно закрылось', function (t) { return t.q('.payment-modal').open === false; }],
            ],
        },

        // 12
        {
            title: 'JS: текст напоминания',
            kind: 'JS',
            text: '<p>Кнопка «Текст напоминания» собирает сообщения для всех, кто должен вам:</p><ul>' +
                '<li>создай пустой список <code>const lines = []</code></li>' +
                '<li>для каждого долга из <code>getDebts(data)</code>, где <code>debt.to === \'Вы\'</code>, добавь строку ' +
                '<code>debt.from + \', напоминание о переводе \' + money(debt.sum)</code></li>' +
                '<li>запиши строки в поле: <code>textarea.value = lines.join(\'\\n\')</code> (<code>\\n</code> — перенос строки) и открой окно</li>' +
                '<li>кнопка «Скопировать» (<code>.copy-button</code>): <code>navigator.clipboard.writeText(textarea.value)</code> ' +
                'и напиши в <code>.copy-status</code> «Текст скопирован.»</li></ul>',
            hint: ['showModal()', 'const lines = []', 'lines.push(...)', "lines.join('\n')", 'textarea.value', 'navigator.clipboard.writeText'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="chip-button open-reminder" type="button">Текст напоминания</button>\n\n' + reminderModal(false, reminderField),
                css: T.css.modal + '\n' + textareaCss,
                js: jsReady + "\nconst data = loadData();\nconst reminderModal = document.querySelector('.reminder-modal');\n" +
                    "const textarea = reminderModal.querySelector('textarea');\n\n" +
                    "document.querySelector('.open-reminder').addEventListener('click', function () {\n    // собери строки и открой окно\n\n});\n\n" +
                    '// кнопка «Скопировать»\n',
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst reminderModal = document.querySelector('.reminder-modal');\n" +
                    "const textarea = reminderModal.querySelector('textarea');\n\n" +
                    "document.querySelector('.open-reminder').addEventListener('click', function () {\n    const lines = [];\n" +
                    "    getDebts(data).forEach(function (debt) {\n        if (debt.to === 'Вы') {\n" +
                    "            lines.push(debt.from + ', напоминание о переводе ' + money(debt.sum));\n        }\n    });\n" +
                    "    textarea.value = lines.join('\\n');\n    reminderModal.showModal();\n});\n\n" +
                    "document.querySelector('.copy-button').addEventListener('click', function () {\n" +
                    "    navigator.clipboard.writeText(textarea.value);\n    reminderModal.querySelector('.copy-status').textContent = 'Текст скопирован.';\n});",
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-reminder');
                    return t.q('.reminder-modal').open === true;
                }],
                ['В тексте 5 строк — по одной на должника', function (t) { return t.q('textarea').value.split('\n').length === 5; }],
                ['Первая строка про Максима и 680 ₽', function (t) {
                    const first = t.q('textarea').value.split('\n')[0].replace(/\s/g, '');
                    return first.indexOf('Максим') === 0 && first.indexOf('680₽') >= 0;
                }],
                ['Нет строки про ваш долг Лене', function (t) { return t.q('textarea').value.indexOf('Вы,') < 0; }],
                ['«Скопировать» пишет «Текст скопирован.»', function (t) {
                    t.click('.copy-button');
                    return t.text('.copy-status') === 'Текст скопирован.';
                }],
            ],
        },
    ];
})();
