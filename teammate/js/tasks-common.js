// =========================================================
// Общие задачи и готовые куски сайта «TeamPlay»
//
// Формат задачи:
//   title  — название, kind — что пишем (HTML / CSS / JS)
//   text   — условие (можно с HTML-тегами)
//   hint   — команды, которые понадобятся
//   start  — стартовый код { html, css, js } (вкладка есть, если ключ задан)
//   answer — эталон для учителя
//   checks — [текст проверки, функция(t) -> true/false]
//            t.css(sel, 'свойство'), t.color(sel, 'свойство'), t.px(...),
//            t.text(sel), t.attr(sel, 'атрибут'), t.has(sel, 'класс'),
//            t.visible(sel), t.rule(sel, 'свойство'), t.all(sel),
//            t.click(sel), t.type(sel, 'текст'), t.submit(sel)
// =========================================================


window.QuestTasks = {};

// ---------- Полная подсказка задачи ----------
// к командам из task.hint добавляются все CSS-свойства, которые есть в эталоне,
// но которых нет в стартовом коде (их ученик пишет сам) и ещё нет в подсказке
QuestTasks.fullHints = function (task) {
    const hints = task.hint.slice();
    const answerCss = (task.answer && task.answer.css) || '';
    const startCss = (task.start && task.start.css) || '';

    function props(css) {
        const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
        return clean.match(/(?:^|[\s;{])([a-z-]+)(?=\s*:)/g) || [];
    }

    props(answerCss).forEach(function (raw) {
        const prop = raw.replace(/^[\s;{]/, '');
        const word = new RegExp('(^|[^\\w-])' + prop + '([^\\w-]|$)');
        const alreadyInStart = new RegExp('(^|[^\\w-])' + prop + '\\s*:').test(startCss);
        const alreadyInHints = hints.some(function (h) { return word.test(h); });
        if (!alreadyInStart && !alreadyInHints) hints.push(prop);
    });
    return hints;
};

// ---------- Ключ команды: что считается «той же самой» командой ----------
// "padding: 14px 0" и "padding" — одна команда (числа неважны),
// а "display: flex" и "display: grid" — разные (новое значение надо показать)
QuestTasks.hintKey = function (hint) {
    const text = hint.trim().toLowerCase();
    const m = text.match(/^([a-z-]+)\s*:\s*(.+?);?$/);
    if (!m) return text;
    const value = m[2].trim();
    if (/\d|\.\.\./.test(value)) return m[1];
    return m[1] + ':' + value;
};

// ---------- Подсказка, которую видит ученик ----------
// только команды, которых не было в подсказках прошлых задач этой страницы
QuestTasks.visibleHints = function (tasks, index) {
    const seen = {};      // ключи уже показанных команд
    const seenProps = {}; // CSS-свойства, которые уже встречались с любым значением
    for (let i = 0; i < index; i++) {
        QuestTasks.fullHints(tasks[i]).forEach(function (h) {
            const key = QuestTasks.hintKey(h);
            seen[key] = true;
            seenProps[key.split(':')[0]] = true;
        });
    }
    return QuestTasks.fullHints(tasks[index]).filter(function (h) {
        const key = QuestTasks.hintKey(h);
        if (seen[key]) return false;
        // голое название свойства («display») знакомо, если свойство уже было
        if (key.indexOf(':') < 0 && seenProps[key]) return false;
        return true;
    });
};


// ---------- Готовые куски сайта «TeamPlay» для стартового кода задач ----------
QuestTasks.css = {};

QuestTasks.css.buttons =
    '.button {\n    display: inline-block;\n    padding: 10px 16px;\n    font-size: 14px;\n    font-weight: 700;\n    text-align: center;\n' +
    '    color: #241a06;\n    background: #f7ca60;\n    border: 1px solid #f7ca60;\n    border-radius: 8px;\n}\n\n' +
    '.button-quiet {\n    color: #f4eef9;\n    background: #15141b;\n    border-color: #3a3547;\n}\n';

QuestTasks.css.card = '.card {\n    padding: 18px;\n    background: #1c1b23;\n    border: 1px solid #3a3547;\n    border-radius: 12px;\n}\n';

QuestTasks.css.chips =
    '.chip {\n    padding: 8px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    background: #15141b;\n    border: 1px solid #3a3547;\n    border-radius: 8px;\n}\n\n' +
    '.chip.active {\n    color: #241a06;\n    background: #f7ca60;\n    border-color: #f7ca60;\n}\n';

QuestTasks.css.tag =
    '.tag {\n    align-self: flex-start;\n    padding: 3px 8px;\n    font-size: 12px;\n    font-weight: 700;\n    color: #b0e3dd;\n' +
    '    background: #26333a;\n    border-radius: 4px;\n}\n';

QuestTasks.css.muted = '.muted {\n    font-size: 14px;\n    color: #bcb2c9;\n}\n';

QuestTasks.css.fields =
    '.field {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    font-size: 14px;\n    color: #bcb2c9;\n}\n\n' +
    '.field input,\n.field textarea {\n    width: 100%;\n    padding: 10px 12px;\n    background: #15141b;\n    border: 1px solid #3a3547;\n    border-radius: 8px;\n}\n\n' +
    '.error {\n    font-size: 14px;\n    color: #ff9b9b;\n}\n';

QuestTasks.css.modal =
    '.modal {\n    width: 90%;\n    max-width: 480px;\n    margin: auto;\n    padding: 24px;\n    color: #f4eef9;\n    background: #1c1b23;\n' +
    '    border: 1px solid #3a3547;\n    border-radius: 12px;\n}\n\n' +
    '.modal::backdrop {\n    background: rgba(8, 7, 11, 0.77);\n}\n\n' +
    '.modal-form {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
    '.modal h2 {\n    font-size: 22px;\n}\n';

QuestTasks.css.modalButtons = '.modal-buttons {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n';

QuestTasks.css.empty = '.empty {\n    padding: 10px 14px;\n    background: #1c1b23;\n    border-left: 3px solid #f7ca60;\n}\n';

QuestTasks.css.hide = '.hide {\n    display: none;\n}\n';

// ---------- Готовый JS: данные сайта (для JS-задач) ----------
QuestTasks.js = {};

QuestTasks.js.data =
    'const demoData = {\n' +
    "    profile: null,\n    game: '',\n    requests: [\n" +
    "        { id: 'cs-team', game: 'Counter-Strike 2', title: 'North Side', author: 'Alex_Shadow', role: 'Снайпер', text: 'Ищем пятого игрока для Premier.' },\n" +
    "        { id: 'dota-team', game: 'Dota 2', title: 'Midnight Stack', author: 'LunaCore', role: 'Саппорт', text: 'Играем рейтинг пятёркой.' },\n" +
    "        { id: 'valorant-team', game: 'Valorant', title: 'Pixel Division', author: 'NeonFox', role: 'Контроллер', text: 'Нужен игрок для вечерних скримов.' }\n" +
    '    ],\n    replies: [],\n    reviews: [\n' +
    "        { player: 'Alex_Shadow', author: 'NeonFox', game: 'Counter-Strike 2', rating: 5, text: 'Собрал команду вовремя.' },\n" +
    "        { player: 'CodeMira', author: 'PixelFox', game: 'Хакатон AI Battle', rating: 5, text: 'Понятно объясняла решения.' },\n" +
    "        { player: 'LunaCore', author: 'Alex_Shadow', game: 'Dota 2', rating: 4, text: 'Хорошая коммуникация.' }\n" +
    '    ]\n};\n\n' +
    "function loadData() {\n    const saved = localStorage.getItem('teamplay');\n    if (saved === null) {\n" +
    '        return JSON.parse(JSON.stringify(demoData));\n    }\n    return JSON.parse(saved);\n}\n\n' +
    "function saveData(data) {\n    localStorage.setItem('teamplay', JSON.stringify(data));\n}\n\n" +
    "function myName() {\n    if (data.profile) {\n        return data.profile.nickname;\n    }\n    return 'Гость';\n}\n";

QuestTasks.js.close =
    "document.querySelectorAll('.close-modal').forEach(function (button) {\n    button.addEventListener('click', function () {\n" +
    "        button.closest('dialog').close();\n    });\n});\n";

// перед JS-задачами — чистые данные, после — убрать за собой
QuestTasks.resetData = function () { localStorage.removeItem('teamplay'); };

// чтение сохранённых данных в проверках
QuestTasks.saved = function () {
    return JSON.parse(localStorage.getItem('teamplay') || 'null');
};

// сколько видимых элементов
QuestTasks.shown = function (t, sel) {
    return t.all(sel).filter(function (e) { return t.visible(e); }).length;
};

// ---------- 1. Каркас и базовые стили (одинаковая у всех) ----------
QuestTasks.base = function () {
    const html = '<div class="container">\n    <h1>TeamPlay</h1>\n    <p>Найди своих тиммейтов</p>\n' +
        '    <ul>\n        <li><a href="#">Дисциплины</a></li>\n        <li><a href="#">Заявки</a></li>\n    </ul>\n</div>';
    return {
        title: 'Каркас и базовые стили',
        kind: 'CSS',
        text: '<p>Основа всей страницы: тёмный фон, шрифт и ширина сайта.</p><ul>' +
            '<li><code>body</code>: шрифт <code>"Inter", Arial, sans-serif</code>, размер <code>16px</code>, высота строки <code>1.5</code>, ' +
            'светлый текст <code>#f4eef9</code>, тёмный фон <code>#111116</code></li>' +
            '<li><code>.container</code>: не шире <code>1200px</code>, по центру (<code>margin: 0 auto</code>), отступы по бокам <code>24px</code></li>' +
            '<li><code>ul</code>: без точек у пунктов; <code>a</code>: без подчёркивания, цвет <code>#f4eef9</code></li></ul>',
        hint: ['font-family', 'font-size', 'line-height', 'color', 'background', 'max-width', 'margin: 0 auto', 'padding', 'list-style: none', 'text-decoration: none'],
        start: {
            html: html,
            css: '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    \n}\n\n.container {\n    \n}\n\nul {\n    \n}\n\na {\n    \n}\n',
        },
        answer: {
            html: html,
            css: 'body {\n    font-family: "Inter", Arial, sans-serif;\n    font-size: 16px;\n    line-height: 1.5;\n    color: #f4eef9;\n    background: #111116;\n}\n\n' +
                '.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 24px;\n}\n\n' +
                'ul {\n    list-style: none;\n}\n\na {\n    color: #f4eef9;\n    text-decoration: none;\n}',
        },
        checks: [
            ['Шрифт Inter', function (t) { return t.css('body', 'font-family').indexOf('Inter') >= 0; }],
            ['Размер 16px и высота строки 1.5', function (t) {
                return t.px('body', 'font-size') === 16 && t.px('body', 'line-height') === 24;
            }],
            ['Светлый текст #f4eef9', function (t) { return t.color('body', 'color') === '#f4eef9'; }],
            ['Тёмный фон #111116', function (t) { return t.color('body', 'background-color') === '#111116'; }],
            ['.container не шире 1200px', function (t) { return t.css('.container', 'max-width') === '1200px'; }],
            ['.container по центру (margin: 0 auto)', function (t) { return t.rule('.container', 'margin-left') === 'auto'; }],
            ['.container: отступы по бокам 24px', function (t) { return t.px('.container', 'padding-left') === 24; }],
            ['У списка нет точек', function (t) { return t.css('ul', 'list-style-type') === 'none'; }],
            ['Ссылки без подчёркивания, цвет #f4eef9', function (t) {
                return t.css('a', 'text-decoration-line') === 'none' && t.color('a', 'color') === '#f4eef9';
            }],
        ],
    };
};

// ---------- 2. Шапка (одинаковая разметка, активна своя страница) ----------
QuestTasks.headerHtml = function (active) {
    const pages = [['profile', 'Анкета'], ['catalog', 'Дисциплины'], ['requests', 'Заявки'], ['reviews', 'Отзывы']];
    let links = '';
    pages.forEach(function (p) {
        const cls = p[0] === active ? ' class="active"' : '';
        links += '            <li><a href="../' + p[0] + '/' + p[0] + '.html"' + cls + '>' + p[1] + '</a></li>\n';
    });
    return '<header class="header">\n' +
        '    <div class="container header-inner">\n' +
        '        <a class="logo" href="../profile/profile.html">✦ TeamPlay</a>\n' +
        '        <button class="burger" type="button">☰</button>\n' +
        '        <nav class="nav">\n' +
        '            <ul class="menu">\n' + links + '            </ul>\n' +
        '        </nav>\n' +
        '        <a class="button header-button" href="../requests/requests.html">Создать заявку</a>\n' +
        '    </div>\n' +
        '</header>';
};

QuestTasks.headerReady = '/* Это уже готово */\n' +
    '.header {\n    background: #18171e;\n    border-bottom: 1px solid #3a3547;\n}\n\n' +
    '.menu a {\n    display: block;\n    padding: 10px;\n    font-size: 14px;\n    color: #bcb2c9;\n}\n\n' +
    QuestTasks.css.buttons + '\n' +
    '.burger {\n    display: none;\n    font-size: 22px;\n    background: none;\n    border: none;\n}\n';

QuestTasks.header = function (active) {
    const html = QuestTasks.headerHtml(active);
    return {
        title: 'Шапка с меню',
        kind: 'CSS',
        text: '<p>HTML шапки готов. Допиши четыре правила, и шапка станет как в макете:</p><ul>' +
            '<li><code>.header-inner</code>: всё в строку, по центру по вертикали, промежуток <code>24px</code>, высота <code>72px</code></li>' +
            '<li><code>.logo</code>: текст <code>20px</code>, жирность <code>800</code>, цвет <code>#f7ca60</code></li>' +
            '<li><code>.menu</code>: пункты в строку, промежуток <code>8px</code></li>' +
            '<li><code>.menu a.active</code> (текущая страница): цвет <code>#f7ca60</code> и линия снизу <code>border-bottom: 2px solid #f7ca60</code></li>' +
            '<li><code>.header-button</code>: прижата вправо (<code>margin-left: auto</code>)</li></ul>',
        hint: ['display: flex', 'align-items: center', 'gap', 'height', 'font-weight', 'border-bottom', 'margin-left: auto'],
        start: {
            html: html,
            css: '.header-inner {\n    \n}\n\n.logo {\n    \n}\n\n.menu {\n    \n}\n\n.menu a.active {\n    \n}\n\n.header-button {\n    \n}\n\n' + QuestTasks.headerReady,
        },
        answer: {
            html: html,
            css: '.header-inner {\n    display: flex;\n    gap: 24px;\n    align-items: center;\n    height: 72px;\n}\n\n' +
                '.logo {\n    font-size: 20px;\n    font-weight: 800;\n    color: #f7ca60;\n}\n\n' +
                '.menu {\n    display: flex;\n    gap: 8px;\n}\n\n' +
                '.menu a.active {\n    color: #f7ca60;\n    border-bottom: 2px solid #f7ca60;\n}\n\n' +
                '.header-button {\n    margin-left: auto;\n}\n\n' + QuestTasks.headerReady,
        },
        checks: [
            ['.header-inner в строку и по центру', function (t) {
                return t.css('.header-inner', 'display') === 'flex' && t.css('.header-inner', 'align-items') === 'center';
            }],
            ['.header-inner: промежуток 24px, высота 72px', function (t) {
                return t.css('.header-inner', 'column-gap') === '24px' && t.px('.header-inner', 'height') === 72;
            }],
            ['.logo: 20px, жирность 800, цвет #f7ca60', function (t) {
                return t.px('.logo', 'font-size') === 20 && t.css('.logo', 'font-weight') === '800' && t.color('.logo', 'color') === '#f7ca60';
            }],
            ['.menu: пункты в строку, промежуток 8px', function (t) {
                return t.css('.menu', 'display') === 'flex' && t.css('.menu', 'column-gap') === '8px';
            }],
            ['Активный пункт: цвет #f7ca60', function (t) { return t.color('.menu a.active', 'color') === '#f7ca60'; }],
            ['Активный пункт: линия снизу 2px', function (t) {
                return Math.abs(t.px('.menu a.active', 'border-bottom-width') - 2) <= 0.5 && t.color('.menu a.active', 'border-bottom-color') === '#f7ca60';
            }],
            ['Кнопка прижата вправо', function (t) { return t.rule('.header-button', 'margin-left') === 'auto'; }],
        ],
    };
};

// ---------- 9. Подвал и версия для телефона (одинаковая у всех) ----------
QuestTasks.footer = function (active) {
    const footerHtml =
        '<footer class="footer">\n' +
        '    <div class="container footer-inner">\n' +
        '        <a class="logo" href="../profile/profile.html">✦ TeamPlay</a>\n' +
        '        <p>Учебная версия. Анкета, заявки и отзывы хранятся в этом браузере.</p>\n' +
        '    </div>\n' +
        '</footer>';
    const html = QuestTasks.headerHtml(active) + '\n\n' + footerHtml;
    const ready = '/* Это уже готово */\n' +
        '.header-inner {\n    display: flex;\n    gap: 24px;\n    align-items: center;\n    height: 72px;\n}\n\n' +
        '.logo {\n    font-size: 20px;\n    font-weight: 800;\n    color: #f7ca60;\n}\n\n' +
        '.menu {\n    display: flex;\n    gap: 8px;\n}\n\n' +
        '.header-button {\n    margin-left: auto;\n}\n\n' +
        '.burger {\n    display: none;\n    font-size: 22px;\n    background: none;\n    border: none;\n}\n\n' +
        '.footer {\n    padding: 24px 0;\n    background: #15141a;\n    border-top: 1px solid #3a3547;\n}\n\n' +
        '.footer p {\n    font-size: 14px;\n    color: #bcb2c9;\n}\n';
    return {
        title: 'Подвал и версия для телефона',
        kind: 'CSS',
        text: '<p>Внизу страницы — подвал: слева логотип, справа текст. А на телефоне шапка должна перестроиться.</p><ul>' +
            '<li><code>.footer-inner</code>: в строку, края разнесены (<code>space-between</code>), по центру по вертикали, промежуток <code>24px</code></li>' +
            '<li>В конце добавь медиазапрос <code>@media (max-width: 768px)</code>, а внутри: ' +
            '<code>.burger</code> показывается (<code>display: block</code>), <code>.header-button</code> прячется (<code>display: none</code>), ' +
            '<code>.footer-inner</code> становится столбиком (<code>flex-direction: column</code>)</li></ul>' +
            '<p>Медиазапрос пиши в самом конце: если обычное правило <code>.burger { display: none; }</code> стоит ниже, оно его перебьёт. ' +
            'Превью узкое, как телефон, поэтому медиазапрос сработает прямо в нём.</p>',
        hint: ['justify-content: space-between', '@media (max-width: 768px) { }', 'display: block', 'display: none', 'flex-direction: column'],
        start: {
            html: html,
            css: ready + '\n/* Твой код */\n.footer-inner {\n    \n}\n\n/* медиазапрос пишут в самом конце файла, после обычных правил */\n\n',
        },
        answer: {
            html: html,
            css: ready + '\n.footer-inner {\n    display: flex;\n    gap: 24px;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
                '@media (max-width: 768px) {\n    .burger {\n        display: block;\n    }\n\n    .header-button {\n        display: none;\n    }\n\n' +
                '    .footer-inner {\n        flex-direction: column;\n        align-items: flex-start;\n    }\n}',
        },
        checks: [
            ['.footer-inner в строку, края разнесены', function (t) {
                return t.css('.footer-inner', 'display') === 'flex' && t.rule('.footer-inner', 'justify-content') === 'space-between';
            }],
            ['Промежуток 24px', function (t) { return t.css('.footer-inner', 'column-gap') === '24px'; }],
            ['На телефоне видна кнопка-бургер', function (t) { return t.css('.burger', 'display') === 'block'; }],
            ['На телефоне спрятана кнопка «Создать заявку»', function (t) { return t.css('.header-button', 'display') === 'none'; }],
            ['На телефоне подвал столбиком', function (t) { return t.css('.footer-inner', 'flex-direction') === 'column'; }],
        ],
    };
};

// ---------- 10. JS: бургер-меню ----------
QuestTasks.burgerHtml =
    '<button class="burger" type="button">☰</button>\n<ul class="menu">\n    <li><a href="#">Анкета</a></li>\n' +
    '    <li><a href="#">Дисциплины</a></li>\n</ul>';
QuestTasks.burgerCss = '.menu {\n    display: none;\n}\n\n.menu.open {\n    display: block;\n}\n';
QuestTasks.burgerJs =
    "const burger = document.querySelector('.burger');\nconst menu = document.querySelector('.menu');\n\n" +
    "burger.addEventListener('click', function () {\n    menu.classList.toggle('open');\n});\n";
QuestTasks.burgerChecks = [
    ['Сначала меню спрятано', function (t) { return !t.visible('.menu'); }],
    ['Бургер открывает меню (класс open)', function (t) {
        t.click('.burger');
        return t.has('.menu', 'open') && t.visible('.menu');
    }],
    ['Второй клик закрывает меню', function (t) {
        t.click('.burger');
        return !t.has('.menu', 'open');
    }],
];

// ---------- 7. Окно: оформление .modal ----------
QuestTasks.modalTask = function (title, text, dialogStart, dialogAnswer, htmlChecks, hint) {
    return {
        title: title,
        kind: 'HTML + CSS',
        text: text +
            '<p>И оформи окно:</p><ul>' +
            '<li><code>.modal</code>: ширина <code>90%</code>, но не больше <code>480px</code>, по центру экрана (<code>margin: auto</code>), ' +
            'отступы <code>24px</code>, фон <code>#1c1b23</code>, рамка <code>1px solid #3a3547</code>, скругление <code>12px</code></li>' +
            '<li><code>.modal-form</code>: всё столбиком, промежуток <code>16px</code></li></ul>' +
            '<p>Чтобы окно было видно в превью, у <code>&lt;dialog&gt;</code> стоит атрибут <code>open</code>. ' +
            'На настоящем сайте окно открывает JS.</p>',
        hint: (hint || []).concat(['<dialog>', 'max-width', 'margin: auto', 'flex-direction: column']),
        start: {
            html: dialogStart,
            css: '.modal {\n    \n}\n\n.modal-form {\n    \n}\n\n/* Уже готово */\n.modal h2 {\n    font-size: 22px;\n}\n\n' +
                QuestTasks.css.fields + '\n' + QuestTasks.css.modalButtons + '\n' + QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        answer: {
            html: dialogAnswer,
            css: QuestTasks.css.modal + '\n' + QuestTasks.css.fields + '\n' + QuestTasks.css.modalButtons + '\n' +
                QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        checks: htmlChecks.concat([
            ['.modal: ширина 90%, не больше 480px', function (t) {
                return t.rule('.modal', 'width') === '90%' && t.css('.modal', 'max-width') === '480px';
            }],
            ['.modal по центру (margin: auto)', function (t) { return t.rule('.modal', 'margin-left') === 'auto'; }],
            ['.modal: отступы 24px, скругление 12px', function (t) {
                return t.px('.modal', 'padding-top') === 24 && t.px('.modal', 'border-top-left-radius') === 12;
            }],
            ['.modal: фон #1c1b23, рамка 1px #3a3547', function (t) {
                return t.color('.modal', 'background-color') === '#1c1b23' && Math.abs(t.px('.modal', 'border-top-width') - 1) <= 0.5 &&
                    t.color('.modal', 'border-top-color') === '#3a3547';
            }],
            ['.modal-form: столбиком, промежуток 16px', function (t) {
                return t.css('.modal-form', 'display') === 'flex' && t.css('.modal-form', 'flex-direction') === 'column' &&
                    t.css('.modal-form', 'row-gap') === '16px';
            }],
        ]),
    };
};

// ---------- 8. Поля окна: оформление .field ----------
QuestTasks.fieldsTask = function (title, text, dialogStart, dialogAnswer, htmlChecks, hint) {
    return {
        title: title,
        kind: 'HTML + CSS',
        text: text +
            '<p>И оформи поля:</p><ul>' +
            '<li><code>.field</code>: подпись и поле столбиком, промежуток <code>6px</code>, текст <code>14px</code> цвета <code>#bcb2c9</code></li>' +
            '<li><code>.field input, .field textarea</code> (одно правило на оба): на всю ширину, отступы <code>10px 12px</code>, фон <code>#15141b</code>, ' +
            'рамка <code>1px solid #3a3547</code>, скругление <code>8px</code></li>' +
            '<li><code>.modal-buttons</code>: кнопки в строку с переносом, промежуток <code>8px</code></li></ul>',
        hint: (hint || []).concat(['<label>', '<input>', '<textarea>', 'border: 1px solid ...', 'flex-wrap: wrap']),
        start: {
            html: dialogStart,
            css: '.field {\n    \n}\n\n.field input,\n.field textarea {\n    \n}\n\n.modal-buttons {\n    \n}\n\n/* Уже готово */\n' +
                QuestTasks.css.modal + '\n.error {\n    font-size: 14px;\n    color: #ff9b9b;\n}\n\n' +
                QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        answer: {
            html: dialogAnswer,
            css: QuestTasks.css.fields + '\n' + QuestTasks.css.modalButtons + '\n' + QuestTasks.css.modal + '\n' +
                QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        checks: htmlChecks.concat([
            ['.field: столбиком, промежуток 6px', function (t) {
                return t.css('.field', 'display') === 'flex' && t.css('.field', 'flex-direction') === 'column' &&
                    t.css('.field', 'row-gap') === '6px';
            }],
            ['.field: 14px цвета #bcb2c9', function (t) {
                return t.px('.field', 'font-size') === 14 && t.color('.field', 'color') === '#bcb2c9';
            }],
            ['Поле: на всю ширину, фон #15141b', function (t) {
                return t.rule('.field input', 'width') === '100%' && t.color('.field input', 'background-color') === '#15141b';
            }],
            ['Поле: рамка 1px #3a3547, скругление 8px', function (t) {
                return Math.abs(t.px('.field input', 'border-top-width') - 1) <= 0.5 &&
                    t.color('.field input', 'border-top-color') === '#3a3547' && t.px('.field input', 'border-top-left-radius') === 8;
            }],
            ['Поле: отступы 10px 12px', function (t) {
                return t.px('.field input', 'padding-top') === 10 && t.px('.field input', 'padding-left') === 12;
            }],
            ['Большое поле оформлено так же', function (t) {
                return t.rule('.field textarea', 'width') === '100%' && t.color('.field textarea', 'background-color') === '#15141b';
            }],
            ['.modal-buttons: в строку с переносом, промежуток 8px', function (t) {
                return t.css('.modal-buttons', 'display') === 'flex' && t.css('.modal-buttons', 'flex-wrap') === 'wrap' &&
                    t.css('.modal-buttons', 'column-gap') === '8px';
            }],
        ]),
    };
};
