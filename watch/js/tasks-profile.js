// =========================================================
// Задачи страницы «Профиль» — Мария Шашкова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    const nameFormHtml =
        '<form class="name-form">\n' +
        '    <input name="name" type="text" placeholder="Твоё имя">\n' +
        '    <button class="button button-teal" type="submit">Сохранить имя</button>\n' +
        '</form>\n' +
        '<p class="error name-error hide">Введи имя.</p>';
    function profileCard(inner) {
        return '<section class="profile-card">\n' +
            '    <img class="profile-avatar" src="../img/avatar.jpg" alt="Аватар">\n' +
            '    <div class="profile-info">\n' +
            '        <h1 class="profile-name">Зритель</h1>\n' +
            '        <p class="section-sub">Имя видно в кинокомнатах и под рецензиями</p>\n' +
            '    </div>\n' + inner + '\n</section>';
    }
    const cardFull = profileCard(indent(nameFormHtml));

    const savedSection =
        '<section>\n    <div class="section-head">\n        <h2 class="title">Мой список</h2>\n    </div>\n' +
        '    <p class="empty-text saved-empty">Список пока пуст. Добавь фильм в подборках.</p>\n    <ul class="saved-list"></ul>\n</section>';
    const reviewsSection =
        '<section>\n    <div class="section-head">\n        <h2 class="title title-blue">Мои рецензии</h2>\n' +
        '        <button class="button button-dark button-small open-review-form" type="button"><img src="../img/pencil.svg" alt="" width="12" height="12"> Написать рецензию</button>\n' +
        '    </div>\n    <p class="empty-text reviews-empty">Ты ещё не написал ни одной рецензии.</p>\n    <div class="reviews-grid"></div>\n</section>';

    const cardCss =
        '.profile-card {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 24px;\n    align-items: center;\n    padding: 32px;\n' +
        '    background: #1c1a26;\n    border: 1px solid #2c2f34;\n    border-radius: 24px;\n}\n\n' +
        '.profile-avatar {\n    width: 96px;\n    height: 96px;\n    border-radius: 50%;\n    object-fit: cover;\n    border: 3px solid #a0cfce;\n}\n\n' +
        '.profile-info {\n    flex: 1;\n}\n\n' +
        '.profile-name {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 32px;\n}\n\n' +
        '.name-form {\n    display: flex;\n    gap: 12px;\n    align-items: center;\n}\n';
    const cardReady =
        '.section-sub {\n    font-size: 13px;\n    color: #c0c8c7;\n}\n\n' +
        '.name-form input {\n    width: 240px;\n    padding: 12px 14px;\n    background: #201e2a;\n    border: 1px solid #2c2f34;\n    border-radius: 12px;\n}\n\n' +
        '.error {\n    font-size: 13px;\n    color: #ffb2bf;\n}\n\n.name-error {\n    width: 100%;\n}\n';
    const titleCss = T.css.titles + '\n.empty-text {\n    font-size: 14px;\n    color: #c0c8c7;\n}\n';
    const listCss =
        '.saved-list {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n' +
        '.saved-item {\n    display: flex;\n    gap: 12px;\n    align-items: center;\n    justify-content: space-between;\n    padding: 15px;\n' +
        '    background: #201e2a;\n    border: 1px solid #2c2f34;\n    border-radius: 16px;\n}\n\n' +
        '.saved-item b {\n    display: block;\n}\n\n.saved-item small {\n    font-size: 12px;\n    color: #c0c8c7;\n}\n';

    const sampleList =
        '<ul class="saved-list">\n' +
        '    <li class="saved-item">\n        <div><b>Дюна: Часть вторая</b><small>Фантастика • 2 ч 46 мин</small></div>\n' +
        '        <button class="link" type="button">Убрать</button>\n    </li>\n' +
        '    <li class="saved-item">\n        <div><b>Создатель</b><small>Фантастика • 2 ч 13 мин</small></div>\n' +
        '        <button class="link" type="button">Убрать</button>\n    </li>\n</ul>\n\n' +
        '<div class="reviews-grid">\n' +
        '    <article class="review">\n        <div class="chip chip-small">Дюна</div>\n        <p class="review-text">Шедевр, пересмотрю ещё раз.</p>\n' +
        '        <p class="review-author">Маша</p>\n    </article>\n</div>';

    const reviewFields =
        '        <label class="modal-field">Фильм <input name="film" placeholder="Дюна: Часть вторая"></label>\n' +
        '        <label class="modal-field">Рецензия <textarea name="text" rows="4"></textarea></label>\n';
    const reviewButtons =
        '        <div class="modal-buttons">\n            <button class="button button-teal" type="submit">Сохранить рецензию</button>\n' +
        '            <button class="button button-ghost close-modal" type="button">Отмена</button>\n        </div>\n';
    function reviewModal(open, fields, buttons) {
        return '<dialog class="modal review-modal"' + (open ? ' open' : '') + '>\n    <form class="modal-form review-form">\n        <h2>Написать рецензию</h2>\n' +
            fields + '        <p class="error hide">Напиши название фильма и текст рецензии.</p>\n' + buttons + '    </form>\n</dialog>';
    }

    const jsReady = T.js.data + '\n' + T.js.close;

    function setSaved(list) {
        return function () {
            localStorage.setItem('kinosphere', JSON.stringify({ profile: '', saved: list, rooms: [], reviews: [] }));
        };
    }

    QUEST_TASKS.profile = [
        // 1
        T.base(),

        // 2
        T.header('profile'),

        // 3
        {
            title: 'Карточка профиля: разметка',
            kind: 'HTML',
            text: '<p>Наверху профиля — аватар, имя и форма, где можно поменять имя. Аватар и имя готовы, добавь в конец карточки:</p><ul>' +
                '<li>форму <code>&lt;form class="name-form"&gt;</code>, а в ней поле <code>&lt;input name="name" type="text" placeholder="Твоё имя"&gt;</code> ' +
                'и кнопку <code>&lt;button class="button button-teal" type="submit"&gt;Сохранить имя&lt;/button&gt;</code></li>' +
                '<li>после формы — спрятанную ошибку <code>&lt;p class="error name-error hide"&gt;Введи имя.&lt;/p&gt;</code></li></ul>',
            hint: ['<form class="...">', '<input name="..." type="text" placeholder="...">', '<button type="submit">', '<p class="...">'],
            start: {
                html: profileCard('    <!-- сюда форму имени и ошибку -->\n'),
                css: cardCss + '\n' + cardReady + '\n' + T.css.buttons + '\n' + T.css.hide,
            },
            answer: { html: cardFull },
            checks: [
                ['Есть форма .name-form', function (t) { return !!t.q('.profile-card form.name-form'); }],
                ['Поле name="name" type="text"', function (t) {
                    return t.attr('.name-form input', 'name') === 'name' && t.attr('.name-form input', 'type') === 'text';
                }],
                ['У поля подсказка «Твоё имя»', function (t) { return t.attr('.name-form input', 'placeholder') === 'Твоё имя'; }],
                ['Кнопка «Сохранить имя» type="submit"', function (t) {
                    const b = t.q('.name-form button');
                    return !!b && b.getAttribute('type') === 'submit' && b.textContent.trim() === 'Сохранить имя';
                }],
                ['Спрятанная ошибка .name-error', function (t) {
                    const p = t.q('p.name-error');
                    return !!p && p.classList.contains('error') && p.classList.contains('hide');
                }],
            ],
        },

        // 4
        {
            title: 'Карточка профиля: оформление',
            kind: 'CSS',
            text: '<p>Оформим карточку профиля:</p><ul>' +
                '<li><code>.profile-card</code>: в строку с переносом, промежуток <code>24px</code>, по центру, отступы <code>32px</code>, ' +
                'фон <code>#1c1a26</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>24px</code></li>' +
                '<li><code>.profile-avatar</code>: круглое фото <code>96×96px</code>, без искажений, рамка <code>3px solid #a0cfce</code></li>' +
                '<li><code>.profile-info</code>: занимает всё свободное место (<code>flex: 1</code>)</li>' +
                '<li><code>.profile-name</code>: шрифт <code>"PT Serif", Georgia, serif</code>, <code>32px</code></li>' +
                '<li><code>.name-form</code>: поле и кнопка в строку, промежуток <code>12px</code></li></ul>',
            hint: ['flex-wrap: wrap', 'border-radius: 50%', 'object-fit: cover', 'border: 3px solid ...', 'flex: 1'],
            start: {
                html: cardFull,
                css: '.profile-card {\n    \n}\n\n.profile-avatar {\n    \n}\n\n.profile-info {\n    \n}\n\n.profile-name {\n    \n}\n\n.name-form {\n    \n}\n\n/* Уже готово */\n' +
                    cardReady + '\n' + T.css.buttons + '\n' + T.css.hide,
            },
            answer: { css: cardCss },
            checks: [
                ['.profile-card: в строку с переносом, промежуток 24px', function (t) {
                    return t.css('.profile-card', 'display') === 'flex' && t.css('.profile-card', 'flex-wrap') === 'wrap' &&
                        t.css('.profile-card', 'column-gap') === '24px';
                }],
                ['.profile-card: фон #1c1a26, скругление 24px, отступы 32px', function (t) {
                    return t.color('.profile-card', 'background-color') === '#1c1a26' && t.px('.profile-card', 'border-top-left-radius') === 24 &&
                        t.px('.profile-card', 'padding-top') === 32;
                }],
                ['Аватар: круг 96×96px', function (t) {
                    return t.px('.profile-avatar', 'width') === 96 && t.px('.profile-avatar', 'height') === 96 &&
                        t.css('.profile-avatar', 'border-top-left-radius') === '50%';
                }],
                ['Аватар: без искажений, рамка 3px #a0cfce', function (t) {
                    return t.css('.profile-avatar', 'object-fit') === 'cover' && Math.abs(t.px('.profile-avatar', 'border-top-width') - 3) <= 1 &&
                        t.color('.profile-avatar', 'border-top-color') === '#a0cfce';
                }],
                ['.profile-info растягивается', function (t) { return t.css('.profile-info', 'flex-grow') === '1'; }],
                ['Имя: PT Serif 32px', function (t) {
                    return t.css('.profile-name', 'font-family').indexOf('PT Serif') >= 0 && t.px('.profile-name', 'font-size') === 32;
                }],
                ['.name-form: в строку, промежуток 12px', function (t) {
                    return t.css('.name-form', 'display') === 'flex' && t.css('.name-form', 'column-gap') === '12px';
                }],
            ],
        },

        // 5
        {
            title: 'Разделы: «Мой список» и «Мои рецензии»',
            kind: 'HTML + CSS',
            text: '<p>Под карточкой — два раздела. «Мой список» готов, сделай по образцу «Мои рецензии»:</p><ul>' +
                '<li><code>&lt;section&gt;</code> с <code>&lt;div class="section-head"&gt;</code>, в нём заголовок <code>&lt;h2 class="title title-blue"&gt;Мои рецензии&lt;/h2&gt;</code> ' +
                'и кнопка <code>&lt;button class="button button-dark button-small open-review-form" type="button"&gt;Написать рецензию&lt;/button&gt;</code></li>' +
                '<li>после шапки — <code>&lt;p class="empty-text reviews-empty"&gt;Ты ещё не написал ни одной рецензии.&lt;/p&gt;</code> и пустой ' +
                '<code>&lt;div class="reviews-grid"&gt;&lt;/div&gt;</code></li></ul>' +
                '<p>И оформи заголовки: <code>.title</code> — PT Serif <code>30px</code>, отступ слева <code>16px</code>, полоска ' +
                '<code>border-left: 6px solid #a0cfce</code>; <code>.title-blue</code> — полоска <code>#aec8f2</code>; ' +
                '<code>.empty-text</code> — <code>14px</code>, цвет <code>#c0c8c7</code></p>',
            hint: ['<section>', '<div class="...">', '<h2 class="...">', '<img src="..." alt="">', 'border-left: 6px solid ...'],
            start: {
                html: savedSection + '\n\n<!-- сюда раздел «Мои рецензии» -->\n',
                css: '.title {\n    \n}\n\n.title-blue {\n    \n}\n\n.empty-text {\n    \n}\n\n/* Уже готово */\n' +
                    '.section-head {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 24px;\n}\n\n' +
                    T.css.buttons,
            },
            answer: {
                html: savedSection + '\n\n' + reviewsSection,
                css: '.title {\n    padding-left: 16px;\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 30px;\n    font-weight: 700;\n' +
                    '    border-left: 6px solid #a0cfce;\n}\n\n.title-blue {\n    border-left: 6px solid #aec8f2;\n}\n\n' +
                    '.empty-text {\n    font-size: 14px;\n    color: #c0c8c7;\n}',
            },
            checks: [
                ['Два раздела section', function (t) { return t.all('section').length === 2; }],
                ['Заголовок «Мои рецензии» с классом title-blue', function (t) {
                    const h = t.all('section')[1].querySelector('h2.title.title-blue');
                    return !!h && h.textContent.trim() === 'Мои рецензии';
                }],
                ['Кнопка .open-review-form', function (t) {
                    const b = t.q('section .section-head button.open-review-form');
                    return !!b && b.getAttribute('type') === 'button';
                }],
                ['Есть .reviews-empty и пустой .reviews-grid', function (t) {
                    return !!t.q('p.empty-text.reviews-empty') && !!t.q('div.reviews-grid') && t.q('div.reviews-grid').children.length === 0;
                }],
                ['.title: PT Serif 30px, полоска 6px', function (t) {
                    return t.css('.title', 'font-family').indexOf('PT Serif') >= 0 && t.px('.title', 'font-size') === 30 &&
                        Math.abs(t.px('.title', 'border-left-width') - 6) <= 0.5;
                }],
                ['.title-blue: полоска #aec8f2', function (t) { return t.color('.title-blue', 'border-left-color') === '#aec8f2'; }],
                ['.empty-text: 14px #c0c8c7', function (t) {
                    return t.px('.empty-text', 'font-size') === 14 && t.color('.empty-text', 'color') === '#c0c8c7';
                }],
            ],
        },

        // 6
        {
            title: 'Список и рецензии: оформление',
            kind: 'CSS',
            text: '<p>Фильмы в списке и рецензии потом будет рисовать JS, а сейчас для примера они стоят в HTML. Оформи их:</p><ul>' +
                '<li><code>.saved-list</code>: строки столбиком, промежуток <code>12px</code></li>' +
                '<li><code>.saved-item</code>: в строку, по центру, название слева, кнопка «Убрать» справа (<code>space-between</code>), отступы <code>15px</code>, ' +
                'фон <code>#201e2a</code>, скругление <code>16px</code></li>' +
                '<li><code>.saved-item b</code>: название на отдельной строке (<code>display: block</code>)</li>' +
                '<li><code>.reviews-grid</code>: сетка из трёх колонок <code>repeat(3, 1fr)</code>, промежуток <code>16px</code></li>' +
                '<li><code>.review</code>: столбиком, промежуток <code>16px</code>, отступы <code>20px</code>, фон <code>#2a2935</code>, скругление <code>16px</code></li></ul>',
            hint: ['justify-content: space-between', 'display: block', 'grid-template-columns: repeat(3, 1fr)'],
            start: {
                html: sampleList,
                css: '.saved-list {\n    \n}\n\n.saved-item {\n    \n}\n\n.saved-item b {\n    \n}\n\n.reviews-grid {\n    \n}\n\n.review {\n    \n}\n\n/* Уже готово */\n' +
                    '.saved-item small {\n    font-size: 12px;\n    color: #c0c8c7;\n}\n\n.review-text {\n    font-size: 13px;\n}\n\n' +
                    '.review-author {\n    font-size: 11px;\n    color: #c0c8c7;\n}\n\n' + T.css.titles + '\n' + T.css.chips,
            },
            answer: { css: listCss + '\n' + T.css.reviews },
            checks: [
                ['.saved-list: столбиком, промежуток 12px', function (t) {
                    return t.css('.saved-list', 'flex-direction') === 'column' && t.css('.saved-list', 'row-gap') === '12px';
                }],
                ['.saved-item: в строку, края разнесены', function (t) {
                    return t.css('.saved-item', 'display') === 'flex' && t.css('.saved-item', 'justify-content') === 'space-between';
                }],
                ['.saved-item: фон #201e2a, скругление 16px, отступы 15px', function (t) {
                    return t.color('.saved-item', 'background-color') === '#201e2a' && t.px('.saved-item', 'border-top-left-radius') === 16 &&
                        t.px('.saved-item', 'padding-top') === 15;
                }],
                ['Название фильма — отдельной строкой', function (t) { return t.css('.saved-item b', 'display') === 'block'; }],
                ['.reviews-grid — сетка из 3 колонок, промежуток 16px', function (t) {
                    return t.css('.reviews-grid', 'display') === 'grid' && t.css('.reviews-grid', 'grid-template-columns').split(' ').length === 3 &&
                        t.css('.reviews-grid', 'column-gap') === '16px';
                }],
                ['.review: столбиком, промежуток 16px, отступы 20px', function (t) {
                    return t.css('.review', 'flex-direction') === 'column' && t.css('.review', 'row-gap') === '16px' && t.px('.review', 'padding-top') === 20;
                }],
                ['.review: фон #2a2935, скругление 16px', function (t) {
                    return t.color('.review', 'background-color') === '#2a2935' && t.px('.review', 'border-top-left-radius') === 16;
                }],
            ],
        },

        // 7
        T.modalTask('Окно «Написать рецензию»',
            '<p>Окно для новой рецензии. Разметка почти готова — добавь в конец формы <code>&lt;div class="modal-buttons"&gt;</code> с двумя кнопками: ' +
            '<code>&lt;button class="button button-teal" type="submit"&gt;Сохранить рецензию&lt;/button&gt;</code> и ' +
            '<code>&lt;button class="button button-ghost close-modal" type="button"&gt;Отмена&lt;/button&gt;</code></p>',
            reviewModal(true, reviewFields, '        <!-- сюда блок с двумя кнопками -->\n\n'), reviewModal(true, reviewFields, reviewButtons),
            [
                ['В форме блок .modal-buttons', function (t) { return !!t.q('.review-form .modal-buttons'); }],
                ['Кнопка «Сохранить рецензию» type="submit"', function (t) {
                    const b = t.q('.modal-buttons .button-teal');
                    return !!b && b.getAttribute('type') === 'submit' && b.textContent.trim() === 'Сохранить рецензию';
                }],
                ['Кнопка «Отмена» с классом close-modal', function (t) {
                    const b = t.q('.modal-buttons .close-modal');
                    return !!b && b.getAttribute('type') === 'button';
                }],
            ],
            ['<div class="modal-buttons">', 'type="submit"']),

        // 8
        T.fieldsTask('Поля рецензии',
            '<p>Добавь в окно два поля:</p><ul>' +
            '<li><code>&lt;label class="modal-field"&gt;Фильм &lt;input name="film" placeholder="Дюна: Часть вторая"&gt;&lt;/label&gt;</code></li>' +
            '<li>«Рецензия» — большое поле для текста <code>&lt;textarea name="text" rows="4"&gt;&lt;/textarea&gt;</code> ' +
            '(<code>rows</code> — высота в строках), тоже внутри <code>&lt;label class="modal-field"&gt;</code></li></ul>',
            reviewModal(true, '        <!-- сюда два поля -->\n\n', reviewButtons), reviewModal(true, reviewFields, reviewButtons),
            [
                ['Два поля .modal-field', function (t) { return t.all('.review-form .modal-field').length === 2; }],
                ['Поле name="film" с подсказкой', function (t) { return !!t.attr('.modal-field input[name="film"]', 'placeholder'); }],
                ['Большое поле textarea name="text" rows="4"', function (t) {
                    return t.attr('.modal-field textarea', 'name') === 'text' && t.attr('.modal-field textarea', 'rows') === '4';
                }],
            ],
            ['<label class="modal-field">', '<textarea rows="4">', 'name', 'placeholder']),

        // 9
        T.footer('profile'),

        // 10
        {
            title: 'JS: бургер и имя',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>форма имени: при отправке отмени перезагрузку и возьми имя (<code>.trim()</code>). Если оно пустое — покажи <code>.name-error</code> и ' +
                '<code>return</code>. Иначе спрячь ошибку, запиши имя в <code>data.profile</code>, сохрани <code>saveData(data)</code> и покажи его в ' +
                '<code>.profile-name</code></li></ul>' +
                '<p>Имя сохраняется в <code>localStorage</code>, поэтому его увидят «Комнаты» и рецензии.</p>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", "addEventListener('submit', ...)",
                'event.preventDefault()', '.value.trim()', "=== ''", 'classList.add / remove', 'return', 'data.profile = name', 'saveData(data)', 'textContent', 'localStorage'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + cardFull,
                css: T.burgerCss + '\n' + cardCss + '\n' + cardReady + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: T.js.data + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const profileName = document.querySelector('.profile-name');\nconst nameForm = document.querySelector('.name-form');\n" +
                    "const nameError = document.querySelector('.name-error');\n\n// 1) бургер\n\n\n// 2) сохранение имени\n",
            },
            answer: {
                js: T.js.data + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const profileName = document.querySelector('.profile-name');\nconst nameForm = document.querySelector('.name-form');\n" +
                    "const nameError = document.querySelector('.name-error');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "nameForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n    const name = nameForm.elements.name.value.trim();\n" +
                    "    if (name === '') {\n        nameError.classList.remove('hide');\n        return;\n    }\n    nameError.classList.add('hide');\n" +
                    "    data.profile = name;\n    saveData(data);\n    profileName.textContent = name;\n});",
            },
            checks: T.burgerChecks.concat([
                ['Пустое имя — ошибка, ничего не сохраняется', function (t) {
                    t.q('.name-form input').value = '   ';
                    const prevented = t.submit('.name-form');
                    return prevented && t.visible('.name-error') && T.saved() === null;
                }],
                ['Имя «Маша» показано в профиле', function (t) {
                    t.q('.name-form input').value = ' Маша ';
                    t.submit('.name-form');
                    return t.text('.profile-name') === 'Маша' && !t.visible('.name-error');
                }],
                ['Имя сохранено в localStorage', function (t) {
                    const s = T.saved();
                    return !!s && s.profile === 'Маша';
                }],
            ]),
        },

        // 11
        {
            title: 'JS: мой список',
            kind: 'JS',
            text: '<p>Покажем фильмы, которые добавили «В мой список» на Главной и в Подборках. В <code>data.saved</code> лежат id фильмов, ' +
                'а <code>findFilm(id)</code> по id находит фильм с <code>title</code> и <code>meta</code>. Для каждого id из <code>data.saved</code>:</p><ul>' +
                '<li>создай <code>&lt;li&gt;</code> с классом <code>saved-item</code></li>' +
                '<li>положи в него <code>&lt;b&gt;</code> с названием и <code>&lt;small&gt;</code> с <code>film.meta</code> (<code>append</code>)</li>' +
                '<li>добавь <code>&lt;li&gt;</code> в <code>.saved-list</code></li></ul>' +
                '<p>А если список пустой (<code>data.saved.length === 0</code>) — покажи <code>.saved-empty</code>, иначе спрячь.</p>',
            hint: ['data.saved.forEach', 'findFilm(id)', "document.createElement('li')", "classList.add('saved-item')", '.append(...)',
                'data.saved.length === 0', 'classList.add / remove', 'if / else'],
            before: setSaved(['dune', 'creator']),
            after: T.resetData,
            start: {
                html: '<p class="empty-text saved-empty">Список пока пуст.</p>\n<ul class="saved-list"></ul>',
                css: listCss + '\n' + T.css.hide,
                js: T.js.films + '\n' + T.js.data + "\nconst data = loadData();\nconst savedList = document.querySelector('.saved-list');\n" +
                    "const savedEmpty = document.querySelector('.saved-empty');\n\n// 1) строки списка\n\n\n// 2) надпись «Список пока пуст»\n",
            },
            answer: {
                js: T.js.films + '\n' + T.js.data + "\nconst data = loadData();\nconst savedList = document.querySelector('.saved-list');\n" +
                    "const savedEmpty = document.querySelector('.saved-empty');\n\n" +
                    "data.saved.forEach(function (id) {\n    const film = findFilm(id);\n    const item = document.createElement('li');\n" +
                    "    item.classList.add('saved-item');\n    const title = document.createElement('b');\n    title.textContent = film.title;\n" +
                    "    const meta = document.createElement('small');\n    meta.textContent = film.meta;\n    item.append(title, meta);\n" +
                    "    savedList.append(item);\n});\n\n" +
                    "if (data.saved.length === 0) {\n    savedEmpty.classList.remove('hide');\n} else {\n    savedEmpty.classList.add('hide');\n}",
            },
            checks: [
                ['В списке 2 фильма', function (t) { return t.all('.saved-list li.saved-item').length === 2; }],
                ['Первый — «Дюна: Часть вторая»', function (t) { return t.text('.saved-item b') === 'Дюна: Часть вторая'; }],
                ['Под названием жанр и длительность', function (t) { return t.text('.saved-item small') === 'Фантастика • 2 ч 46 мин'; }],
                ['Надпись «Список пока пуст» спрятана', function (t) { return !t.visible('.saved-empty'); }],
            ],
        },

        // 12
        {
            title: 'JS: новая рецензия',
            kind: 'JS',
            text: '<p>Кнопка «Написать рецензию» уже открывает окно. При отправке формы:</p><ul>' +
                '<li>отмени перезагрузку, возьми фильм и текст (<code>.trim()</code>); если что-то пустое — покажи <code>.error</code> и <code>return</code></li>' +
                '<li>автор — имя из профиля: <code>let author = \'Ты\'</code>, а если <code>data.profile</code> не пустой — <code>author = data.profile</code></li>' +
                '<li>добавь в <code>data.reviews</code> объект <code>{ film: film, text: text, author: author }</code> и сохрани <code>saveData(data)</code></li>' +
                '<li>создай карточку <code>&lt;article class="review"&gt;</code> с <code>&lt;p class="review-text"&gt;</code> (текст) и ' +
                '<code>&lt;p class="review-author"&gt;</code> (автор), добавь её в <code>.reviews-grid</code> и закрой окно</li></ul>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', '.value.trim()', '||', 'return', "let author = 'Ты'", 'data.reviews.push(...)',
                'saveData(data)', "document.createElement('article')", '.append(...)', 'close()'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="button button-dark open-review-form" type="button">Написать рецензию</button>\n<div class="reviews-grid"></div>\n\n' +
                    reviewModal(false, reviewFields, reviewButtons),
                css: T.css.modal + '\n' + T.css.modalFields + '\n' + T.css.buttons + '\n' + T.css.reviews + '\n' + T.css.hide,
                js: jsReady + "\nconst data = loadData();\nconst reviewsGrid = document.querySelector('.reviews-grid');\n" +
                    "const reviewModal = document.querySelector('.review-modal');\nconst reviewForm = document.querySelector('.review-form');\n\n" +
                    "document.querySelector('.open-review-form').addEventListener('click', function () {\n    reviewModal.showModal();\n});\n\n" +
                    "reviewForm.addEventListener('submit', function (event) {\n    // проверь поля, сохрани рецензию и покажи карточку\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst reviewsGrid = document.querySelector('.reviews-grid');\n" +
                    "const reviewModal = document.querySelector('.review-modal');\nconst reviewForm = document.querySelector('.review-form');\n\n" +
                    "document.querySelector('.open-review-form').addEventListener('click', function () {\n    reviewModal.showModal();\n});\n\n" +
                    "reviewForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const film = reviewForm.elements.film.value.trim();\n    const text = reviewForm.elements.text.value.trim();\n\n" +
                    "    if (film === '' || text === '') {\n        reviewForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    "    let author = 'Ты';\n    if (data.profile) {\n        author = data.profile;\n    }\n" +
                    "    data.reviews.push({ film: film, text: text, author: author });\n    saveData(data);\n\n" +
                    "    const card = document.createElement('article');\n    card.classList.add('review');\n" +
                    "    const reviewText = document.createElement('p');\n    reviewText.classList.add('review-text');\n    reviewText.textContent = text;\n" +
                    "    const reviewAuthor = document.createElement('p');\n    reviewAuthor.classList.add('review-author');\n    reviewAuthor.textContent = author;\n" +
                    "    card.append(reviewText, reviewAuthor);\n    reviewsGrid.append(card);\n    reviewModal.close();\n});",
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-review-form');
                    return t.q('.review-modal').open === true;
                }],
                ['Без текста — ошибка, рецензия не сохраняется', function (t) {
                    t.q('input[name="film"]').value = 'Дюна';
                    const prevented = t.submit('.review-form');
                    return prevented && t.visible('.review-form .error') && T.saved() === null;
                }],
                ['Рецензия сохраняется в localStorage', function (t) {
                    t.q('textarea[name="text"]').value = ' Шедевр ';
                    t.submit('.review-form');
                    const s = T.saved();
                    return !!s && s.reviews.length === 1 && s.reviews[0].film === 'Дюна' && s.reviews[0].text === 'Шедевр' && s.reviews[0].author === 'Ты';
                }],
                ['На странице появилась карточка рецензии', function (t) {
                    return t.all('.reviews-grid .review').length === 1 && t.text('.reviews-grid .review-text') === 'Шедевр';
                }],
                ['Окно закрылось', function (t) { return t.q('.review-modal').open === false; }],
            ],
        },
    ];
})();
