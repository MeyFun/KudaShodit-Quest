// =========================================================
// Задачи страницы «Главная» — Божена Белан
// =========================================================

(function () {
    const T = QuestTasks;

    function plain(text) {
        return text.replace(/\s/g, '');
    }

    const kpiReceivable =
        '<article class="kpi">\n' +
        '    <div class="kpi-top">\n' +
        '        <div>\n' +
        '            <div class="label label-accent"><div class="dot"></div>Вам должны</div>\n' +
        '            <p class="kpi-sum receivable">0 ₽</p>\n' +
        '        </div>\n' +
        '        <div class="kpi-icon kpi-icon-pink"><img src="../img/arrow-down.svg" alt="" width="12" height="13"></div>\n' +
        '    </div>\n' +
        '    <div class="kpi-bottom">\n' +
        '        <p class="people receivable-note">Ждём переводов: 5</p>\n' +
        '        <a class="chip-button" href="../settlements/settlements.html"><img src="../img/send.svg" alt="" width="13" height="11"> Напомнить</a>\n' +
        '    </div>\n' +
        '</article>';
    const kpiPayable =
        '<article class="kpi">\n' +
        '    <div class="kpi-top">\n' +
        '        <div>\n' +
        '            <div class="label">Ваш долг</div>\n' +
        '            <p class="kpi-sum payable">0 ₽</p>\n' +
        '        </div>\n' +
        '        <div class="kpi-icon"><img src="../img/arrow-up.svg" alt="" width="12" height="13"></div>\n' +
        '    </div>\n' +
        '    <div class="kpi-bottom">\n' +
        '        <p class="people payable-note">Нужно перевести: 1</p>\n' +
        '        <a class="button button-small" href="../settlements/settlements.html">К расчётам</a>\n' +
        '    </div>\n' +
        '</article>';
    const indent = function (html) { return html.replace(/^/gm, '    '); };
    const balanceHtml = '<section class="balance">\n' + indent(kpiReceivable) + '\n\n' + indent(kpiPayable) + '\n</section>';

    const sumField =
        '<div class="field">\n    <p class="field-label">Сумма чека</p>\n    <div class="field-box">\n' +
        '        <b class="rub">₽</b>\n        <input name="sum" type="number" placeholder="0">\n    </div>\n</div>';
    const peopleField =
        '<div class="field">\n    <p class="field-label">Сколько человек</p>\n    <div class="field-box">\n' +
        '        <input name="people" type="number" value="2">\n    </div>\n</div>';
    const formHtml = function (inner) {
        return '<form class="card split-form">\n    <h3><img src="../img/receipt.svg" alt="" width="17" height="18"> Быстрый сплит чека</h3>\n' +
            inner + '\n    <p class="split-result"></p>\n';
    };
    const fullForm = formHtml(indent(sumField) + '\n' + indent(peopleField)) +
        '    <button class="button button-wide" type="submit">Разделить чек</button>\n</form>';

    const kpiCssReady =
        '.label {\n    display: flex;\n    gap: 6px;\n    align-items: center;\n    font-size: 11px;\n    font-weight: 700;\n' +
        '    text-transform: uppercase;\n    color: #584146;\n}\n\n.label-accent {\n    color: #ae1e5a;\n}\n\n' +
        '.dot {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: #ae1e5a;\n}\n\n' +
        '.kpi-bottom {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
        '.kpi-icon-pink {\n    background: #fdbecf;\n}\n\n.people {\n    font-size: 14px;\n    color: #584146;\n}\n\n' + T.css.common;

    const fieldCssReady = '.field {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n' +
        '.field-label {\n    font-size: 12px;\n    font-weight: 700;\n    color: #584146;\n}\n\n' +
        '.rub {\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 22px;\n    color: #ae1e5a;\n}\n\n' +
        '.button-wide {\n    width: 100%;\n}\n';

    QUEST_TASKS.home = [
        // 1
        T.base(),

        // 2
        T.header('home'),

        // 3
        {
            title: 'Заметка и кнопки',
            kind: 'CSS',
            text: '<p>Под шапкой — серая заметка, а по всему сайту — розовые кнопки и светлые кнопки-«чипсы».</p><ul>' +
                '<li><code>.demo-note</code>: отступы <code>10px 16px</code>, размер текста <code>14px</code>, фон <code>#f6f3f4</code>, скругление <code>16px</code></li>' +
                '<li><code>.button</code>: в строку, всё по центру, промежуток <code>6px</code>, отступы <code>10px 24px</code>, текст <code>14px</code> жирный ' +
                '(<code>700</code>) белого цвета <code>#ffffff</code>, фон <code>#ae1e5a</code>, без рамки, скругление <code>999px</code></li>' +
                '<li><code>.chip-button</code>: в строку, промежуток <code>4px</code>, отступы <code>6px 16px</code>, фон <code>#f6f3f4</code>, ' +
                'без рамки, скругление <code>999px</code></li></ul>',
            hint: ['padding', 'border-radius: 999px', 'border: none', 'justify-content: center', 'font-weight: 700'],
            start: {
                html: '<main class="container main">\n    <p class="demo-note">Учебная версия. Группы, расходы и отметки о переводах сохраняются в этом браузере.</p>\n' +
                    '    <a class="button" href="#">К расчётам</a>\n    <button class="chip-button" type="button">Напомнить</button>\n</main>',
                css: '.demo-note {\n    \n}\n\n.button {\n    \n}\n\n.chip-button {\n    \n}\n\n/* Уже готово */\n' +
                    '.main {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n    padding-top: 16px;\n}\n',
            },
            answer: {
                css: '.demo-note {\n    padding: 10px 16px;\n    font-size: 14px;\n    background: #f6f3f4;\n    border-radius: 16px;\n}\n\n' +
                    '.button {\n    display: flex;\n    gap: 6px;\n    align-items: center;\n    justify-content: center;\n    padding: 10px 24px;\n' +
                    '    font-size: 14px;\n    font-weight: 700;\n    color: #ffffff;\n    background: #ae1e5a;\n    border: none;\n    border-radius: 999px;\n}\n\n' +
                    '.chip-button {\n    display: flex;\n    gap: 4px;\n    align-items: center;\n    padding: 6px 16px;\n    font-size: 14px;\n' +
                    '    font-weight: 700;\n    background: #f6f3f4;\n    border: none;\n    border-radius: 999px;\n}',
            },
            checks: [
                ['.demo-note: фон #f6f3f4, скругление 16px', function (t) {
                    return t.color('.demo-note', 'background-color') === '#f6f3f4' && t.px('.demo-note', 'border-top-left-radius') === 16;
                }],
                ['.demo-note: отступы 10px 16px, текст 14px', function (t) {
                    return t.px('.demo-note', 'padding-top') === 10 && t.px('.demo-note', 'padding-left') === 16 && t.px('.demo-note', 'font-size') === 14;
                }],
                ['.button: в строку, по центру', function (t) {
                    return t.css('.button', 'display') === 'flex' && t.css('.button', 'justify-content') === 'center';
                }],
                ['.button: белый жирный текст на #ae1e5a', function (t) {
                    return t.color('.button', 'color') === '#ffffff' && t.color('.button', 'background-color') === '#ae1e5a' &&
                        t.css('.button', 'font-weight') === '700';
                }],
                ['.button: отступы 10px 24px, скругление 999px', function (t) {
                    return t.px('.button', 'padding-top') === 10 && t.px('.button', 'padding-left') === 24 &&
                        t.px('.button', 'border-top-left-radius') === 999;
                }],
                ['.chip-button: фон #f6f3f4, без рамки', function (t) {
                    return t.color('.chip-button', 'background-color') === '#f6f3f4' && t.css('.chip-button', 'border-top-style') === 'none';
                }],
                ['.chip-button: отступы 6px 16px, скругление 999px', function (t) {
                    return t.px('.chip-button', 'padding-top') === 6 && t.px('.chip-button', 'padding-left') === 16 &&
                        t.px('.chip-button', 'border-top-left-radius') === 999;
                }],
            ],
        },

        // 4
        {
            title: 'Карточки баланса: разметка',
            kind: 'HTML',
            text: '<p>Наверху главной — две карточки: «Вам должны» и «Ваш долг». Первая готова, сделай вторую по её образцу:</p><ul>' +
                '<li><code>&lt;article class="kpi"&gt;</code> с теми же блоками <code>.kpi-top</code> и <code>.kpi-bottom</code></li>' +
                '<li>подпись <code>&lt;div class="label"&gt;Ваш долг&lt;/div&gt;</code> (без точки и без <code>label-accent</code>)</li>' +
                '<li>сумма <code>&lt;p class="kpi-sum payable"&gt;0 ₽&lt;/p&gt;</code></li>' +
                '<li>иконка в <code>&lt;div class="kpi-icon"&gt;</code> — картинка <code>../img/arrow-up.svg</code></li>' +
                '<li>внизу <code>&lt;p class="people payable-note"&gt;</code> и ссылка-кнопка ' +
                '<code>&lt;a class="button button-small" href="../settlements/settlements.html"&gt;К расчётам&lt;/a&gt;</code></li></ul>',
            hint: ['<article>', '<div class="...">', '<p class="...">', '<img src="..." alt="">', '<a class="..." href="...">'],
            start: {
                html: '<section class="balance">\n' + indent(kpiReceivable) + '\n\n    <!-- сюда вторую карточку -->\n\n</section>',
                css: '.balance {\n    display: grid;\n    gap: 16px;\n}\n\n.kpi {\n    padding: 24px;\n    background: #ffffff;\n    border-radius: 48px;\n}\n\n' +
                    '.kpi-top {\n    display: flex;\n    justify-content: space-between;\n}\n\n' +
                    '.kpi-sum {\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 40px;\n    font-weight: 800;\n}\n\n' +
                    '.kpi-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 48px;\n    height: 48px;\n' +
                    '    border-radius: 50%;\n    background: #eae7e8;\n}\n\n' + kpiCssReady,
            },
            answer: { html: balanceHtml },
            checks: [
                ['Две карточки .kpi', function (t) { return t.all('.balance .kpi').length === 2; }],
                ['У второй подпись «Ваш долг»', function (t) { return t.text(t.all('.kpi')[1].querySelector('.label')) === 'Ваш долг'; }],
                ['У второй сумма .kpi-sum.payable', function (t) { return !!t.all('.kpi')[1].querySelector('.kpi-sum.payable'); }],
                ['Иконка arrow-up.svg в .kpi-icon', function (t) {
                    const img = t.all('.kpi')[1].querySelector('.kpi-icon img');
                    return !!img && img.getAttribute('src') === '../img/arrow-up.svg';
                }],
                ['Есть подпись .payable-note', function (t) { return !!t.all('.kpi')[1].querySelector('.people.payable-note'); }],
                ['Кнопка «К расчётам» ведёт на расчёты', function (t) {
                    const a = t.all('.kpi')[1].querySelector('a.button.button-small');
                    return !!a && a.getAttribute('href') === '../settlements/settlements.html' && a.textContent.trim() === 'К расчётам';
                }],
            ],
        },

        // 5
        {
            title: 'Карточки баланса: оформление',
            kind: 'CSS',
            text: '<p>Теперь карточки баланса нужно оформить. HTML готов, напиши CSS:</p><ul>' +
                '<li><code>.balance</code>: сетка из двух равных колонок <code>1fr 1fr</code>, промежуток <code>16px</code></li>' +
                '<li><code>.kpi</code>: столбиком (<code>flex-direction: column</code>), промежуток <code>24px</code>, отступы <code>24px</code>, ' +
                'белый фон <code>#ffffff</code>, скругление <code>48px</code></li>' +
                '<li><code>.kpi-top</code>: в строку, края разнесены (<code>space-between</code>), по верхнему краю (<code>flex-start</code>)</li>' +
                '<li><code>.kpi-sum</code>: шрифт <code>"Manrope", Arial, sans-serif</code>, размер <code>40px</code>, жирность <code>800</code></li>' +
                '<li><code>.kpi-icon</code>: серый круг <code>48×48px</code>, фон <code>#eae7e8</code>, картинка по центру</li></ul>',
            hint: ['display: grid', 'grid-template-columns: 1fr 1fr', 'flex-direction: column', 'align-items: flex-start', 'font-weight: 800'],
            start: {
                html: balanceHtml,
                css: '.balance {\n    \n}\n\n.kpi {\n    \n}\n\n.kpi-top {\n    \n}\n\n.kpi-sum {\n    \n}\n\n.kpi-icon {\n    \n}\n\n/* Уже готово */\n' + kpiCssReady,
            },
            answer: {
                css: '.balance {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n}\n\n' +
                    '.kpi {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    gap: 24px;\n    padding: 24px;\n' +
                    '    background: #ffffff;\n    border-radius: 48px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n\n' +
                    '.kpi-top {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n}\n\n' +
                    '.kpi-sum {\n    margin-top: 8px;\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 40px;\n    font-weight: 800;\n    line-height: 1.2;\n}\n\n' +
                    '.kpi-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 48px;\n    height: 48px;\n' +
                    '    border-radius: 50%;\n    background: #eae7e8;\n}',
            },
            checks: [
                ['.balance — сетка из 2 колонок', function (t) {
                    return t.css('.balance', 'display') === 'grid' && t.css('.balance', 'grid-template-columns').split(' ').length === 2;
                }],
                ['.balance: промежуток 16px', function (t) { return t.css('.balance', 'column-gap') === '16px'; }],
                ['.kpi столбиком, промежуток 24px', function (t) {
                    return t.css('.kpi', 'display') === 'flex' && t.css('.kpi', 'flex-direction') === 'column' && t.css('.kpi', 'row-gap') === '24px';
                }],
                ['.kpi: белый фон, скругление 48px, отступы 24px', function (t) {
                    return t.color('.kpi', 'background-color') === '#ffffff' && t.px('.kpi', 'border-top-left-radius') === 48 &&
                        t.px('.kpi', 'padding-top') === 24;
                }],
                ['.kpi-top: края разнесены, по верхнему краю', function (t) {
                    return t.css('.kpi-top', 'display') === 'flex' && t.css('.kpi-top', 'justify-content') === 'space-between' &&
                        t.css('.kpi-top', 'align-items') === 'flex-start';
                }],
                ['.kpi-sum: Manrope 40px, жирность 800', function (t) {
                    return t.css('.kpi-sum', 'font-family').indexOf('Manrope') >= 0 && t.px('.kpi-sum', 'font-size') === 40 &&
                        t.css('.kpi-sum', 'font-weight') === '800';
                }],
                ['.kpi-icon: круг 48×48px', function (t) {
                    return t.px('.kpi-icon', 'width') === 48 && t.px('.kpi-icon', 'height') === 48 && t.css('.kpi-icon', 'border-top-left-radius') === '50%';
                }],
                ['.kpi-icon: фон #eae7e8, картинка по центру', function (t) {
                    return t.color('.kpi-icon:not(.kpi-icon-pink)', 'background-color') === '#eae7e8' &&
                        t.css('.kpi-icon', 'display') === 'flex' && t.css('.kpi-icon', 'justify-content') === 'center';
                }],
            ],
        },

        // 6
        {
            title: 'Форма сплита чека: разметка',
            kind: 'HTML',
            text: '<p>Форма «Быстрый сплит чека» делит сумму на несколько человек. Поле суммы готово. Добавь:</p><ul>' +
                '<li>второе поле по образцу: <code>&lt;div class="field"&gt;</code> с подписью <code>&lt;p class="field-label"&gt;Сколько человек&lt;/p&gt;</code> ' +
                'и <code>&lt;div class="field-box"&gt;</code>, а в нём <code>&lt;input name="people" type="number" value="2"&gt;</code> ' +
                '(<code>value</code> — значение, которое стоит в поле сразу)</li>' +
                '<li>в конце формы кнопку отправки <code>&lt;button class="button button-wide" type="submit"&gt;Разделить чек&lt;/button&gt;</code></li></ul>',
            hint: ['<div class="field">', '<p class="field-label">', '<input name="..." type="number" value="2">', '<button type="submit">'],
            start: {
                html: formHtml(indent(sumField) + '\n\n    <!-- сюда поле «Сколько человек» -->\n') + '\n    <!-- сюда кнопку -->\n\n</form>',
                css: T.css.card + '\n' + fieldCssReady +
                    '\n.field-box {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding: 8px 16px;\n    background: #f6f3f4;\n    border-radius: 32px;\n}\n\n' +
                    '.field-box input {\n    width: 100%;\n    font-size: 22px;\n    background: none;\n    border: none;\n}\n\n' + T.css.common,
            },
            answer: { html: fullForm },
            checks: [
                ['В форме два поля .field', function (t) { return t.all('.split-form .field').length === 2; }],
                ['Подпись «Сколько человек»', function (t) { return t.text(t.all('.field-label')[1]) === 'Сколько человек'; }],
                ['Поле name="people" внутри .field-box', function (t) { return !!t.q('.field-box input[name="people"]'); }],
                ['У поля type="number" и value="2"', function (t) {
                    return t.attr('input[name="people"]', 'type') === 'number' && t.attr('input[name="people"]', 'value') === '2';
                }],
                ['Кнопка type="submit" с текстом «Разделить чек»', function (t) {
                    const b = t.q('.split-form button');
                    return !!b && b.getAttribute('type') === 'submit' && b.textContent.trim() === 'Разделить чек';
                }],
                ['У кнопки классы button и button-wide', function (t) { return t.has('.split-form button', 'button') && t.has('.split-form button', 'button-wide'); }],
            ],
        },

        // 7
        {
            title: 'Форма сплита чека: оформление',
            kind: 'CSS',
            text: '<p>Оформим форму и разложим её и ленту операций в две колонки.</p><ul>' +
                '<li><code>.layout</code>: сетка из колонок <code>1fr 1fr</code>, промежуток <code>24px</code></li>' +
                '<li><code>.card</code>: столбиком, промежуток <code>16px</code>, отступы <code>24px</code>, белый фон <code>#ffffff</code>, скругление <code>48px</code></li>' +
                '<li><code>.field-box</code>: в строку, по центру, промежуток <code>8px</code>, отступы <code>8px 16px</code>, фон <code>#f6f3f4</code>, скругление <code>32px</code></li>' +
                '<li><code>.field-box input</code>: на всю ширину, шрифт Manrope <code>22px</code>, без рамки и без фона (<code>background: none</code>), ' +
                'без обводки при клике (<code>outline: none</code>)</li>' +
                '<li><code>.split-result</code>: по центру, жирный, цвет <code>#ae1e5a</code></li></ul>',
            hint: ['grid-template-columns: 1fr 1fr', 'background: none', 'outline: none', 'width: 100%', 'text-align: center'],
            start: {
                html: '<div class="layout">\n' + indent(fullForm).replace('<p class="split-result"></p>', '<p class="split-result">Каждый платит по 500 ₽</p>') +
                    '\n\n    <section class="card">\n        <h3>Операции</h3>\n    </section>\n</div>',
                css: '.layout {\n    \n}\n\n.card {\n    \n}\n\n.field-box {\n    \n}\n\n.field-box input {\n    \n}\n\n.split-result {\n    \n}\n\n/* Уже готово */\n' +
                    fieldCssReady + '\n' + T.css.common,
            },
            answer: {
                css: '.layout {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 24px;\n    align-items: start;\n}\n\n' + T.css.card +
                    '\n.field-box {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding: 8px 16px;\n    background: #f6f3f4;\n    border-radius: 32px;\n}\n\n' +
                    '.field-box input {\n    width: 100%;\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 22px;\n    font-weight: 700;\n' +
                    '    background: none;\n    border: none;\n    outline: none;\n}\n\n' +
                    '.split-result {\n    min-height: 24px;\n    font-size: 14px;\n    font-weight: 700;\n    text-align: center;\n    color: #ae1e5a;\n}',
            },
            checks: [
                ['.layout — сетка из 2 колонок, промежуток 24px', function (t) {
                    return t.css('.layout', 'display') === 'grid' && t.css('.layout', 'grid-template-columns').split(' ').length === 2 &&
                        t.css('.layout', 'column-gap') === '24px';
                }],
                ['.card: столбиком, промежуток 16px', function (t) {
                    return t.css('.card', 'flex-direction') === 'column' && t.css('.card', 'row-gap') === '16px';
                }],
                ['.card: белая, скругление 48px, отступы 24px', function (t) {
                    return t.color('.card', 'background-color') === '#ffffff' && t.px('.card', 'border-top-left-radius') === 48 &&
                        t.px('.card', 'padding-top') === 24;
                }],
                ['.field-box: в строку, фон #f6f3f4, скругление 32px', function (t) {
                    return t.css('.field-box', 'display') === 'flex' && t.color('.field-box', 'background-color') === '#f6f3f4' &&
                        t.px('.field-box', 'border-top-left-radius') === 32;
                }],
                ['Поле: Manrope 22px', function (t) {
                    return t.css('.field-box input', 'font-family').indexOf('Manrope') >= 0 && t.px('.field-box input', 'font-size') === 22;
                }],
                ['Поле без рамки, фона и обводки', function (t) {
                    return t.css('.field-box input', 'border-top-style') === 'none' && t.css('.field-box input', 'outline-style') === 'none' &&
                        t.color('.field-box input', 'background-color') === 'transparent';
                }],
                ['Поле на всю ширину', function (t) { return t.rule('.field-box input', 'width') === '100%'; }],
                ['.split-result: по центру, цвет #ae1e5a', function (t) {
                    return t.css('.split-result', 'text-align') === 'center' && t.color('.split-result', 'color') === '#ae1e5a';
                }],
            ],
        },

        // 8
        {
            title: 'Лента операций',
            kind: 'CSS',
            text: '<p>Справа — лента операций: кто, за что и сколько заплатил. Строки ленты потом будет добавлять JS, ' +
                'а сейчас в HTML для примера стоят две. Оформи их:</p><ul>' +
                '<li><code>.feed</code>: строки столбиком, промежуток <code>8px</code></li>' +
                '<li><code>.feed li</code>: в строку, по центру, промежуток <code>8px</code>, отступы <code>6px 0</code></li>' +
                '<li><code>.feed-text</code>: занимает всё свободное место (<code>flex: 1</code>), текст <code>14px</code></li>' +
                '<li><code>.feed-text small</code>: на отдельной строке (<code>display: block</code>), размер <code>11px</code>, цвет <code>#584146</code></li>' +
                '<li><code>.feed-sum</code>: шрифт Manrope, размер <code>14px</code></li></ul>',
            hint: ['flex-direction: column', 'flex: 1', 'display: block', 'font-family'],
            start: {
                html: '<section class="card">\n    <h3>Операции</h3>\n    <ul class="feed">\n' +
                    '        <li>\n            <div class="feed-text"><b>Билеты до Алтая</b><small>Поездка на Алтай · Вы оплатили</small></div>\n' +
                    '            <p class="feed-sum">4 080 ₽</p>\n        </li>\n' +
                    '        <li>\n            <div class="feed-text"><b>Чек в баре</b><small>Бар в пятницу · Оплатил(а) Лена</small></div>\n' +
                    '            <p class="feed-sum">3 400 ₽</p>\n        </li>\n    </ul>\n</section>',
                css: '.feed {\n    \n}\n\n.feed li {\n    \n}\n\n.feed-text {\n    \n}\n\n.feed-text small {\n    \n}\n\n.feed-sum {\n    \n}\n\n/* Уже готово */\n' + T.css.card,
            },
            answer: { css: T.css.feed },
            checks: [
                ['.feed: столбиком, промежуток 8px', function (t) {
                    return t.css('.feed', 'display') === 'flex' && t.css('.feed', 'flex-direction') === 'column' && t.css('.feed', 'row-gap') === '8px';
                }],
                ['.feed li: в строку, по центру, промежуток 8px', function (t) {
                    return t.css('.feed li', 'display') === 'flex' && t.css('.feed li', 'align-items') === 'center' && t.css('.feed li', 'column-gap') === '8px';
                }],
                ['.feed li: отступы 6px сверху и снизу', function (t) { return t.px('.feed li', 'padding-top') === 6; }],
                ['.feed-text растягивается, 14px', function (t) {
                    return t.css('.feed-text', 'flex-grow') === '1' && t.px('.feed-text', 'font-size') === 14;
                }],
                ['Подпись small — отдельной строкой, 11px', function (t) {
                    return t.css('.feed-text small', 'display') === 'block' && t.px('.feed-text small', 'font-size') === 11;
                }],
                ['Подпись цвета #584146', function (t) { return t.color('.feed-text small', 'color') === '#584146'; }],
                ['.feed-sum: Manrope 14px', function (t) {
                    return t.css('.feed-sum', 'font-family').indexOf('Manrope') >= 0 && t.px('.feed-sum', 'font-size') === 14;
                }],
            ],
        },

        // 9
        T.footer('home'),

        // 10
        {
            title: 'JS: бургер-меню',
            kind: 'JS',
            text: '<p>На телефоне меню прячется за кнопкой ☰. Оживим её: при клике на <code>.burger</code> переключай у <code>.menu</code> ' +
                'класс <code>open</code> (<code>classList.toggle</code>). Стили для <code>.menu.open</code> уже готовы.</p>',
            hint: ['document.querySelector(...)', "addEventListener('click', ...)", "classList.toggle('open')"],
            start: {
                html: T.burgerHtml,
                css: T.burgerCss,
                js: "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n// при клике переключай класс open у меню\n",
            },
            answer: { js: T.burgerJs },
            checks: T.burgerChecks,
        },

        // 11
        {
            title: 'JS: сплит чека',
            kind: 'JS',
            text: '<p>Пусть форма делит чек. Когда форму отправляют (событие <code>submit</code>):</p><ul>' +
                '<li>отмени перезагрузку страницы: <code>event.preventDefault()</code></li>' +
                '<li>возьми числа из полей: <code>Number(splitForm.elements.sum.value)</code> и так же <code>people</code></li>' +
                '<li>если сумма больше <code>0</code> и людей <code>2</code> или больше — напиши в <code>.split-result</code> ' +
                '<code>\'Каждый платит по \' + money(Math.round(sum / people))</code></li>' +
                '<li>иначе — напиши <code>Введите сумму больше нуля и от 2 человек.</code></li></ul>' +
                '<p>Функция <code>money</code> уже есть: она превращает число в «1 000 ₽».</p>',
            hint: ["addEventListener('submit', ...)", 'event.preventDefault()', 'Number(...)', '&&', '>=', 'if / else', 'Math.round', 'textContent'],
            start: {
                html: fullForm,
                css: fieldCssReady,
                js: "function money(sum) {\n    return sum.toLocaleString('ru-RU') + ' ₽';\n}\n\n" +
                    "const splitForm = document.querySelector('.split-form');\nconst splitResult = document.querySelector('.split-result');\n\n" +
                    '// посчитай долю каждого при отправке формы\n',
            },
            answer: {
                js: "function money(sum) {\n    return sum.toLocaleString('ru-RU') + ' ₽';\n}\n\n" +
                    "const splitForm = document.querySelector('.split-form');\nconst splitResult = document.querySelector('.split-result');\n\n" +
                    "splitForm.addEventListener('submit', function (event) {\n    event.preventDefault();\n" +
                    '    const sum = Number(splitForm.elements.sum.value);\n    const people = Number(splitForm.elements.people.value);\n' +
                    "    if (sum > 0 && people >= 2) {\n        splitResult.textContent = 'Каждый платит по ' + money(Math.round(sum / people));\n" +
                    "    } else {\n        splitResult.textContent = 'Введите сумму больше нуля и от 2 человек.';\n    }\n});",
            },
            checks: [
                ['Форма не перезагружает страницу', function (t) {
                    t.q('input[name="sum"]').value = '1000';
                    t.q('input[name="people"]').value = '4';
                    return t.submit('.split-form');
                }],
                ['1000 ₽ на 4 человек → «Каждый платит по 250 ₽»', function (t) {
                    return plain(t.text('.split-result')) === 'Каждыйплатитпо250₽';
                }],
                ['1000 ₽ на 3 человек → округление до 333 ₽', function (t) {
                    t.q('input[name="people"]').value = '3';
                    t.submit('.split-form');
                    return plain(t.text('.split-result')) === 'Каждыйплатитпо333₽';
                }],
                ['Пустая сумма → сообщение об ошибке', function (t) {
                    t.q('input[name="sum"]').value = '';
                    t.submit('.split-form');
                    return t.text('.split-result').indexOf('Введите') === 0;
                }],
                ['1 человек → сообщение об ошибке', function (t) {
                    t.q('input[name="sum"]').value = '500';
                    t.q('input[name="people"]').value = '1';
                    t.submit('.split-form');
                    return t.text('.split-result').indexOf('Введите') === 0;
                }],
            ],
        },

        // 12
        {
            title: 'JS: кто кому должен',
            kind: 'JS',
            text: '<p>Последний шаг — посчитать карточки баланса. Функция <code>getDebts(data)</code> уже есть: она возвращает список долгов, ' +
                'у каждого есть <code>from</code> (кто должен), <code>to</code> (кому) и <code>sum</code>.</p><ul>' +
                '<li>пройди по долгам (<code>forEach</code>): если <code>debt.to === \'Вы\'</code> — прибавь сумму к <code>receivable</code> («вам должны»), ' +
                'если <code>debt.from === \'Вы\'</code> — к <code>payable</code> («ваш долг»)</li>' +
                '<li>запиши суммы в <code>.receivable</code> и <code>.payable</code> через <code>money(...)</code></li></ul>' +
                '<p>Данные сайта лежат в <code>localStorage</code>: <code>loadData()</code> достаёт их оттуда, а если там пусто — берёт пример.</p>',
            hint: ['forEach', 'let receivable = 0', "debt.to === 'Вы'", 'receivable = receivable + debt.sum', 'localStorage.getItem', 'JSON.parse'],
            before: T.resetData,
            after: T.resetData,
            start: {
                html: '<p>Вам должны: <b class="receivable">0 ₽</b></p>\n<p>Ваш долг: <b class="payable">0 ₽</b></p>',
                css: '',
                js: T.js.data + '\n' + T.js.debts + '\nconst data = loadData();\nconst debts = getDebts(data);\n\nlet receivable = 0;\nlet payable = 0;\n\n' +
                    '// 1) пройди по долгам и посчитай суммы\n\n\n// 2) запиши суммы на страницу\n',
            },
            answer: {
                js: T.js.data + '\n' + T.js.debts + '\nconst data = loadData();\nconst debts = getDebts(data);\n\nlet receivable = 0;\nlet payable = 0;\n\n' +
                    "debts.forEach(function (debt) {\n    if (debt.to === 'Вы') {\n        receivable = receivable + debt.sum;\n    }\n" +
                    "    if (debt.from === 'Вы') {\n        payable = payable + debt.sum;\n    }\n});\n\n" +
                    "document.querySelector('.receivable').textContent = money(receivable);\n" +
                    "document.querySelector('.payable').textContent = money(payable);",
            },
            checks: [
                ['«Вам должны»: 3 400 ₽', function (t) { return plain(t.text('.receivable')) === '3400₽'; }],
                ['«Ваш долг»: 850 ₽', function (t) { return plain(t.text('.payable')) === '850₽'; }],
            ],
        },
    ];
})();
