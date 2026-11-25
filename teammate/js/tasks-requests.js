// =========================================================
// Задачи страницы «Заявки» — Надежда Окольникова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    const headHtml =
        '<section class="page-head">\n' +
        '    <div>\n' +
        '        <h1>Заявки на подбор команды</h1>\n' +
        '        <p class="lead">Найди подходящую роль или создай собственную заявку.</p>\n' +
        '    </div>\n' +
        '    <button class="button open-request" type="button">Создать заявку</button>\n' +
        '</section>';
    const sidebarTop = '<aside class="card sidebar">\n    <h2>Фильтры</h2>\n';
    const tabsHtml =
        '<div class="tabs">\n' +
        '    <button class="chip active" type="button" data-filter="all">Все заявки</button>\n' +
        '    <button class="chip" type="button" data-filter="mine">Мои заявки и отклики</button>\n' +
        '</div>';
    const searchHtml = '<label class="field">Поиск по заявкам <input class="request-search" type="text" placeholder="Роль, игра или ник"></label>';
    const countHtml = '<p class="muted request-count">Заявок: 0</p>';
    const sidebarHtml = sidebarTop + indent(tabsHtml) + '\n' + indent(searchHtml) + '\n' + indent(countHtml) + '\n</aside>';
    const boardHtml = '<div class="board">\n' + indent(sidebarHtml) + '\n\n    <div class="request-list"></div>\n</div>';

    const cardHtml =
        '<article class="card request">\n' +
        '    <p class="muted">Counter-Strike 2 · Alex_Shadow</p>\n' +
        '    <h2>North Side</h2>\n' +
        '    <p>Ищем пятого игрока для Premier.</p>\n' +
        '    <div class="request-bottom">\n' +
        '        <p class="tag">Ищем: Снайпер</p>\n' +
        '        <button class="button reply-button" type="button">Откликнуться</button>\n' +
        '    </div>\n' +
        '</article>';

    const pageCss =
        'h1 {\n    font-family: Georgia, serif;\n    font-size: 44px;\n    line-height: 1.15;\n}\n\n' +
        '.lead {\n    margin-top: 12px;\n    color: #bcb2c9;\n}\n\n' +
        '.page-head {\n    display: flex;\n    gap: 16px;\n    align-items: flex-start;\n    justify-content: space-between;\n}\n\n' +
        '.board {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n    gap: 18px;\n    align-items: start;\n}\n';
    const sidebarCss =
        T.css.card + '\n' +
        '.sidebar {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
        '.tabs {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' + T.css.chips + '\n' + T.css.fields;
    const requestCss =
        '.request-list {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
        '.request {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n' +
        '.request-bottom {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
        '.reply-button.replied {\n    color: #f4eef9;\n    background: #15141b;\n}\n';
    const readyCss = T.css.tag + '\n' + T.css.muted + '\n' + T.css.buttons + '\n' + T.css.empty;

    // ---------- окно «Создать заявку» ----------
    const dialogHead = '<dialog class="modal request-modal" open>\n    <form class="modal-form request-form">\n        <h2>Создать заявку</h2>\n';
    const fTitle = '        <label class="field">Название команды <input name="title" placeholder="North Side"></label>\n';
    const fGame = '        <label class="field">Дисциплина <input name="game" placeholder="Dota 2"></label>\n';
    const fRole = '        <label class="field">Кого ищешь <input name="role" placeholder="Например, саппорта"></label>\n';
    const fText = '        <label class="field">О команде и расписании <textarea name="text" rows="3"></textarea></label>\n';
    const dialogError = '        <p class="error hide">Заполни название, дисциплину, роль и описание.</p>\n';
    const dialogButtons =
        '        <div class="modal-buttons">\n' +
        '            <button class="button" type="submit">Сохранить заявку</button>\n' +
        '            <button class="button button-quiet close-modal" type="button">Отмена</button>\n' +
        '        </div>\n';
    const dialogTail = '    </form>\n</dialog>';
    const dialogFull = dialogHead + fTitle + fGame + fRole + fText + dialogError + dialogButtons + dialogTail;

    // ---------- JS ----------
    const createJs =
        'function createRequest(request) {\n' +
        "    const card = document.createElement('article');\n    card.classList.add('card', 'request');\n" +
        "    const meta = document.createElement('p');\n    meta.classList.add('muted');\n    meta.textContent = request.game + ' · ' + request.author;\n" +
        "    const title = document.createElement('h2');\n    title.textContent = request.title;\n" +
        "    const text = document.createElement('p');\n    text.textContent = request.text;\n" +
        "    const bottom = document.createElement('div');\n    bottom.classList.add('request-bottom');\n" +
        "    const role = document.createElement('p');\n    role.classList.add('tag');\n    role.textContent = 'Ищем: ' + request.role;\n" +
        '    bottom.append(role);\n    card.append(meta, title, text, bottom);\n    return card;\n}\n';
    const listConsts =
        "const data = loadData();\nconst requestList = document.querySelector('.request-list');\n" +
        "const requestSearch = document.querySelector('.request-search');\nconst requestCount = document.querySelector('.request-count');\n";
    const showJs =
        'function showRequests() {\n' +
        '    const query = requestSearch.value.trim().toLowerCase();\n    let count = 0;\n' +
        "    requestList.textContent = '';\n\n" +
        '    data.requests.forEach(function (request) {\n' +
        "        const words = (request.title + ' ' + request.game + ' ' + request.role + ' ' + request.author).toLowerCase();\n" +
        '        if (words.includes(query)) {\n            requestList.append(createRequest(request));\n            count = count + 1;\n        }\n    });\n\n' +
        "    requestCount.textContent = 'Заявок: ' + count;\n" +
        "    if (count === 0) {\n        const empty = document.createElement('p');\n        empty.classList.add('empty');\n" +
        "        empty.textContent = 'Заявок нет. Измени фильтры или создай свою заявку.';\n        requestList.append(empty);\n    }\n}\n\n" +
        "showRequests();\nrequestSearch.addEventListener('input', showRequests);\n";

    // карточка с кнопкой отклика (задача 11)
    const replyStart =
        'function createRequest(request) {\n' +
        "    const card = document.createElement('article');\n    card.classList.add('card', 'request');\n" +
        "    const title = document.createElement('h2');\n    title.textContent = request.title;\n" +
        "    const bottom = document.createElement('div');\n    bottom.classList.add('request-bottom');\n" +
        "    const role = document.createElement('p');\n    role.classList.add('tag');\n    role.textContent = 'Ищем: ' + request.role;\n" +
        '    bottom.append(role);\n\n' +
        "    const button = document.createElement('button');\n    button.classList.add('button', 'reply-button');\n    button.type = 'button';\n" +
        '    // текст и класс кнопки, клик по кнопке\n\n\n' +
        '    bottom.append(button);\n    card.append(title, bottom);\n    return card;\n}\n';
    const replyAnswer =
        'function createRequest(request) {\n' +
        "    const card = document.createElement('article');\n    card.classList.add('card', 'request');\n" +
        "    const title = document.createElement('h2');\n    title.textContent = request.title;\n" +
        "    const bottom = document.createElement('div');\n    bottom.classList.add('request-bottom');\n" +
        "    const role = document.createElement('p');\n    role.classList.add('tag');\n    role.textContent = 'Ищем: ' + request.role;\n" +
        '    bottom.append(role);\n\n' +
        "    const button = document.createElement('button');\n    button.classList.add('button', 'reply-button');\n    button.type = 'button';\n" +
        "    if (data.replies.includes(request.id)) {\n        button.classList.add('replied');\n        button.textContent = 'Отменить отклик';\n" +
        "    } else {\n        button.textContent = 'Откликнуться';\n    }\n" +
        "    button.addEventListener('click', function () {\n        if (data.replies.includes(request.id)) {\n" +
        '            data.replies = data.replies.filter(function (id) {\n                return id !== request.id;\n            });\n' +
        '        } else {\n            data.replies.push(request.id);\n        }\n        saveData(data);\n        showRequests();\n    });\n\n' +
        '    bottom.append(button);\n    card.append(title, bottom);\n    return card;\n}\n';
    const tabConsts = "const data = loadData();\nconst requestList = document.querySelector('.request-list');\nconst tabs = document.querySelectorAll('.tabs .chip');\nlet filter = 'all';\n\n";
    const showMineStart =
        "function showRequests() {\n    requestList.textContent = '';\n    data.requests.forEach(function (request) {\n" +
        '        // на вкладке «Мои» пропусти заявки без отклика\n\n' +
        '        requestList.append(createRequest(request));\n    });\n}\n\nshowRequests();\n';
    const showMineAnswer =
        "function showRequests() {\n    requestList.textContent = '';\n    data.requests.forEach(function (request) {\n" +
        "        if (filter === 'mine' && !data.replies.includes(request.id)) {\n            return;\n        }\n" +
        '        requestList.append(createRequest(request));\n    });\n}\n\nshowRequests();\n';
    const tabsJs =
        "tabs.forEach(function (tab) {\n    tab.addEventListener('click', function () {\n        tabs.forEach(function (other) {\n" +
        "            other.classList.remove('active');\n        });\n        tab.classList.add('active');\n        filter = tab.dataset.filter;\n" +
        '        showRequests();\n    });\n});\n';

    const modalConsts =
        "const requestModal = document.querySelector('.request-modal');\nconst requestForm = document.querySelector('.request-form');\n\n";
    const simpleShow =
        "function showRequests() {\n    requestList.textContent = '';\n    data.requests.forEach(function (request) {\n" +
        "        const card = document.createElement('p');\n        card.classList.add('request');\n" +
        "        card.textContent = request.title + ' · ' + request.author;\n        requestList.append(card);\n    });\n}\n\nshowRequests();\n";

    function fillRequest(t, title, game, role, text) {
        const f = t.q('.request-form');
        f.elements.title.value = title;
        f.elements.game.value = game;
        f.elements.role.value = role;
        f.elements.text.value = text;
    }

    QUEST_TASKS.requests = [
        // 1
        T.base(),

        // 2
        T.header('requests'),

        // 3
        {
            title: 'Заголовок и две колонки',
            kind: 'CSS',
            text: '<p>Вверху — заголовок и кнопка «Создать заявку», ниже — две колонки: фильтры слева, заявки справа. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>h1</code>: шрифт <code>Georgia, serif</code>, <code>44px</code>, высота строки <code>1.15</code></li>' +
                '<li><code>.lead</code>: отступ сверху <code>12px</code>, цвет <code>#bcb2c9</code></li>' +
                '<li><code>.page-head</code>: в строку, края разнесены (<code>space-between</code>), прижато к верху (<code>align-items: flex-start</code>), промежуток <code>16px</code></li>' +
                '<li><code>.board</code>: сетка из двух колонок <code>1fr 2fr</code> (правая вдвое шире), промежуток <code>18px</code>, колонки прижаты к верху (<code>align-items: start</code>)</li></ul>',
            hint: ['font-family', 'font-size', 'line-height', 'margin-top', 'color', 'display: flex', 'justify-content: space-between', 'align-items: flex-start', 'gap',
                'display: grid', 'grid-template-columns: 1fr 2fr', 'align-items: start'],
            start: {
                html: headHtml + '\n\n' + boardHtml.replace('<div class="request-list"></div>', '<div class="request-list">\n        ' +
                    cardHtml.replace(/\n/g, '\n        ') + '\n    </div>'),
                css: 'h1 {\n    \n}\n\n.lead {\n    \n}\n\n.page-head {\n    \n}\n\n.board {\n    \n}\n\n/* Уже готово */\n' + sidebarCss + '\n' + requestCss + '\n' + readyCss,
            },
            answer: { css: pageCss + '\n' + sidebarCss + '\n' + requestCss + '\n' + readyCss },
            checks: [
                ['h1: Georgia 44px, высота строки 1.15', function (t) {
                    return t.css('h1', 'font-family').indexOf('Georgia') >= 0 && t.px('h1', 'font-size') === 44 && Math.abs(t.px('h1', 'line-height') - 50.6) < 0.5;
                }],
                ['.lead: сверху 12px, цвет #bcb2c9', function (t) {
                    return t.px('.lead', 'margin-top') === 12 && t.color('.lead', 'color') === '#bcb2c9';
                }],
                ['.page-head: в строку, края разнесены, промежуток 16px', function (t) {
                    return t.css('.page-head', 'display') === 'flex' && t.css('.page-head', 'justify-content') === 'space-between' &&
                        t.css('.page-head', 'column-gap') === '16px';
                }],
                ['.page-head: прижато к верху', function (t) { return t.css('.page-head', 'align-items') === 'flex-start'; }],
                ['.board — сетка 1fr 2fr', function (t) {
                    return t.css('.board', 'display') === 'grid' && t.rule('.board', 'grid-template-columns').replace(/\s+/g, ' ') === '1fr 2fr';
                }],
                ['.board: промежуток 18px, прижато к верху', function (t) {
                    return t.css('.board', 'column-gap') === '18px' && t.css('.board', 'align-items') === 'start';
                }],
            ],
        },

        // 4
        {
            title: 'Фильтры: разметка',
            kind: 'HTML',
            text: '<p>Левая колонка — карточка с фильтрами. Заголовок уже есть, допиши под ним:</p><ul>' +
                '<li><code>&lt;div class="tabs"&gt;</code> с двумя кнопками: «Все заявки» (<code>class="chip active"</code>, <code>data-filter="all"</code>) ' +
                'и «Мои заявки и отклики» (<code>class="chip"</code>, <code>data-filter="mine"</code>), у обеих <code>type="button"</code></li>' +
                '<li>поле поиска: <code>&lt;label class="field"&gt;Поиск по заявкам &lt;input class="request-search" type="text" placeholder="Роль, игра или ник"&gt;&lt;/label&gt;</code></li>' +
                '<li>счётчик: <code>&lt;p class="muted request-count"&gt;Заявок: 0&lt;/p&gt;</code> — число потом будет менять JS</li></ul>',
            hint: ['<aside>', '<div class="...">', '<button class="..." type="button" data-filter="...">', '<label class="...">', '<input class="..." type="text" placeholder="...">', '<p class="...">'],
            start: {
                html: sidebarTop + '\n    <!-- вкладки, поиск и счётчик -->\n\n</aside>',
                css: sidebarCss + '\n' + readyCss,
            },
            answer: { html: sidebarHtml },
            checks: [
                ['Блок .tabs с двумя кнопками .chip', function (t) { return t.all('.sidebar .tabs button.chip').length === 2; }],
                ['data-filter: all и mine', function (t) {
                    return t.all('.tabs .chip').map(function (b) { return b.dataset.filter; }).join(',') === 'all,mine';
                }],
                ['Тексты вкладок', function (t) {
                    return t.all('.tabs .chip').map(function (b) { return b.textContent.trim(); }).join('|') === 'Все заявки|Мои заявки и отклики';
                }],
                ['Активна только первая, у обеих type="button"', function (t) {
                    const b = t.all('.tabs .chip');
                    return b[0].classList.contains('active') && !b[1].classList.contains('active') &&
                        b.every(function (x) { return x.getAttribute('type') === 'button'; });
                }],
                ['Поле .request-search внутри label.field', function (t) { return !!t.q('label.field input.request-search'); }],
                ['У поля есть placeholder', function (t) { return (t.attr('.request-search', 'placeholder') || '').length > 0; }],
                ['Счётчик .request-count «Заявок: 0»', function (t) { return t.text('p.request-count') === 'Заявок: 0'; }],
            ],
        },

        // 5
        {
            title: 'Фильтры: оформление',
            kind: 'CSS',
            text: '<p>Оформим карточку фильтров:</p><ul>' +
                '<li><code>.card</code>: отступы <code>18px</code>, фон <code>#1c1b23</code>, рамка <code>1px solid #3a3547</code>, скругление <code>12px</code></li>' +
                '<li><code>.sidebar</code>: всё столбиком, промежуток <code>16px</code></li>' +
                '<li><code>.tabs</code>: кнопки в строку с переносом, промежуток <code>8px</code></li>' +
                '<li><code>.chip</code>: отступы <code>8px 14px</code>, жирный <code>700</code>, фон <code>#15141b</code>, рамка <code>1px solid #3a3547</code>, скругление <code>8px</code>; ' +
                '<code>.chip.active</code>: фон <code>#f7ca60</code>, текст <code>#241a06</code></li>' +
                '<li><code>.field</code>: столбиком, промежуток <code>6px</code>, <code>14px</code> цвета <code>#bcb2c9</code>; ' +
                '<code>.field input</code>: на всю ширину, отступы <code>10px 12px</code>, фон <code>#15141b</code>, рамка <code>1px solid #3a3547</code>, скругление <code>8px</code></li></ul>',
            hint: ['flex-direction: column', 'flex-wrap: wrap', 'border: 1px solid ...', 'border-radius', 'font-weight', 'width: 100%'],
            start: {
                html: sidebarHtml,
                css: '.card {\n    \n}\n\n.sidebar {\n    \n}\n\n.tabs {\n    \n}\n\n.chip {\n    \n}\n\n.chip.active {\n    \n}\n\n.field {\n    \n}\n\n.field input {\n    \n}\n\n' +
                    '/* Уже готово */\n' + T.css.muted,
            },
            answer: {
                css: T.css.card + '\n.sidebar {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
                    '.tabs {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n' + T.css.chips + '\n' +
                    '.field {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    font-size: 14px;\n    color: #bcb2c9;\n}\n\n' +
                    '.field input {\n    width: 100%;\n    padding: 10px 12px;\n    background: #15141b;\n    border: 1px solid #3a3547;\n    border-radius: 8px;\n}\n\n' + T.css.muted,
            },
            checks: [
                ['.card: отступы 18px, фон #1c1b23, скругление 12px', function (t) {
                    return t.px('.card', 'padding-top') === 18 && t.color('.card', 'background-color') === '#1c1b23' && t.px('.card', 'border-top-left-radius') === 12;
                }],
                ['.card: рамка 1px #3a3547', function (t) {
                    return Math.abs(t.px('.card', 'border-top-width') - 1) <= 0.5 && t.color('.card', 'border-top-color') === '#3a3547';
                }],
                ['.sidebar: столбиком, промежуток 16px', function (t) {
                    return t.css('.sidebar', 'display') === 'flex' && t.css('.sidebar', 'flex-direction') === 'column' && t.css('.sidebar', 'row-gap') === '16px';
                }],
                ['.tabs: в строку с переносом, промежуток 8px', function (t) {
                    return t.css('.tabs', 'display') === 'flex' && t.css('.tabs', 'flex-wrap') === 'wrap' && t.css('.tabs', 'column-gap') === '8px';
                }],
                ['.chip: отступы 8px 14px, фон #15141b, скругление 8px', function (t) {
                    return t.px('.chip:not(.active)', 'padding-top') === 8 && t.px('.chip:not(.active)', 'padding-left') === 14 &&
                        t.color('.chip:not(.active)', 'background-color') === '#15141b' && t.px('.chip:not(.active)', 'border-top-left-radius') === 8;
                }],
                ['.chip.active: фон #f7ca60, текст #241a06', function (t) {
                    return t.color('.chip.active', 'background-color') === '#f7ca60' && t.color('.chip.active', 'color') === '#241a06';
                }],
                ['.field: столбиком, промежуток 6px, 14px #bcb2c9', function (t) {
                    return t.css('.field', 'flex-direction') === 'column' && t.css('.field', 'row-gap') === '6px' &&
                        t.px('.field', 'font-size') === 14 && t.color('.field', 'color') === '#bcb2c9';
                }],
                ['Поле: на всю ширину, отступы 10px 12px, фон #15141b, скругление 8px', function (t) {
                    return t.rule('.field input', 'width') === '100%' && t.px('.field input', 'padding-top') === 10 &&
                        t.px('.field input', 'padding-left') === 12 && t.color('.field input', 'background-color') === '#15141b' &&
                        t.px('.field input', 'border-top-left-radius') === 8;
                }],
            ],
        },

        // 6
        {
            title: 'Карточка заявки',
            kind: 'HTML + CSS',
            text: '<p>Справа будет список заявок. Карточки потом создаёт JS, но сначала сделаем одну вручную, чтобы понять, из чего она состоит. ' +
                'Внутри <code>.request-list</code> напиши <code>&lt;article class="card request"&gt;</code>:</p><ul>' +
                '<li><code>&lt;p class="muted"&gt;Counter-Strike 2 · Alex_Shadow&lt;/p&gt;</code>, заголовок <code>&lt;h2&gt;North Side&lt;/h2&gt;</code>, текст ' +
                '<code>&lt;p&gt;Ищем пятого игрока для Premier.&lt;/p&gt;</code></li>' +
                '<li>низ карточки <code>&lt;div class="request-bottom"&gt;</code>: метка <code>&lt;p class="tag"&gt;Ищем: Снайпер&lt;/p&gt;</code> и ' +
                'кнопка <code>&lt;button class="button reply-button" type="button"&gt;Откликнуться&lt;/button&gt;</code></li></ul>' +
                '<p>И оформи:</p><ul>' +
                '<li><code>.request-list</code> и <code>.request</code>: столбиком, промежутки <code>16px</code> и <code>10px</code></li>' +
                '<li><code>.request-bottom</code>: в строку с переносом, края разнесены, по центру по вертикали, промежуток <code>8px</code></li></ul>',
            hint: ['<article class="...">', '<h2>', '<p class="...">', '<div class="...">', '<button class="..." type="button">', 'align-items: center'],
            start: {
                html: '<div class="request-list">\n\n    <!-- карточка заявки -->\n\n</div>',
                css: '.request-list {\n    \n}\n\n.request {\n    \n}\n\n.request-bottom {\n    \n}\n\n/* Уже готово */\n' + T.css.card + '\n' + readyCss,
            },
            answer: {
                html: '<div class="request-list">\n' + indent(cardHtml) + '\n</div>',
                css: requestCss + '\n' + T.css.card + '\n' + readyCss,
            },
            checks: [
                ['Карточка article.card.request', function (t) { return !!t.q('.request-list article.card.request'); }],
                ['Строка .muted и заголовок «North Side»', function (t) {
                    return t.text('.request .muted') === 'Counter-Strike 2 · Alex_Shadow' && t.text('.request h2') === 'North Side';
                }],
                ['Внизу метка «Ищем: Снайпер»', function (t) { return t.text('.request-bottom .tag') === 'Ищем: Снайпер'; }],
                ['Кнопка «Откликнуться» type="button"', function (t) {
                    const b = t.q('.request-bottom button.reply-button');
                    return !!b && b.getAttribute('type') === 'button' && b.textContent.trim() === 'Откликнуться';
                }],
                ['.request-list и .request столбиком (16px и 10px)', function (t) {
                    return t.css('.request-list', 'flex-direction') === 'column' && t.css('.request-list', 'row-gap') === '16px' &&
                        t.css('.request', 'flex-direction') === 'column' && t.css('.request', 'row-gap') === '10px';
                }],
                ['.request-bottom: в строку с переносом, края разнесены', function (t) {
                    return t.css('.request-bottom', 'display') === 'flex' && t.css('.request-bottom', 'flex-wrap') === 'wrap' &&
                        t.css('.request-bottom', 'justify-content') === 'space-between';
                }],
                ['.request-bottom: по центру, промежуток 8px', function (t) {
                    return t.css('.request-bottom', 'align-items') === 'center' && t.css('.request-bottom', 'column-gap') === '8px';
                }],
            ],
        },

        // 7
        T.modalTask(
            'Окно «Создать заявку»',
            '<p>Кнопка «Создать заявку» открывает окно с формой. Сделай окно <code>&lt;dialog class="modal request-modal" open&gt;</code>, ' +
            'внутри форма <code>&lt;form class="modal-form request-form"&gt;</code> с заголовком <code>&lt;h2&gt;Создать заявку&lt;/h2&gt;</code>. ' +
            'Поля и кнопки уже лежат внутри комментария — перенеси их в форму после заголовка.</p>',
            '<!-- окно: dialog → form → h2, потом эти поля и кнопки:\n' + fTitle + fGame + fRole + fText + dialogError + dialogButtons + '-->\n',
            dialogFull,
            [
                ['Окно dialog.modal.request-modal', function (t) { return !!t.q('dialog.modal.request-modal'); }],
                ['В нём форма .modal-form.request-form', function (t) { return !!t.q('dialog form.modal-form.request-form'); }],
                ['Заголовок «Создать заявку»', function (t) { return t.text('.request-form h2') === 'Создать заявку'; }],
                ['Поля и кнопки внутри формы', function (t) {
                    return t.all('.request-form .field').length === 4 && !!t.q('.request-form button[type="submit"]') && !!t.q('.request-form .close-modal');
                }],
            ],
            ['<form class="...">', '<h2>']
        ),

        // 8
        T.fieldsTask(
            'Поля заявки',
            '<p>В окне пока только название команды. Допиши после него ещё три поля по образцу:</p><ul>' +
            '<li>«Дисциплина» — <code>&lt;input name="game" placeholder="Dota 2"&gt;</code></li>' +
            '<li>«Кого ищешь» — <code>&lt;input name="role" placeholder="Например, саппорта"&gt;</code></li>' +
            '<li>«О команде и расписании» — большое поле <code>&lt;textarea name="text" rows="3"&gt;&lt;/textarea&gt;</code></li></ul>' +
            '<p>Каждое поле — внутри <code>&lt;label class="field"&gt;</code>. <code>name</code> нужен JS, чтобы достать значение.</p>',
            dialogHead + fTitle + '\n        <!-- ещё три поля -->\n\n' + dialogError + dialogButtons + dialogTail,
            dialogFull,
            [
                ['Четыре поля .field', function (t) { return t.all('.request-form label.field').length === 4; }],
                ['Поля game и role', function (t) {
                    return !!t.q('label.field input[name="game"]') && !!t.q('label.field input[name="role"]');
                }],
                ['Большое поле textarea name="text"', function (t) { return !!t.q('label.field textarea[name="text"]'); }],
                ['Порядок: title, game, role, text', function (t) {
                    return t.all('.request-form input, .request-form textarea').map(function (e) { return e.name; }).join(',') === 'title,game,role,text';
                }],
            ],
            ['name="..."', 'placeholder="..."', 'rows="3"']
        ),

        // 9
        T.footer('requests'),

        // 10
        {
            title: 'JS: бургер и список заявок',
            kind: 'JS',
            text: '<p>Заявки лежат в <code>data.requests</code>, а функция <code>createRequest(request)</code> уже умеет делать из одной заявки карточку. Напиши:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>функцию <code>showRequests()</code>: очисти список (<code>requestList.textContent = \'\'</code>), возьми текст поиска маленькими буквами. ' +
                'Для каждой заявки склей в одну строку название, игру, роль и автора (<code>.toLowerCase()</code>); если в ней есть текст поиска (<code>includes</code>) — ' +
                'добавь в список <code>createRequest(request)</code> и прибавь 1 к счётчику</li>' +
                '<li>в конце напиши в <code>requestCount</code> «Заявок: N», а если заявок <code>0</code> — добавь в список <code>&lt;p class="empty"&gt;</code> с текстом ' +
                '«Заявок нет. Измени фильтры или создай свою заявку.»</li>' +
                '<li>вызови <code>showRequests()</code> сразу и на каждую букву в поиске (событие <code>input</code>)</li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')", 'function showRequests() { }', "textContent = ''",
                '.value.trim().toLowerCase()', 'data.requests.forEach(...)', "(a + ' ' + b).toLowerCase()", '.includes(...)', '.append(...)', 'let count = 0',
                "document.createElement('p')", "addEventListener('input', showRequests)"],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + boardHtml,
                css: T.burgerCss + '\n' + sidebarCss + '\n' + requestCss + '\n' + readyCss,
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" + T.js.data + '\n' + listConsts + '\n' + createJs +
                    '\n// 1) бургер\n\n\n// 2) функция showRequests()\n\n\n// 3) вызови её сразу и при вводе в поиск\n',
            },
            answer: {
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" + T.js.data + '\n' + listConsts + '\n' + createJs + '\n' +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" + showJs,
            },
            checks: T.burgerChecks.concat([
                ['В списке 3 карточки заявок', function (t) { return t.all('.request-list .request').length === 3; }],
                ['Счётчик «Заявок: 3»', function (t) { return t.text('.request-count') === 'Заявок: 3'; }],
                ['Поиск «саппорт» оставляет 1 заявку', function (t) {
                    t.type('.request-search', 'саппорт');
                    return t.all('.request-list .request').length === 1 && t.text('.request h2') === 'Midnight Stack' && t.text('.request-count') === 'Заявок: 1';
                }],
                ['Большие буквы не мешают («NEONFOX»)', function (t) {
                    t.type('.request-search', 'NEONFOX');
                    return t.all('.request-list .request').length === 1;
                }],
                ['Нет совпадений — сообщение .empty и «Заявок: 0»', function (t) {
                    t.type('.request-search', 'шахматы');
                    return t.all('.request-list .request').length === 0 && !!t.q('.request-list .empty') && t.text('.request-count') === 'Заявок: 0';
                }],
                ['Пустой поиск — снова 3 заявки без повторов', function (t) {
                    t.type('.request-search', '');
                    return t.all('.request-list .request').length === 3 && !t.q('.request-list .empty');
                }],
            ]),
        },

        // 11
        {
            title: 'JS: отклик и вкладка «Мои»',
            kind: 'JS',
            text: '<p>Под каждой заявкой — кнопка отклика. Отклики хранятся в массиве <code>data.replies</code> (там id заявок).</p><ul>' +
                '<li>в <code>createRequest</code>: если <code>data.replies.includes(request.id)</code> — дай кнопке класс <code>replied</code> и текст «Отменить отклик», иначе текст «Откликнуться»</li>' +
                '<li>при клике на кнопку: если отклик уже есть — убери id из массива (<code>filter</code>), иначе добавь (<code>push</code>). ' +
                'Потом <code>saveData(data)</code> и <code>showRequests()</code></li>' +
                '<li>в <code>showRequests</code>: если <code>filter === \'mine\'</code> и на заявку нет отклика — пропусти её (<code>return</code>)</li>' +
                '<li>вкладки <code>tabs</code>: при клике сними <code>active</code> со всех, поставь нажатой, запомни <code>filter = tab.dataset.filter</code> и вызови <code>showRequests()</code></li></ul>',
            hint: ['data.replies.includes(request.id)', 'data.replies.filter(function (id) { return id !== request.id; })', '.push(...)', 'saveData(data)',
                'classList.add / remove', 'if / else', '&&', '!', 'return', 'tab.dataset.filter'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: tabsHtml + '\n\n<div class="request-list"></div>',
                css: T.css.chips + '\n.tabs {\n    display: flex;\n    gap: 8px;\n    margin-bottom: 16px;\n}\n\n' + requestCss + '\n' + T.css.card + '\n' + readyCss,
                js: T.js.data + '\n' + tabConsts + replyStart + '\n' + showMineStart + '\n// клик по вкладкам\n',
            },
            answer: {
                js: T.js.data + '\n' + tabConsts + replyAnswer + '\n' + showMineAnswer + '\n' + tabsJs,
            },
            checks: [
                ['Сначала у всех кнопок «Откликнуться»', function (t) {
                    const b = t.all('.reply-button');
                    return b.length === 3 && b.every(function (x) { return x.textContent.trim() === 'Откликнуться'; });
                }],
                ['Клик по отклику Midnight Stack — «Отменить отклик»', function (t) {
                    t.click(t.all('.reply-button')[1]);
                    const b = t.all('.reply-button')[1];
                    return b.textContent.trim() === 'Отменить отклик' && b.classList.contains('replied');
                }],
                ['Отклик сохранён в localStorage', function (t) {
                    const s = T.saved();
                    return !!s && s.replies.join(',') === 'dota-team';
                }],
                ['Вкладка «Мои» показывает 1 заявку', function (t) {
                    t.click('[data-filter="mine"]');
                    return t.all('.request-list .request').length === 1 && t.has('[data-filter="mine"]', 'active') && !t.has('[data-filter="all"]', 'active');
                }],
                ['Отмена отклика — на вкладке «Мои» пусто', function (t) {
                    t.click('.reply-button');
                    return t.all('.request-list .request').length === 0 && T.saved().replies.length === 0;
                }],
                ['Вкладка «Все» — снова 3 заявки', function (t) {
                    t.click('[data-filter="all"]');
                    return t.all('.request-list .request').length === 3;
                }],
            ],
        },

        // 12
        {
            title: 'JS: создать заявку',
            kind: 'JS',
            text: '<p>Окно «Создать заявку» должно работать:</p><ul>' +
                '<li>кнопка <code>.open-request</code>: очисти форму (<code>requestForm.reset()</code>), спрячь ошибку <code>.error</code> и открой окно (<code>showModal()</code>)</li>' +
                '<li>отправка формы: отмени перезагрузку, возьми из полей <code>title</code>, <code>game</code>, <code>role</code>, <code>text</code> (с <code>trim()</code>). ' +
                'Если хоть одно пустое — покажи ошибку и выйди</li>' +
                '<li>иначе добавь в <code>data.requests</code> объект <code>{ id: \'request-\' + Date.now(), game: game, title: title, author: myName(), role: role, text: text }</code>, ' +
                'сохрани (<code>saveData</code>), обнови список (<code>showRequests()</code>) и закрой окно (<code>close()</code>)</li></ul>' +
                '<p>Кнопка «Отмена» уже закрывает окно — этот код готов.</p>',
            hint: ['.reset()', '.showModal()', '.close()', "addEventListener('submit', ...)", 'event.preventDefault()', 'requestForm.elements.title.value.trim()', '||',
                "'request-' + Date.now()", 'myName()', '.push(...)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="button open-request" type="button">Создать заявку</button>\n<div class="request-list"></div>\n\n' + dialogFull.replace(' open>', '>'),
                css: T.css.modal + '\n' + T.css.fields + '\n' + T.css.modalButtons + '\n' + T.css.buttons + '\n' + T.css.hide,
                js: T.js.data + "\nconst data = loadData();\nconst requestList = document.querySelector('.request-list');\n\n" + simpleShow + '\n' + T.js.close + '\n' + modalConsts +
                    '// 1) открыть окно\n\n\n// 2) отправка формы\n',
            },
            answer: {
                js: T.js.data + "\nconst data = loadData();\nconst requestList = document.querySelector('.request-list');\n\n" + simpleShow + '\n' + T.js.close + '\n' + modalConsts +
                    "document.querySelector('.open-request').addEventListener('click', function () {\n    requestForm.reset();\n" +
                    "    requestForm.querySelector('.error').classList.add('hide');\n    requestModal.showModal();\n});\n\n" +
                    "requestForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    '    const title = requestForm.elements.title.value.trim();\n    const game = requestForm.elements.game.value.trim();\n' +
                    '    const role = requestForm.elements.role.value.trim();\n    const text = requestForm.elements.text.value.trim();\n\n' +
                    "    if (title === '' || game === '' || role === '' || text === '') {\n        requestForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    "    data.requests.push({ id: 'request-' + Date.now(), game: game, title: title, author: myName(), role: role, text: text });\n" +
                    '    saveData(data);\n    showRequests();\n    requestModal.close();\n});',
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-request');
                    return t.q('.request-modal').open === true;
                }],
                ['Пустая форма — ошибка, окно не закрылось', function (t) {
                    const prevented = t.submit('.request-form');
                    return prevented && t.visible('.request-form .error') && t.q('.request-modal').open === true;
                }],
                ['Без описания — всё ещё ошибка', function (t) {
                    fillRequest(t, 'Tiny Worlds', 'GameJam', 'Художник', '');
                    t.submit('.request-form');
                    return t.q('.request-modal').open === true && T.saved() === null;
                }],
                ['Всё заполнено — окно закрылось, заявок стало 4', function (t) {
                    fillRequest(t, ' Tiny Worlds ', 'GameJam', 'Художник', 'Делаем игру за выходные');
                    t.submit('.request-form');
                    return t.q('.request-modal').open === false && t.all('.request-list .request').length === 4;
                }],
                ['Заявка сохранена: название без пробелов, автор «Гость», id request-…', function (t) {
                    const r = T.saved().requests[3];
                    return r.title === 'Tiny Worlds' && r.author === 'Гость' && r.id.indexOf('request-') === 0 && r.text === 'Делаем игру за выходные';
                }],
                ['Повторное открытие — форма пустая, ошибка спрятана', function (t) {
                    t.click('.open-request');
                    return t.q('.request-form').elements.title.value === '' && !t.visible('.request-form .error');
                }],
            ],
        },
    ];
})();
