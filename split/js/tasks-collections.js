// =========================================================
// Задачи страницы «Сборы» — Валерия Шипунова
// =========================================================

(function () {
    const T = QuestTasks;
    const indent = function (html) { return html.replace(/^/gm, '    '); };

    function card(id, title, text, value, done) {
        return '<article class="card collection" data-id="' + id + '">\n' +
            '    <h3>' + title + '</h3>\n' +
            '    <p class="collection-text">' + text + '</p>\n' +
            '    <progress class="collection-progress" max="100" value="' + value + '"></progress>\n' +
            '    <p class="small done-text' + (done ? '' : ' hide') + '">Цель достигнута</p>\n' +
            '    <button class="chip-button add-contribution' + (done ? ' hide' : '') + '" type="button">Отметить взнос</button>\n' +
            '</article>';
    }
    const gift = card('gift', 'Подарок Саше на день рождения', 'Собрано 18 000 ₽ из 25 000 ₽', 72, false);
    const travel = card('travel', 'Фонд поездки на Алтай', 'Собрано 15 000 ₽ из 15 000 ₽', 100, true);
    const settlementsLink = '<a class="link" href="../settlements/settlements.html">К взаиморасчётам →</a>';
    const listHtml = '<div class="collections">\n' + indent(gift) + '\n\n' + indent(travel) + '\n</div>\n\n' + settlementsLink;
    const plainList = '<div class="collections">\n' + indent(card('gift', 'Подарок Саше на день рождения', '', 0, false)) + '\n\n' +
        indent(card('travel', 'Фонд поездки на Алтай', '', 0, false)) + '\n</div>';

    const sectionHtml =
        '<main class="container main">\n    <div class="section-head">\n        <div>\n' +
        '            <h2>Целевые сборы и копилки</h2>\n            <p>Задайте цель и отмечайте взносы по мере поступления.</p>\n        </div>\n' +
        '        <button class="button open-collection-form" type="button">Создать сбор</button>\n    </div>\n</main>';

    const gridCss = '.collections {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n}\n\n' + T.css.card +
        '\n.collection-text {\n    font-size: 14px;\n    color: #584146;\n}\n';
    const progressCss = '.collection-progress {\n    width: 100%;\n    height: 12px;\n}\n\n.collection .chip-button {\n    align-self: flex-start;\n}\n';
    const hideCss = '.hide {\n    display: none;\n}\n';

    function collectionForm(open, fields) {
        return '<dialog class="modal collection-form-modal"' + (open ? ' open' : '') + '>\n    <form class="modal-form collection-form">\n' +
            '        <h2>Новый сбор</h2>\n' + fields +
            '        <p class="error hide">Введите название и сумму цели больше нуля.</p>\n' +
            '        <div class="modal-buttons">\n            <button class="button" type="submit">Создать</button>\n' +
            '            <button class="chip-button close-modal" type="button">Отмена</button>\n        </div>\n    </form>\n</dialog>';
    }
    const collectionFields =
        '        <label class="modal-field">Название <input name="title" placeholder="Подарок Саше"></label>\n' +
        '        <label class="modal-field">Цель, ₽ <input name="goal" type="number" placeholder="25000"></label>\n';

    function contributionForm(open, inner) {
        return '<dialog class="modal contribution-modal"' + (open ? ' open' : '') + '>\n    <form class="modal-form contribution-form">\n' +
            '        <h2>Отметить взнос</h2>\n' + inner +
            '        <div class="modal-buttons">\n            <button class="button" type="submit">Сохранить</button>\n' +
            '            <button class="chip-button close-modal" type="button">Отмена</button>\n        </div>\n    </form>\n</dialog>';
    }
    const contributionInner =
        '        <p class="contribution-note">Подарок Саше на день рождения · Осталось 7 000 ₽</p>\n' +
        '        <label class="modal-field">Взнос, ₽ <input name="sum" type="number"></label>\n' +
        '        <p class="error hide">Взнос должен быть больше нуля и не больше остатка.</p>\n';

    const jsReady = T.js.data + '\n' + T.js.close;

    function savedCollections() {
        const saved = JSON.parse(localStorage.getItem('split') || 'null');
        return saved ? saved.collections : [];
    }

    QUEST_TASKS.collections = [
        // 1
        T.base(),

        // 2
        T.header('collections'),

        // 3
        T.sectionHead(sectionHtml),

        // 4
        {
            title: 'Карточки сборов: разметка',
            kind: 'HTML',
            text: '<p>Каждый сбор — карточка с полосой прогресса. Первая готова, сделай вторую по образцу:</p><ul>' +
                '<li><code>&lt;article class="card collection" data-id="travel"&gt;</code></li>' +
                '<li>заголовок <code>&lt;h3&gt;Фонд поездки на Алтай&lt;/h3&gt;</code> и <code>&lt;p class="collection-text"&gt;</code></li>' +
                '<li>полоса прогресса <code>&lt;progress class="collection-progress" max="100" value="100"&gt;&lt;/progress&gt;</code> — ' +
                '<code>max</code> это вся цель, <code>value</code> — сколько уже собрано</li>' +
                '<li>надпись <code>&lt;p class="small done-text hide"&gt;Цель достигнута&lt;/p&gt;</code> и кнопка ' +
                '<code>&lt;button class="chip-button add-contribution" type="button"&gt;Отметить взнос&lt;/button&gt;</code></li></ul>' +
                '<p>А под сеткой добавь ссылку <code>&lt;a class="link" href="../settlements/settlements.html"&gt;К взаиморасчётам →&lt;/a&gt;</code></p>',
            hint: ['<article data-id="...">', '<h3>', '<p class="...">', '<progress max="..." value="...">', '<button type="button">', '<a class="link" href="...">'],
            start: {
                html: '<div class="collections">\n' + indent(gift) + '\n\n    <!-- сюда вторую карточку -->\n\n</div>\n\n<!-- сюда ссылку -->\n',
                css: gridCss + '\n' + progressCss + '\n' + hideCss + '\n' + T.css.common,
            },
            answer: { html: listHtml.replace('<p class="small done-text">', '<p class="small done-text hide">').replace('add-contribution hide', 'add-contribution').replace('value="100"', 'value="100"') },
            checks: [
                ['Две карточки .collection', function (t) { return t.all('.collections .collection').length === 2; }],
                ['У второй data-id="travel" и класс card', function (t) {
                    const c = t.all('.collection')[1];
                    return c.dataset.id === 'travel' && c.classList.contains('card');
                }],
                ['Заголовок «Фонд поездки на Алтай»', function (t) { return t.text(t.all('.collection')[1].querySelector('h3')) === 'Фонд поездки на Алтай'; }],
                ['Полоса прогресса с max и value', function (t) {
                    const p = t.all('.collection')[1].querySelector('progress.collection-progress');
                    return !!p && p.hasAttribute('max') && p.hasAttribute('value');
                }],
                ['Есть .done-text и кнопка .add-contribution', function (t) {
                    const c = t.all('.collection')[1];
                    return !!c.querySelector('.done-text') && !!c.querySelector('button.add-contribution');
                }],
                ['Ссылка «К взаиморасчётам →» на расчёты', function (t) {
                    const a = t.q('a.link');
                    return !!a && a.getAttribute('href') === '../settlements/settlements.html';
                }],
            ],
        },

        // 5
        {
            title: 'Сетка и карточки',
            kind: 'CSS',
            text: '<p>Разложим сборы по двум колонкам и оформим карточки:</p><ul>' +
                '<li><code>.collections</code>: сетка из колонок <code>1fr 1fr</code>, промежуток <code>16px</code></li>' +
                '<li><code>.card</code>: столбиком, промежуток <code>16px</code>, отступы <code>24px</code>, белый фон <code>#ffffff</code>, ' +
                'скругление <code>48px</code>, лёгкая тень <code>box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)</code></li>' +
                '<li><code>.card h3</code>: размер <code>18px</code></li>' +
                '<li><code>.collection-text</code>: размер <code>14px</code>, цвет <code>#584146</code></li></ul>',
            hint: ['display: grid', 'grid-template-columns: 1fr 1fr', 'flex-direction: column', 'box-shadow', 'rgba(...)'],
            start: {
                html: listHtml,
                css: '.collections {\n    \n}\n\n.card {\n    \n}\n\n.card h3 {\n    \n}\n\n.collection-text {\n    \n}\n\n/* Уже готово */\n' +
                    progressCss + '\n' + hideCss + '\n' + T.css.common,
            },
            answer: { css: gridCss },
            checks: [
                ['.collections — сетка из 2 колонок', function (t) {
                    return t.css('.collections', 'display') === 'grid' && t.css('.collections', 'grid-template-columns').split(' ').length === 2;
                }],
                ['.collections: промежуток 16px', function (t) { return t.css('.collections', 'column-gap') === '16px'; }],
                ['.card: столбиком, промежуток 16px', function (t) {
                    return t.css('.card', 'display') === 'flex' && t.css('.card', 'flex-direction') === 'column' && t.css('.card', 'row-gap') === '16px';
                }],
                ['.card: белая, скругление 48px, отступы 24px', function (t) {
                    return t.color('.card', 'background-color') === '#ffffff' && t.px('.card', 'border-top-left-radius') === 48 &&
                        t.px('.card', 'padding-top') === 24;
                }],
                ['.card: есть тень', function (t) { return t.css('.card', 'box-shadow') !== 'none'; }],
                ['Заголовок карточки 18px', function (t) { return t.px('.card h3', 'font-size') === 18; }],
                ['.collection-text: 14px цвета #584146', function (t) {
                    return t.px('.collection-text', 'font-size') === 14 && t.color('.collection-text', 'color') === '#584146';
                }],
            ],
        },

        // 6
        {
            title: 'Прогресс и кнопка',
            kind: 'CSS',
            text: '<p>Доделаем полосу прогресса и кнопку:</p><ul>' +
                '<li><code>.collection-progress</code>: на всю ширину карточки (<code>width: 100%</code>), высота <code>12px</code></li>' +
                '<li><code>.collection .chip-button</code>: кнопка не растягивается на всю ширину — <code>align-self: flex-start</code></li>' +
                '<li><code>.hide</code>: прячет элемент (<code>display: none</code>) — им JS будет прятать кнопку, когда цель достигнута</li></ul>',
            hint: ['width: 100%', 'height', 'align-self: flex-start', 'display: none'],
            start: {
                html: listHtml,
                css: '.collection-progress {\n    \n}\n\n.collection .chip-button {\n    \n}\n\n.hide {\n    \n}\n\n/* Уже готово */\n' + gridCss + '\n' + T.css.common,
            },
            answer: { css: progressCss + '\n' + hideCss },
            checks: [
                ['Прогресс на всю ширину', function (t) { return t.rule('.collection-progress', 'width') === '100%'; }],
                ['Прогресс высотой 12px', function (t) { return t.px('.collection-progress', 'height') === 12; }],
                ['Кнопка не растянута (align-self: flex-start)', function (t) { return t.css('.collection .chip-button', 'align-self') === 'flex-start'; }],
                ['.hide прячет элемент', function (t) { return !t.visible('.collection .add-contribution.hide') && !t.visible('.done-text.hide'); }],
            ],
        },

        // 7
        T.modalTask('Окно «Новый сбор»',
            '<p>Окно для нового сбора. Внутри формы после заголовка добавь два поля:</p><ul>' +
            '<li><code>&lt;label class="modal-field"&gt;Название &lt;input name="title" placeholder="Подарок Саше"&gt;&lt;/label&gt;</code></li>' +
            '<li>«Цель, ₽» — поле <code>name="goal"</code>, <code>type="number"</code>, подсказка <code>25000</code></li></ul>',
            collectionForm(true, '        <!-- сюда два поля -->\n\n'), collectionForm(true, collectionFields),
            [
                ['Два поля .modal-field', function (t) { return t.all('.collection-form .modal-field').length === 2; }],
                ['Поле name="title" с подсказкой', function (t) { return !!t.attr('.modal-field input[name="title"]', 'placeholder'); }],
                ['Поле name="goal" с type="number"', function (t) { return t.attr('.modal-field input[name="goal"]', 'type') === 'number'; }],
            ],
            ['<label class="modal-field">', '<input>', 'name', 'placeholder', 'type="number"']),

        // 8
        T.fieldsTask('Окно «Отметить взнос»',
            '<p>Окно, где отмечают взнос в копилку. После заголовка добавь:</p><ul>' +
            '<li>строку-подсказку <code>&lt;p class="contribution-note"&gt;&lt;/p&gt;</code> (сюда JS напишет, сколько осталось)</li>' +
            '<li>поле <code>&lt;label class="modal-field"&gt;Взнос, ₽ &lt;input name="sum" type="number"&gt;&lt;/label&gt;</code></li>' +
            '<li>ошибку <code>&lt;p class="error hide"&gt;Взнос должен быть больше нуля и не больше остатка.&lt;/p&gt;</code></li></ul>',
            contributionForm(true, '        <!-- сюда подсказку, поле и ошибку -->\n\n'), contributionForm(true, contributionInner),
            [
                ['Есть .contribution-note', function (t) { return !!t.q('.contribution-form .contribution-note'); }],
                ['Поле name="sum" с type="number"', function (t) { return t.attr('.modal-field input[name="sum"]', 'type') === 'number'; }],
                ['Есть спрятанная ошибка .error.hide', function (t) { return !!t.q('.contribution-form .error.hide'); }],
            ],
            ['<p class="...">', '<label class="modal-field">', '<input>', 'type="number"'],
            hideCss + '\n'),

        // 9
        T.footer('collections'),

        // 10
        {
            title: 'JS: бургер и карточки из данных',
            kind: 'JS',
            text: '<p>Две вещи:</p><ul>' +
                '<li>бургер: при клике на <code>.burger</code> переключай у <code>.menu</code> класс <code>open</code></li>' +
                '<li>заполни карточки из данных: для каждого сбора из <code>data.collections</code> найди карточку ' +
                '<code>document.querySelector(\'[data-id="\' + collection.id + \'"]\')</code>, напиши в <code>.collection-text</code> ' +
                '<code>\'Собрано \' + money(collection.raised) + \' из \' + money(collection.goal)</code>, а прогрессу задай ' +
                '<code>progress.max = collection.goal</code> и <code>progress.value = collection.raised</code></li>' +
                '<li>если собрано не меньше цели — покажи <code>.done-text</code> и спрячь кнопку <code>.add-contribution</code></li></ul>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", 'textContent', 'classList.add / remove', 'if / else', "classList.toggle('open')", 'data.collections.forEach', "'[data-id=\"' + ... + '\"]'", 'progress.max', 'progress.value', '>='],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: T.burgerHtml + '\n\n' + plainList,
                css: T.burgerCss + '\n' + gridCss + '\n' + progressCss + '\n' + hideCss,
                js: jsReady + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" +
                    '// 1) бургер\n\n\n// 2) заполни карточки сборов\n',
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" +
                    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n\n" +
                    "data.collections.forEach(function (collection) {\n    const card = document.querySelector('[data-id=\"' + collection.id + '\"]');\n" +
                    "    card.querySelector('.collection-text').textContent = 'Собрано ' + money(collection.raised) + ' из ' + money(collection.goal);\n" +
                    "    const progress = card.querySelector('.collection-progress');\n    progress.max = collection.goal;\n    progress.value = collection.raised;\n\n" +
                    "    if (collection.raised >= collection.goal) {\n        card.querySelector('.done-text').classList.remove('hide');\n" +
                    "        card.querySelector('.add-contribution').classList.add('hide');\n    }\n});",
            },
            checks: T.burgerChecks.concat([
                ['Текст первого сбора: «Собрано 18 000 ₽ из 25 000 ₽»', function (t) {
                    return t.text('[data-id="gift"] .collection-text').replace(/\s/g, '') === 'Собрано18000₽из25000₽';
                }],
                ['Прогресс первого: 18000 из 25000', function (t) {
                    const p = t.q('[data-id="gift"] progress');
                    return p.max === 25000 && p.value === 18000;
                }],
                ['У первого кнопка видна, «цель достигнута» спрятано', function (t) {
                    return t.visible('[data-id="gift"] .add-contribution') && !t.visible('[data-id="gift"] .done-text');
                }],
                ['У второго «Цель достигнута» видно, кнопка спрятана', function (t) {
                    return t.visible('[data-id="travel"] .done-text') && !t.visible('[data-id="travel"] .add-contribution');
                }],
            ]),
        },

        // 11
        {
            title: 'JS: создать сбор',
            kind: 'JS',
            text: '<p>Кнопка «Создать сбор» уже открывает окно. При отправке формы:</p><ul>' +
                '<li>отмени перезагрузку, возьми название (<code>.trim()</code>) и цель (<code>Number(...)</code>)</li>' +
                '<li>если название пустое или цель не больше нуля — покажи <code>.error</code> и <code>return</code></li>' +
                '<li>иначе добавь в <code>data.collections</code> объект <code>{ id: \'collection-\' + Date.now(), title: title, goal: goal, raised: 0 }</code>, ' +
                'сохрани <code>saveData(data)</code> и закрой окно</li></ul>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', '.value.trim()', '||', 'return', "classList.remove('hide')", 'showModal()', 'close()', 'Number(...)', '!(goal > 0)', 'data.collections.push(...)', 'Date.now()', 'saveData(data)'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<button class="button open-collection-form" type="button">Создать сбор</button>\n\n' + collectionForm(false, collectionFields),
                css: T.css.modal + '\n' + T.css.modalFields + '\n' + hideCss,
                js: jsReady + "\nconst data = loadData();\nconst collectionFormModal = document.querySelector('.collection-form-modal');\n" +
                    "const collectionForm = document.querySelector('.collection-form');\n\n" +
                    "document.querySelector('.open-collection-form').addEventListener('click', function () {\n    collectionFormModal.showModal();\n});\n\n" +
                    "collectionForm.addEventListener('submit', function (event) {\n    // проверь форму и добавь сбор\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst collectionFormModal = document.querySelector('.collection-form-modal');\n" +
                    "const collectionForm = document.querySelector('.collection-form');\n\n" +
                    "document.querySelector('.open-collection-form').addEventListener('click', function () {\n    collectionFormModal.showModal();\n});\n\n" +
                    "collectionForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const title = collectionForm.elements.title.value.trim();\n    const goal = Number(collectionForm.elements.goal.value);\n\n" +
                    "    if (title === '' || !(goal > 0)) {\n        collectionForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    "    data.collections.push({ id: 'collection-' + Date.now(), title: title, goal: goal, raised: 0 });\n" +
                    "    saveData(data);\n    collectionFormModal.close();\n});",
            },
            checks: [
                ['Кнопка открывает окно', function (t) {
                    t.click('.open-collection-form');
                    return t.q('.collection-form-modal').open === true;
                }],
                ['Без цели — ошибка, сбор не создаётся', function (t) {
                    t.q('input[name="title"]').value = 'Пицца';
                    const prevented = t.submit('.collection-form');
                    return prevented && t.visible('.collection-form .error') && savedCollections().length === 0;
                }],
                ['Сбор сохраняется в localStorage', function (t) {
                    t.q('input[name="goal"]').value = '2000';
                    t.submit('.collection-form');
                    const list = savedCollections();
                    return list.length === 3 && list[2].title === 'Пицца' && list[2].goal === 2000 && list[2].raised === 0;
                }],
                ['Окно закрылось', function (t) { return t.q('.collection-form-modal').open === false; }],
            ],
        },

        // 12
        {
            title: 'JS: отметить взнос',
            kind: 'JS',
            text: '<p>Окно «Отметить взнос» открыто для сбора <code>currentCollection</code> (подарок Саше: собрано 18 000 из 25 000). При отправке формы:</p><ul>' +
                '<li>отмени перезагрузку, возьми взнос <code>Number(...)</code> и посчитай остаток <code>currentCollection.goal - currentCollection.raised</code></li>' +
                '<li>если взнос не больше нуля или больше остатка — покажи <code>.error</code> и <code>return</code></li>' +
                '<li>иначе прибавь взнос к <code>currentCollection.raised</code>, сохрани <code>saveData(data)</code> и закрой окно</li></ul>',
            hint: ['const left = ...', '!(sum > 0) || sum > left', 'currentCollection.raised = currentCollection.raised + sum'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: contributionForm(false, contributionInner),
                css: T.css.modal + '\n' + T.css.modalFields + '\n' + hideCss,
                js: jsReady + "\nconst data = loadData();\nconst currentCollection = data.collections[0];\n" +
                    "const contributionModal = document.querySelector('.contribution-modal');\nconst contributionForm = document.querySelector('.contribution-form');\n" +
                    "contributionModal.showModal();\n\ncontributionForm.addEventListener('submit', function (event) {\n    // проверь взнос и сохрани\n\n});\n",
            },
            answer: {
                js: jsReady + "\nconst data = loadData();\nconst currentCollection = data.collections[0];\n" +
                    "const contributionModal = document.querySelector('.contribution-modal');\nconst contributionForm = document.querySelector('.contribution-form');\n" +
                    "contributionModal.showModal();\n\ncontributionForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    "    const sum = Number(contributionForm.elements.sum.value);\n    const left = currentCollection.goal - currentCollection.raised;\n\n" +
                    "    if (!(sum > 0) || sum > left) {\n        contributionForm.querySelector('.error').classList.remove('hide');\n        return;\n    }\n\n" +
                    "    currentCollection.raised = currentCollection.raised + sum;\n    saveData(data);\n    contributionModal.close();\n});",
            },
            checks: [
                ['Взнос больше остатка — ошибка', function (t) {
                    t.q('input[name="sum"]').value = '8000';
                    const prevented = t.submit('.contribution-form');
                    return prevented && t.visible('.contribution-form .error') && savedCollections().length === 0;
                }],
                ['Отрицательный взнос — ошибка', function (t) {
                    t.q('input[name="sum"]').value = '-5';
                    t.submit('.contribution-form');
                    return savedCollections().length === 0;
                }],
                ['Взнос 3000 сохраняется: собрано 21 000', function (t) {
                    t.q('input[name="sum"]').value = '3000';
                    t.submit('.contribution-form');
                    const list = savedCollections();
                    return list.length === 2 && list[0].raised === 21000;
                }],
                ['Окно закрылось', function (t) { return t.q('.contribution-modal').open === false; }],
            ],
        },
    ];
})();
