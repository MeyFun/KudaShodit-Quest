// =========================================================
// Общие задачи, которые повторяются на нескольких страницах
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

// ---------- 1. Каркас и базовые стили (у всех одинаковая) ----------
QuestTasks.base = function () {
    return {
        title: 'Каркас и базовые стили',
        kind: 'CSS',
        text: '<p>Начнём с основы, которая нужна всей странице. Сделай тёмный фон и светлый текст, ' +
            'а сайт — шириной как экран телефона и по центру.</p><ul>' +
            '<li><code>body</code>: фон <code>#111114</code>, цвет текста <code>#f2f2f2</code>, ' +
            'шрифт <code>"Manrope", Arial, sans-serif</code>, размер <code>14px</code></li>' +
            '<li><code>.app</code>: ширина не больше <code>430px</code>, по центру ' +
            '(<code>margin: 0 auto</code>), отступы слева и справа <code>16px</code></li></ul>',
        hint: ['background', 'color', 'font-family', 'font-size', 'max-width', 'margin: 0 auto', 'padding'],
        start: {
            html: '<h1>Куда сходить</h1>\n<p>Афиша событий Омска</p>',
            css: '/* Сброс отступов браузера — уже готово */\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n' +
                '/* Фон, цвет и шрифт всей страницы */\nbody {\n    \n}\n\n' +
                '/* Ширина сайта как у телефона */\n.app {\n    \n}\n',
        },
        answer: {
            html: '<h1>Куда сходить</h1>\n<p>Афиша событий Омска</p>',
            css: 'body {\n    font-family: "Manrope", Arial, sans-serif;\n    background: #111114;\n    color: #f2f2f2;\n    font-size: 14px;\n}\n\n' +
                '.app {\n    max-width: 430px;\n    margin: 0 auto;\n    padding: 0 16px;\n}',
        },
        checks: [
            ['Фон страницы #111114', function (t) { return t.color('body', 'background-color') === '#111114'; }],
            ['Цвет текста #f2f2f2', function (t) { return t.color('body', 'color') === '#f2f2f2'; }],
            ['Шрифт Manrope', function (t) { return t.css('body', 'font-family').indexOf('Manrope') >= 0; }],
            ['Размер текста 14px', function (t) { return t.px('body', 'font-size') === 14; }],
            ['.app не шире 430px', function (t) { return t.css('.app', 'max-width') === '430px'; }],
            ['.app по центру (margin: 0 auto)', function (t) { return t.rule('.app', 'margin-left') === 'auto'; }],
            ['Отступы .app слева и справа 16px', function (t) {
                return t.px('.app', 'padding-left') === 16 && t.px('.app', 'padding-right') === 16;
            }],
        ],
    };
};

// ---------- Шапка со стрелкой «назад» (Вход, Регистрация) ----------
QuestTasks.headerBack = function (href, label, pageName) {
    return {
        title: 'Шапка со стрелкой назад',
        kind: 'HTML + CSS',
        text: '<p>Наверху страницы — стрелка «назад» и название страницы.</p><ul>' +
            '<li>Внутри <code>&lt;header class="header-back"&gt;</code> добавь ссылку на <code>' + href + '</code> ' +
            '(' + pageName + '), а в ссылку — иконку <code>&lt;div class="icon"&gt;arrow_back&lt;/div&gt;</code></li>' +
            '<li>Шапка в строку: <code>display: flex</code>, по центру по вертикали, промежуток <code>12px</code></li>' +
            '<li>Текст размером <code>16px</code>, жирность <code>600</code>, отступы сверху и снизу <code>14px</code></li></ul>',
        hint: ['<a href="...">', 'display: flex', 'align-items: center', 'gap', 'font-weight', 'padding: 14px 0'],
        start: {
            html: '<header class="header-back">\n    <!-- сюда ссылку со стрелкой -->\n\n    ' + label + '\n</header>',
            css: '.header-back {\n    \n}\n',
        },
        answer: {
            html: '<header class="header-back">\n    <a href="' + href + '"><div class="icon">arrow_back</div></a>\n    ' + label + '\n</header>',
            css: '.header-back {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    font-size: 16px;\n    font-weight: 600;\n    padding: 14px 0;\n}',
        },
        checks: [
            ['Есть ссылка на ' + href, function (t) { return t.attr('.header-back a', 'href') === href; }],
            ['В ссылке иконка arrow_back', function (t) { return t.text('.header-back a .icon') === 'arrow_back'; }],
            ['В шапке есть слово «' + label + '»', function (t) { return t.text('.header-back').indexOf(label) >= 0; }],
            ['Шапка в строку (display: flex)', function (t) { return t.css('.header-back', 'display') === 'flex'; }],
            ['По центру по вертикали (align-items: center)', function (t) { return t.css('.header-back', 'align-items') === 'center'; }],
            ['Промежуток 12px (gap)', function (t) { return t.css('.header-back', 'column-gap') === '12px'; }],
            ['Текст 16px и жирность 600', function (t) {
                return t.px('.header-back', 'font-size') === 16 && t.css('.header-back', 'font-weight') === '600';
            }],
            ['Отступы сверху и снизу 14px', function (t) {
                return t.px('.header-back', 'padding-top') === 14 && t.px('.header-back', 'padding-bottom') === 14;
            }],
        ],
    };
};

// ---------- Главная шапка с логотипом (Афиша, Профиль) ----------
QuestTasks.mainHeader = function () {
    const html =
        '<header class="header">\n' +
        '    <a href="../index/index.html" class="logo">\n' +
        '        <div class="logo-icon"><div class="icon">local_activity</div></div>\n' +
        '        <div>\n' +
        '            <b class="logo-title">КУДА_СХОДИТЬ</b><br>\n' +
        '            <small class="logo-city">ОМСК</small>\n' +
        '        </div>\n' +
        '    </a>\n' +
        '    <div class="header-actions">\n' +
        '        <button class="round-btn"><div class="icon">search</div></button>\n' +
        '        <a href="../profile/profile.html" class="avatar-small">А</a>\n' +
        '    </div>\n' +
        '</header>';
    const ready =
        '/* Это уже готово */\n' +
        '.logo {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n' +
        '.logo-title {\n    font-size: 16px;\n    font-weight: 600;\n}\n\n' +
        '.logo-city {\n    color: #f5a623;\n    font-size: 12px;\n    font-weight: 700;\n}\n\n' +
        '.header-actions {\n    display: flex;\n    gap: 8px;\n}\n\n' +
        '.avatar-small {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background: #f5a623;\n    color: #1a1a1a;\n' +
        '    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-weight: 700;\n}\n';
    return {
        title: 'Шапка с логотипом',
        kind: 'CSS',
        text: '<p>HTML шапки уже готов. Допиши три правила CSS:</p><ul>' +
            '<li><code>.header</code>: в строку, логотип слева, кнопки справа (<code>justify-content: space-between</code>), ' +
            'по центру по вертикали, отступы сверху и снизу <code>14px</code></li>' +
            '<li><code>.logo-icon</code>: квадрат <code>40×40px</code>, скругление <code>10px</code>, фон <code>#4a3a1c</code>, ' +
            'цвет <code>#f5a623</code>, иконка по центру (flex + justify-content + align-items)</li>' +
            '<li><code>.round-btn</code>: круг <code>40×40px</code> (<code>border-radius: 50%</code>), фон <code>#26262b</code>, ' +
            'без рамки (<code>border: none</code>), иконка по центру</li></ul>',
        hint: ['display: flex', 'justify-content', 'align-items', 'width', 'height', 'border-radius', 'background', 'border: none'],
        start: {
            html: html,
            css: '/* Напиши стили для .header, .logo-icon и .round-btn */\n.header {\n    \n}\n\n.logo-icon {\n    \n}\n\n.round-btn {\n    \n}\n\n' + ready,
        },
        answer: {
            html: html,
            css: '.header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 14px 0;\n}\n\n' +
                '.logo-icon {\n    width: 40px;\n    height: 40px;\n    border-radius: 10px;\n    background: #4a3a1c;\n    color: #f5a623;\n' +
                '    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n' +
                '.round-btn {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    border: none;\n    background: #26262b;\n' +
                '    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n}\n\n' + ready,
        },
        checks: [
            ['.header в строку (flex)', function (t) { return t.css('.header', 'display') === 'flex'; }],
            ['.header: логотип и кнопки по краям (space-between)', function (t) { return t.css('.header', 'justify-content') === 'space-between'; }],
            ['.header: по центру по вертикали', function (t) { return t.css('.header', 'align-items') === 'center'; }],
            ['.header: отступы сверху и снизу 14px', function (t) { return t.px('.header', 'padding-top') === 14; }],
            ['.logo-icon 40×40px', function (t) { return t.px('.logo-icon', 'width') === 40 && t.px('.logo-icon', 'height') === 40; }],
            ['.logo-icon: скругление 10px и фон #4a3a1c', function (t) {
                return t.px('.logo-icon', 'border-top-left-radius') === 10 && t.color('.logo-icon', 'background-color') === '#4a3a1c';
            }],
            ['.logo-icon: иконка по центру', function (t) {
                return t.css('.logo-icon', 'display') === 'flex' && t.css('.logo-icon', 'justify-content') === 'center';
            }],
            ['.round-btn 40×40px и круглая (50%)', function (t) {
                return t.px('.round-btn', 'width') === 40 && t.css('.round-btn', 'border-top-left-radius') === '50%';
            }],
            ['.round-btn: фон #26262b и без рамки', function (t) {
                return t.color('.round-btn', 'background-color') === '#26262b' && t.css('.round-btn', 'border-top-style') === 'none';
            }],
        ],
    };
};

// ---------- Большая оранжевая кнопка (Вход, Регистрация) ----------
QuestTasks.bigButton = function (label, before) {
    const html = (before || '') +
        '<button type="submit" class="btn btn-accent btn-big">' + label + ' <div class="icon">arrow_forward</div></button>';
    return {
        title: 'Кнопка «' + label + '»',
        kind: 'CSS',
        text: '<p>Кнопка уже стоит в HTML и у неё три класса. Каждый класс отвечает за своё:</p><ul>' +
            '<li><code>.btn</code> — общий вид любой кнопки: <code>display: flex</code>, текст и иконка по центру, ' +
            'промежуток <code>6px</code>, без рамки, скругление <code>999px</code>, отступы <code>8px 18px</code>, ' +
            'фон <code>#26262b</code>, жирность <code>600</code>, курсор-рука (<code>cursor: pointer</code>)</li>' +
            '<li><code>.btn-accent</code> — оранжевая: фон <code>#f5a623</code>, текст <code>#1a1a1a</code></li>' +
            '<li><code>.btn-big</code> — большая: ширина <code>100%</code>, отступы <code>15px</code>, ' +
            'размер текста <code>17px</code>, скругление <code>14px</code></li></ul>',
        hint: ['display: flex', 'justify-content', 'align-items', 'gap', 'border: none', 'border-radius', 'cursor: pointer', 'width: 100%'],
        start: {
            html: html,
            css: '.btn {\n    \n}\n\n.btn-accent {\n    \n}\n\n.btn-big {\n    \n}\n',
        },
        answer: {
            html: html,
            css: '.btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    border: none;\n' +
                '    border-radius: 999px;\n    padding: 8px 18px;\n    background: #26262b;\n    font-weight: 600;\n    cursor: pointer;\n}\n\n' +
                '.btn-accent {\n    background: #f5a623;\n    color: #1a1a1a;\n}\n\n' +
                '.btn-big {\n    width: 100%;\n    padding: 15px;\n    font-size: 17px;\n    border-radius: 14px;\n}',
        },
        checks: [
            ['.btn: display flex и всё по центру', function (t) {
                return t.css('.btn', 'display') === 'flex' && t.css('.btn', 'justify-content') === 'center' &&
                    t.css('.btn', 'align-items') === 'center';
            }],
            ['.btn: промежуток 6px', function (t) { return t.css('.btn', 'column-gap') === '6px'; }],
            ['.btn: без рамки', function (t) { return t.css('.btn', 'border-top-style') === 'none'; }],
            ['.btn: жирность 600 и курсор-рука', function (t) {
                return t.css('.btn', 'font-weight') === '600' && t.css('.btn', 'cursor') === 'pointer';
            }],
            ['.btn-accent: оранжевый фон #f5a623', function (t) { return t.color('.btn-accent', 'background-color') === '#f5a623'; }],
            ['.btn-accent: тёмный текст #1a1a1a', function (t) { return t.color('.btn-accent', 'color') === '#1a1a1a'; }],
            ['.btn-big: ширина 100%', function (t) { return t.rule('.btn-big', 'width') === '100%'; }],
            ['.btn-big: текст 17px и скругление 14px', function (t) {
                return t.px('.btn-big', 'font-size') === 17 && t.px('.btn-big', 'border-top-left-radius') === 14;
            }],
            ['.btn-big: отступы 15px', function (t) { return t.px('.btn-big', 'padding-top') === 15; }],
        ],
    };
};

// ---------- Поле ввода с иконкой (CSS для .field, .field-label, .input) ----------
QuestTasks.fieldCss =
    '.field {\n    margin-bottom: 16px;\n}\n\n' +
    '.field-label {\n    display: flex;\n    justify-content: space-between;\n    font-weight: 600;\n    margin-bottom: 8px;\n}\n\n' +
    '.input {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    background: #26262b;\n    border-radius: 12px;\n    padding: 0 14px;\n}\n\n' +
    '.input .icon {\n    color: #9a9aa2;\n}\n\n' +
    '.input input {\n    flex: 1;\n    background: #26262b;\n    border: none;\n    outline: none;\n    padding: 14px 0;\n}\n';

// ---------- Кнопки .btn готовыми стилями (для задач, где кнопки не главное) ----------
QuestTasks.btnCss =
    '.btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    border: none;\n' +
    '    border-radius: 999px;\n    padding: 8px 18px;\n    background: #26262b;\n    font-weight: 600;\n    cursor: pointer;\n}\n\n' +
    '.btn-accent {\n    background: #f5a623;\n    color: #1a1a1a;\n}\n';

QuestTasks.hideCss = '.hide {\n    display: none;\n}\n\n.error {\n    color: #ff6b6b;\n    font-size: 13px;\n    margin-bottom: 10px;\n}\n';
