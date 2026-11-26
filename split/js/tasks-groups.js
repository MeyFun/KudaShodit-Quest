// =========================================================
// Задачи страницы «Группы» — Дарья Боюрнова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    function groupCard(id, pic, title) {
        return '<article class="group" data-id="' + id + '">\n' +
            '    ' + pic + '\n' +
            '    <div class="group-info">\n' +
            '        <h3><button class="group-link" type="button">' + title + '</button></h3>\n' +
            '        <p class="group-total">Участников: 6 · Общие траты: 4 080 ₽</p>\n' +
            '    </div>\n' +
            '    <div class="group-balance">\n' +
            '        <p class="label">Ваш баланс</p>\n' +
            '        <p class="group-sum">+3 400 ₽</p>\n' +
            '    </div>\n' +
            '</article>';
    }
    const altai = groupCard('altai', '<img class="group-pic" src="../img/group-altai.jpg" alt="Горы Алтая">', 'Поездка на Алтай');
    const bar = groupCard('bar', '<div class="group-pic group-pic-icon"><img src="../img/cocktail.svg" alt="" width="21" height="21"></div>', 'Бар в пятницу');
    const cottage = groupCard('cottage', '<img class="group-pic" src="../img/group-cottage.jpg" alt="Коттедж у леса">', 'Коттедж на майские');
    const groupsHtml = '<div class="groups">\n' + indent(altai) + '\n\n' + indent(bar) + '\n\n' + indent(cottage) + '\n</div>';

    const sectionHtml =
        '<main class="container main">\n    <div class="section-head">\n        <div>\n' +
        '            <h2>Активные группы</h2>\n            <p>Путешествия, тусовки и общие счета</p>\n        </div>\n' +
        '        <button class="chip-button chip-button-big open-group-form" type="button"><img src="../img/group-add.svg" alt="" width="18" height="12"> Создать группу</button>\n' +
        '    </div>\n</main>';

    const cardCss =
        '.groups {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
        '.group {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    padding: 24px;\n    background: #ffffff;\n' +
        '    border-radius: 48px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    transition: 0.2s;\n}\n\n' +
        '.group:hover {\n    transform: translateY(-3px);\n}\n\n.group-info {\n    flex: 1;\n}\n\n' +
        '.group-link {\n    padding: 0;\n    font-size: 18px;\n    font-weight: 700;\n    text-align: left;\n    background: none;\n    border: none;\n}\n\n' +
        '.group-info p {\n    margin-top: 4px;\n    font-size: 14px;\n    color: #584146;\n}\n';
    const picCss =
        '.group-pic {\n    min-width: 56px;\n    width: 56px;\n    height: 56px;\n    border-radius: 50%;\n    object-fit: cover;\n}\n\n' +
        '.group-pic-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #eae7e8;\n}\n\n' +
        '.group-balance {\n    text-align: right;\n}\n\n' +
        '.group-sum {\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 22px;\n    font-weight: 700;\n}\n\n' +
        '.plus {\n    color: #ae1e5a;\n}\n';

    const groupModalAnswer =
        '<dialog class="modal group-modal" open>\n    <div class="modal-form">\n        <h2 class="group-title">Поездка на Алтай</h2>\n' +
        '        <p class="group-members">Участники: Вы, Максим, Даша, Катя, Артём, Лена</p>\n' +
        '        <ul class="feed group-expenses">\n            <li>Билеты до Алтая — 4 080 ₽, оплатил(а): Вы</li>\n        </ul>\n' +
        '        <div class="modal-buttons">\n            <button class="button open-expense-form" type="button">Добавить расход</button>\n' +
        '            <button class="chip-button close-modal" type="button">Закрыть</button>\n        </div>\n    </div>\n</dialog>';
    const groupModalStart = groupModalAnswer.replace(
        '        <div class="modal-buttons">\n            <button class="button open-expense-form" type="button">Добавить расход</button>\n' +
        '            <button class="chip-button close-modal" type="button">Закрыть</button>\n        </div>\n',
        '        <!-- сюда блок с двумя кнопками -->\n\n');

    const expenseFields =
        '        <label class="modal-field">На что потратили <input name="title" placeholder="Пицца на всех"></label>\n' +
        '        <label class="modal-field">Сумма, ₽ <input name="sum" type="number" placeholder="1200"></label>\n' +
        '        <label class="modal-field">Кто оплатил <input name="payer" value="Вы"></label>\n';
    function expenseModal(fields, open) {
        return '<dialog class="modal expense-modal"' + (open ? ' open' : '') + '>\n    <form class="modal-form expense-form">\n        <h2>Новый расход</h2>\n' + fields +
            '        <p class="small">Сумма делится поровну между участниками группы.</p>\n        <p class="error hide"></p>\n' +
            '        <div class="modal-buttons">\n            <button class="button" type="submit">Добавить</button>\n' +
            '            <button class="chip-button close-modal" type="button">Отмена</button>\n        </div>\n    </form>\n</dialog>';
    }
    const groupFormModal =
        '<dialog class="modal group-form-modal">\n    <form class="modal-form group-form">\n        <h2>Новая группа</h2>\n' +
        '        <label class="modal-field">Название <input name="title" placeholder="Поездка в Омск"></label>\n' +
        '        <label class="modal-field">Имена участников через запятую <input name="members" placeholder="Лена, Миша"></label>\n' +
        '        <p class="error hide">Введите название и хотя бы одно имя.</p>\n        <div class="modal-buttons">\n' +
        '            <button class="button" type="submit">Создать</button>\n            <button class="chip-button close-modal" type="button">Отмена</button>\n' +
        '        </div>\n    </form>\n</dialog>';

    const jsReady = T.js.data + '\n' + T.js.close;

    QUEST_TASKS.groups = [
        // 1
        T.base(),

        // 2
        T.header('groups'),

        // 3
        T.sectionHead(sectionHtml, {
            text: '<li><code>.chip-button-big</code>: кнопка покрупнее — отступы <code>8px 16px</code>, фон <code>#f0edee</code></li>',
            css: '', answer: '', checks: [],
        }),

        // 4
        {
            title: 'Карточки групп: разметка',
            kind: 'HTML',
            text: '<p>Каждая группа — карточка: картинка, название, сумма трат и ваш баланс. Две карточки готовы, сделай третью по образцу первой:</p><ul>' +
                '<li><code>&lt;article class="group" data-id="cottage"&gt;</code> (<code>data-id</code> нужен JS, чтобы найти группу)</li>' +
                '<li>картинка <code>&lt;img class="group-pic" src="../img/group-cottage.jpg" alt="Коттедж у леса"&gt;</code></li>' +
                '<li>название в кнопке: <code>&lt;h3&gt;&lt;button class="group-link" type="button"&gt;Коттедж на майские&lt;/button&gt;&lt;/h3&gt;</code></li>' +
                '<li>блоки <code>.group-info</code> (с <code>&lt;p class="group-total"&gt;</code>) и <code>.group-balance</code> ' +
                '(с подписью <code>Ваш баланс</code> и <code>&lt;p class="group-sum"&gt;</code>) — как в первой карточке</li></ul>',
            hint: ['<article data-id="...">', '<div class="...">', '<p class="...">', '<img class="..." src="..." alt="...">', '<h3>', '<button type="button">'],
            start: {
                html: '<div class="groups">\n' + indent(altai) + '\n\n' + indent(bar) + '\n\n    <!-- сюда третью карточку -->\n\n</div>',
                css: cardCss + '\n' + picCss + '\n' + T.css.common,
            },
            answer: { html: groupsHtml },
            checks: [
                ['Три карточки .group', function (t) { return t.all('.groups .group').length === 3; }],
                ['У третьей data-id="cottage"', function (t) { return t.all('.group')[2].dataset.id === 'cottage'; }],
                ['Картинка коттеджа с alt', function (t) {
                    const img = t.all('.group')[2].querySelector('img.group-pic');
                    return !!img && img.getAttribute('src') === '../img/group-cottage.jpg' && (img.getAttribute('alt') || '').length > 0;
                }],
                ['Название в кнопке .group-link внутри h3', function (t) {
                    const b = t.all('.group')[2].querySelector('h3 button.group-link');
                    return !!b && b.textContent.trim() === 'Коттедж на майские';
                }],
                ['Есть .group-total и .group-sum', function (t) {
                    const card = t.all('.group')[2];
                    return !!card.querySelector('.group-info .group-total') && !!card.querySelector('.group-balance .group-sum');
                }],
                ['Подпись «Ваш баланс»', function (t) { return t.text(t.all('.group')[2].querySelector('.label')) === 'Ваш баланс'; }],
            ],
        },

        // 5
        {
            title: 'Карточки групп: оформление',
            kind: 'CSS',
            text: '<p>Оформим карточки групп:</p><ul>' +
                '<li><code>.groups</code>: карточки столбиком, промежуток <code>16px</code></li>' +
                '<li><code>.group</code>: в строку, по центру, промежуток <code>16px</code>, отступы <code>24px</code>, белый фон <code>#ffffff</code>, ' +
                'скругление <code>48px</code>, плавность <code>transition: 0.2s</code></li>' +
                '<li><code>.group:hover</code>: при наведении карточка приподнимается — <code>transform: translateY(-3px)</code></li>' +
                '<li><code>.group-info</code>: занимает всё свободное место (<code>flex: 1</code>)</li>' +
                '<li><code>.group-link</code>: кнопка-название без фона и рамки, <code>18px</code>, жирность <code>700</code>, отступы <code>0</code></li></ul>',
            hint: [':hover', 'transform: translateY(-3px)', 'transition', 'flex: 1', 'background: none'],
            start: {
                html: groupsHtml,
                css: '.groups {\n    \n}\n\n.group {\n    \n}\n\n.group:hover {\n    \n}\n\n.group-info {\n    \n}\n\n.group-link {\n    \n}\n\n/* Уже готово */\n' +
                    '.group-info p {\n    margin-top: 4px;\n    font-size: 14px;\n    color: #584146;\n}\n\n' + picCss + '\n' + T.css.common,
            },
            answer: { css: cardCss },
            checks: [
                ['.groups: столбиком, промежуток 16px', function (t) {
                    return t.css('.groups', 'display') === 'flex' && t.css('.groups', 'flex-direction') === 'column' && t.css('.groups', 'row-gap') === '16px';
                }],
                ['.group: в строку, по центру, промежуток 16px', function (t) {
                    return t.css('.group', 'display') === 'flex' && t.css('.group', 'align-items') === 'center' && t.css('.group', 'column-gap') === '16px';
                }],
                ['.group: белый фон, скругление 48px, отступы 24px', function (t) {
                    return t.color('.group', 'background-color') === '#ffffff' && t.px('.group', 'border-top-left-radius') === 48 &&
                        t.px('.group', 'padding-top') === 24;
                }],
                ['.group: плавность transition', function (t) { return parseFloat(t.css('.group', 'transition-duration')) > 0; }],
                ['При наведении карточка приподнимается', function (t) { return t.rule('.group:hover', 'transform').indexOf('translateY(-3px)') >= 0; }],
                ['.group-info растягивается', function (t) { return t.css('.group-info', 'flex-grow') === '1'; }],
                ['.group-link: без фона и рамки', function (t) {
                    return t.color('.group-link', 'background-color') === 'transparent' && t.css('.group-link', 'border-top-style') === 'none';
                }],
                ['.group-link: 18px, жирность 700', function (t) {
                    return t.px('.group-link', 'font-size') === 18 && t.css('.group-link', 'font-weight') === '700';
                }],
            ],
        },

        // 6
        {
            title: 'Картинка и баланс',
            kind: 'CSS',
            text: '<p>Доделаем картинку группы и сумму баланса:</p><ul>' +
                '<li><code>.group-pic</code>: круг <code>56×56px</code> (и <code>min-width: 56px</code>, чтобы не сжимался), ' +
                'фото заполняет круг без искажений — <code>object-fit: cover</code></li>' +
                '<li><code>.group-pic-icon</code> (круг с иконкой вместо фото): иконка по центру, фон <code>#eae7e8</code></li>' +
                '<li><code>.group-balance</code>: текст по правому краю</li>' +
                '<li><code>.group-sum</code>: шрифт Manrope, <code>22px</code>, жирность <code>700</code></li>' +
                '<li><code>.plus</code> (положительный баланс): цвет <code>#ae1e5a</code></li></ul>',
            hint: ['object-fit: cover', 'min-width', 'text-align: right'],
            start: {
                html: groupsHtml.replace('<p class="group-sum">+3 400 ₽</p>', '<p class="group-sum plus">+3 400 ₽</p>'),
                css: '.group-pic {\n    \n}\n\n.group-pic-icon {\n    \n}\n\n.group-balance {\n    \n}\n\n.group-sum {\n    \n}\n\n.plus {\n    \n}\n\n/* Уже готово */\n' +
                    cardCss + '\n' + T.css.common,
            },
            answer: { css: picCss },
            checks: [
                ['.group-pic: круг 56×56px', function (t) {
                    return t.px('.group-pic', 'width') === 56 && t.px('.group-pic', 'height') === 56 && t.round('.group-pic');
                }],
                ['.group-pic не сжимается (min-width: 56px)', function (t) { return t.px('.group-pic', 'min-width') === 56; }],
                ['Фото без искажений (object-fit: cover)', function (t) { return t.css('.group-pic', 'object-fit') === 'cover'; }],
                ['Круг с иконкой: по центру, фон #eae7e8', function (t) {
                    return t.css('.group-pic-icon', 'display') === 'flex' && t.css('.group-pic-icon', 'justify-content') === 'center' &&
                        t.color('.group-pic-icon', 'background-color') === '#eae7e8';
                }],
                ['Баланс по правому краю', function (t) { return t.css('.group-balance', 'text-align') === 'right'; }],
                ['.group-sum: Manrope 22px, 700', function (t) {
                    return t.css('.group-sum', 'font-family').indexOf('Manrope') >= 0 && t.px('.group-sum', 'font-size') === 22 &&
                        t.css('.group-sum', 'font-weight') === '700';
                }],
                ['.plus: цвет #ae1e5a', function (t) { return t.color('.plus', 'color') === '#ae1e5a'; }],
            ],
        },

        // 7
        T.modalTask('Окно группы',
            '<p>По клику на название группы откроется окно со списком её расходов. Разметка почти готова — добавь в конец ' +
            '<code>&lt;div class="modal-buttons"&gt;</code> с двумя кнопками: ' +
            '<code>&lt;button class="button open-expense-form" type="button"&gt;Добавить расход&lt;/button&gt;</code> и ' +
            '<code>&lt;button class="chip-button close-modal" type="button"&gt;Закрыть&lt;/button&gt;</code></p>',
            groupModalStart, groupModalAnswer,
            [
                ['В окне блок .modal-buttons', function (t) { return !!t.q('.group-modal .modal-buttons'); }],
                ['Кнопка «Добавить расход» с классом open-expense-form', function (t) {
                    const b = t.q('.modal-buttons .open-expense-form');
                    return !!b && b.textContent.trim() === 'Добавить расход' && b.classList.contains('button');
                }],
                ['Кнопка «Закрыть» с классом close-modal', function (t) {
                    const b = t.q('.modal-buttons .close-modal');
                    return !!b && b.textContent.trim() === 'Закрыть';
                }],
            ],
            ['<div class="modal-buttons">', '<button class="..." type="button">']),

        // 8
        T.fieldsTask('Окно «Новый расход»',
            '<p>Окно для нового расхода. Внутри формы после заголовка добавь три поля — каждое это ' +
            '<code>&lt;label class="modal-field"&gt;подпись &lt;input ...&gt;&lt;/label&gt;</code>:</p><ul>' +
            '<li>«На что потратили» — <code>name="title"</code>, подсказка <code>Пицца на всех</code></li>' +
            '<li>«Сумма, ₽» — <code>name="sum"</code>, <code>type="number"</code>, подсказка <code>1200</code></li>' +
            '<li>«Кто оплатил» — <code>name="payer"</code>, сразу заполнено значением <code>Вы</code> (<code>value="Вы"</code>)</li></ul>',
            expenseModal('        <!-- сюда три поля -->\n\n', true), expenseModal(expenseFields, true),
            [
                ['Три поля .modal-field', function (t) { return t.all('.expense-form .modal-field').length === 3; }],
                ['Поле title с подсказкой', function (t) { return !!t.attr('.modal-field input[name="title"]', 'placeholder'); }],
                ['Поле sum с type="number"', function (t) { return t.attr('.modal-field input[name="sum"]', 'type') === 'number'; }],
                ['Поле payer со значением «Вы»', function (t) { return t.attr('.modal-field input[name="payer"]', 'value') === 'Вы'; }],
            ],
            ['<label class="modal-field">', '<input>', 'name', 'placeholder', 'type="number"', 'value'],
            '.small {\n    font-size: 11px;\n    font-weight: 700;\n    color: #584146;\n}\n\n'),

        // 9
        T.footer('groups'),

        // 10
        {
            title: 'JS: бургер и окно группы',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>клик по названию группы (<code>.group-link</code>): найди её карточку <code>link.closest(\'.group\')</code>, ' +
                'возьми группу <code>findGroup(data, card.dataset.id)</code>, запиши её название в <code>.group-title</code> и открой ' +
                '<code>.group-modal</code> методом <code>showModal()</code></li></ul>' +
                '<p>Кнопки «Закрыть» уже работают — этот код готов.</p>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", 'textContent', 'classList.add / remove', 'if / else', "classList.toggle('open')", "querySelectorAll('.group-link').forEach", "closest('.group')", 'dataset.id', 'showModal()'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + groupsHtml + '\n\n' + groupModalAnswer.replace(' open>', '>'),
                css: T.burgerCss + '\n' + cardCss + '\n' + picCss + '\n' + T.css.modal,
                js: jsReady + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const groupModal = document.querySelector('.group-modal');\n\n// 1) бургер\n\n\n// 2) открыть окно группы по клику на название\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const groupModal = document.querySelector('.group-modal');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "document.querySelectorAll('.group-link').forEach(function (link) {\n    link.addEventListener('click', function () {\n" +
                    "        const card = link.closest('.group');\n        const group = findGroup(data, card.dataset.id);\n" +
                    "        groupModal.querySelector('.group-title').textContent = group.title;\n        groupModal.showModal();\n    });\n});",
            },
            checks: T.burgerChecks.concat([
                ['Клик по «Бар в пятницу» открывает окно', function (t) {
                    t.all('.group-link')[1].click();
                    return t.q('.group-modal').open === true;
                }],
                ['В окне название группы', function (t) { return t.text('.group-title') === 'Бар в пятницу'; }],
                ['«Закрыть» закрывает окно', function (t) {
                    t.click('.group-modal .close-modal');
                    return t.q('.group-modal').open === false;
                }],
            ]),
        },

        // 11
        {
            title: 'JS: создать группу',
            kind: 'JS',
            text: '<p>Кнопка «Создать группу» открывает окно с формой. При отправке формы:</p><ul>' +
                '<li>отмени перезагрузку, возьми название (<code>.trim()</code>)</li>' +
                '<li>участники: начни список с <code>[\'Вы\']</code>, разрежь строку имён по запятым — ' +
                '<code>groupForm.elements.members.value.split(\',\')</code> — и добавь (<code>push</code>) каждое непустое имя без пробелов по краям</li>' +
                '<li>если название пустое или участников меньше 2 — покажи <code>.error</code> и <code>return</code></li>' +
                '<li>иначе добавь группу в <code>data.groups</code>: <code>{ id: \'group-\' + Date.now(), title: title, members: members }</code>, ' +
                'сохрани <code>saveData(data)</code> и закрой окно</li></ul>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', '.value.trim()', '||', 'return', "classList.remove('hide')", 'showModal()', 'close()', ".split(',')", 'forEach', "name.trim() !== ''", '.push(...)', 'members.length < 2', 'Date.now()', 'saveData(data)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="chip-button open-group-form" type="button">Создать группу</button>\n\n' + groupFormModal,
                css: T.css.modal + '\n' + T.css.modalFields + '\n.hide {\n    display: none;\n}\n',
                js: jsReady + "\nconst data = loadData();\nconst groupFormModal = document.querySelector('.group-form-modal');\n" +
                    "const groupForm = document.querySelector('.group-form');\n\n" +
                    "document.querySelector('.open-group-form').addEventListener('click', function () {\n    groupFormModal.showModal();\n});\n\n" +
                    "groupForm.addEventListener('submit', function (event) {\n    // проверь форму и добавь группу\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst groupFormModal = document.querySelector('.group-form-modal');\n" +
                    "const groupForm = document.querySelector('.group-form');\n\n" +
                    "document.querySelector('.open-group-form').addEventListener('click', function () {\n    groupFormModal.showModal();\n});\n\n" +
                    "groupForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const title = groupForm.elements.title.value.trim();\n    const members = ['Вы'];\n" +
                    "    groupForm.elements.members.value.split(',').forEach(function (name) {\n        if (name.trim() !== '') {\n" +
                    "            members.push(name.trim());\n        }\n    });\n\n" +
                    "    if (title === '' || members.length < 2) {\n        groupForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    "    data.groups.push({ id: 'group-' + Date.now(), title: title, members: members });\n    saveData(data);\n    groupFormModal.close();\n});",
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-group-form');
                    return t.q('.group-form-modal').open === true;
                }],
                ['Без имён — ошибка, группа не создаётся', function (t) {
                    t.q('.group-form input[name="title"]').value = 'Поход';
                    t.q('.group-form input[name="members"]').value = ' , ';
                    const prevented = t.submit('.group-form');
                    return prevented && t.visible('.group-form .error') && localStorage.getItem('split') === null;
                }],
                ['Группа сохраняется в localStorage', function (t) {
                    t.q('.group-form input[name="members"]').value = 'Оля, Миша';
                    t.submit('.group-form');
                    const saved = JSON.parse(localStorage.getItem('split') || '{"groups":[]}');
                    return saved.groups.length === 4 && saved.groups[3].title === 'Поход';
                }],
                ['Участники: Вы, Оля, Миша (без пробелов)', function (t) {
                    const saved = JSON.parse(localStorage.getItem('split') || '{"groups":[]}');
                    return !!saved.groups[3] && saved.groups[3].members.join('|') === 'Вы|Оля|Миша';
                }],
                ['Окно закрылось', function (t) { return t.q('.group-form-modal').open === false; }],
            ],
        },

        // 12
        {
            title: 'JS: добавить расход',
            kind: 'JS',
            text: '<p>Окно «Новый расход» открыто для группы <code>currentGroup</code> (Поездка на Алтай). При отправке формы:</p><ul>' +
                '<li>возьми название, сумму (<code>Number(...)</code>) и кто оплатил (<code>.trim()</code>)</li>' +
                '<li>если название пустое или сумма не больше нуля — напиши в <code>.error</code> «Введите название и сумму больше нуля.», покажи и <code>return</code></li>' +
                '<li>если плательщика нет среди участников — <code>!currentGroup.members.includes(payer)</code> — напиши «Кто оплатил — должен быть участником группы.», покажи и <code>return</code></li>' +
                '<li>иначе добавь в <code>data.expenses</code> объект <code>{ title, sum, group: currentGroup.id, payer }</code>, сохрани и закрой окно</li></ul>',
            hint: ['Number(...)', '!(sum > 0)', '.includes(...)', 'textContent', 'data.expenses.push(...)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: expenseModal(expenseFields, false),
                css: T.css.modal + '\n' + T.css.modalFields + '\n.hide {\n    display: none;\n}\n',
                js: jsReady + "\nconst data = loadData();\nconst currentGroup = data.groups[0];\n" +
                    "const expenseModal = document.querySelector('.expense-modal');\nconst expenseForm = document.querySelector('.expense-form');\n" +
                    "expenseModal.showModal();\n\nexpenseForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const error = expenseForm.querySelector('.error');\n\n    // проверь поля и добавь расход\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst currentGroup = data.groups[0];\n" +
                    "const expenseModal = document.querySelector('.expense-modal');\nconst expenseForm = document.querySelector('.expense-form');\n" +
                    "expenseModal.showModal();\n\nexpenseForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const error = expenseForm.querySelector('.error');\n\n" +
                    "    const title = expenseForm.elements.title.value.trim();\n    const sum = Number(expenseForm.elements.sum.value);\n" +
                    "    const payer = expenseForm.elements.payer.value.trim();\n\n" +
                    "    if (title === '' || !(sum > 0)) {\n        error.textContent = 'Введите название и сумму больше нуля.';\n" +
                    "        error.classList.remove('hide');\n        return;\n    }\n" +
                    "    if (!currentGroup.members.includes(payer)) {\n        error.textContent = 'Кто оплатил — должен быть участником группы.';\n" +
                    "        error.classList.remove('hide');\n        return;\n    }\n\n" +
                    "    data.expenses.push({ title: title, sum: sum, group: currentGroup.id, payer: payer });\n    saveData(data);\n    expenseModal.close();\n});",
            },
            checks: [
                ['Пустая сумма — ошибка про сумму', function (t) {
                    t.q('input[name="title"]').value = 'Палатка';
                    const prevented = t.submit('.expense-form');
                    return prevented && t.visible('.expense-form .error') && t.text('.expense-form .error').indexOf('сумм') >= 0;
                }],
                ['Чужой плательщик — ошибка про участника', function (t) {
                    t.q('input[name="sum"]').value = '600';
                    t.q('input[name="payer"]').value = 'Петя';
                    t.submit('.expense-form');
                    return t.text('.expense-form .error').indexOf('участник') >= 0 && localStorage.getItem('split') === null;
                }],
                ['Верный расход сохраняется', function (t) {
                    t.q('input[name="payer"]').value = ' Максим ';
                    t.submit('.expense-form');
                    const saved = JSON.parse(localStorage.getItem('split') || '{"expenses":[]}');
                    const last = saved.expenses[saved.expenses.length - 1] || {};
                    return saved.expenses.length === 3 && last.sum === 600 && last.payer === 'Максим' && last.group === 'altai';
                }],
                ['Окно закрылось', function (t) { return t.q('.expense-modal').open === false; }],
            ],
        },
    ];
})();
