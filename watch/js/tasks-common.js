// =========================================================
// Общие задачи и готовые куски сайта «Киносфера»
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

// ---------- Готовые куски сайта «Киносфера» для стартового кода задач ----------
QuestTasks.css = {};

QuestTasks.css.chips =
    '.chip {\n    display: flex;\n    gap: 6px;\n    align-items: center;\n    padding: 4px 12px;\n    font-size: 12px;\n    font-weight: 500;\n' +
    '    color: #e5e0f1;\n    background: #353340;\n    border: 1px solid #2c2f34;\n    border-radius: 999px;\n}\n\n' +
    '.chip-teal {\n    color: #a0cfce;\n    background: #2c4a4b;\n    border-color: #4d6e6e;\n}\n\n' +
    '.chip-purple {\n    color: #debbe7;\n    background: #5a3f64;\n    border-color: #7d6385;\n}\n\n' +
    '.chip-blue {\n    color: #aec8f2;\n    background: #4a5a78;\n    border-color: #6e86ad;\n}\n\n' +
    '.chip-small {\n    padding: 2px 10px;\n    font-size: 11px;\n}\n';

QuestTasks.css.buttons =
    '.button {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    justify-content: center;\n    padding: 14px 28px;\n' +
    '    font-size: 14px;\n    font-weight: 700;\n    border: 1px solid #2c2f34;\n    border-radius: 999px;\n}\n\n' +
    '.button-teal {\n    color: #003736;\n    background: #a0cfce;\n    border-color: #a0cfce;\n}\n\n' +
    '.button-ghost {\n    color: #debbe7;\n    background: #2f2537;\n    border-color: #7d6385;\n}\n\n' +
    '.button-dark {\n    color: #e5e0f1;\n    background: #201e2a;\n}\n\n' +
    '.button-small {\n    padding: 6px 14px;\n    font-size: 13px;\n}\n';

QuestTasks.css.titles =
    '.section-head {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 24px;\n}\n\n' +
    '.section-sub {\n    margin-top: 4px;\n    font-size: 13px;\n    color: #c0c8c7;\n}\n\n' +
    '.title {\n    padding-left: 16px;\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 30px;\n    font-weight: 700;\n' +
    '    line-height: 1.25;\n    border-left: 6px solid #a0cfce;\n}\n\n' +
    '.title-pink {\n    border-left: 6px solid #debbe7;\n}\n\n.title-blue {\n    border-left: 6px solid #aec8f2;\n}\n\n' +
    '.link {\n    font-size: 14px;\n    font-weight: 600;\n    color: #a0cfce;\n    background: none;\n    border: none;\n}\n';

QuestTasks.css.reviews =
    '.reviews-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n}\n\n' +
    '.review {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    padding: 20px;\n    background: #2a2935;\n' +
    '    border: 1px solid #2c2f34;\n    border-radius: 16px;\n}\n\n' +
    '.review-top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
    '.stars {\n    font-size: 11px;\n    color: #a0cfce;\n}\n\n' +
    '.review-text {\n    flex: 1;\n    font-size: 13px;\n    line-height: 1.6;\n}\n\n' +
    '.review-author {\n    display: flex;\n    gap: 10px;\n    align-items: center;\n    font-size: 10px;\n    color: #c0c8c7;\n}\n\n' +
    '.review-author img {\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    object-fit: cover;\n}\n\n' +
    '.review-author b {\n    display: block;\n    font-size: 11px;\n    color: #e5e0f1;\n}\n';

QuestTasks.css.modal =
    '.modal {\n    width: 90%;\n    max-width: 420px;\n    margin: auto;\n    padding: 28px;\n    color: #e5e0f1;\n    background: #1c1a26;\n' +
    '    border: 1px solid #2c2f34;\n    border-radius: 20px;\n}\n\n' +
    '.modal::backdrop {\n    background: rgba(0, 0, 0, 0.6);\n}\n\n' +
    '.modal-form {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
    '.modal h2 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 24px;\n}\n';

QuestTasks.css.modalFields =
    '.modal-field {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    font-size: 13px;\n    color: #c0c8c7;\n}\n\n' +
    '.modal-field input,\n.modal-field textarea {\n    width: 100%;\n    padding: 12px 14px;\n    background: #201e2a;\n' +
    '    border: 1px solid #2c2f34;\n    border-radius: 12px;\n}\n\n' +
    '.error {\n    font-size: 13px;\n    color: #ffb2bf;\n}\n\n' +
    '.modal-buttons {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n}\n';

QuestTasks.css.hide = '.hide {\n    display: none;\n}\n';

// ---------- Готовый JS: данные сайта (для JS-задач) ----------
QuestTasks.js = {};

QuestTasks.js.films =
    'const films = [\n' +
    "    { id: 'dune', title: 'Дюна: Часть вторая', meta: 'Фантастика • 2 ч 46 мин', moods: ['adventure', 'space', 'group'] },\n" +
    "    { id: 'creator', title: 'Создатель', meta: 'Фантастика • 2 ч 13 мин', moods: ['adventure', 'group'] },\n" +
    "    { id: 'flower-moon', title: 'Убийцы цветочной луны', meta: 'Триллер • 1 ч 58 мин', moods: ['thriller'] },\n" +
    "    { id: 'napoleon', title: 'Наполеон: Режиссерская версия', meta: 'Биография • 2 ч 38 мин', moods: ['adventure'] },\n" +
    "    { id: 'interstellar', title: 'Интерстеллар', meta: 'Фантастика • 2 ч 49 мин', moods: ['space', 'group'] },\n" +
    "    { id: 'bladerunner', title: 'Бегущий по лезвию 2049', meta: 'Фантастика • 2 ч 44 мин', moods: ['thriller', 'space'] }\n" +
    '];\n\n' +
    'function findFilm(id) {\n    let found = null;\n    films.forEach(function (film) {\n        if (film.id === id) {\n            found = film;\n        }\n    });\n    return found;\n}\n';

QuestTasks.js.data =
    'const demoData = {\n' +
    "    profile: '',\n    saved: [],\n    rooms: [\n" +
    "        { id: 'interstellar', title: 'Интерстеллар', film: 'Интерстеллар', members: ['Артём'] },\n" +
    "        { id: 'bladerunner', title: 'Бегущий по лезвию 2049', film: 'Бегущий по лезвию 2049', members: ['София'] }\n" +
    '    ],\n    reviews: []\n};\n\n' +
    "function loadData() {\n    const saved = localStorage.getItem('kinosphere');\n    if (saved === null) {\n" +
    '        return JSON.parse(JSON.stringify(demoData));\n    }\n    return JSON.parse(saved);\n}\n\n' +
    "function saveData(data) {\n    localStorage.setItem('kinosphere', JSON.stringify(data));\n}\n";

QuestTasks.js.close =
    "document.querySelectorAll('.close-modal').forEach(function (button) {\n    button.addEventListener('click', function () {\n" +
    "        button.closest('dialog').close();\n    });\n});\n";

// перед JS-задачами — чистые данные, после — убрать за собой
QuestTasks.resetData = function () { localStorage.removeItem('kinosphere'); };

// чтение сохранённых данных в проверках
QuestTasks.saved = function () {
    return JSON.parse(localStorage.getItem('kinosphere') || 'null');
};

// ---------- 1. Каркас и базовые стили (одинаковая у всех) ----------
QuestTasks.base = function () {
    const html = '<div class="container">\n    <h1>Киносфера</h1>\n    <p>Смотрим кино вместе</p>\n' +
        '    <ul>\n        <li><a href="#">Подборки</a></li>\n        <li><a href="#">Комнаты</a></li>\n    </ul>\n</div>';
    return {
        title: 'Каркас и базовые стили',
        kind: 'CSS',
        text: '<p>Основа всей страницы: тёмный кинозал, шрифт и ширина сайта.</p><ul>' +
            '<li><code>body</code>: шрифт <code>"Inter", Arial, sans-serif</code>, размер <code>16px</code>, высота строки <code>1.5</code>, ' +
            'светлый текст <code>#e5e0f1</code>, тёмный фон <code>#13121d</code></li>' +
            '<li><code>.container</code>: не шире <code>1280px</code>, по центру (<code>margin: 0 auto</code>), отступы по бокам <code>32px</code></li>' +
            '<li><code>ul</code>: без точек у пунктов; <code>a</code>: без подчёркивания, цвет <code>#e5e0f1</code></li></ul>',
        hint: ['font-family', 'font-size', 'line-height', 'color', 'background', 'max-width', 'margin: 0 auto', 'padding', 'list-style: none', 'text-decoration: none'],
        start: {
            html: html,
            css: '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    \n}\n\n.container {\n    \n}\n\nul {\n    \n}\n\na {\n    \n}\n',
        },
        answer: {
            html: html,
            css: 'body {\n    font-family: "Inter", Arial, sans-serif;\n    font-size: 16px;\n    line-height: 1.5;\n    color: #e5e0f1;\n    background: #13121d;\n}\n\n' +
                '.container {\n    max-width: 1280px;\n    margin: 0 auto;\n    padding: 0 32px;\n}\n\n' +
                'ul {\n    list-style: none;\n}\n\na {\n    color: #e5e0f1;\n    text-decoration: none;\n}',
        },
        checks: [
            ['Шрифт Inter', function (t) { return t.css('body', 'font-family').indexOf('Inter') >= 0; }],
            ['Размер 16px и высота строки 1.5', function (t) {
                return t.px('body', 'font-size') === 16 && t.px('body', 'line-height') === 24;
            }],
            ['Светлый текст #e5e0f1', function (t) { return t.color('body', 'color') === '#e5e0f1'; }],
            ['Тёмный фон #13121d', function (t) { return t.color('body', 'background-color') === '#13121d'; }],
            ['.container не шире 1280px', function (t) { return t.css('.container', 'max-width') === '1280px'; }],
            ['.container по центру (margin: 0 auto)', function (t) { return t.rule('.container', 'margin-left') === 'auto'; }],
            ['.container: отступы по бокам 32px', function (t) { return t.px('.container', 'padding-left') === 32; }],
            ['У списка нет точек', function (t) { return t.css('ul', 'list-style-type') === 'none'; }],
            ['Ссылки без подчёркивания, цвет #e5e0f1', function (t) {
                return t.css('a', 'text-decoration-line') === 'none' && t.color('a', 'color') === '#e5e0f1';
            }],
        ],
    };
};

// ---------- 2. Шапка (одинаковая разметка, активна своя страница) ----------
QuestTasks.headerHtml = function (active) {
    const pages = [['home', 'Главная'], ['catalog', 'Подборки'], ['rooms', 'Комнаты'], ['profile', 'Профиль']];
    let links = '';
    pages.forEach(function (p) {
        const cls = p[0] === active ? ' class="active"' : '';
        links += '            <li><a href="../' + p[0] + '/' + p[0] + '.html"' + cls + '>' + p[1] + '</a></li>\n';
    });
    return '<header class="header">\n' +
        '    <div class="container header-inner">\n' +
        '        <a class="logo" href="../home/home.html">\n' +
        '            <div class="logo-icon"><img src="../img/logo.svg" alt="" width="24" height="24"></div>\n' +
        '            <div class="logo-text">Киносфера <small>онлайн-зал</small></div>\n' +
        '        </a>\n' +
        '        <button class="burger" type="button">☰</button>\n' +
        '        <nav class="nav">\n' +
        '            <ul class="menu">\n' + links + '            </ul>\n' +
        '        </nav>\n' +
        '        <div class="header-tools">\n' +
        '            <a class="button button-teal" href="../rooms/rooms.html"><img src="../img/group.svg" alt="" width="16" height="12"> Создать комнату</a>\n' +
        '            <a href="../profile/profile.html"><img class="avatar" src="../img/avatar.jpg" alt="Ваш профиль" width="36" height="36"></a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</header>';
};

QuestTasks.headerReady = '/* Это уже готово */\n' +
    '.logo {\n    display: flex;\n    gap: 10px;\n    align-items: center;\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 20px;\n    font-weight: 700;\n}\n\n' +
    '.logo-text small {\n    display: block;\n    font-size: 10px;\n    text-transform: uppercase;\n    color: #a0cfce;\n}\n\n' +
    '.menu a {\n    display: block;\n    padding: 8px 0;\n    font-size: 14px;\n    color: #c0c8c7;\n}\n\n' +
    '.header-tools {\n    display: flex;\n    gap: 12px;\n    align-items: center;\n    margin-left: auto;\n}\n\n' +
    '.button {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding: 10px 20px;\n    font-weight: 700;\n    border-radius: 999px;\n}\n\n' +
    '.button-teal {\n    color: #003736;\n    background: #a0cfce;\n}\n\n' +
    '.avatar {\n    width: 36px;\n    height: 36px;\n    border-radius: 50%;\n    object-fit: cover;\n    border: 2px solid #a0cfce;\n}\n\n' +
    '.burger {\n    display: none;\n    font-size: 22px;\n    background: none;\n    border: none;\n}\n';

QuestTasks.header = function (active) {
    const html = QuestTasks.headerHtml(active);
    return {
        title: 'Шапка с меню',
        kind: 'CSS',
        text: '<p>HTML шапки готов. Допиши четыре правила, и шапка станет как в макете:</p><ul>' +
            '<li><code>.header-inner</code>: всё в строку, по центру по вертикали, промежуток <code>24px</code>, высота <code>88px</code></li>' +
            '<li><code>.logo-icon</code>: квадрат <code>40×40px</code> со скруглением <code>12px</code>, фон <code>#5a3f64</code>, картинка по центру</li>' +
            '<li><code>.menu</code>: пункты в строку, промежуток <code>24px</code></li>' +
            '<li><code>.menu a.active</code> (текущая страница): цвет <code>#a0cfce</code> и линия снизу <code>border-bottom: 2px solid #a0cfce</code></li></ul>',
        hint: ['display: flex', 'align-items: center', 'justify-content: center', 'gap', 'height', 'width', 'border-radius', 'background', 'border-bottom'],
        start: {
            html: html,
            css: '.header-inner {\n    \n}\n\n.logo-icon {\n    \n}\n\n.menu {\n    \n}\n\n.menu a.active {\n    \n}\n\n' + QuestTasks.headerReady,
        },
        answer: {
            html: html,
            css: '.header-inner {\n    display: flex;\n    gap: 24px;\n    align-items: center;\n    height: 88px;\n}\n\n' +
                '.logo-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 40px;\n    height: 40px;\n' +
                '    border-radius: 12px;\n    background: #5a3f64;\n}\n\n' +
                '.menu {\n    display: flex;\n    gap: 24px;\n    align-items: center;\n}\n\n' +
                '.menu a.active {\n    color: #a0cfce;\n    border-bottom: 2px solid #a0cfce;\n}\n\n' + QuestTasks.headerReady,
        },
        checks: [
            ['.header-inner в строку и по центру', function (t) {
                return t.css('.header-inner', 'display') === 'flex' && t.css('.header-inner', 'align-items') === 'center';
            }],
            ['.header-inner: промежуток 24px, высота 88px', function (t) {
                return t.css('.header-inner', 'column-gap') === '24px' && t.px('.header-inner', 'height') === 88;
            }],
            ['.logo-icon: 40×40px, скругление 12px', function (t) {
                return t.px('.logo-icon', 'width') === 40 && t.px('.logo-icon', 'height') === 40 && t.px('.logo-icon', 'border-top-left-radius') === 12;
            }],
            ['.logo-icon: фон #5a3f64, картинка по центру', function (t) {
                return t.color('.logo-icon', 'background-color') === '#5a3f64' && t.css('.logo-icon', 'display') === 'flex' &&
                    t.css('.logo-icon', 'justify-content') === 'center';
            }],
            ['.menu: пункты в строку, промежуток 24px', function (t) {
                return t.css('.menu', 'display') === 'flex' && t.css('.menu', 'column-gap') === '24px';
            }],
            ['Активный пункт: цвет #a0cfce', function (t) { return t.color('.menu a.active', 'color') === '#a0cfce'; }],
            ['Активный пункт: линия снизу 2px', function (t) {
                return Math.abs(t.px('.menu a.active', 'border-bottom-width') - 2) <= 0.5 && t.color('.menu a.active', 'border-bottom-color') === '#a0cfce';
            }],
        ],
    };
};

// ---------- 9. Подвал и версия для телефона (одинаковая у всех) ----------
QuestTasks.footer = function (active) {
    const footerHtml =
        '<footer class="footer">\n' +
        '    <div class="container footer-inner">\n' +
        '        <div>\n' +
        '            <a class="logo logo-small" href="../home/home.html">Киносфера</a>\n' +
        '            <p>Учебный каталог фильмов. Комнаты, список и рецензии хранятся в этом браузере.</p>\n' +
        '        </div>\n' +
        '        <ul class="footer-links">\n' +
        '            <li><a href="../catalog/catalog.html">Каталог</a></li>\n' +
        '            <li><a href="../rooms/rooms.html">Кинокомнаты</a></li>\n' +
        '            <li><a href="../profile/profile.html">Профиль</a></li>\n' +
        '        </ul>\n' +
        '    </div>\n' +
        '</footer>';
    const html = QuestTasks.headerHtml(active) + '\n\n' + footerHtml;
    const ready = '/* Это уже готово */\n' +
        '.header-inner {\n    display: flex;\n    gap: 24px;\n    align-items: center;\n    height: 88px;\n}\n\n' +
        '.menu {\n    display: flex;\n    gap: 24px;\n}\n\n' +
        '.header-tools {\n    display: flex;\n    gap: 12px;\n    margin-left: auto;\n}\n\n' +
        '.burger {\n    display: none;\n    font-size: 22px;\n    background: none;\n    border: none;\n}\n\n' +
        '.footer {\n    padding: 48px 0;\n    background: #0e0d18;\n    border-top: 1px solid #2c2f34;\n}\n\n' +
        '.footer-links {\n    display: flex;\n    gap: 24px;\n}\n';
    return {
        title: 'Подвал и версия для телефона',
        kind: 'CSS',
        text: '<p>Внизу страницы — подвал: слева логотип с текстом, справа ссылки. А на телефоне шапка должна перестроиться.</p><ul>' +
            '<li><code>.footer-inner</code>: в строку, края разнесены (<code>space-between</code>), по центру по вертикали, промежуток <code>24px</code></li>' +
            '<li>В конце добавь медиазапрос <code>@media (max-width: 768px)</code>, а внутри: ' +
            '<code>.burger</code> показывается (<code>display: block</code>), <code>.header-tools</code> прячется (<code>display: none</code>), ' +
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
                '@media (max-width: 768px) {\n    .burger {\n        display: block;\n    }\n\n    .header-tools {\n        display: none;\n    }\n\n' +
                '    .footer-inner {\n        flex-direction: column;\n        align-items: flex-start;\n    }\n}',
        },
        checks: [
            ['.footer-inner в строку, края разнесены', function (t) {
                return t.css('.footer-inner', 'display') === 'flex' && t.rule('.footer-inner', 'justify-content') === 'space-between';
            }],
            ['Промежуток 24px', function (t) { return t.css('.footer-inner', 'column-gap') === '24px'; }],
            ['На телефоне видна кнопка-бургер', function (t) { return t.css('.burger', 'display') === 'block'; }],
            ['На телефоне спрятаны кнопки шапки', function (t) { return t.css('.header-tools', 'display') === 'none'; }],
            ['На телефоне подвал столбиком', function (t) { return t.css('.footer-inner', 'flex-direction') === 'column'; }],
        ],
    };
};

// ---------- 10. JS: бургер-меню ----------
QuestTasks.burgerHtml =
    '<button class="burger" type="button">☰</button>\n<ul class="menu">\n    <li><a href="#">Главная</a></li>\n' +
    '    <li><a href="#">Подборки</a></li>\n</ul>';
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
            '<li><code>.modal</code>: ширина <code>90%</code>, но не больше <code>420px</code>, по центру экрана (<code>margin: auto</code>), ' +
            'отступы <code>28px</code>, фон <code>#1c1a26</code>, рамка <code>1px solid #2c2f34</code>, скругление <code>20px</code></li>' +
            '<li><code>.modal-form</code>: всё столбиком, промежуток <code>16px</code></li></ul>' +
            '<p>Чтобы окно было видно в превью, у <code>&lt;dialog&gt;</code> стоит атрибут <code>open</code>. ' +
            'На настоящем сайте окно открывает JS.</p>',
        hint: (hint || []).concat(['<dialog>', 'max-width', 'margin: auto', 'flex-direction: column']),
        start: {
            html: dialogStart,
            css: '.modal {\n    \n}\n\n.modal-form {\n    \n}\n\n/* Уже готово */\n.modal h2 {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 24px;\n}\n\n' +
                QuestTasks.css.modalFields + '\n' + QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        answer: {
            html: dialogAnswer,
            css: QuestTasks.css.modal + '\n' + QuestTasks.css.modalFields + '\n' + QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        checks: htmlChecks.concat([
            ['.modal: ширина 90%, не больше 420px', function (t) {
                return t.rule('.modal', 'width') === '90%' && t.css('.modal', 'max-width') === '420px';
            }],
            ['.modal по центру (margin: auto)', function (t) { return t.rule('.modal', 'margin-left') === 'auto'; }],
            ['.modal: отступы 28px, скругление 20px', function (t) {
                return t.px('.modal', 'padding-top') === 28 && t.px('.modal', 'border-top-left-radius') === 20;
            }],
            ['.modal: фон #1c1a26', function (t) { return t.color('.modal', 'background-color') === '#1c1a26'; }],
            ['.modal-form: столбиком, промежуток 16px', function (t) {
                return t.css('.modal-form', 'display') === 'flex' && t.css('.modal-form', 'flex-direction') === 'column' &&
                    t.css('.modal-form', 'row-gap') === '16px';
            }],
        ]),
    };
};

// ---------- 8. Поля окна: оформление .modal-field ----------
QuestTasks.fieldsTask = function (title, text, dialogStart, dialogAnswer, htmlChecks, hint) {
    return {
        title: title,
        kind: 'HTML + CSS',
        text: text +
            '<p>И оформи поля:</p><ul>' +
            '<li><code>.modal-field</code>: подпись и поле столбиком, промежуток <code>6px</code>, текст <code>13px</code> цвета <code>#c0c8c7</code></li>' +
            '<li><code>.modal-field input</code>: на всю ширину, отступы <code>12px 14px</code>, фон <code>#201e2a</code>, ' +
            'рамка <code>1px solid #2c2f34</code>, скругление <code>12px</code></li>' +
            '<li><code>.modal-buttons</code>: кнопки в строку с переносом, промежуток <code>12px</code></li></ul>',
        hint: (hint || []).concat(['<label>', '<input>', 'border: 1px solid ...', 'flex-wrap: wrap']),
        start: {
            html: dialogStart,
            css: '.modal-field {\n    \n}\n\n.modal-field input {\n    \n}\n\n.modal-buttons {\n    \n}\n\n/* Уже готово */\n' +
                QuestTasks.css.modal + '\n.error {\n    font-size: 13px;\n    color: #ffb2bf;\n}\n\n.modal-field textarea {\n    width: 100%;\n' +
                '    padding: 12px 14px;\n    background: #201e2a;\n    border: 1px solid #2c2f34;\n    border-radius: 12px;\n}\n\n' +
                QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        answer: {
            html: dialogAnswer,
            css: QuestTasks.css.modalFields + '\n' + QuestTasks.css.modal + '\n' + QuestTasks.css.buttons + '\n' + QuestTasks.css.hide,
        },
        checks: htmlChecks.concat([
            ['.modal-field: столбиком, промежуток 6px', function (t) {
                return t.css('.modal-field', 'display') === 'flex' && t.css('.modal-field', 'flex-direction') === 'column' &&
                    t.css('.modal-field', 'row-gap') === '6px';
            }],
            ['.modal-field: 13px цвета #c0c8c7', function (t) {
                return t.px('.modal-field', 'font-size') === 13 && t.color('.modal-field', 'color') === '#c0c8c7';
            }],
            ['Поле: на всю ширину, фон #201e2a', function (t) {
                return t.rule('.modal-field input', 'width') === '100%' && t.color('.modal-field input', 'background-color') === '#201e2a';
            }],
            ['Поле: рамка 1px #2c2f34, скругление 12px', function (t) {
                return Math.abs(t.px('.modal-field input', 'border-top-width') - 1) <= 0.5 &&
                    t.color('.modal-field input', 'border-top-color') === '#2c2f34' && t.px('.modal-field input', 'border-top-left-radius') === 12;
            }],
            ['Поле: отступы 12px 14px', function (t) {
                return t.px('.modal-field input', 'padding-top') === 12 && t.px('.modal-field input', 'padding-left') === 14;
            }],
            ['.modal-buttons: в строку с переносом, промежуток 12px', function (t) {
                return t.css('.modal-buttons', 'display') === 'flex' && t.css('.modal-buttons', 'flex-wrap') === 'wrap' &&
                    t.css('.modal-buttons', 'column-gap') === '12px';
            }],
        ]),
    };
};
