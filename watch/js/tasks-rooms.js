// =========================================================
// Задачи страницы «Комнаты» — Нина Терехова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    const roomsHead =
        '<div class="rooms-head">\n' +
        '    <div class="rooms-mascot"><img src="../img/mascot-small.svg" alt="" width="24" height="24"></div>\n' +
        '    <div class="rooms-head-text">\n' +
        '        <h2>Кинокомнаты</h2>\n' +
        '        <p>Смотрим кино вместе. Комнаты хранятся в этом браузере.</p>\n' +
        '    </div>\n' +
        '    <button class="button button-teal open-room-form" type="button"><img src="../img/plus-circle.svg" alt="" width="15" height="15"> Создать комнату</button>\n' +
        '</div>';
    const tabsHtml =
        '<div class="tabs">\n' +
        '    <button class="tab active" type="button" data-tab="room-list"><img src="../img/tab-rooms.svg" alt="" width="12" height="12"> Комнаты</button>\n' +
        '    <button class="tab" type="button" data-tab="member-list"><img src="../img/tab-friends.svg" alt="" width="16" height="8"> Участники</button>\n' +
        '</div>';
    function room(id, pic, alt, title, role, name) {
        return '<article class="room" data-id="' + id + '">\n' +
            '    <img class="room-avatar" src="../img/' + pic + '" alt="' + alt + '">\n' +
            '    <div class="room-info">\n' +
            '        <h3>' + title + '</h3>\n' +
            '        <p>' + role + ': <b>' + name + '</b></p>\n' +
            '    </div>\n' +
            '    <button class="button button-teal button-small join-button" type="button">Войти</button>\n' +
            '</article>';
    }
    const r1 = room('interstellar', 'room-interstellar.jpg', 'Постер «Интерстеллар»', 'Интерстеллар', 'Ведущий', 'Артём');
    const r2 = room('bladerunner', 'room-bladerunner.jpg', 'Постер «Бегущий по лезвию 2049»', 'Бегущий по лезвию 2049', 'Ведущая', 'София');
    const roomListHtml = '<div class="room-list">\n' + indent(r1) + '\n\n' + indent(r2) + '\n</div>';
    const memberListHtml = '<ul class="member-list hide"></ul>';

    const panelCss =
        '.rooms-panel {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    max-width: 720px;\n    padding: 24px;\n' +
        '    background: #0e0d18;\n    border: 1px solid #2c2f34;\n    border-radius: 24px;\n}\n\n' +
        '.rooms-head {\n    display: flex;\n    gap: 12px;\n    align-items: center;\n    padding-bottom: 16px;\n    border-bottom: 1px solid #2c2f34;\n}\n\n' +
        '.rooms-head-text {\n    flex: 1;\n}\n\n' +
        '.rooms-mascot {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-width: 40px;\n    width: 40px;\n' +
        '    height: 40px;\n    border-radius: 12px;\n    background: #5a3f64;\n}\n';
    const panelReady =
        '.rooms-panel h2 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 22px;\n    color: #debbe7;\n}\n\n' +
        '.rooms-head p {\n    font-size: 12px;\n    color: #c0c8c7;\n}\n';
    const tabsCss =
        '.tabs {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 8px;\n}\n\n' +
        '.tab {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    justify-content: center;\n    padding: 9px;\n' +
        '    color: #c0c8c7;\n    background: none;\n    border: 1px solid #0e0d18;\n    border-radius: 12px;\n}\n\n' +
        '.tab.active {\n    color: #debbe7;\n    background: #2f2537;\n    border-color: #6e5577;\n}\n';
    const roomCss =
        '.room-list {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n' +
        '.room {\n    display: flex;\n    gap: 12px;\n    align-items: center;\n    padding: 15px;\n    background: #201e2a;\n' +
        '    border: 1px solid #2c2f34;\n    border-radius: 16px;\n}\n\n' +
        '.room-avatar {\n    min-width: 40px;\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    object-fit: cover;\n' +
        '    border: 2px solid #a0cfce;\n}\n\n' +
        '.room-info {\n    flex: 1;\n}\n';
    const roomReady =
        '.room h3 {\n    font-size: 14px;\n}\n\n.room-info p {\n    font-size: 11px;\n    color: #c0c8c7;\n}\n\n' +
        '.room-info b {\n    color: #a0cfce;\n}\n\n' +
        '.member-list {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n' +
        '.member-list li {\n    padding: 15px;\n    background: #201e2a;\n    border-radius: 16px;\n}\n\n.member-list b {\n    display: block;\n    color: #debbe7;\n}\n';

    const roomFields =
        '        <label class="modal-field">Название комнаты <input name="title" placeholder="Киновечер у Ани"></label>\n' +
        '        <label class="modal-field">Твоё имя <input name="name" placeholder="Аня"></label>\n' +
        '        <label class="modal-field">Фильм <input name="film" placeholder="Интерстеллар"></label>\n';
    const roomButtons =
        '        <div class="modal-buttons">\n            <button class="button button-teal" type="submit">Создать</button>\n' +
        '            <button class="button button-ghost close-modal" type="button">Отмена</button>\n        </div>\n';
    function roomModal(open, fields, buttons) {
        return '<dialog class="modal room-modal"' + (open ? ' open' : '') + '>\n    <form class="modal-form room-form">\n        <h2>Создать комнату</h2>\n' +
            fields + '        <p class="small">Комната сохранится в этом браузере.</p>\n        <p class="error hide">Заполни название, имя и фильм.</p>\n' +
            buttons + '    </form>\n</dialog>';
    }

    const jsReady = T.js.data + '\n' + T.js.close;
    const findRoomJs = 'function findRoom(id) {\n    let found = null;\n    data.rooms.forEach(function (room) {\n' +
        '        if (room.id === id) {\n            found = room;\n        }\n    });\n    return found;\n}\n\n' +
        "function myName() {\n    if (data.profile) {\n        return data.profile;\n    }\n    return 'Гость';\n}\n";

    QUEST_TASKS.rooms = [
        // 1
        T.base(),

        // 2
        T.header('rooms'),

        // 3
        {
            title: 'Панель кинокомнат',
            kind: 'CSS',
            text: '<p>Кинокомнаты лежат на тёмной панели. Сверху у неё — Бэтти, заголовок и кнопка. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.rooms-panel</code>: всё столбиком, промежуток <code>16px</code>, не шире <code>720px</code>, отступы <code>24px</code>, ' +
                'фон <code>#0e0d18</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>24px</code></li>' +
                '<li><code>.rooms-head</code>: в строку, по центру, промежуток <code>12px</code>, снизу отступ <code>16px</code> и линия ' +
                '<code>border-bottom: 1px solid #2c2f34</code></li>' +
                '<li><code>.rooms-head-text</code>: занимает всё свободное место (<code>flex: 1</code>)</li>' +
                '<li><code>.rooms-mascot</code>: квадрат <code>40×40px</code> (и <code>min-width: 40px</code>), скругление <code>12px</code>, фон <code>#5a3f64</code>, картинка по центру</li></ul>',
            hint: ['flex-direction: column', 'max-width', 'border-bottom', 'flex: 1', 'min-width', 'border-radius'],
            start: {
                html: '<section class="rooms-panel">\n' + indent(roomsHead) + '\n</section>',
                css: '.rooms-panel {\n    \n}\n\n.rooms-head {\n    \n}\n\n.rooms-head-text {\n    \n}\n\n.rooms-mascot {\n    \n}\n\n/* Уже готово */\n' +
                    panelReady + '\n' + T.css.buttons,
            },
            answer: { css: panelCss },
            checks: [
                ['.rooms-panel: столбиком, промежуток 16px', function (t) {
                    return t.css('.rooms-panel', 'display') === 'flex' && t.css('.rooms-panel', 'flex-direction') === 'column' &&
                        t.css('.rooms-panel', 'row-gap') === '16px';
                }],
                ['.rooms-panel: не шире 720px, отступы 24px', function (t) {
                    return t.css('.rooms-panel', 'max-width') === '720px' && t.px('.rooms-panel', 'padding-top') === 24;
                }],
                ['.rooms-panel: фон #0e0d18, скругление 24px', function (t) {
                    return t.color('.rooms-panel', 'background-color') === '#0e0d18' && t.px('.rooms-panel', 'border-top-left-radius') === 24;
                }],
                ['.rooms-head: в строку, промежуток 12px', function (t) {
                    return t.css('.rooms-head', 'display') === 'flex' && t.css('.rooms-head', 'column-gap') === '12px';
                }],
                ['.rooms-head: линия снизу и отступ 16px', function (t) {
                    return Math.abs(t.px('.rooms-head', 'border-bottom-width') - 1) <= 0.5 && t.px('.rooms-head', 'padding-bottom') === 16;
                }],
                ['Текст занимает свободное место', function (t) { return t.css('.rooms-head-text', 'flex-grow') === '1'; }],
                ['.rooms-mascot: 40×40px, не сжимается', function (t) {
                    return t.px('.rooms-mascot', 'width') === 40 && t.px('.rooms-mascot', 'height') === 40 && t.px('.rooms-mascot', 'min-width') === 40;
                }],
                ['.rooms-mascot: фон #5a3f64, скругление 12px', function (t) {
                    return t.color('.rooms-mascot', 'background-color') === '#5a3f64' && t.px('.rooms-mascot', 'border-top-left-radius') === 12;
                }],
            ],
        },

        // 4
        {
            title: 'Вкладки',
            kind: 'HTML + CSS',
            text: '<p>Под заголовком — две вкладки: «Комнаты» и «Участники».</p><ul>' +
                '<li>HTML: в <code>.tabs</code> вторую кнопку по образцу первой: <code>&lt;button class="tab" type="button" data-tab="member-list"&gt;</code> ' +
                'с иконкой <code>../img/tab-friends.svg</code> и текстом «Участники» (без класса <code>active</code>)</li>' +
                '<li><code>.tabs</code>: сетка из двух равных колонок <code>1fr 1fr</code>, промежуток <code>8px</code></li>' +
                '<li><code>.tab</code>: в строку, всё по центру, отступы <code>9px</code>, цвет <code>#c0c8c7</code>, без фона, скругление <code>12px</code></li>' +
                '<li><code>.tab.active</code> (открытая вкладка): цвет <code>#debbe7</code>, фон <code>#2f2537</code></li></ul>',
            hint: ['<button type="button" data-tab="...">', '<img src="..." alt="">', 'grid-template-columns: 1fr 1fr', 'background: none', '.tab.active'],
            start: {
                html: '<div class="tabs">\n    <button class="tab active" type="button" data-tab="room-list"><img src="../img/tab-rooms.svg" alt="" width="12" height="12"> Комнаты</button>\n' +
                    '    <!-- сюда вторую вкладку -->\n\n</div>',
                css: '.tabs {\n    \n}\n\n.tab {\n    \n}\n\n.tab.active {\n    \n}\n',
            },
            answer: { html: tabsHtml, css: tabsCss },
            checks: [
                ['Две вкладки .tab', function (t) { return t.all('.tabs .tab').length === 2; }],
                ['Вторая: data-tab="member-list", «Участники»', function (t) {
                    const tab = t.all('.tab')[1];
                    return tab.dataset.tab === 'member-list' && tab.textContent.trim() === 'Участники';
                }],
                ['Вторая без класса active, с иконкой', function (t) {
                    const tab = t.all('.tab')[1];
                    return !tab.classList.contains('active') && !!tab.querySelector('img');
                }],
                ['.tabs — сетка из 2 колонок, промежуток 8px', function (t) {
                    return t.css('.tabs', 'display') === 'grid' && t.css('.tabs', 'grid-template-columns').split(' ').length === 2 &&
                        t.css('.tabs', 'column-gap') === '8px';
                }],
                ['.tab: по центру, отступы 9px, скругление 12px', function (t) {
                    return t.css('.tab', 'justify-content') === 'center' && t.px('.tab', 'padding-top') === 9 && t.px('.tab', 'border-top-left-radius') === 12;
                }],
                ['.tab: без фона, цвет #c0c8c7', function (t) {
                    return t.color('.tab:not(.active)', 'background-color') === 'transparent' && t.color('.tab:not(.active)', 'color') === '#c0c8c7';
                }],
                ['Открытая вкладка: #debbe7 на #2f2537', function (t) {
                    return t.color('.tab.active', 'color') === '#debbe7' && t.color('.tab.active', 'background-color') === '#2f2537';
                }],
            ],
        },

        // 5
        {
            title: 'Комнаты: разметка',
            kind: 'HTML',
            text: '<p>Каждая комната — строка с постером, названием и кнопкой «Войти». Первая готова, сделай вторую по образцу:</p><ul>' +
                '<li><code>&lt;article class="room" data-id="bladerunner"&gt;</code></li>' +
                '<li>постер <code>&lt;img class="room-avatar" src="../img/room-bladerunner.jpg" alt="Постер «Бегущий по лезвию 2049»"&gt;</code></li>' +
                '<li>блок <code>.room-info</code>: <code>&lt;h3&gt;Бегущий по лезвию 2049&lt;/h3&gt;</code> и <code>&lt;p&gt;Ведущая: &lt;b&gt;София&lt;/b&gt;&lt;/p&gt;</code></li>' +
                '<li>кнопку <code>&lt;button class="button button-teal button-small join-button" type="button"&gt;Войти&lt;/button&gt;</code></li></ul>' +
                '<p>А после списка комнат — пустой список участников <code>&lt;ul class="member-list hide"&gt;&lt;/ul&gt;</code>.</p>',
            hint: ['<article data-id="...">', '<img class="..." src="..." alt="...">', '<div class="room-info">', '<h3>', '<p>', '<b>', '<button type="button">', '<ul class="...">'],
            start: {
                html: '<div class="room-list">\n' + indent(r1) + '\n\n    <!-- сюда вторую комнату -->\n\n</div>\n\n<!-- сюда пустой список участников -->\n',
                css: roomCss + '\n' + roomReady + '\n' + T.css.buttons + '\n' + T.css.hide,
            },
            answer: { html: roomListHtml + '\n\n' + memberListHtml },
            checks: [
                ['Две комнаты .room', function (t) { return t.all('.room-list .room').length === 2; }],
                ['У второй data-id="bladerunner"', function (t) { return t.all('.room')[1].dataset.id === 'bladerunner'; }],
                ['Постер room-bladerunner.jpg с alt', function (t) {
                    const img = t.all('.room')[1].querySelector('img.room-avatar');
                    return !!img && img.getAttribute('src') === '../img/room-bladerunner.jpg' && (img.getAttribute('alt') || '').length > 0;
                }],
                ['Название и ведущая София', function (t) {
                    const r = t.all('.room')[1];
                    return t.text(r.querySelector('h3')) === 'Бегущий по лезвию 2049' && t.text(r.querySelector('.room-info b')) === 'София';
                }],
                ['Кнопка «Войти» .join-button', function (t) {
                    const b = t.all('.room')[1].querySelector('button.join-button');
                    return !!b && b.textContent.trim() === 'Войти';
                }],
                ['Пустой список .member-list.hide', function (t) {
                    const ul = t.q('ul.member-list');
                    return !!ul && ul.classList.contains('hide') && ul.children.length === 0;
                }],
            ],
        },

        // 6
        {
            title: 'Комнаты: оформление',
            kind: 'CSS',
            text: '<p>Оформим список комнат:</p><ul>' +
                '<li><code>.room-list</code>: комнаты столбиком, промежуток <code>12px</code></li>' +
                '<li><code>.room</code>: в строку, по центру, промежуток <code>12px</code>, отступы <code>15px</code>, фон <code>#201e2a</code>, скругление <code>16px</code></li>' +
                '<li><code>.room-avatar</code>: круглый постер <code>40×40px</code> (и <code>min-width: 40px</code>), без искажений, рамка <code>2px solid #a0cfce</code></li>' +
                '<li><code>.room-info</code>: занимает всё свободное место (<code>flex: 1</code>)</li></ul>',
            hint: ['flex-direction: column', 'border-radius: 50%', 'object-fit: cover', 'border: 2px solid ...', 'flex: 1'],
            start: {
                html: roomListHtml,
                css: '.room-list {\n    \n}\n\n.room {\n    \n}\n\n.room-avatar {\n    \n}\n\n.room-info {\n    \n}\n\n/* Уже готово */\n' +
                    roomReady + '\n' + T.css.buttons,
            },
            answer: { css: roomCss },
            checks: [
                ['.room-list: столбиком, промежуток 12px', function (t) {
                    return t.css('.room-list', 'flex-direction') === 'column' && t.css('.room-list', 'row-gap') === '12px';
                }],
                ['.room: в строку, промежуток 12px, отступы 15px', function (t) {
                    return t.css('.room', 'display') === 'flex' && t.css('.room', 'column-gap') === '12px' && t.px('.room', 'padding-top') === 15;
                }],
                ['.room: фон #201e2a, скругление 16px', function (t) {
                    return t.color('.room', 'background-color') === '#201e2a' && t.px('.room', 'border-top-left-radius') === 16;
                }],
                ['Постер: круг 40×40px, не сжимается', function (t) {
                    return t.px('.room-avatar', 'width') === 40 && t.css('.room-avatar', 'border-top-left-radius') === '50%' &&
                        t.px('.room-avatar', 'min-width') === 40;
                }],
                ['Постер без искажений, рамка #a0cfce', function (t) {
                    return t.css('.room-avatar', 'object-fit') === 'cover' && t.color('.room-avatar', 'border-top-color') === '#a0cfce';
                }],
                ['.room-info растягивается', function (t) { return t.css('.room-info', 'flex-grow') === '1'; }],
            ],
        },

        // 7
        T.modalTask('Окно «Создать комнату»',
            '<p>Окно создания комнаты. Разметка почти готова — добавь в конец формы <code>&lt;div class="modal-buttons"&gt;</code> с двумя кнопками: ' +
            '<code>&lt;button class="button button-teal" type="submit"&gt;Создать&lt;/button&gt;</code> и ' +
            '<code>&lt;button class="button button-ghost close-modal" type="button"&gt;Отмена&lt;/button&gt;</code></p>',
            roomModal(true, roomFields, '        <!-- сюда блок с двумя кнопками -->\n\n'), roomModal(true, roomFields, roomButtons),
            [
                ['В форме блок .modal-buttons', function (t) { return !!t.q('.room-form .modal-buttons'); }],
                ['Кнопка «Создать» type="submit"', function (t) {
                    const b = t.q('.modal-buttons .button-teal');
                    return !!b && b.getAttribute('type') === 'submit' && b.textContent.trim() === 'Создать';
                }],
                ['Кнопка «Отмена» с классом close-modal', function (t) {
                    const b = t.q('.modal-buttons .close-modal');
                    return !!b && b.getAttribute('type') === 'button' && b.textContent.trim() === 'Отмена';
                }],
            ],
            ['<div class="modal-buttons">', 'type="submit"']),

        // 8
        T.fieldsTask('Поля комнаты',
            '<p>Добавь в окно три поля — каждое это <code>&lt;label class="modal-field"&gt;подпись &lt;input ...&gt;&lt;/label&gt;</code>:</p><ul>' +
            '<li>«Название комнаты» — <code>name="title"</code>, подсказка <code>Киновечер у Ани</code></li>' +
            '<li>«Твоё имя» — <code>name="name"</code>, подсказка <code>Аня</code></li>' +
            '<li>«Фильм» — <code>name="film"</code>, подсказка <code>Интерстеллар</code></li></ul>',
            roomModal(true, '        <!-- сюда три поля -->\n\n', roomButtons), roomModal(true, roomFields, roomButtons),
            [
                ['Три поля .modal-field', function (t) { return t.all('.room-form .modal-field').length === 3; }],
                ['Поля title, name и film', function (t) {
                    return !!t.q('.modal-field input[name="title"]') && !!t.q('.modal-field input[name="name"]') && !!t.q('.modal-field input[name="film"]');
                }],
                ['У полей есть подсказки', function (t) {
                    return t.all('.modal-field input').every(function (i) { return !!i.getAttribute('placeholder'); });
                }],
            ],
            ['<label class="modal-field">', 'name', 'placeholder']),

        // 9
        T.footer('rooms'),

        // 10
        {
            title: 'JS: бургер и вкладки',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>вкладки: при клике на любую <code>.tab</code> сними класс <code>active</code> со всех вкладок и поставь нажатой. ' +
                'Если у нажатой <code>tab.dataset.tab === \'room-list\'</code> — покажи <code>.room-list</code> и спрячь <code>.member-list</code> ' +
                '(класс <code>hide</code>), иначе — наоборот</li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", 'querySelectorAll(...).forEach',
                'classList.add / remove', 'tab.dataset.tab', 'if / else'],
            start: {
                html: T.burgerHtml + '\n\n' + tabsHtml + '\n\n' + roomListHtml + '\n\n<ul class="member-list hide">\n    <li><b>Интерстеллар</b>Артём</li>\n</ul>',
                css: T.burgerCss + '\n' + tabsCss + '\n' + roomCss + '\n' + roomReady + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const roomList = document.querySelector('.room-list');\nconst memberList = document.querySelector('.member-list');\n\n" +
                    '// 1) бургер\n\n\n// 2) вкладки\n',
            },
            answer: {
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n" +
                    "const roomList = document.querySelector('.room-list');\nconst memberList = document.querySelector('.member-list');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "document.querySelectorAll('.tab').forEach(function (tab) {\n    tab.addEventListener('click', function () {\n" +
                    "        document.querySelectorAll('.tab').forEach(function (other) {\n            other.classList.remove('active');\n        });\n" +
                    "        tab.classList.add('active');\n        if (tab.dataset.tab === 'room-list') {\n            roomList.classList.remove('hide');\n" +
                    "            memberList.classList.add('hide');\n        } else {\n            roomList.classList.add('hide');\n" +
                    "            memberList.classList.remove('hide');\n        }\n    });\n});",
            },
            checks: T.burgerChecks.concat([
                ['Вкладка «Участники» показывает участников', function (t) {
                    t.all('.tab')[1].click();
                    return t.visible('.member-list') && !t.visible('.room-list');
                }],
                ['Активной стала вкладка «Участники»', function (t) {
                    return t.all('.tab')[1].classList.contains('active') && !t.all('.tab')[0].classList.contains('active');
                }],
                ['Вкладка «Комнаты» возвращает комнаты', function (t) {
                    t.all('.tab')[0].click();
                    return t.visible('.room-list') && !t.visible('.member-list') && t.all('.tab')[0].classList.contains('active');
                }],
            ]),
        },

        // 11
        {
            title: 'JS: войти в комнату',
            kind: 'JS',
            text: '<p>Кнопка «Войти» добавляет тебя в зрители комнаты. Функции <code>findRoom(id)</code> (найти комнату) и <code>myName()</code> ' +
                '(имя из профиля или «Гость») уже есть. Повесь обработчик клика на весь список <code>roomList</code>:</p><ul>' +
                '<li>найди нажатую кнопку: <code>event.target.closest(\'.join-button\')</code>; если её нет — <code>return</code></li>' +
                '<li>найди комнату: <code>findRoom(button.closest(\'.room\').dataset.id)</code></li>' +
                '<li>если тебя ещё нет среди <code>room.members</code> — добавь <code>myName()</code> и сохрани <code>saveData(data)</code></li>' +
                '<li>напиши на кнопке «Вы в комнате»</li></ul>',
            hint: ["event.target.closest('.join-button')", 'return', "closest('.room')", 'dataset.id', '!room.members.includes(...)', '.push(...)', 'saveData(data)', 'textContent'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: roomListHtml,
                css: roomCss + '\n' + roomReady + '\n' + T.css.buttons,
                js: jsReady + '\nconst data = loadData();\nconst roomList = document.querySelector(\'.room-list\');\n\n' + findRoomJs +
                    "\nroomList.addEventListener('click', function (event) {\n    // найди кнопку и комнату, добавь себя\n\n});\n",
            },
            answer: {
                js: jsReady + '\nconst data = loadData();\nconst roomList = document.querySelector(\'.room-list\');\n\n' + findRoomJs +
                    "\nroomList.addEventListener('click', function (event) {\n    const button = event.target.closest('.join-button');\n" +
                    "    if (!button) {\n        return;\n    }\n    const room = findRoom(button.closest('.room').dataset.id);\n" +
                    "    if (!room.members.includes(myName())) {\n        room.members.push(myName());\n        saveData(data);\n    }\n" +
                    "    button.textContent = 'Вы в комнате';\n});",
            },
            checks: [
                ['Кнопка второй комнаты → «Вы в комнате»', function (t) {
                    t.all('.join-button')[1].click();
                    return t.all('.join-button')[1].textContent.trim() === 'Вы в комнате';
                }],
                ['Гость добавлен в зрители и сохранён', function (t) {
                    const s = T.saved();
                    return !!s && s.rooms[1].members.join(',') === 'София,Гость';
                }],
                ['Повторный клик не добавляет второй раз', function (t) {
                    t.all('.join-button')[1].click();
                    return T.saved().rooms[1].members.length === 2;
                }],
                ['Первая комната не изменилась', function (t) { return T.saved().rooms[0].members.join(',') === 'Артём'; }],
            ],
        },

        // 12
        {
            title: 'JS: создать комнату',
            kind: 'JS',
            text: '<p>Кнопка «Создать комнату» уже открывает окно. При отправке формы:</p><ul>' +
                '<li>отмени перезагрузку, возьми название, имя и фильм (<code>.trim()</code>)</li>' +
                '<li>если что-то пустое — покажи <code>.error</code> (убери <code>hide</code>) и <code>return</code></li>' +
                '<li>иначе добавь в <code>data.rooms</code> объект <code>{ id: \'room-\' + Date.now(), title: title, film: film, members: [name] }</code>, ' +
                'сохрани <code>saveData(data)</code> и закрой окно</li></ul>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', '.value.trim()', "=== ''", '||', "classList.remove('hide')", 'return',
                'data.rooms.push(...)', 'Date.now()', 'members: [name]', 'close()'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="button button-teal open-room-form" type="button">Создать комнату</button>\n\n' + roomModal(false, roomFields, roomButtons),
                css: T.css.modal + '\n' + T.css.modalFields + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: jsReady + "\nconst data = loadData();\nconst roomModal = document.querySelector('.room-modal');\nconst roomForm = document.querySelector('.room-form');\n\n" +
                    "document.querySelector('.open-room-form').addEventListener('click', function () {\n    roomModal.showModal();\n});\n\n" +
                    "roomForm.addEventListener('submit', function (event) {\n    // проверь поля и добавь комнату\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst roomModal = document.querySelector('.room-modal');\nconst roomForm = document.querySelector('.room-form');\n\n" +
                    "document.querySelector('.open-room-form').addEventListener('click', function () {\n    roomModal.showModal();\n});\n\n" +
                    "roomForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const title = roomForm.elements.title.value.trim();\n    const name = roomForm.elements.name.value.trim();\n" +
                    "    const film = roomForm.elements.film.value.trim();\n\n" +
                    "    if (title === '' || name === '' || film === '') {\n        roomForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    "    data.rooms.push({ id: 'room-' + Date.now(), title: title, film: film, members: [name] });\n    saveData(data);\n    roomModal.close();\n});",
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-room-form');
                    return t.q('.room-modal').open === true;
                }],
                ['Без фильма — ошибка, комната не создаётся', function (t) {
                    t.q('input[name="title"]').value = 'Киновечер';
                    t.q('input[name="name"]').value = 'Нина';
                    const prevented = t.submit('.room-form');
                    return prevented && t.visible('.room-form .error') && T.saved() === null;
                }],
                ['Комната сохраняется в localStorage', function (t) {
                    t.q('input[name="film"]').value = ' Дюна ';
                    t.submit('.room-form');
                    const s = T.saved();
                    const last = s ? s.rooms[s.rooms.length - 1] : {};
                    return !!s && s.rooms.length === 3 && last.title === 'Киновечер' && last.film === 'Дюна' && last.members.join(',') === 'Нина';
                }],
                ['Окно закрылось', function (t) { return t.q('.room-modal').open === false; }],
            ],
        },
    ];
})();
