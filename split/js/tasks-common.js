// =========================================================
// Общие задачи и готовые куски сайта «Сплит»
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

// ---------- Готовые куски сайта «Сплит» для стартового кода задач ----------
QuestTasks.css = {};

QuestTasks.css.common =
    '.main {\n    display: flex;\n    flex-direction: column;\n    gap: 36px;\n    padding-top: 16px;\n    padding-bottom: 36px;\n}\n\n' +
    '.button {\n    display: flex;\n    gap: 6px;\n    align-items: center;\n    justify-content: center;\n    padding: 10px 24px;\n' +
    '    font-size: 14px;\n    font-weight: 700;\n    color: #ffffff;\n    background: #ae1e5a;\n    border: none;\n    border-radius: 999px;\n}\n\n' +
    '.chip-button {\n    display: flex;\n    gap: 4px;\n    align-items: center;\n    padding: 6px 16px;\n    font-size: 14px;\n' +
    '    font-weight: 700;\n    background: #f6f3f4;\n    border: none;\n    border-radius: 999px;\n}\n\n' +
    '.label {\n    display: flex;\n    gap: 6px;\n    align-items: center;\n    font-size: 11px;\n    font-weight: 700;\n' +
    '    text-transform: uppercase;\n    color: #584146;\n}\n\n' +
    '.dot {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: #ae1e5a;\n}\n\n' +
    '.small {\n    font-size: 11px;\n    font-weight: 700;\n    color: #584146;\n}\n\n' +
    '.link {\n    font-size: 12px;\n    font-weight: 700;\n    color: #ae1e5a;\n}\n';

QuestTasks.css.card =
    '.card {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    padding: 24px;\n    background: #ffffff;\n' +
    '    border-radius: 48px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n\n' +
    '.card h3 {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    font-size: 18px;\n}\n';

QuestTasks.css.sectionHead =
    '.section-head {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
    '.section-head h2 {\n    font-size: 32px;\n    line-height: 1.25;\n}\n\n' +
    '.section-head p {\n    font-size: 14px;\n    color: #584146;\n}\n\n' +
    '.chip-button-big {\n    padding: 8px 16px;\n    background: #f0edee;\n}\n';

QuestTasks.css.modal =
    '.modal {\n    width: 90%;\n    max-width: 420px;\n    margin: auto;\n    padding: 28px;\n    border: none;\n    border-radius: 32px;\n' +
    '    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n}\n\n' +
    '.modal::backdrop {\n    background: rgba(27, 27, 28, 0.4);\n}\n\n' +
    '.modal-form {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n}\n\n' +
    '.modal h2 {\n    font-size: 28px;\n}\n';

QuestTasks.css.modalFields =
    '.modal-field {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    font-size: 14px;\n    font-weight: 700;\n}\n\n' +
    '.modal-field input,\n.modal-field textarea {\n    width: 100%;\n    padding: 8px 12px;\n    font-weight: 400;\n' +
    '    background: #f6f3f4;\n    border: 1px solid #eae7e8;\n    border-radius: 12px;\n}\n\n' +
    '.error {\n    font-size: 14px;\n    color: #ae1e5a;\n}\n\n' +
    '.modal-buttons {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n}\n';

QuestTasks.css.feed =
    '.feed {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n' +
    '.feed li {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding: 6px 0;\n}\n\n' +
    '.feed-text {\n    flex: 1;\n    font-size: 14px;\n}\n\n' +
    '.feed-text small {\n    display: block;\n    font-size: 11px;\n    font-weight: 700;\n    color: #584146;\n}\n\n' +
    '.feed-sum {\n    font-family: "Manrope", Arial, sans-serif;\n    font-size: 14px;\n    font-weight: 600;\n}\n';

// ---------- Готовый JS: данные сайта (для JS-задач) ----------
QuestTasks.js = {};

QuestTasks.js.data =
    'const demoData = {\n' +
    '    groups: [\n' +
    "        { id: 'altai', title: 'Поездка на Алтай', members: ['Вы', 'Максим', 'Даша', 'Катя', 'Артём', 'Лена'] },\n" +
    "        { id: 'bar', title: 'Бар в пятницу', members: ['Вы', 'Лена', 'Даша', 'Максим'] },\n" +
    "        { id: 'cottage', title: 'Коттедж на майские', members: ['Вы', 'Лена', 'Даша', 'Максим', 'Артём', 'Катя', 'Миша', 'Оля'] }\n" +
    '    ],\n' +
    '    expenses: [\n' +
    "        { title: 'Билеты до Алтая', sum: 4080, group: 'altai', payer: 'Вы' },\n" +
    "        { title: 'Чек в баре', sum: 3400, group: 'bar', payer: 'Лена' }\n" +
    '    ],\n' +
    '    payments: [],\n' +
    '    collections: [\n' +
    "        { id: 'gift', title: 'Подарок Саше на день рождения', goal: 25000, raised: 18000 },\n" +
    "        { id: 'travel', title: 'Фонд поездки на Алтай', goal: 15000, raised: 15000 }\n" +
    '    ]\n' +
    '};\n\n' +
    'function loadData() {\n    const saved = localStorage.getItem(\'split\');\n    if (saved === null) {\n' +
    '        return JSON.parse(JSON.stringify(demoData));\n    }\n    return JSON.parse(saved);\n}\n\n' +
    'function saveData(data) {\n    localStorage.setItem(\'split\', JSON.stringify(data));\n}\n\n' +
    'function money(sum) {\n    return sum.toLocaleString(\'ru-RU\') + \' ₽\';\n}\n\n' +
    'function findGroup(data, id) {\n    let found = null;\n    data.groups.forEach(function (group) {\n' +
    '        if (group.id === id) {\n            found = group;\n        }\n    });\n    return found;\n}\n';

QuestTasks.js.debts =
    'function addDebt(debts, group, from, to, sum) {\n    let found = null;\n    debts.forEach(function (debt) {\n' +
    '        if (debt.group === group && debt.from === from && debt.to === to) {\n            found = debt;\n        }\n    });\n' +
    '    if (found) {\n        found.sum = found.sum + sum;\n    } else {\n        debts.push({ group: group, from: from, to: to, sum: sum });\n    }\n}\n\n' +
    'function getDebts(data) {\n    const debts = [];\n    data.expenses.forEach(function (expense) {\n' +
    '        const group = findGroup(data, expense.group);\n        const share = Math.round(expense.sum / group.members.length);\n' +
    '        group.members.forEach(function (member) {\n            if (member !== expense.payer) {\n' +
    '                addDebt(debts, group.id, member, expense.payer, share);\n            }\n        });\n    });\n' +
    '    data.payments.forEach(function (payment) {\n        addDebt(debts, payment.group, payment.from, payment.to, -payment.sum);\n    });\n' +
    '    return debts.filter(function (debt) {\n        return debt.sum > 0;\n    });\n}\n';

QuestTasks.js.close =
    "document.querySelectorAll('.close-modal').forEach(function (button) {\n    button.addEventListener('click', function () {\n" +
    "        button.closest('dialog').close();\n    });\n});\n";

// перед JS-задачами — чистые данные, после — убрать за собой
QuestTasks.resetData = function () { localStorage.removeItem('split'); };

// ---------- 1. Каркас и базовые стили (одинаковая у всех) ----------
QuestTasks.base = function () {
    const html = '<div class="container">\n    <h1>Сплит</h1>\n    <p>Общие траты без неловкости</p>\n' +
        '    <ul>\n        <li><a href="#">Группы</a></li>\n        <li><a href="#">Сборы</a></li>\n    </ul>\n</div>';
    return {
        title: 'Каркас и базовые стили',
        kind: 'CSS',
        text: '<p>Основа всей страницы: шрифт, цвета и ширина сайта.</p><ul>' +
            '<li><code>body</code>: шрифт <code>"PT Serif", Georgia, serif</code>, размер <code>16px</code>, высота строки <code>1.5</code>, ' +
            'цвет текста <code>#1b1b1c</code>, фон <code>#fbf9f9</code></li>' +
            '<li><code>.container</code>: не шире <code>1200px</code>, по центру (<code>margin: 0 auto</code>), отступы по бокам <code>32px</code></li>' +
            '<li><code>ul</code>: без точек у пунктов; <code>a</code>: без подчёркивания, цвет <code>#1b1b1c</code></li></ul>',
        hint: ['font-family', 'font-size', 'line-height', 'color', 'background', 'max-width', 'margin: 0 auto', 'padding', 'list-style: none', 'text-decoration: none'],
        start: {
            html: html,
            css: '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    \n}\n\n.container {\n    \n}\n\nul {\n    \n}\n\na {\n    \n}\n',
        },
        answer: {
            html: html,
            css: 'body {\n    font-family: "PT Serif", Georgia, serif;\n    font-size: 16px;\n    line-height: 1.5;\n    color: #1b1b1c;\n    background: #fbf9f9;\n}\n\n' +
                '.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 32px;\n}\n\n' +
                'ul {\n    list-style: none;\n}\n\na {\n    color: #1b1b1c;\n    text-decoration: none;\n}',
        },
        checks: [
            ['Шрифт PT Serif', function (t) { return t.css('body', 'font-family').indexOf('PT Serif') >= 0; }],
            ['Размер 16px и высота строки 1.5', function (t) {
                return t.px('body', 'font-size') === 16 && t.px('body', 'line-height') === 24;
            }],
            ['Цвет текста #1b1b1c', function (t) { return t.color('body', 'color') === '#1b1b1c'; }],
            ['Фон #fbf9f9', function (t) { return t.color('body', 'background-color') === '#fbf9f9'; }],
            ['.container не шире 1200px', function (t) { return t.css('.container', 'max-width') === '1200px'; }],
            ['.container по центру (margin: 0 auto)', function (t) { return t.rule('.container', 'margin-left') === 'auto'; }],
            ['.container: отступы по бокам 32px', function (t) { return t.px('.container', 'padding-left') === 32; }],
            ['У списка нет точек', function (t) { return t.css('ul', 'list-style-type') === 'none'; }],
            ['Ссылки без подчёркивания и цвета #1b1b1c', function (t) {
                return t.css('a', 'text-decoration-line') === 'none' && t.color('a', 'color') === '#1b1b1c';
            }],
        ],
    };
};

// ---------- 2. Шапка (одинаковая разметка, активна своя страница) ----------
QuestTasks.headerHtml = function (active) {
    const pages = [['home', 'Главная'], ['groups', 'Группы'], ['collections', 'Сборы'], ['settlements', 'Расчёты']];
    let links = '';
    pages.forEach(function (p) {
        const cls = p[0] === active ? ' class="active"' : '';
        links += '            <li><a href="../' + p[0] + '/' + p[0] + '.html"' + cls + '>' + p[1] + '</a></li>\n';
    });
    return '<header class="header">\n' +
        '    <div class="container header-inner">\n' +
        '        <a class="logo" href="../home/home.html">\n' +
        '            <div class="logo-icon"><img src="../img/logo.svg" alt="" width="15" height="15"></div>\n' +
        '            <div class="logo-text">Сплит <small>Финансы</small></div>\n' +
        '        </a>\n' +
        '        <button class="burger" type="button">☰</button>\n' +
        '        <nav class="nav">\n' +
        '            <ul class="menu">\n' + links + '            </ul>\n' +
        '        </nav>\n' +
        '        <div class="header-tools">\n' +
        '            <a class="button" href="../groups/groups.html"><img src="../img/plus.svg" alt="" width="11" height="11"> Добавить расход</a>\n' +
        '            <div class="user"><b>Алексей М.</b><div class="user-icon"><img src="../img/user.svg" alt="" width="12" height="12"></div></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</header>';
};

QuestTasks.header = function (active) {
    const html = QuestTasks.headerHtml(active);
    const ready = '/* Это уже готово */\n' +
        '.logo {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n}\n\n' +
        '.logo-text {\n    font-size: 22px;\n    font-weight: 700;\n    line-height: 1;\n}\n\n' +
        '.logo-text small {\n    display: block;\n    font-size: 11px;\n    text-transform: uppercase;\n    color: #fdbecf;\n}\n\n' +
        '.menu a {\n    display: block;\n    padding: 6px 16px;\n    font-size: 14px;\n    color: #584146;\n    border-radius: 999px;\n}\n\n' +
        '.header-tools {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    margin-left: auto;\n}\n\n' +
        '.button {\n    display: flex;\n    gap: 6px;\n    align-items: center;\n    padding: 10px 24px;\n    font-size: 14px;\n' +
        '    font-weight: 700;\n    color: #ffffff;\n    background: #ae1e5a;\n    border-radius: 999px;\n}\n\n' +
        '.user {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding: 4px 6px 4px 12px;\n    font-size: 12px;\n' +
        '    background: #f6f3f4;\n    border-radius: 999px;\n}\n\n' +
        '.user-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 32px;\n    height: 32px;\n' +
        '    border-radius: 50%;\n    background: #ae1e5a;\n}\n\n' +
        '.burger {\n    display: none;\n}\n';
    return {
        title: 'Шапка с меню',
        kind: 'CSS',
        text: '<p>HTML шапки готов. Допиши четыре правила, и шапка станет как в макете:</p><ul>' +
            '<li><code>.header-inner</code>: всё в строку, по центру по вертикали, промежуток <code>36px</code>, высота <code>80px</code></li>' +
            '<li><code>.logo-icon</code>: розовый круг <code>40×40px</code>, фон <code>#cf3a73</code>, картинка по центру</li>' +
            '<li><code>.menu</code>: пункты в строку с промежутком <code>4px</code>, внутренний отступ <code>4px</code>, ' +
            'фон <code>#f6f3f4</code>, скругление <code>999px</code></li>' +
            '<li><code>.menu a.active</code> (текущая страница): фон <code>#fdbecf</code>, цвет <code>#7a4a58</code></li></ul>',
        hint: ['display: flex', 'align-items: center', 'justify-content: center', 'gap', 'height', 'width', 'border-radius: 50%', 'background', 'color'],
        start: {
            html: html,
            css: '.header-inner {\n    \n}\n\n.logo-icon {\n    \n}\n\n.menu {\n    \n}\n\n.menu a.active {\n    \n}\n\n' + ready,
        },
        answer: {
            html: html,
            css: '.header-inner {\n    display: flex;\n    gap: 36px;\n    align-items: center;\n    height: 80px;\n}\n\n' +
                '.logo-icon {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 40px;\n    height: 40px;\n' +
                '    border-radius: 50%;\n    background: #cf3a73;\n}\n\n' +
                '.menu {\n    display: flex;\n    gap: 4px;\n    padding: 4px;\n    background: #f6f3f4;\n    border-radius: 999px;\n}\n\n' +
                '.menu a.active {\n    color: #7a4a58;\n    background: #fdbecf;\n}\n\n' + ready,
        },
        checks: [
            ['.header-inner в строку и по центру', function (t) {
                return t.css('.header-inner', 'display') === 'flex' && t.css('.header-inner', 'align-items') === 'center';
            }],
            ['.header-inner: промежуток 36px, высота 80px', function (t) {
                return t.css('.header-inner', 'column-gap') === '36px' && t.px('.header-inner', 'height') === 80;
            }],
            ['.logo-icon: круг 40×40px', function (t) {
                return t.px('.logo-icon', 'width') === 40 && t.px('.logo-icon', 'height') === 40 &&
                    t.round('.logo-icon');
            }],
            ['.logo-icon: фон #cf3a73, картинка по центру', function (t) {
                return t.color('.logo-icon', 'background-color') === '#cf3a73' && t.css('.logo-icon', 'display') === 'flex' &&
                    t.css('.logo-icon', 'justify-content') === 'center';
            }],
            ['.menu: пункты в строку, промежуток 4px', function (t) {
                return t.css('.menu', 'display') === 'flex' && t.css('.menu', 'column-gap') === '4px';
            }],
            ['.menu: фон #f6f3f4, скругление 999px', function (t) {
                return t.color('.menu', 'background-color') === '#f6f3f4' && t.px('.menu', 'border-top-left-radius') === 999;
            }],
            ['Активный пункт: фон #fdbecf', function (t) { return t.color('.menu a.active', 'background-color') === '#fdbecf'; }],
            ['Активный пункт: цвет #7a4a58', function (t) { return t.color('.menu a.active', 'color') === '#7a4a58'; }],
        ],
    };
};

// ---------- 9. Подвал и версия для телефона (одинаковая у всех) ----------
QuestTasks.footer = function (active) {
    const footerHtml =
        '<footer class="footer">\n' +
        '    <div class="container">\n' +
        '        <div class="footer-grid">\n' +
        '            <div class="footer-about">\n' +
        '                <p>Совместные расходы, групповые счета и копилки для поездок и встреч с друзьями.</p>\n' +
        '            </div>\n' +
        '            <div>\n                <h3>Разделы</h3>\n                <ul>\n' +
        '                    <li><a href="../groups/groups.html">Группы</a></li>\n' +
        '                    <li><a href="../collections/collections.html">Сборы</a></li>\n' +
        '                    <li><a href="../settlements/settlements.html">Расчёты</a></li>\n' +
        '                </ul>\n            </div>\n' +
        '            <div>\n                <h3>О демонстрации</h3>\n' +
        '                <p>Суммы и взносы вводятся вручную.</p>\n            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</footer>';
    const html = QuestTasks.headerHtml(active) + '\n\n' + footerHtml;
    const ready = '/* Это уже готово */\n' +
        '.header-inner {\n    display: flex;\n    gap: 36px;\n    align-items: center;\n    height: 80px;\n}\n\n' +
        '.menu {\n    display: flex;\n    gap: 4px;\n    padding: 4px;\n    background: #f6f3f4;\n    border-radius: 999px;\n}\n\n' +
        '.menu a {\n    display: block;\n    padding: 6px 16px;\n}\n\n' +
        '.header-tools {\n    display: flex;\n    gap: 16px;\n    margin-left: auto;\n}\n\n' +
        '.burger {\n    display: none;\n    font-size: 22px;\n    background: none;\n    border: none;\n}\n\n' +
        '.footer {\n    padding: 36px 0 24px;\n    background: #ffffff;\n}\n';
    return {
        title: 'Подвал и версия для телефона',
        kind: 'CSS',
        text: '<p>Внизу страницы — подвал из трёх колонок. А на телефоне шапка должна перестроиться.</p><ul>' +
            '<li><code>.footer-grid</code>: сетка из трёх колонок <code>2fr 1fr 1fr</code>, промежуток <code>36px</code></li>' +
            '<li>Добавь медиазапрос <code>@media (max-width: 768px)</code>, а внутри: ' +
            '<code>.burger</code> показывается (<code>display: block</code>), <code>.header-tools</code> прячется (<code>display: none</code>), ' +
            '<code>.footer-grid</code> становится одной колонкой (<code>1fr</code>)</li></ul>' +
            '<p>Медиазапрос пиши в самом конце: если обычное правило <code>.burger { display: none; }</code> стоит ниже, оно его перебьёт. ' +
            'Превью узкое, как телефон, поэтому медиазапрос сработает прямо в нём.</p>',
        hint: ['display: grid', 'grid-template-columns: 2fr 1fr 1fr', 'gap', '@media (max-width: 768px) { }', 'display: block', 'display: none', 'grid-template-columns: 1fr'],
        start: {
            html: html,
            css: ready + '\n/* Твой код */\n.footer-grid {\n    \n}\n\n/* медиазапрос пишут в самом конце файла, после обычных правил */\n\n',
        },
        answer: {
            html: html,
            css: ready + '\n.footer-grid {\n    display: grid;\n    grid-template-columns: 2fr 1fr 1fr;\n    gap: 36px;\n    padding-bottom: 36px;\n}\n\n' +
                '@media (max-width: 768px) {\n    .burger {\n        display: block;\n    }\n\n    .header-tools {\n        display: none;\n    }\n\n' +
                '    .footer-grid {\n        grid-template-columns: 1fr;\n    }\n}',
        },
        checks: [
            ['.footer-grid — сетка', function (t) { return t.css('.footer-grid', 'display') === 'grid'; }],
            ['На компьютере 3 колонки: 2fr 1fr 1fr', function (t) { return t.rule('.footer-grid', 'grid-template-columns') === '2fr 1fr 1fr'; }],
            ['Промежуток 36px', function (t) { return t.css('.footer-grid', 'column-gap') === '36px'; }],
            ['На телефоне видна кнопка-бургер', function (t) { return t.css('.burger', 'display') === 'block'; }],
            ['На телефоне спрятаны кнопки шапки', function (t) { return t.css('.header-tools', 'display') === 'none'; }],
            ['На телефоне подвал в одну колонку', function (t) {
                return t.css('.footer-grid', 'grid-template-columns').split(' ').length === 1;
            }],
        ],
    };
};

// ---------- 10. JS: бургер-меню (первая часть первой JS-задачи) ----------
QuestTasks.burgerHtml =
    '<button class="burger" type="button">☰</button>\n<ul class="menu">\n    <li><a href="#">Главная</a></li>\n' +
    '    <li><a href="#">Группы</a></li>\n</ul>';
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

// ---------- 3. Заголовок раздела (Группы, Сборы, Расчёты) ----------
QuestTasks.sectionHead = function (html, extra) {
    extra = extra || { text: '', css: '', answer: '', checks: [] };
    return {
        title: 'Заголовок раздела',
        kind: 'CSS',
        text: '<p>Вверху страницы — заголовок раздела и кнопка справа. HTML готов, напиши CSS:</p><ul>' +
            '<li><code>.section-head</code>: в строку, заголовок слева, кнопка справа (<code>space-between</code>), по центру по вертикали, промежуток <code>16px</code></li>' +
            '<li><code>.section-head h2</code>: размер <code>32px</code>, высота строки <code>1.25</code></li>' +
            '<li><code>.section-head p</code>: размер <code>14px</code>, цвет <code>#584146</code></li>' + extra.text + '</ul>',
        hint: ['justify-content: space-between', 'align-items: center', 'gap', 'font-size', 'line-height'],
        start: {
            html: html,
            css: '.section-head {\n    \n}\n\n.section-head h2 {\n    \n}\n\n.section-head p {\n    \n}\n\n' + extra.css +
                '/* Уже готово */\n' + QuestTasks.css.common + '\n.chip-button-big {\n    padding: 8px 16px;\n    background: #f0edee;\n}\n',
        },
        answer: {
            css: '.section-head {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    justify-content: space-between;\n}\n\n' +
                '.section-head h2 {\n    font-size: 32px;\n    line-height: 1.25;\n}\n\n' +
                '.section-head p {\n    font-size: 14px;\n    color: #584146;\n}\n\n' + extra.answer +
                QuestTasks.css.common + '\n.chip-button-big {\n    padding: 8px 16px;\n    background: #f0edee;\n}\n',
        },
        checks: [
            ['.section-head в строку', function (t) { return t.css('.section-head', 'display') === 'flex'; }],
            ['Заголовок и кнопка по краям (space-between)', function (t) { return t.css('.section-head', 'justify-content') === 'space-between'; }],
            ['По центру по вертикали, промежуток 16px', function (t) {
                return t.css('.section-head', 'align-items') === 'center' && t.css('.section-head', 'column-gap') === '16px';
            }],
            ['Заголовок 32px, высота строки 1.25', function (t) {
                return t.px('.section-head h2', 'font-size') === 32 && t.px('.section-head h2', 'line-height') === 40;
            }],
            ['Подзаголовок 14px цвета #584146', function (t) {
                return t.px('.section-head p', 'font-size') === 14 && t.color('.section-head p', 'color') === '#584146';
            }],
        ].concat(extra.checks),
    };
};

// ---------- 7. Окно: оформление .modal (Группы, Сборы, Расчёты) ----------
QuestTasks.modalTask = function (title, text, dialogStart, dialogAnswer, htmlChecks, hint) {
    return {
        title: title,
        kind: 'HTML + CSS',
        text: text +
            '<p>И оформи окно:</p><ul>' +
            '<li><code>.modal</code>: ширина <code>90%</code>, но не больше <code>420px</code>, по центру экрана (<code>margin: auto</code>), ' +
            'отступы <code>28px</code>, без рамки, скругление <code>32px</code></li>' +
            '<li><code>.modal-form</code>: всё столбиком, промежуток <code>16px</code></li></ul>' +
            '<p>Чтобы окно было видно в превью, у <code>&lt;dialog&gt;</code> стоит атрибут <code>open</code>. ' +
            'На настоящем сайте окно открывает JS.</p>',
        hint: (hint || []).concat(['<dialog>', 'max-width', 'margin: auto', 'flex-direction: column']),
        start: {
            html: dialogStart,
            css: '.modal {\n    \n}\n\n.modal-form {\n    \n}\n\n/* Уже готово */\n.modal h2 {\n    font-size: 28px;\n}\n\n' +
                QuestTasks.css.modalFields + '\n' + QuestTasks.css.common,
        },
        answer: {
            html: dialogAnswer,
            css: QuestTasks.css.modal + '\n' + QuestTasks.css.modalFields + '\n' + QuestTasks.css.common,
        },
        checks: htmlChecks.concat([
            ['.modal: ширина 90%, не больше 420px', function (t) {
                return t.rule('.modal', 'width') === '90%' && t.css('.modal', 'max-width') === '420px';
            }],
            ['.modal по центру (margin: auto)', function (t) { return t.rule('.modal', 'margin-left') === 'auto'; }],
            ['.modal: отступы 28px, скругление 32px', function (t) {
                return t.px('.modal', 'padding-top') === 28 && t.px('.modal', 'border-top-left-radius') === 32;
            }],
            ['.modal без рамки', function (t) { return t.css('.modal', 'border-top-style') === 'none'; }],
            ['.modal-form: столбиком, промежуток 16px', function (t) {
                return t.css('.modal-form', 'display') === 'flex' && t.css('.modal-form', 'flex-direction') === 'column' &&
                    t.css('.modal-form', 'row-gap') === '16px';
            }],
        ]),
    };
};

// ---------- 8. Поля окна: оформление .modal-field (Группы, Сборы, Расчёты) ----------
QuestTasks.fieldsTask = function (title, text, dialogStart, dialogAnswer, htmlChecks, hint, extraCss) {
    return {
        title: title,
        kind: 'HTML + CSS',
        text: text +
            '<p>И оформи поля:</p><ul>' +
            '<li><code>.modal-field</code>: подпись и поле столбиком, промежуток <code>4px</code>, текст <code>14px</code> жирный (<code>700</code>)</li>' +
            '<li><code>.modal-field input</code>: на всю ширину, отступы <code>8px 12px</code>, фон <code>#f6f3f4</code>, ' +
            'рамка <code>1px solid #eae7e8</code>, скругление <code>12px</code></li>' +
            '<li><code>.modal-buttons</code>: кнопки в строку с переносом, промежуток <code>12px</code></li></ul>',
        hint: (hint || []).concat(['<label>', 'border: 1px solid ...', 'flex-wrap: wrap']),
        start: {
            html: dialogStart,
            css: '.modal-field {\n    \n}\n\n.modal-field input {\n    \n}\n\n.modal-buttons {\n    \n}\n\n/* Уже готово */\n' +
                QuestTasks.css.modal + '\n.error {\n    font-size: 14px;\n    color: #ae1e5a;\n}\n\n' + (extraCss || '') + QuestTasks.css.common,
        },
        answer: {
            html: dialogAnswer,
            css: QuestTasks.css.modalFields + '\n' + QuestTasks.css.modal + '\n' + (extraCss || '') + QuestTasks.css.common,
        },
        checks: htmlChecks.concat([
            ['.modal-field: столбиком, промежуток 4px', function (t) {
                return t.css('.modal-field', 'display') === 'flex' && t.css('.modal-field', 'flex-direction') === 'column' &&
                    t.css('.modal-field', 'row-gap') === '4px';
            }],
            ['.modal-field: 14px жирный', function (t) {
                return t.px('.modal-field', 'font-size') === 14 && t.css('.modal-field', 'font-weight') === '700';
            }],
            ['Поле: на всю ширину, фон #f6f3f4', function (t) {
                return t.rule('.modal-field input', 'width') === '100%' && t.color('.modal-field input', 'background-color') === '#f6f3f4';
            }],
            ['Поле: рамка 1px #eae7e8, скругление 12px', function (t) {
                return Math.abs(t.px('.modal-field input', 'border-top-width') - 1) <= 0.5 &&
                    t.color('.modal-field input', 'border-top-color') === '#eae7e8' && t.px('.modal-field input', 'border-top-left-radius') === 12;
            }],
            ['Поле: отступы 8px 12px', function (t) {
                return t.px('.modal-field input', 'padding-top') === 8 && t.px('.modal-field input', 'padding-left') === 12;
            }],
            ['.modal-buttons: в строку с переносом, промежуток 12px', function (t) {
                return t.css('.modal-buttons', 'display') === 'flex' && t.css('.modal-buttons', 'flex-wrap') === 'wrap' &&
                    t.css('.modal-buttons', 'column-gap') === '12px';
            }],
        ]),
    };
};
